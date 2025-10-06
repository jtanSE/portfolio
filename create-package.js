const fs = require('fs');
const path = require('path');

// Create distribution package
function createPackage() {
    console.log('📦 Creating secure distribution package...');

    // Create package directory
    const packageDir = path.join(__dirname, 'jacob-tan-portfolio');
    if (fs.existsSync(packageDir)) {
        fs.rmSync(packageDir, { recursive: true });
    }
    fs.mkdirSync(packageDir);

    // Copy minified files
    fs.copyFileSync(
        path.join(__dirname, 'dist', 'index.html'),
        path.join(packageDir, 'index.html')
    );
    fs.copyFileSync(
        path.join(__dirname, 'dist', 'styles.css'),
        path.join(packageDir, 'styles.css')
    );
    fs.copyFileSync(
        path.join(__dirname, 'dist', 'script.js'),
        path.join(packageDir, 'script.js')
    );

    // Create a simple package.json for the distribution
    const distPackageJson = {
        "name": "jacob-tan-portfolio",
        "version": "1.0.0",
        "description": "Jacob Tan's Portfolio Website",
        "main": "index.html",
        "scripts": {
            "start": "npx http-server -p 3030 -o",
            "serve": "npx http-server -p 3030"
        },
        "author": "Jacob Tan",
        "license": "MIT"
    };

    fs.writeFileSync(
        path.join(packageDir, 'package.json'),
        JSON.stringify(distPackageJson, null, 2)
    );

    // Create README for the package
    const packageReadme = `# Jacob Tan - Portfolio Website

A professional portfolio website showcasing Jacob Tan's work, education, and skills.

## Quick Start

1. Install Node.js if you haven't already
2. Open terminal/command prompt in this folder
3. Run: \`npm start\`
4. Your portfolio will open at http://localhost:3030

## Alternative Method

If you have Node.js installed globally:
\`\`\`bash
npx http-server -p 3030 -o
\`\`\`

## Files

- \`index.html\` - Main portfolio page (minified)
- \`styles.css\` - Stylesheet (minified & optimized)
- \`script.js\` - Interactive features (minified & obfuscated)

## Features

- Responsive design for all devices
- Modern tech-focused styling
- Smooth animations and interactions
- Contact form with validation
- Project showcase
- Education timeline
- Skills display

---
© 2024 Jacob Tan. All rights reserved.

> Note: This is a production build with minified/optimized code for performance and security.
`;

    fs.writeFileSync(
        path.join(packageDir, 'README.md'),
        packageReadme
    );

    // Create a simple .gitignore
    fs.writeFileSync(
        path.join(packageDir, '.gitignore'),
        'node_modules/\n.DS_Store\n'
    );

    console.log('✅ Package created successfully!');
    console.log(`📁 Location: ${packageDir}`);
    console.log('📋 Contents:');
    console.log('   - index.html (minified)');
    console.log('   - styles.css (minified)');
    console.log('   - script.js (minified & obfuscated)');
    console.log('   - package.json');
    console.log('   - README.md');
    console.log('');
    console.log('🚀 To test the package:');
    console.log(`   cd ${path.basename(packageDir)}`);
    console.log('   npm start');
}

// Run the packaging
createPackage();