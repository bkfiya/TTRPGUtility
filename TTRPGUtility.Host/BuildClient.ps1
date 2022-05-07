cd ../client
npm run build
Copy-Item "./build/*" -Destination "../TTRPGUtility.Host/wwwroot" -Recurse -force
cd ../TTRPGUtility.Host