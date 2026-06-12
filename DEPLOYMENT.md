# 🚀 Deployment Guide for SciReader

Complete step-by-step instructions to get SciReader live on GitHub Pages.

## Prerequisites

- GitHub account (free)
- Git installed on your computer
- Text editor (VS Code, etc.)

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `scireader`
3. Description: "Open-source PDF to audio reader for scientific papers"
4. Choose public (to host on GitHub Pages)
5. Click **Create repository**

## Step 2: Clone and Add Files

```bash
# Clone the repository
git clone https://github.com/yourusername/scireader.git
cd scireader

# Copy all files from this project into the directory
# Files needed:
# - index.html
# - app.jsx
# - styles.css
# - sw.js
# - manifest.json
# - package.json
# - README.md
# - CONTRIBUTING.md
# - .gitignore
# - .github/workflows/deploy.yml

# Stage files
git add .

# Create initial commit
git commit -m "🚀 Initial commit: SciReader PWA"

# Push to GitHub
git push -u origin main
```

## Step 3: Update Paths for Your Username

Open files and replace `yourusername` with your actual GitHub username:

### In `manifest.json`:
```json
"start_url": "https://yourusername.github.io/scireader/",
"scope": "https://yourusername.github.io/scireader/"
```

### In `package.json`:
```json
"homepage": "https://yourusername.github.io/scireader/",
"repository": {
  "url": "https://github.com/yourusername/scireader.git"
}
```

### In `README.md`:
```markdown
Visit: https://yourusername.github.io/scireader/
```

After updating, commit and push:
```bash
git add .
git commit -m "📝 Update paths for GitHub Pages"
git push
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll to **"GitHub Pages"** section
4. Under "Source":
   - Select **"Deploy from a branch"**
   - Branch: **main** (or master)
   - Folder: **/ (root)**
5. Click **Save**

GitHub will show your site URL like:
```
https://yourusername.github.io/scireader/
```

## Step 5: Verify Deployment

1. Wait 1-2 minutes for GitHub Pages to build
2. Check the **Deployments** tab in your repo
3. Click the green checkmark next to "github-pages"
4. Visit your URL to test

## Step 6: Test All Features

### ✅ Check Installation
- [ ] Site loads correctly
- [ ] All files load (no 404 errors)
- [ ] Service Worker registers (check DevTools > Application > Service Workers)
- [ ] Manifest loads (Application > Manifest)

### ✅ Test Functionality
- [ ] Can upload a PDF
- [ ] Text extraction works
- [ ] Voices appear in dropdown
- [ ] Audio plays without errors
- [ ] Speed control works
- [ ] Page navigation works
- [ ] Progress saves (check localStorage in DevTools)

### ✅ Test PWA
- [ ] Can install app (browser prompts or menu)
- [ ] App opens standalone
- [ ] Works offline (disconnect internet)
- [ ] Icon displays correctly

## Step 7: Optional Customization

### Add a Custom Domain (Optional)
1. Go to Settings > Pages
2. Under "Custom domain", enter your domain
3. Follow DNS setup instructions

### Enable HTTPS (Automatic)
- GitHub Pages automatically provides free HTTPS
- Your app is secure out of the box ✅

### Add Branch Protection (Optional)
1. Settings > Branches
2. Add rule for "main"
3. Require PR reviews before merging
4. Protect against accidental deployments

## Step 8: Make Updates

Every time you update files:

```bash
# Make your changes...

# Stage changes
git add .

# Commit with descriptive message
git commit -m "✨ Add feature description"

# Push to GitHub
git push
```

GitHub Actions automatically:
- Validates your files
- Deploys to GitHub Pages
- Updates your live site (within 1 minute)

## 🐛 Troubleshooting

### Site not loading?
```bash
# Check if files exist
ls -la *.html
ls -la *.js
ls -la *.json

# Verify correct branch is deployed
# Go to Settings > Pages > Source
```

### 404 errors for files?
- Make sure files are in root directory (not in subdirectories)
- Check file names are spelled correctly
- Check `<script src="">` paths in HTML

### Service Worker not registering?
- Ensure site is served over HTTPS (GitHub Pages provides this)
- Check browser console for errors (F12 > Console)
- Clear browser cache

### PDF upload not working?
- Check browser supports File API
- Verify PDF.js CDN is accessible
- Check console for CORS errors

### No voices available?
- Voices depend on OS (macOS has more than Windows)
- Check system has TTS installed
- Try different browser

## 📊 Monitoring Your Site

### GitHub Pages Status
1. Go to your repo
2. Check **Deployments** tab
3. Each deployment shows status and time

### Build Logs
1. Click the **workflow run** (yellow/green circle)
2. View build output and any errors

### Analytics (with Google Analytics - Optional)
1. Get Google Analytics ID
2. Add to index.html before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

## 🚀 Performance Tips

### Optimize Load Time
- All files are static - CDN cached
- No database queries
- Minimal dependencies
- Fast initial load ⚡

### Check Performance
1. Visit your site
2. Press F12 (DevTools)
3. Go to **Lighthouse** tab
4. Click **Analyze page load**

## 🔒 Security Checklist

- ✅ HTTPS enabled (GitHub Pages provides)
- ✅ No API keys in code
- ✅ No external API calls needed
- ✅ Service Worker validates URLs
- ✅ Content Security Policy friendly

## 📤 Share Your Project

Once deployed, share it:

```markdown
# Share on Social Media
Check out SciReader: https://yourusername.github.io/scireader/
An open-source PDF to audio reader for scientific papers! 📖

# GitHub README Badge
[![SciReader](https://img.shields.io/badge/Try-SciReader-blue)](https://yourusername.github.io/scireader/)

# Reddit/Forums
Built an open-source PDF to audio reader using Web Speech API!
No tracking, works offline, and it's completely free.
```

## 🎉 You're Live!

Congratulations! Your SciReader is now live at:
```
https://yourusername.github.io/scireader/
```

### Next Steps:
- [ ] Share with friends and colleagues
- [ ] Open GitHub issues for improvements
- [ ] Accept pull requests from community
- [ ] Monitor deployment status
- [ ] Celebrate! 🎊

## 📞 Need Help?

- GitHub Issues: https://github.com/yourusername/scireader/issues
- GitHub Discussions: https://github.com/yourusername/scireader/discussions
- Check GitHub Pages docs: https://pages.github.com/

## 🔄 Continuous Deployment

Every push to `main` branch:
1. GitHub Actions runs `deploy.yml` workflow
2. Validates files
3. Deploys to GitHub Pages
4. Site updates automatically in ~1 minute

No manual deployment needed! 🚀

---

**Total setup time**: ~10 minutes
**Ongoing maintenance**: Minimal
**Cost**: Free! 💰

Happy hosting! 🎉
