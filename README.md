# 📖 SciReader - PDF to Audio

An open-source, privacy-first PWA that converts scientific PDFs to natural-sounding audio. Perfect for reading research papers while multitasking.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![PWA: Yes](https://img.shields.io/badge/PWA-Yes-blue.svg)

## ✨ Features

- **📄 PDF Support**: Upload and read any PDF file
- **🔊 Natural Voices**: Uses Web Speech API with high-quality system voices
- **⚡ Speed Control**: Adjust playback speed from 0.5x to 2x
- **🌐 Works Offline**: Service Worker caching for offline reading
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **📍 Progress Saving**: Automatically saves your reading progress
- **🎯 Scientific Focus**: Designed specifically for research papers and textbooks
- **🔒 Privacy First**: All processing happens in your browser - no server uploads
- **✨ No Dependencies**: Minimal external dependencies, fast and lightweight

## 🚀 Getting Started

### Online (No Installation)
Visit the hosted version at: `https://yourusername.github.io/scireader/`

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/scireader.git
cd scireader

# Start a local server
python -m http.server 8000
# or
npx serve

# Open in browser
http://localhost:8000
```

### Install as PWA
1. Open SciReader in your browser
2. Click the "Install" button (appears in address bar or menu)
3. Or use "Add to Home Screen" on mobile
4. Launch from your home screen or app drawer

## 📖 Usage

1. **Upload PDF**: Click "Choose PDF" and select a PDF file
2. **Select Voice**: Choose from available system voices (English, Spanish, French, etc.)
3. **Adjust Speed**: Use the speed slider (0.5x - 2.0x)
4. **Play**: Click "Play Page" to start listening
5. **Navigate**: Use next/previous buttons or the page slider
6. **Your Progress**: Reading position saves automatically

## 🎤 Available Voices

SciReader uses your system's installed voices through the Web Speech API. Available voices depend on your operating system:

- **macOS/iOS**: Excellent English, Spanish, French, German voices
- **Windows**: Quality varies by Windows edition
- **Linux**: Fewer voices available
- **Android**: Depends on installed TTS engines
- **iOS**: Excellent voice quality with multiple languages

**Recommended for Science**: English US, English GB, or German voices for best technical term pronunciation.

## 🛠️ Technical Stack

- **Frontend**: React 18 (CDN)
- **PDF Processing**: PDF.js
- **Text-to-Speech**: Web Speech API
- **State Management**: React Hooks
- **PWA**: Service Worker + Web App Manifest
- **Styling**: Vanilla CSS with design system

## 📦 File Structure

```
scireader/
├── index.html           # Main HTML with PWA setup
├── app.jsx              # React app component
├── styles.css           # Complete styling
├── sw.js                # Service Worker
├── manifest.json        # PWA manifest
├── package.json         # Project metadata
├── README.md            # This file
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Pages auto-deploy
```

## 🚀 Deployment to GitHub Pages

### Step 1: Prepare Your Repository
```bash
# Create new repo on GitHub (yourusername/scireader)
git init
git add .
git commit -m "Initial commit: SciReader PWA"
git branch -M main
git remote add origin https://github.com/yourusername/scireader.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "GitHub Pages"
3. Select "Deploy from a branch"
4. Choose `main` branch and `root` folder
5. Save

### Step 3: Update manifest.json
Replace `yourusername` with your actual GitHub username in:
- `manifest.json`: `"start_url"` and `"scope"`
- `package.json`: `"homepage"`

### Step 4: Deploy
Push changes to main branch - GitHub will automatically deploy.

Your app is now live at: `https://yourusername.github.io/scireader/`

## 🔧 Configuration

### Customize Voice Default
Edit `app.jsx`:
```javascript
const [selectedVoice, setSelectedVoice] = useState(1); // Change default voice
```

### Change Speed Range
Edit `app.jsx`:
```javascript
<input type="range" min="0.5" max="3" step="0.1" /> // Extend to 3x
```

### Customize Colors
Edit `styles.css`:
```css
--color-navy: #1a3a52;      /* Header background */
--color-accent: #d46b3a;    /* Button accent */
--color-light-bg: #f8f7f4;  /* Page background */
```

## ♿ Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Full keyboard navigation
- ✅ Semantic HTML
- ✅ Screen reader compatible
- ✅ High contrast colors
- ✅ Respects `prefers-reduced-motion`

## 🔒 Privacy & Security

- ✅ All processing happens locally in your browser
- ✅ No server uploads or tracking
- ✅ No cookies or analytics
- ✅ PDFs never leave your device
- ✅ HTTPS-only when deployed
- ✅ Open source - audit the code

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md)

### Contributions Welcome:
- 🐛 Bug fixes
- ✨ New features
- 🎨 Design improvements
- 📝 Documentation
- 🌍 Translations
- ♿ Accessibility improvements

## 📋 Roadmap

- [ ] Dictionary/terminology lookup
- [ ] Bookmark specific passages
- [ ] Highlight important text
- [ ] Export notes
- [ ] Dark mode
- [ ] Multiple language support in UI
- [ ] Sync across devices
- [ ] Citation export (BibTeX, APA)
- [ ] Search within PDF
- [ ] Annotation support

## 🐛 Known Limitations

1. **Voice Quality**: Limited by system voices; some devices have better TTS than others
2. **Font-based Content**: May struggle with PDFs containing unusual fonts
3. **OCR**: Non-text PDFs (scanned images) won't work without OCR
4. **Large Files**: Very large PDFs (1000+ pages) may be slow to load
5. **Languages**: Voice availability varies by OS and language

## 📚 Use Cases

- 📖 **Research Papers**: Read academic journals while exercising
- 🎓 **Textbooks**: Study books with audio reinforcement
- 📰 **Technical Articles**: Catch up on tech blogs while commuting
- 🧪 **Lab Documentation**: Review protocols hands-free
- 📊 **Data Reports**: Understand complex data while working
- 🌍 **Language Learning**: Practice technical vocabulary in other languages

## ⚖️ License

MIT License - See [LICENSE](LICENSE) file for details

**You are free to:**
- Use commercially
- Modify and distribute
- Use privately
- Use with patent grant

**You must:**
- Include license and copyright notice

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF processing
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - Text-to-speech
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/scireader/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/scireader/discussions)
- **Email**: support@example.com

## 🌟 Show Your Support

If SciReader helps with your research, please consider:
- ⭐ Starring the repo
- 🐦 Sharing on social media
- 💬 Contributing improvements
- 🐛 Reporting bugs
- 💡 Suggesting features

---

Made with ❤️ for scientists and scholars everywhere.

**Version**: 1.0.0 | **Last Updated**: 2024 | **Maintained**: Yes
