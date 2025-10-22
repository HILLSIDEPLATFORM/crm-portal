const { Service } = require('node-windows');
const path = require('path');

// Proje dizini
const projectPath = __dirname;
const nextBinPath = path.join(projectPath, 'node_modules', 'next', 'dist', 'bin', 'next');

// Service tanımı (uninstall için aynı bilgiler gerekli)
const svc = new Service({
  name: 'Hillside CRM Portal',
  script: nextBinPath,
});

// Service kaldırma olayları
svc.on('uninstall', function() {
  console.log('Service başarıyla kaldırıldı!');
  console.log('Uygulama artık Windows Service olarak çalışmıyor.');
});

svc.on('alreadyuninstalled', function() {
  console.log('Service zaten kaldırılmış!');
});

svc.on('error', function(err) {
  console.error('Hata oluştu:', err);
});

// Service'i kaldır
console.log('Service kaldırılıyor...');
svc.uninstall();
