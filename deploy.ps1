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
Write-Host "`n[3/4] Copying to Laravel public..." -ForegroundColor Yellow
Copy-Item -Path "out\*" -Destination "..\ai-agents\public\" -Recurse -Force

# Step 4: Update .htaccess
Write-Host "`n[4/4] Updating .htaccess..." -ForegroundColor Yellow
$htaccess = @"
<IfModule mod_rewrite.c>
    RewriteEngine On

    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule ^ - [L]

    RewriteRule ^api/(.*)$ index.php [L]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.php [L]
</IfModule>
"@
Set-Content -Path "..\ai-agents\public\.htaccess" -Value $htaccess

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`nNow upload ai-agents folder to hosting`n" -ForegroundColor White

Read-Host "Press Enter to exit"
