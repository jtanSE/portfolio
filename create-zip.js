const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Creating ZIP package for distribution...');

try {
    // Create the ZIP file using PowerShell (Windows)
    const sourceDir = path.join(__dirname, 'jacob-tan-portfolio');
    const zipFile = path.join(__dirname, 'jacob-tan-portfolio.zip');

    // Remove existing zip if it exists
    if (fs.existsSync(zipFile)) {
        fs.unlinkSync(zipFile);
    }

    // Create ZIP using PowerShell
    const powershellCommand = `Compress-Archive -Path "${sourceDir}\\*" -DestinationPath "${zipFile}"`;
    execSync(`powershell -Command "${powershellCommand}"`, { stdio: 'inherit' });

    console.log('✅ ZIP package created successfully!');
    console.log(`📁 Location: ${zipFile}`);
    console.log('');
    console.log('🎯 Distribution Instructions:');
    console.log('1. Send the jacob-tan-portfolio.zip file to anyone');
    console.log('2. They extract it to a folder');
    console.log('3. They run "npm start" in that folder');
    console.log('4. Portfolio opens at localhost:3030');
    console.log('');
    console.log('🔒 Security Features:');
    console.log('- HTML is minified (harder to read/modify)');
    console.log('- CSS is minified and optimized');
    console.log('- JavaScript is minified and obfuscated');
    console.log('- No source files included');
    console.log('- Production-ready build');

} catch (error) {
    console.error('❌ Error creating ZIP:', error.message);
    console.log('');
    console.log('💡 Alternative: You can manually zip the jacob-tan-portfolio folder');
}