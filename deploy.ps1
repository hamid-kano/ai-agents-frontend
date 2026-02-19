Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Full Deployment Pipeline" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Update Next.js config
Write-Host "[1/4] Updating Next.js config..." -ForegroundColor Yellow

$nextConfig = @"
const nextConfig = {
  images: {
    unoptimized: true
  },
};

export default nextConfig;
"@
Set-Content -Path "next.config.ts" -Value $nextConfig

# Update .env for production
$envContent = "NEXT_PUBLIC_API_URL=https://lightslategrey-gorilla-734246.hostingersite.com"
Set-Content -Path ".env.local" -Value $envContent

# Step 2: Build
Write-Host "`n[2/4] Building Next.js..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Copy to Laravel
Write-Host "`n[3/4] Copying Next.js files..." -ForegroundColor Yellow
Copy-Item -Path ".next" -Destination "..\ai-agents\frontend\.next" -Recurse -Force
Copy-Item -Path "public" -Destination "..\ai-agents\frontend\public" -Recurse -Force
Copy-Item -Path "package.json" -Destination "..\ai-agents\frontend\" -Force
Copy-Item -Path "next.config.ts" -Destination "..\ai-agents\frontend\" -Force

# Step 4: Instructions
Write-Host "`n[4/4] Done!" -ForegroundColor Yellow

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`nNext.js requires Node.js server on Hostinger" -ForegroundColor Yellow
Write-Host "Upload ai-agents folder and run: npm install && npm start`n" -ForegroundColor White

Read-Host "Press Enter to exit"
