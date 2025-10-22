# Windows Server Deployment Rehberi - Hillside CRM Portal

## Gereksinimler
- Windows Server 2016 veya üzeri
- Node.js 18.x veya 20.x (LTS)
- Yönetici (Administrator) yetkisi

---

## ADIM 1: Node.js Kurulumu

### 1.1. Node.js İndir ve Kur
1. https://nodejs.org/en adresine git
2. **LTS** versiyonunu indir (Windows Installer .msi)
3. İndirilen .msi dosyasını çalıştır
4. Kurulum sihirbazında tüm varsayılan ayarları kabul et
5. "Automatically install necessary tools" seçeneğini işaretle

### 1.2. Kurulumu Doğrula
PowerShell'i aç ve çalıştır:
```powershell
node --version
npm --version
```
Versiyonları görüyorsan kurulum başarılı!

---

## ADIM 2: Proje Dosyalarını Sunucuya Aktar

### 2.1. Proje Klasörü Oluştur
```powershell
# Örnek: C:\inetpub\crm-portal
New-Item -Path "C:\inetpub\crm-portal" -ItemType Directory -Force
```

### 2.2. Dosyaları Kopyala
Aşağıdaki dosya ve klasörleri C:\inetpub\crm-portal içine kopyala:

**Gerekli Dosyalar:**
- ✅ src/ klasörü (tüm kaynak kodlar)
- ✅ public/ klasörü (statik dosyalar)
- ✅ package.json
- ✅ package-lock.json
- ✅ next.config.ts
- ✅ tsconfig.json
- ✅ tailwind.config.ts
- ✅ postcss.config.mjs
- ✅ install-service.js
- ✅ uninstall-service.js

**KOPYALAMA gerekmeyenler:**
- ❌ node_modules/
- ❌ .next/
- ❌ .git/

---

## ADIM 3: Dependencies Kurulumu ve Build

### 3.1. PowerShell'i Yönetici Olarak Aç
- Başlat menüsünde "PowerShell" ara
- Sağ tıkla → "Run as Administrator" seç

### 3.2. Proje Klasörüne Git
```powershell
cd C:\inetpub\crm-portal
```

### 3.3. Dependencies'leri Kur
```powershell
npm install
```
⏱️ Bu işlem 2-3 dakika sürer.

### 3.4. Production Build Yap
```powershell
npm run build
```
⏱️ Bu işlem 30-60 saniye sürer.

✅ Başarılı olursa "Compiled successfully" mesajı göreceksin.

---

## ADIM 4: Windows Service Kurulumu

### 4.1. node-windows Kur
```powershell
npm install node-windows --save-dev
```

### 4.2. Service'i Kur
```powershell
node install-service.js
```

✅ Başarılı mesaj:
```
Service başarıyla kuruldu!
Service başlatılıyor...
Service başarıyla başlatıldı!
Uygulama http://localhost:3000 adresinde çalışıyor
```

---

## ADIM 5: Service'i Başlat ve Kontrol Et

### 5.1. Windows Services'i Aç
1. `Win + R` tuşuna bas
2. `services.msc` yaz ve Enter'a bas
3. Listede **"Hillside CRM Portal"** service'ini bul

### 5.2. Service'i Başlat
1. Service'e sağ tıkla
2. **"Start"** seç
3. Status: "Running" olmalı

### 5.3. Tarayıcıda Test Et
```
http://localhost:3000
```

---

## ADIM 6: Firewall Ayarları (İsteğe Bağlı)

Eğer başka bilgisayarlardan erişim istiyorsan:

### 6.1. Port 3000'i Aç
```powershell
New-NetFirewallRule -DisplayName "CRM Portal" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

### 6.2. Sunucu IP'si ile Erişim
```
http://SUNUCU_IP_ADRESI:3000
```

---

## ADIM 7: Farklı Port Kullanma (İsteğe Bağlı)

Varsayılan port 3000 yerine başka port kullanmak için:

### 7.1. install-service.js Düzenle
`install-service.js` dosyasını aç ve şu satırı değiştir:
```javascript
{
  name: "PORT",
  value: "8080"  // İstediğin portu yaz
}
```

### 7.2. Service'i Yeniden Kur
```powershell
# Önce eski service'i kaldır
node uninstall-service.js

# Yeni ayarlarla kur
node install-service.js
```

---

## YÖNETİM KOMUTLARI

### PowerShell (Yönetici olarak)
```powershell
# Durumu kontrol et
Get-Service -Name "hillsidecrmportal.exe"

# Başlat
Start-Service -Name "hillsidecrmportal.exe"

# Durdur
Stop-Service -Name "hillsidecrmportal.exe"

# Restart
Restart-Service -Name "hillsidecrmportal.exe"
```

### Service'i Kaldırma
```powershell
node uninstall-service.js
```

---

## SORUN GİDERME

### Problem: "Service başlamıyor"
**Çözüm:**
1. Event Viewer'ı aç: `Win + R` → `eventvwr.msc`
2. Windows Logs → Application
3. "hillsidecrmportal.exe" ile ilgili hataları bul

### Problem: "Port zaten kullanımda"
**Çözüm:**
```powershell
# Port 3000'i kullanan işlemi bul
netstat -ano | findstr :3000

# İşlemi sonlandır (PID'yi kullan)
taskkill /PID <PID_NUMARASI> /F
```

### Problem: "npm install hata veriyor"
**Çözüm:**
```powershell
# Cache temizle
npm cache clean --force

# Tekrar dene
npm install
```

---

## BAŞARILI KURULUM KONTROL LİSTESİ

- [ ] Node.js kuruldu (node --version çalışıyor)
- [ ] Proje dosyaları sunucuya kopyalandı
- [ ] npm install tamamlandı
- [ ] npm run build başarılı oldu
- [ ] Windows Service kuruldu
- [ ] Service "Running" durumda
- [ ] http://localhost:3000 çalışıyor
- [ ] Tarayıcıda login sayfası görünüyor

---

## GÜVENLİK ÖNERİLERİ

1. **Firewall:** Sadece gerekli portları aç
2. **Updates:** Windows ve Node.js güncellemelerini düzenli yap
3. **Backup:** Proje klasörünü düzenli yedekle
4. **SSL:** Üretim için SSL sertifikası kullan (IIS Reverse Proxy ile)

---

## İLETİŞİM VE DESTEK

Sorun yaşarsan:
1. Event Viewer loglarını kontrol et
2. Service loglarına bak (daemon klasöründe)
3. PowerShell'de `Get-Service` ile durumu kontrol et

---

**Son Güncelleme:** 2025-10-16
**Versiyon:** 1.0
