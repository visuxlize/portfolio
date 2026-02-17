# GitHub Pages Deployment Guide

This guide will walk you through the process of deploying Andres Marte's portfolio website to GitHub Pages.

## 🚀 Prerequisites

Before starting, ensure you have:
- A GitHub account
- Git installed on your computer
- Node.js and npm installed
- The portfolio project ready for deployment

## 📋 Step 1: Prepare Your Repository

### 1.1 Create a New GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `portfolio`
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 1.2 Clone and Push Your Code

```bash
# Navigate to your project directory
cd /path/to/your/portfolio

# Initialize git (if not already done)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/visuxlize/portfolio.git

# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit: Portfolio website"

# Push to GitHub
git push -u origin main
```

## 🛠️ Step 2: Configure GitHub Pages

### 2.1 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch (will be created automatically)
6. Click "Save"

### 2.2 Verify Configuration

Your `package.json` should already have the correct configuration:

```json
{
  "homepage": "https://visuxlize.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## 🚀 Step 3: Deploy Your Website

### 3.1 Build and Deploy

```bash
# Install dependencies (if not already done)
npm install

# Deploy to GitHub Pages
npm run deploy
```

This command will:
1. Build your React app for production
2. Create a `gh-pages` branch
3. Push the built files to GitHub
4. Make your site available at `https://visuxlize.github.io/portfolio`

### 3.2 Verify Deployment

1. Wait a few minutes for GitHub Pages to build your site
2. Go to `https://visuxlize.github.io/portfolio`
3. Your portfolio should be live!

## 🔧 Step 4: Custom Domain (Optional)

### 4.1 Purchase a Domain

If you want a custom domain (e.g., `andresmarte.com`):
1. Purchase a domain from a registrar (Namecheap, GoDaddy, etc.)
2. Note down your domain name

### 4.2 Configure Custom Domain

1. Go to your repository Settings > Pages
2. In the "Custom domain" field, enter your domain
3. Click "Save"
4. Check "Enforce HTTPS" (recommended)

### 4.3 DNS Configuration

Configure your domain's DNS settings:

**For Apex Domain (andresmarte.com):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For www Subdomain (www.andresmarte.com):**
```
Type: CNAME
Name: www
Value: visuxlize.github.io
```

### 4.4 Update package.json

Update your `package.json` homepage:

```json
{
  "homepage": "https://andresmarte.com"
}
```

## 🔄 Step 5: Continuous Deployment

### 5.1 Automatic Deployment

Every time you push changes to your main branch, you can automatically deploy:

```bash
# Make your changes
git add .
git commit -m "Update portfolio content"
git push origin main

# Deploy to GitHub Pages
npm run deploy
```

### 5.2 GitHub Actions (Optional)

For automatic deployment on every push, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## 📊 Step 6: Performance Optimization

### 6.1 Enable Compression

GitHub Pages automatically serves gzipped files, but you can optimize further:

1. Ensure your images are optimized
2. Use WebP format where possible
3. Implement lazy loading for images

### 6.2 SEO Optimization

1. Verify your meta tags are correct
2. Test with Google's Rich Results Test
3. Submit your sitemap to Google Search Console

## 🔍 Step 7: Testing Your Deployment

### 7.1 Cross-Browser Testing

Test your site on:
- Chrome
- Firefox
- Safari
- Edge

### 7.2 Mobile Testing

Test on:
- iPhone (Safari)
- Android (Chrome)
- Various screen sizes

### 7.3 Performance Testing

Use these tools:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

## 🚨 Troubleshooting

### Common Issues

**1. 404 Error**
- Ensure your repository is public
- Check that the gh-pages branch exists
- Verify the homepage URL in package.json

**2. Build Failures**
- Check for TypeScript errors
- Ensure all dependencies are installed
- Verify Node.js version compatibility

**3. Styling Issues**
- Clear browser cache
- Check if Tailwind CSS is building correctly
- Verify CSS imports

**4. Custom Domain Not Working**
- Wait up to 24 hours for DNS propagation
- Check DNS settings
- Verify HTTPS is enabled

### Debug Commands

```bash
# Check build output
npm run build

# Test locally
npm start

# Check git status
git status

# View deployment logs
npm run deploy --verbose
```

## 📈 Step 8: Analytics and Monitoring

### 8.1 Google Analytics

Add Google Analytics to track visitors:

1. Create a Google Analytics account
2. Get your tracking ID
3. Add the tracking code to your `public/index.html`

### 8.2 GitHub Pages Analytics

GitHub Pages provides basic analytics:
1. Go to repository Settings > Pages
2. Scroll down to "GitHub Pages site analytics"
3. Enable analytics

## 🎉 Success!

Your portfolio is now live at `https://visuxlize.github.io/portfolio`!

### Next Steps

1. **Share your portfolio** with recruiters and on social media
2. **Update content regularly** with new projects and skills
3. **Monitor performance** and user engagement
4. **Keep dependencies updated** for security and performance
5. **Backup your code** regularly

### Useful Links

- [GitHub Pages Documentation](https://pages.github.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Congratulations!** You now have a professional portfolio website that showcases your skills and is easily accessible to potential employers and clients.
