# 🔧 How to Fix: 404 Errors & Missing Files

## ⚠️ The Problem

Your app shows "Error: undefined" because these files are missing (404):
- ❌ `app.jsx`
- ❌ `styles.css`
- ❌ `manifest.json`
- ❌ `sw.js`

Only `index.html` is loading, which is why you see the header but nothing works.

---

## ✅ The Solution

You have **TWO options**:

### **OPTION 1: Quick Fix via GitHub Web UI (5 minutes)**

This is the **easiest** if you don't have Git installed.

#### Step 1: Go to Your GitHub Repository
```
https://github.com/somdeepkundu/shruti2030
```

#### Step 2: Add Files via Web Upload

**For each file below**, do this:

1. Click **"Add file"** button (top right of file list)
2. Select **"Upload files"**
3. Drag & drop OR click to select the file
4. Wait for upload to complete
5. Click **"Commit changes"**

**Files to upload:**
- [ ] `app.jsx`
- [ ] `styles.css`
- [ ] `manifest.json`
- [ ] `sw.js`

#### Step 3: Wait & Refresh
- Wait 2-3 minutes for GitHub Pages to rebuild
- Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Visit: `https://somdeepkundu.github.io/shruti2030/`

---

### **OPTION 2: Using Git Command Line (10 minutes)**

This is better if you prefer the terminal.

#### Step 1: Clone Your Repository
```bash
# Go to a folder where you want to work
cd ~/projects

# Clone your repository
git clone https://github.com/somdeepkundu/shruti2030.git
cd shruti2030
```

#### Step 2: Add the Missing Files

Create/download these 4 files and put them in the `shruti2030` folder:

**File 1: Create `app.jsx`**
```bash
# Copy the content from the app.jsx file provided (see below)
# and save it as app.jsx in this folder
```

**File 2: Create `styles.css`**
```bash
# Copy the content and save as styles.css
```

**File 3: Create `manifest.json`**
```bash
# Copy the content and save as manifest.json
```

**File 4: Create `sw.js`**
```bash
# Copy the content and save as sw.js
```

#### Step 3: Upload to GitHub
```bash
# Check what files are in the folder
ls -la

# Add all files to git
git add .

# Create a commit
git commit -m "🔧 Fix: Add missing files (app.jsx, styles.css, manifest.json, sw.js)"

# Push to GitHub
git push origin main
```

#### Step 4: Wait & Test
- Wait 2-3 minutes for GitHub Pages to rebuild
- Hard refresh: `Ctrl+Shift+R`
- Visit: `https://somdeepkundu.github.io/shruti2030/`

---

## 📦 Files You Need

### File 1: **app.jsx**
Copy this entire content and save as `app.jsx`:

```javascript
// PDFAudioReader Component - Fixed for Browser Deployment
const { useState, useEffect, useRef } = React;

function PDFAudioReader() {
  const [pdf, setPdf] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [highlights, setHighlights] = useState(new Map());
  const [savedProgress, setSavedProgress] = useState({});
  const [pdfName, setPdfName] = useState('No PDF loaded');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('shruti_darkMode') === 'true');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visualization, setVisualization] = useState(Array(20).fill(0));
  const synthRef = useRef(null);
  const fileInputRef = useRef(null);
  const visualizationIntervalRef = useRef(null);

  // Initialize Web Speech API
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());
    synth.onvoiceschanged = updateVoices;
    updateVoices();
  }, []);

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem('shruti_darkMode', darkMode);
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Visualization animation
  useEffect(() => {
    if (isPlaying) {
      visualizationIntervalRef.current = setInterval(() => {
        setVisualization(prev => 
          prev.map(() => Math.random() * 100)
        );
      }, 100);
    } else {
      if (visualizationIntervalRef.current) {
        clearInterval(visualizationIntervalRef.current);
      }
      setVisualization(Array(20).fill(0));
    }
    return () => {
      if (visualizationIntervalRef.current) {
        clearInterval(visualizationIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Load PDF with PDF.js
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        const pdf = await pdfjsLib.getDocument(new Uint8Array(event.target.result)).promise;
        setPdf(pdf);
        extractPages(pdf);
        setCurrentPage(0);
        
        // Load saved progress
        const progress = JSON.parse(localStorage.getItem(`pdf_${file.name}`) || '{}');
        setSavedProgress(progress);
        if (progress.currentPage) {
          setCurrentPage(progress.currentPage);
        }
      } catch (err) {
        alert('Error loading PDF: ' + err.message);
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const extractPages = async (pdfDoc) => {
    try {
      const extractedPages = [];
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const text = await page.getTextContent();
        const fullText = text.items.map(item => item.str).join(' ');
        extractedPages.push({
          number: i,
          text: fullText.trim(),
          content: text.items
        });
      }
      setPages(extractedPages);
    } catch (err) {
      console.error('Error extracting pages:', err);
    }
  };

  // Text-to-Speech control
  const speak = (text) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[selectedVoice] || voices[0];
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
  };

  const handlePlayPage = () => {
    if (pages[currentPage]) {
      setCurrentText(pages[currentPage].text);
      speak(pages[currentPage].text);
    }
  };

  const handlePause = () => {
    if (synthRef.current) {
      synthRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleResume = () => {
    if (synthRef.current) {
      synthRef.current.resume();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setCurrentText('');
    }
  };

  const nextPage = () => {
    handleStop();
    const next = Math.min(currentPage + 1, pages.length - 1);
    setCurrentPage(next);
    saveProgress(next);
  };

  const prevPage = () => {
    handleStop();
    const prev = Math.max(currentPage - 1, 0);
    setCurrentPage(prev);
    saveProgress(prev);
  };

  const saveProgress = (page) => {
    const progress = { currentPage: page, timestamp: new Date().toISOString() };
    localStorage.setItem(`pdf_${pdfName}`, JSON.stringify(progress));
    setSavedProgress(progress);
  };

  const goToPage = (page) => {
    handleStop();
    setCurrentPage(page - 1);
    saveProgress(page - 1);
  };

  const currentPageData = pages[currentPage];

  return React.createElement('div', { className: 'app-container' },
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'header-content' },
        React.createElement('div', { className: 'header-top' },
          React.createElement('h1', null, '🎧 Shruti2030'),
          React.createElement('button', {
            className: 'dark-mode-toggle',
            onClick: () => setDarkMode(!darkMode),
            title: darkMode ? 'Light mode' : 'Dark mode'
          }, darkMode ? '☀️' : '🌙')
        ),
        React.createElement('p', { className: 'tagline' }, 'PDF to Audio for Scientific Reading')
      )
    ),

    React.createElement('div', { className: 'main-grid' },
      // Sidebar
      React.createElement('aside', { className: 'sidebar' },
        React.createElement('div', { className: 'sidebar-section' },
          React.createElement('h3', null, 'PDF Upload'),
          React.createElement('input', {
            ref: fileInputRef,
            type: 'file',
            accept: '.pdf',
            onChange: handlePdfUpload,
            className: 'file-input'
          }),
          React.createElement('button', {
            onClick: () => fileInputRef.current?.click(),
            className: 'btn btn-primary'
          }, 'Choose PDF'),
          React.createElement('p', { className: 'file-name' }, pdfName)
        ),

        pages.length > 0 && React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'sidebar-section' },
            React.createElement('h3', null, 'Navigation'),
            React.createElement('div', { className: 'page-info' },
              'Page ',
              React.createElement('strong', null, currentPage + 1),
              ' of ',
              React.createElement('strong', null, pages.length)
            ),
            React.createElement('input', {
              type: 'range',
              min: '1',
              max: pages.length,
              value: currentPage + 1,
              onChange: (e) => goToPage(parseInt(e.target.value)),
              className: 'page-slider'
            }),
            React.createElement('div', { className: 'button-group' },
              React.createElement('button', { onClick: prevPage, className: 'btn btn-small' }, '← Prev'),
              React.createElement('button', { onClick: nextPage, className: 'btn btn-small' }, 'Next →')
            )
          ),

          React.createElement('div', { className: 'sidebar-section' },
            React.createElement('h3', null, 'Voice'),
            React.createElement('select', {
              value: selectedVoice,
              onChange: (e) => setSelectedVoice(parseInt(e.target.value)),
              className: 'voice-select'
            },
              voices.map((voice, idx) =>
                React.createElement('option', { key: idx, value: idx },
                  `${voice.name} (${voice.lang})`
                )
              )
            )
          ),

          React.createElement('div', { className: 'sidebar-section' },
            React.createElement('h3', null, 'Speed'),
            React.createElement('div', { className: 'speed-control' },
              React.createElement('input', {
                type: 'range',
                min: '0.5',
                max: '2',
                step: '0.1',
                value: speed,
                onChange: (e) => setSpeed(parseFloat(e.target.value)),
                className: 'speed-slider'
              }),
              React.createElement('span', { className: 'speed-value' }, `${speed.toFixed(1)}x`)
            )
          ),

          savedProgress.timestamp && React.createElement('div', { className: 'sidebar-section progress-info' },
            React.createElement('p', null, `📍 Last read: ${new Date(savedProgress.timestamp).toLocaleDateString()}`)
          )
        )
      ),

      // Main Content
      React.createElement('main', { className: 'content' },
        !pages.length ? React.createElement('div', { className: 'empty-state' },
          React.createElement('div', { className: 'empty-icon' }, '📚'),
          React.createElement('h2', null, 'Ready to listen'),
          React.createElement('p', null, 'Upload a PDF to get started. Shruti2030 will extract the text and read it aloud with natural voices.')
        ) : React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'page-header' },
            React.createElement('h2', null, `Page ${currentPage + 1}`),
            React.createElement('div', { className: 'page-indicator' }, `${currentPage + 1} / ${pages.length}`)
          ),

          isPlaying && React.createElement('div', { className: 'visualization-container' },
            React.createElement('div', { className: 'waveform' },
              visualization.map((height, idx) =>
                React.createElement('div', {
                  key: idx,
                  className: 'bar',
                  style: { height: `${height}%` }
                })
              )
            ),
            React.createElement('p', { className: 'reading-status' }, '🔊 Reading aloud...')
          ),

          React.createElement('div', { className: 'text-display' },
            React.createElement('p', null, currentPageData?.text)
          ),

          React.createElement('div', { className: 'controls' },
            React.createElement('button', {
              onClick: handlePlayPage,
              disabled: isPlaying,
              className: 'btn btn-play'
            }, '▶ Play Page'),
            React.createElement('button', {
              onClick: handlePause,
              disabled: !isPlaying,
              className: 'btn btn-control'
            }, '⏸ Pause'),
            React.createElement('button', {
              onClick: handleResume,
              disabled: !isPlaying,
              className: 'btn btn-control'
            }, '▶ Resume'),
            React.createElement('button', {
              onClick: handleStop,
              disabled: !isPlaying,
              className: 'btn btn-stop'
            }, '⏹ Stop')
          ),

          React.createElement('div', { className: 'playback-info' },
            isPlaying ? React.createElement('p', null, '🔊 Playing...') : null,
            !isPlaying && currentText ? React.createElement('p', null, '⏸ Paused') : null
          )
        )
      )
    ),

    React.createElement('footer', { className: 'footer' },
      React.createElement('p', null, 'Open source • Works offline • Privacy first')
    )
  );
}
```

---

### File 2: **styles.css**
Use the `styles.css` file from your original uploads (copy all of it).

---

### File 3: **manifest.json**
Copy this entire content and save as `manifest.json`:

```json
{
  "name": "Shruti2030 - PDF to Audio Reader",
  "short_name": "Shruti2030",
  "description": "Open-source PDF to audio reader optimized for scientific papers. Listen with natural voices.",
  "start_url": "/shruti2030/",
  "scope": "/shruti2030/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#1a3a52",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%231a3a52' width='192' height='192'/><text x='50%' y='50%' font-size='100' font-weight='bold' fill='white' text-anchor='middle' dy='.35em'>🎧</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect fill='%231a3a52' width='512' height='512'/><text x='50%' y='50%' font-size='300' font-weight='bold' fill='white' text-anchor='middle' dy='.35em'>🎧</text></svg>",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 540 720'><rect fill='%231a3a52' width='540' height='720'/><text x='50%' y='50%' font-size='80' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'>📖 Shruti2030</text></svg>",
      "sizes": "540x720",
      "type": "image/svg+xml",
      "form_factor": "narrow"
    }
  ],
  "categories": ["education", "productivity"],
  "shortcuts": [
    {
      "name": "Upload PDF",
      "short_name": "Upload",
      "description": "Upload a PDF to start reading",
      "url": "/shruti2030/?action=upload",
      "icons": [
        {
          "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><rect fill='%23d46b3a' width='96' height='96'/><text x='50%' y='50%' font-size='50' text-anchor='middle' dy='.3em'>📄</text></svg>",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "share_target": {
    "action": "/shruti2030/",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "files": [
        {
          "name": "pdf",
          "accept": ["application/pdf", ".pdf"]
        }
      ]
    }
  }
}
```

---

### File 4: **sw.js**
Copy this entire content and save as `sw.js`:

```javascript
const CACHE_NAME = 'shruti2030-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.jsx',
  '/styles.css',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache.filter(url => !url.includes('cdnjs') && !url.includes('unpkg')));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache successful responses
            if (event.request.method === 'GET' && 
                (event.request.url.includes(self.location.origin) || 
                 event.request.url.includes('cdnjs') || 
                 event.request.url.includes('unpkg'))) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // Offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
```

---

## 📋 Checklist After Upload

After uploading the files via GitHub or Git, verify:

- [ ] All 4 files appear in your repository (https://github.com/somdeepkundu/shruti2030)
- [ ] Files are in the **root folder** (not in subdirectories)
- [ ] File names are exactly: `app.jsx`, `styles.css`, `manifest.json`, `sw.js`
- [ ] GitHub Actions completed (green checkmark in "Deployments" tab)
- [ ] **Wait 2-3 minutes** for GitHub Pages rebuild
- [ ] Hard refresh your browser: **Ctrl+Shift+R** or **Cmd+Shift+R**
- [ ] Visit: `https://somdeepkundu.github.io/shruti2030/`

---

## 🧪 Expected Result After Fix

✅ **Header appears** with "🎧 Shruti2030" title  
✅ **Dark mode button** (🌙) works in top-right  
✅ **PDF upload section** visible on left sidebar  
✅ **"Ready to listen"** message in main area  
✅ **No red error messages**  
✅ **Console shows** ✅ "App rendered successfully"

---

## 🆘 If Still Not Working

1. **Press F12** to open DevTools
2. Go to **Console** tab
3. Look for red error messages
4. Check **Network** tab - are files loading? (check for 404s)
5. Do a **hard refresh**: `Ctrl+Shift+R`
6. **Wait 5 minutes** - GitHub Pages can take time to rebuild

If still stuck, share:
- Screenshot of Console errors
- List of files in your repository
- URL you're visiting

---

Made with ❤️ - Your app will work once these files are uploaded! 🚀
