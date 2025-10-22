# IIS ile Hillside CRM Portal Deployment

## Hızlı Kurulum (15 Dakika)

### Ön Gereksinimler

IIS sunucunuzda aşağıdakilerin kurulu olması gerekir:

1. **IIS (Internet Information Services)**
2. **URL Rewrite Module** - https://www.iis.net/downloads/microsoft/url-rewrite
3. **Application Request Routing (ARR)** - https://www.iis.net/downloads/microsoft/application-request-routing
4. **Node.js** (v18 veya üzeri) - https://nodejs.org

### Adım 1: IIS Modüllerini Yükleyin

```powershell
# URL Rewrite ve ARR'yi Web Platform Installer ile yükleyin
# Veya direkt indirip kurun:
# - URL Rewrite: https://www.iis.net/downloads/microsoft/url-rewrite
# - ARR: https://www.iis.net/downloads/microsoft/application-request-routing
```

**ARR Proxy'yi Aktifleştirin:**
1. IIS Manager'ı açın
2. Server seviyesinde "Application Request Routing Cache" tıklayın
3. Sağdaki "Server Proxy Settings" tıklayın
4. "Enable proxy" kutucuğunu işaretleyin
5. Apply yapın

### Adım 2: Dosyaları Sunucuya Kopyalayın

Tüm proje dosyalarını sunucudaki bir klasöre kopyalayın (örnek: `C:\inetpub\crm-portal`)

```
C:\inetpub\crm-portal\
├── src/
├── public/
├── package.json
├── next.config.ts
├── web.config          ← IIS yapılandırma dosyası
├── install-nssm-service.bat
└── ...
```

### Adım 3: Bağımlılıkları Yükleyin ve Build Yapın

```powershell
cd C:\inetpub\crm-portal

# Bağımlılıkları yükle
npm install

# Production build
npm run build
```

### Adım 4: Next.js'i Windows Service Olarak Çalıştırın

Next.js uygulamasının sürekli çalışması için Windows Service olarak kurmalısınız:

```powershell
# NSSM ile service kur (Yönetici olarak çalıştırın)
.\install-nssm-service.bat
```

Service kurulduktan sonra:
- Next.js arka planda port 5058'de çalışacak
- IIS bu porta proxy yapacak

**Manuel NSSM Kurulumu:**

```batch
nssm install "HillsideCRMPortal" "C:\Program Files\nodejs\node.exe" "C:\inetpub\crm-portal\node_modules\next\dist\bin\next" start

nssm set "HillsideCRMPortal" AppDirectory "C:\inetpub\crm-portal"
nssm set "HillsideCRMPortal" AppEnvironmentExtra NODE_ENV=production PORT=5058
nssm set "HillsideCRMPortal" DisplayName "Hillside CRM Portal"
nssm set "HillsideCRMPortal" Start SERVICE_AUTO_START

nssm start "HillsideCRMPortal"
```

### Adım 5: IIS Site Oluşturun

#### 5.1 IIS Manager'da Yeni Site

1. IIS Manager'ı açın (`inetmgr`)
2. Sites'a sağ tıklayın → "Add Website"
3. Ayarlar:
   - **Site name:** Hillside CRM Portal
   - **Physical path:** `C:\inetpub\crm-portal`
   - **Binding:**
     - Type: http
     - IP address: All Unassigned
     - Port: 80 (veya istediğiniz port)
     - Host name: (boş bırakabilir veya domain adı girebilirsiniz)

#### 5.2 Application Pool Ayarları

1. Application Pools'a gidin
2. Sitenizin application pool'una sağ tıklayın → Basic Settings
3. Ayarlar:
   - **.NET CLR Version:** No Managed Code
   - **Managed pipeline mode:** Integrated

### Adım 6: Firewall Ayarları

Port 5058 ve IIS portunu (80/443) açın:

```powershell
# Port 5058 (Next.js)
New-NetFirewallRule -DisplayName "Next.js CRM Portal" -Direction Inbound -LocalPort 5058 -Protocol TCP -Action Allow

# Port 80 (IIS)
New-NetFirewallRule -DisplayName "IIS HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# Port 443 (HTTPS - opsiyonel)
New-NetFirewallRule -DisplayName "IIS HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

### Adım 7: Test Edin

1. Service'in çalıştığını kontrol edin:
```powershell
nssm status HillsideCRMPortal
# OUTPUT: SERVICE_RUNNING olmalı
```

2. Next.js'in doğrudan erişilebilir olduğunu test edin:
```
http://localhost:5058
```

3. IIS üzerinden erişimi test edin:
```
http://localhost
# veya
http://sunucu-ip-adresi
```

---

## Troubleshooting

### Problem: IIS 502 Bad Gateway

**Çözüm:**
- Next.js service'inin çalıştığını kontrol edin: `nssm status HillsideCRMPortal`
- Service'i restart edin: `nssm restart HillsideCRMPortal`
- Port 5058'in açık olduğunu kontrol edin: `netstat -ano | findstr :5058`

### Problem: Static dosyalar yüklenmiyor

**Çözüm:**
- `web.config` dosyasının doğru konumda olduğundan emin olun
- IIS sitesinin physical path'inin doğru olduğunu kontrol edin
- URL Rewrite modülünün kurulu olduğunu kontrol edin

### Problem: Service başlamıyor

**Çözüm:**
- Log dosyalarını kontrol edin: `C:\inetpub\crm-portal\logs\`
- Event Viewer'ı kontrol edin: `eventvwr.msc`
- Node.js path'ini kontrol edin: `where node`
- Manuel başlatmayı deneyin:
```powershell
cd C:\inetpub\crm-portal
$env:PORT=5058; $env:NODE_ENV="production"; npm start
```

### Problem: Port 5058 zaten kullanımda

**Çözüm:**
```powershell
# Portu kullanan process'i bulun
netstat -ano | findstr :5058

# Process'i öldürün
Stop-Process -Id <PID> -Force
```

---

## Maintenance

### Service Yönetimi

```powershell
# Başlat
nssm start HillsideCRMPortal

# Durdur
nssm stop HillsideCRMPortal

# Restart
nssm restart HillsideCRMPortal

# Durum
nssm status HillsideCRMPortal

# Kaldır
.\uninstall-nssm-service.bat
```

### IIS Site Yönetimi

```powershell
# Site'ı başlat
Start-WebSite -Name "Hillside CRM Portal"

# Site'ı durdur
Stop-WebSite -Name "Hillside CRM Portal"

# Site durumunu kontrol et
Get-WebSite -Name "Hillside CRM Portal"
```

### Log Dosyaları

- **Service Logs:** `C:\inetpub\crm-portal\logs\`
- **IIS Logs:** `C:\inetpub\logs\LogFiles\`
- **Event Viewer:** Windows Logs → Application

---

## SSL/HTTPS Kurulumu (Opsiyonel)

### Adım 1: SSL Sertifikası Alın

- Let's Encrypt (ücretsiz)
- Ticari SSL sertifikası

### Adım 2: IIS'e Sertifikayı Yükleyin

1. IIS Manager → Server Certificates
2. Import sertifikayı
3. Site bindings'e HTTPS ekleyin (port 443)

### Adım 3: HTTP'den HTTPS'e Yönlendirme

`web.config` dosyasına ekleyin:

```xml
<rule name="HTTP to HTTPS redirect" stopProcessing="true">
  <match url="(.*)" />
  <conditions>
    <add input="{HTTPS}" pattern="off" ignoreCase="true" />
  </conditions>
  <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
</rule>
```

---

## Performans İyileştirmeleri

### IIS Output Caching

```xml
<system.webServer>
  <caching enabled="true" enableKernelCache="true">
    <profiles>
      <add extension=".js" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" />
      <add extension=".css" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" />
    </profiles>
  </caching>
</system.webServer>
```

### Compression

```xml
<system.webServer>
  <urlCompression doStaticCompression="true" doDynamicCompression="true" />
</system.webServer>
```

---

## Özet

✅ IIS modüllerini yükleyin (URL Rewrite, ARR)
✅ Dosyaları `C:\inetpub\crm-portal`'a kopyalayın
✅ `npm install && npm run build`
✅ NSSM ile service kurun (port 5058)
✅ IIS site oluşturun
✅ Firewall portlarını açın
✅ Test edin

**Sorun mu yaşıyorsunuz?** Troubleshooting bölümüne bakın veya log dosyalarını kontrol edin.
