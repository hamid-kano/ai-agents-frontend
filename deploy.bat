@echo off
echo ========================================
echo   Full Deployment Pipeline
echo ========================================
echo.

REM Step 1: Build Frontend
echo [1/4] Building Next.js Frontend...

REM Update config for production
(
echo const nextConfig = {
echo   output: 'export',
echo   images: {
echo     unoptimized: true
echo   },
echo   basePath: '',
echo   assetPrefix: '',
echo };
echo.
echo export default nextConfig;
) > next.config.ts

REM Update .env for production
(
echo NEXT_PUBLIC_API_URL=https://lightslategrey-gorilla-734246.hostingersite.com
) > .env.local

call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

REM Step 2: Deploy to Laravel
echo.
echo [2/4] Deploying to Laravel public folder...
xcopy /E /I /Y out\* ..\ai-agents\public\

REM Step 3: Update Laravel .htaccess
echo.
echo [3/4] Updating Laravel .htaccess...
cd ..\ai-agents\public
(
echo ^<IfModule mod_rewrite.c^>
echo     RewriteEngine On
echo.
echo     RewriteCond %%{REQUEST_FILENAME} -f
echo     RewriteRule ^ - [L]
echo.
echo     RewriteRule ^api/^(.*^)$ index.php [L]
echo.
echo     RewriteCond %%{REQUEST_FILENAME} !-d
echo     RewriteRule ^ index.php [L]
echo ^</IfModule^>
) > .htaccess

cd ..\..\ai-agents-frontend

echo.
echo [4/4] Ready for upload!
echo ========================================
echo.
echo Now upload ai-agents folder to hosting
echo.
pause
