# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Jacob Tan, showcasing projects, education, certificates, and contact information. The site is built with vanilla HTML, CSS, and JavaScript with no frameworks or build tools required for basic development.

**Tech Stack**: HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript, Font Awesome icons, Google Fonts (Inter & JetBrains Mono)

## Common Commands

### Development
```bash
npm run dev          # Start dev server at http://localhost:3030 (auto-opens browser)
npm start            # Start dev server without auto-opening browser
```

### Build & Package
```bash
npm run build        # Full production build (cleans, minifies HTML/CSS/JS)
npm run package      # Build + create distributable package folder
npm run package:zip  # Build + package + create zip file
npm run preview      # Preview production build at http://localhost:3030
```

### Individual Build Steps
```bash
npm run build:clean  # Remove and recreate dist/ folder
npm run build:html   # Minify HTML to dist/
npm run build:css    # Minify CSS with csso to dist/
npm run build:js     # Minify & compress JS with terser to dist/
```

**Note**: Build commands use Windows-specific syntax (`if exist`, `rmdir /s /q`). On Unix systems, modify `build:clean` script.

## Architecture

### File Structure
- **index.html**: Single-page layout with sections (hero, about, projects, education, certificates, contact)
- **styles.css**: All styling with CSS custom properties for theming; uses Grid/Flexbox for layouts
- **script.js**: Interactive features (smooth scrolling, mobile menu, typing animation, form validation, notifications, cursor glow, intersection observers)
- **resume.html**: Separate resume page (download link in contact section points to `resume.pdf`)
- **create-package.js**: Node script that copies minified files to `jacob-tan-portfolio/` folder with package.json and README
- **create-zip.js**: Creates compressed distribution archive
- **dist/**: Production build output (minified files)

### Key JavaScript Features
- **Smooth scrolling** navigation with active link highlighting
- **Mobile menu** toggle (hamburger)
- **Typing animation** on hero title using `typeWriter()` function
- **Cursor glow effect** follows mouse movement
- **Intersection Observer** for scroll-triggered animations on project cards, certificates, timeline items
- **Counter animation** for stats section (animates numbers on scroll into view)
- **Form validation** with notification system (currently frontend-only simulation)
- **Particle background** effect (optional floating particles)

### CSS Architecture
- **CSS Custom Properties** defined in `:root` for theming (colors, fonts, spacing, shadows)
- **Color scheme**: Dark theme with primary color `#00d9ff` (cyan), background `#0a0e1a`, surface colors with subtle variations
- **Typography**: Inter for body, JetBrains Mono for code elements
- **Responsive breakpoints**: Mobile-first design with media queries
- **Animations**: Smooth transitions, transform effects, keyframe animations for particles

### Contact Form
The contact form is **frontend-only** and simulates submission. To make it functional:
- Integrate with a backend service (e.g., FormSpree, Netlify Forms, custom API)
- Update form submission handler in `script.js` (line 169-206)

### Resume Download
The "Download Resume" button links to `resume.pdf` which should be placed in the root directory. Currently links to `resume.html` for preview.

## Customization Points

When updating portfolio content:
1. **Personal info**: Update name, email (`jtan.software@gmail.com`), LinkedIn (`jacob-tan-tech`) in `index.html`
2. **Projects section**: Replace placeholder project cards with actual projects (lines 180-260)
3. **Education timeline**: Modify institutions and dates (lines 270-300)
4. **Certificates grid**: Add real certifications (lines 309-342)
5. **Tech stack**: Update skills in About section (lines 128-152)
6. **Color theme**: Modify CSS variables in `styles.css` `:root` selector
7. **Resume**: Replace `resume.pdf` in root directory

## Notes
- No Git repository initialized (not version controlled by default)
- Contact form requires backend integration for actual email functionality
- Project images are placeholder icons; replace with actual screenshots
- All external dependencies loaded via CDN (Font Awesome, Google Fonts)