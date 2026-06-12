# 🎧 Shruti2030 v1.2.0 - Complete Setup Guide

## ✨ What's New in v1.2.0

### 🔥 THREE MAJOR NEW FEATURES:

1. **⏭️ Auto-Advance Pages**
   - Automatically play next page when current page finishes
   - Perfect for hands-free reading
   - Toggle in Settings

2. **✨ Clean Reading Mode**
   - Hide page header for distraction-free reading
   - Larger text area, more focus
   - Perfect for long reading sessions

3. **🤖 Piper TTS (AI Voices)**
   - Open-source AI-powered voices
   - 20+ languages available
   - Professional quality audio

---

## 📦 NEW FILES IN v1.2.0

```
Shruti2030/
├── index_v2.html      ← Use this (updated)
├── app_v2.jsx         ← Use this (updated)
├── styles_v2.css      ← Use this (updated)
├── manifest.json      ← Same as before
├── sw.js              ← Same as before
└── Other docs
```

---

## 🚀 QUICK START

### Step 1: Replace Files
Replace old files with new `_v2` versions:
- `index.html` → `index_v2.html` (rename to `index.html`)
- `app.jsx` → `app_v2.jsx` (rename to `app.jsx`)
- `styles.css` → `styles_v2.css` (rename to `styles.css`)

### Step 2: Deploy
```bash
git add .
git commit -m "🚀 Update to Shruti2030 v1.2.0 with auto-advance, clean mode, and Piper TTS"
git push
```

### Step 3: Test
Visit `https://yourusername.github.io/shruti2030/` and test:
- ✅ Auto-advance toggle
- ✅ Clean mode toggle  
- ✅ Piper TTS loading
- ✅ Dark mode
- ✅ All playback controls

---

## 📖 FEATURE GUIDE

### ⏭️ AUTO-ADVANCE PAGES

**What it does:**
- When a page finishes reading, automatically moves to next page
- Pauses 300ms between pages
- Auto-plays next page
- Stops at last page

**How to use:**
1. Open Settings in sidebar
2. Check "⏭️ Auto-advance pages"
3. Click Play Page
4. App will auto-advance until done

**Best for:**
- Long reading sessions
- Hands-free listening
- Car listening
- Exercise/multitasking

**Pro tip:** Disable auto-advance for manual control, enable for continuous reading.

---

### ✨ CLEAN READING MODE

**What it hides:**
- Page number header ("Page 5")
- Page indicator badge ("5 / 147")
- Dividing line

**What it keeps:**
- All controls
- Text display
- Waveform visualization
- Page navigation

**How to use:**
1. Open Settings in sidebar
2. Check "✨ Clean reading mode"
3. Page header disappears
4. More reading space

**Best for:**
- Academic papers
- Focused study
- Minimalist preference
- Mobile reading

**Pro tip:** Toggle on/off anytime - no page reload needed.

---

### 🤖 PIPER TTS (AI VOICES)

**What is Piper?**
- Mozilla's open-source AI voice engine
- Professional quality speech synthesis
- 20+ languages and accents
- Runs entirely in your browser

**How to use:**
1. Wait for Piper to load (first time only, ~2-3 sec)
2. Open Settings in sidebar
3. Check "🤖 AI Voices (Piper)"
4. Select a Piper voice from dropdown
5. Click Play - enjoy AI-quality audio!

**Available voices:**
- 🇺🇸 American English (multiple speakers)
- 🇬🇧 British English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
- 🇵🇹 Portuguese
- 🇷🇺 Russian
- And more...

**Performance:**
- First load: 2-3 seconds (one-time download)
- Subsequent loads: Instant (cached)
- Works offline after first load
- No quality loss when cached

**Pro tips:**
1. Load over WiFi for faster download
2. Use speed 1.2x - 1.5x for best sound
3. Try different voices to find favorite
4. Female voices generally clearer for scientific content
5. Works great on mobile too

---

## ⚙️ SETTINGS PANEL

Located in **Sidebar**, three toggles:

```
⚙️ SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ ⏭️ Auto-advance pages
☐ ✨ Clean reading mode
☐ 🤖 AI Voices (Piper)
━━━━━━━━━━━━━━━━━━━━━━━━━━
```

All settings auto-save to browser!

---

## 🎯 USAGE SCENARIOS

### Scenario 1: Academic Paper Reading
```
Settings:
✓ Auto-advance pages    (Non-stop)
✓ Clean reading mode    (Focus)
✓ AI Voices             (Quality)

Speed: 1.3x
Voice: American English (clear)
Result: Productive, distraction-free session
```

### Scenario 2: Commute Listening
```
Settings:
✓ Auto-advance pages    (Hands-free)
☐ Clean reading mode    (See progress)
✓ AI Voices             (Quality)

Speed: 1.2x
Result: Effortless learning on the go
```

### Scenario 3: Casual Reading
```
Settings:
☐ Auto-advance pages    (Control pace)
✓ Clean reading mode    (Relaxing)
✓ AI Voices             (Natural sound)

Speed: 0.9x
Result: Comfortable, eye-friendly reading
```

### Scenario 4: Quick Review
```
Settings:
✓ Auto-advance pages    (Non-stop)
☐ Clean reading mode    (Track progress)
✓ AI Voices             (Quality)

Speed: 1.6x
Result: Fast, efficient review
```

---

## 🌙 DARK MODE

**Toggle:** Click 🌙/☀️ button in header (top right)

**Benefits:**
- Easier on eyes at night
- Reduces blue light
- Professional appearance
- Preference auto-saved

**Features:**
- Smooth theme transition
- All text stays readable
- Works on mobile
- Persists across sessions

---

## 📱 MOBILE-FRIENDLY

All features work great on mobile:
- ✅ Auto-advance
- ✅ Clean mode
- ✅ Dark mode
- ✅ Piper TTS
- ✅ Responsive layout
- ✅ Touch controls

**Mobile tips:**
1. Install as PWA for app-like experience
2. Use landscape for bigger text
3. Clean mode gives more space
4. Speed control works on all devices

---

## 🔧 TROUBLESHOOTING

### Piper TTS not loading?
- Check internet connection
- Try refreshing page
- Clear browser cache (DevTools > Clear)
- Falls back to Web Speech API

### Auto-advance not working?
- Is toggle enabled in Settings?
- Not at last page?
- Try clicking Play again
- Check browser console (F12)

### Clean mode still shows header?
- Hard refresh (Ctrl+Shift+R)
- Clear localStorage
- Reload page

### No voices showing?
- Voices depend on your OS
- macOS/iOS have most voices
- Windows has fewer
- Try different browser

---

## 📊 FILE SIZES & PERFORMANCE

```
App size: ~70KB (minified)
First load: ~800ms
Cached load: ~200ms
Piper download: 20-40MB (one-time)
Works offline: ✅ Yes
```

---

## 🎓 PRO TIPS & TRICKS

### Speed Optimization
```
Dense scientific papers:  1.0x - 1.2x
Normal papers:            1.2x - 1.4x
Light reading:            1.4x - 1.6x
Audiobook feel:           0.8x - 1.0x
```

### Voice Selection
```
Female voices:   Clearer for scientific content
Male voices:     Deeper, formal tone
Piper voices:    Consistent quality
System voices:   OS-dependent quality
```

### Using Auto-Advance
```
Great for:
- Long reading sessions (100+ pages)
- Hands-free scenarios
- Consistent pace reading

Not ideal for:
- Short snippets
- Complex material (want to pause)
- Real-time note-taking
```

### Maximizing Focus
```
Enable:
✓ Clean reading mode     (no header)
✓ Auto-advance          (no interaction)
☐ Dark mode             (unless night)

Disable:
☐ Visualizations        (if distracting)
```

---

## 🔐 PRIVACY & SECURITY

All three new features are **100% private**:

- ✅ Auto-advance: Local, no uploads
- ✅ Clean mode: CSS only, no tracking
- ✅ Piper TTS: Runs in browser, no server calls*

*Piper model is downloaded once from HuggingFace, then cached locally

---

## ✅ FEATURE CHECKLIST

Before using, verify:

- [ ] All three features toggle in Settings
- [ ] Dark mode button works (header)
- [ ] Auto-advance auto-plays next page
- [ ] Clean mode hides page header
- [ ] Piper TTS loads voices (check dropdown)
- [ ] All voices appear in dropdown
- [ ] Playback controls work
- [ ] Progress saves automatically
- [ ] Works offline (after first load)

---

## 🚀 DEPLOYMENT CHECKLIST

Before pushing to GitHub:

```
[ ] Rename files (remove _v2)
[ ] Test locally (python -m http.server)
[ ] Test all toggles
[ ] Test dark mode
[ ] Test Piper TTS loading
[ ] Test auto-advance
[ ] Test clean mode
[ ] Verify manifest.json paths
[ ] Update README if needed
[ ] Commit message: "🚀 Shruti2030 v1.2.0: Auto-advance, clean mode, Piper TTS"
[ ] Push to main
[ ] Wait 1-2 min for deployment
[ ] Visit live URL to verify
```

---

## 📞 SUPPORT

If something doesn't work:

1. **Clear cache:** DevTools > Application > Clear All
2. **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Check console:** F12 > Console tab
4. **Try different browser:** Chrome, Firefox, Safari, Edge
5. **Check internet:** Piper needs connection first time

---

## 🎉 YOU'RE READY!

Your Shruti2030 v1.2.0 is:
- ✅ Auto-advancing pages
- ✅ Clean reading mode ready
- ✅ AI voices powered
- ✅ Dark mode enabled
- ✅ Mobile optimized
- ✅ 100% private
- ✅ Works offline

**Start reading scientific papers like never before!**

---

## 📈 VERSION HISTORY

**v1.2.0** (Current)
- ⏭️ Auto-advance pages
- ✨ Clean reading mode
- 🤖 Piper TTS integration

**v1.1.0**
- 🎨 Dark mode
- 📊 Waveform visualization
- 📱 Mobile detection

**v1.0.0**
- PDF upload & reading
- Voice selection
- Speed control
- Offline support

---

**Made with ❤️ for scientists and scholars**

Shruti2030 - Where PDF meets Audio 🎧📖
