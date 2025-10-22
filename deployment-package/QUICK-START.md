# ⚡ HIZLI BAŞLANGIÇ - Windows Server

## 📋 Ön Kontrol (5 dakika)

### 1. Node.js Kurulu mu?
PowerShell'de çalıştır:
```powershell
node --version
npm --version
```

**✅ Çıktı görüyorsan devam et**
**❌ Görmüyorsan:** https://nodejs.org/en → LTS indir ve kur

---

## 🚀 HIZLI KURULUM (10 dakika)

### Adım 1: Dosyaları Sunucuya Kopyala
```
Bu klasörün tümünü sunucuya kopyala:
📁 C:\inetpub\crm-portal\
```

### Adım 2: PowerShell'i Yönetici Olarak Aç
```
Başlat → PowerShell → Sağ Tık → Run as Administrator
```

### Adım 3: Proje Klasörüne Git
```powershell
cd C:\inetpub\crm-portal
```

### Adım 4: Tek Komutla Kur ve Başlat
```powershell
npm install && npm run build && node install-service.js
```
⏱️ 3-5 dakika sürer

### Adım 5: Tarayıcıda Aç
```
http://localhost:3000
```

---

## 🎯 BAŞARILI KURULUM

Login sayfasını görüyorsan **TAMAMDIR!** ✅

---

## 🔧 Yönetim

### Service'i Kontrol Et
```powershell
Get-Service -Name "hillsidecrmportal.exe"
```

### Service'i Restart Et
```powershell
Restart-Service -Name "hillsidecrmportal.exe"
```

### Başka Bilgisayarlardan Erişim İçin
```powershell
# Firewall'da port aç
New-NetFirewallRule -DisplayName "CRM Portal" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow

# Sunucu IP'si ile eriş
http://SUNUCU_IP:3000
```

---

## ❌ Sorun Yaşıyorsan

### Problem: Service başlamıyor
```powershell
# Event Viewer'da logları kontrol et
eventvwr.msc

# Windows Logs → Application → "hillsidecrmportal.exe" ara
```

### Problem: Port zaten kullanımda
```powershell
# Port 3000'i kim kullanıyor?
netstat -ano | findstr :3000

# İşlemi sonlandır
taskkill /PID <PID_NUMARASI> /F
```

### Problem: npm install hata veriyor
```powershell
# Cache temizle
npm cache clean --force

# Tekrar dene
npm install
```

---

## 📞 Detaylı Dokümantasyon

Daha fazla bilgi için: **DEPLOYMENT.md**

---

**Port:** 3000
**Service Adı:** Hillside CRM Portal
**Otomatik Başlangıç:** Evet ✅
