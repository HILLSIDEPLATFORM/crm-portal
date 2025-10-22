const { Service } = require('node-windows');
const path = require('path');

// Proje dizini
const projectPath = __dirname;
const nextBinPath = path.join(projectPath, 'node_modules', 'next', 'dist', 'bin', 'next');

// Service tanımı
const svc = new Service({
  name: 'Hillside CRM Portal',
  description: 'Hillside CRM Portal - Next.js Application',
  script: nextBinPath,
  scriptOptions: 'start',
  nodeOptions: [
    '--max_old_space_size=2048'
  ],
  env: [
    {
      name: "NODE_ENV",
      value: "production"
    },
    {
      name: "PORT",
      value: "3000"
    }
  ],
  workingDirectory: projectPath
});

// Service kurulum olayları
svc.on('install', function() {
  console.log('Service başarıyla kuruldu!');
  console.log('Service başlatılıyor...');
  svc.start();
});

svc.on('alreadyinstalled', function() {
  console.log('Service zaten kurulu!');
});

svc.on('start', function() {
  console.log('Service başarıyla başlatıldı!');
  console.log('Uygulama http://localhost:3000 adresinde çalışıyor');
  console.log('\nService yönetimi için:');
  console.log('- services.msc ile Windows Services\'i açın');
  console.log('- "Hillside CRM Portal" service\'ini bulun');
  console.log('- Start/Stop/Restart yapabilirsiniz');
});

svc.on('error', function(err) {
  console.error('Hata oluştu:', err);
});

// Service'i kur
console.log('Service kuruluyor...');
console.log('Proje dizini:', projectPath);
console.log('Next.js bin:', nextBinPath);
svc.install();
