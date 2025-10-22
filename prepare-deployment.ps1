# Deployment Paketi Hazırlama
Write-Host "Deployment paketi hazirlaniyor..." -ForegroundColor Green

$deploymentPath = ".\deployment-package"

# Eski klasoru sil
if (Test-Path $deploymentPath) {
    Remove-Item $deploymentPath -Recurse -Force
}

# Yeni klasor olustur
New-Item -Path $deploymentPath -ItemType Directory | Out-Null

# Dosyalari kopyala
Copy-Item -Path "src" -Destination $deploymentPath -Recurse -Force
Copy-Item -Path "public" -Destination $deploymentPath -Recurse -Force
Copy-Item -Path "package.json" -Destination $deploymentPath -Force
Copy-Item -Path "next.config.ts" -Destination $deploymentPath -Force
Copy-Item -Path "tsconfig.json" -Destination $deploymentPath -Force
Copy-Item -Path "tailwind.config.ts" -Destination $deploymentPath -Force
Copy-Item -Path "postcss.config.mjs" -Destination $deploymentPath -Force
Copy-Item -Path "install-service.js" -Destination $deploymentPath -Force
Copy-Item -Path "uninstall-service.js" -Destination $deploymentPath -Force
Copy-Item -Path "DEPLOYMENT.md" -Destination $deploymentPath -Force
Copy-Item -Path "QUICK-START.md" -Destination $deploymentPath -Force

Write-Host "Paket hazir: $deploymentPath" -ForegroundColor Yellow
Write-Host "Bu klasoru sunucuya kopyalayabilirsiniz." -ForegroundColor Green
