# 🚀 Shruti2030 v1.2.0 - Advanced Features

## ✨ Three Major Enhancements

---

## 1️⃣ Auto-Advance Pages

**Automatically continue to the next page when reading finishes**

### How It Works:
- When a page finishes reading, the app automatically:
  1. Pauses for 300ms
  2. Advances to next page
  3. Auto-plays the new page's content
  4. Saves progress automatically
  5. Continues until reaching the last page

### Use Cases:
- 📚 Hands-free reading while exercising
- 🚗 Listening in the car (tap pause when needed)
- 🏃 Background learning while multitasking
- 📖 Continuous scientific paper reading

### Toggle:
Located in **Settings** section of sidebar
```
✓ Auto-advance pages
```

### Smart Features:
- ✅ Stops at last page (doesn't loop)
- ✅ Works with any reading speed
- ✅ Respects pause/stop controls
- ✅ Preference saved automatically
- ✅ Works offline

### Example Flow:
```
Page 1 (Reading) → Finishes → Pause 300ms → 
Page 2 (Auto-start) → Finishes → Pause 300ms → 
Page 3 (Auto-start) → ... → Last Page → Stop
```

---

## 2️⃣ Clean Reading Mode

**Minimize distractions for focused reading**

### What It Hides:
When enabled, removes:
- ❌ Page number header ("Page 5")
- ❌ Page indicator badge ("5 / 147")
- ❌ Dividing line between header and text
- ✅ Keeps: Text display, controls, waveform

### Visual Difference:

**Normal Mode:**
```
┌─────────────────────────────┐
│  Page 5              5 / 147 │ ← Hidden in clean mode
├─────────────────────────────┤
│                             │
│   Your PDF text here...     │
│                             │
└─────────────────────────────┘
```

**Clean Mode:**
```
┌─────────────────────────────┐
│                             │
│   Your PDF text here...     │
│                             │
└─────────────────────────────┘
```

### Use Cases:
- 📄 Focused reading sessions
- 🎓 Academic concentration
- 📱 Mobile reading (less clutter)
- 🌙 Minimal interface preference

### Toggle:
Located in **Settings** section
```
✓ Clean reading mode
```

### Benefits:
- 🧠 Reduces cognitive load
- 👁️ Larger text viewing area
- ✨ Cleaner aesthetic
- 📱 Better mobile experience
- ⚡ Same functionality, less UI

### Smart Features:
- ✅ Smooth toggle (no page reload)
- ✅ Preference saved
- ✅ Waveform still shows during playback
- ✅ Page navigation still works
- ✅ Works with all other features

---

## 3️⃣ Advanced Text-to-Speech (Piper AI)

**Open-source AI-powered voices for superior quality**

### What is Piper TTS?
- 🤖 **Open Source**: Mozilla's Piper project
- 🎤 **Natural Voices**: Trained on real speakers
- ⚡ **Lightweight**: Runs in browser (WASM)
- 🌍 **Multi-Language**: 20+ languages
- 🔒 **Privacy**: No server calls needed
- 💎 **Quality**: Professional TTS quality

### Available Voices:
When Piper loads, you get access to:
- 🇺🇸 American English (multiple speakers)
- 🇬🇧 British English
- 🇪🇸 Spanish (Castilian, Latin American)
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
- 🇵🇹 Portuguese
- 🇷🇺 Russian
- And more...

### Toggle:
Located in **Settings** section
```
✓ AI Voice (Piper)
```

### Comparison:

| Feature | Web Speech API | Piper TTS |
|---------|---|---|
| **Quality** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Naturalness** | Varies by OS | Consistent |
| **Languages** | Limited | 20+ |
| **Speed** | Fast | Medium |
| **Privacy** | System-based | 100% local |
| **Voices** | OS-dependent | 50+ |
| **Pronunciation** | Variable | Excellent |

### How to Use:
1. Open Shruti2030
2. Upload PDF
3. In Settings, check "AI Voice (Piper)" if available
4. Select voice from dropdown
5. Adjust speed (works great at 1.2x-1.5x)
6. Click Play

### Installation Notes:
Piper TTS loads automatically from:
- Hugging Face (first time)
- Browser cache (subsequent visits)
- Works offline after initial load

### Performance:
- **First Load**: ~2-3 seconds (downloads Piper)
- **Subsequent Loads**: Instant (cached)
- **Playback**: Smooth, no lag
- **Quality**: Professional speech synthesis

### Best Voice Settings for Scientific Papers:
```
Voice: English US (Google)      (Piper)
Speed: 1.3x - 1.5x             (Comfortable)
Pitch: Default (1.0)           (Natural)
Volume: 100%                    (Full)
```

### Technical Details:
- Uses Mozilla's Piper v1.0
- ONNX Runtime (WASM)
- 20-40MB model download
- Cached in Service Worker
- Works without internet after load

---

## 🎯 Settings Panel Overview

New **Settings** section in sidebar:

```
⚙️ Settings
━━━━━━━━━━━━━━━━━━━━━━━━
☐ Auto-advance pages
☐ Clean reading mode
☐ AI Voice (Piper)
━━━━━━━━━━━━━━━━━━━━━━━━
```

### Save Behavior:
- ✅ All settings auto-save to browser
- ✅ Return to same preferences next time
- ✅ Separate preferences per device
- ✅ Works offline

---

## 🎨 Real-World Examples

### Example 1: Academic Paper Reading
```
Settings:
✓ Auto-advance pages    (Hands-free)
✓ Clean reading mode    (Focus)
✓ AI Voice              (Quality)

Speed: 1.4x             (Comfortable)
Result: Productive session, no distractions
```

### Example 2: Commute Listening
```
Settings:
✓ Auto-advance pages    (Non-stop)
☐ Clean reading mode    (Normal UI)
✓ AI Voice              (Quality)

Speed: 1.2x             (Not too fast)
Result: Effortless learning on the go
```

### Example 3: Bedtime Reading
```
Settings:
☐ Auto-advance pages    (Manual control)
✓ Clean reading mode    (Relaxing)
✓ AI Voice              (Smooth voice)

Speed: 0.8x             (Slower, calming)
Result: Relaxing, eye-friendly reading
```

---

## 🔧 Troubleshooting

### Piper TTS Not Loading?
**Symptoms**: "AI Voice (Piper)" option doesn't appear

**Solutions**:
1. Check internet connection (first load needs download)
2. Clear browser cache (DevTools > Application > Clear)
3. Try different browser (Firefox/Chrome)
4. Fall back to Web Speech API

### Auto-Advance Not Working?
**Symptoms**: Pages don't auto-advance

**Check**:
1. Is "Auto-advance pages" checkbox enabled?
2. Is not the last page?
3. Try clicking Play again
4. Check browser console for errors

### Clean Mode Seems Broken?
**Symptoms**: Page header still shows

**Fix**:
1. Hard refresh (Ctrl+Shift+R)
2. Clear localStorage: `localStorage.removeItem('shruti_cleanMode')`
3. Reload page

### Voices Sound Robotic?
**Solution**:
- Adjust speed to 1.2x-1.5x (not too fast/slow)
- Different voices sound different
- Try different Piper voices
- Sentence length affects naturalness

---

## 📊 Feature Combinations

### Combination 1: Continuous Learning
```
Auto-advance:    ON  → No breaks
Clean mode:      ON  → Focus mode
AI Voice:        ON  → Quality audio
Speed:           1.3x → Efficient
Result: 🎯 Most productive
```

### Combination 2: Relaxed Reading
```
Auto-advance:    OFF → Control pace
Clean mode:      ON  → Calm interface
AI Voice:        ON  → Pleasant voice
Speed:           0.9x → Leisurely
Result: 😌 Most enjoyable
```

### Combination 3: Quick Review
```
Auto-advance:    ON  → Non-stop
Clean mode:      OFF → See progress
AI Voice:        ON  → Quality
Speed:           1.6x → Fast
Result: ⚡ Most efficient
```

---

## 🚀 Pro Tips

1. **Speed Optimization**
   - Papers: 1.2x - 1.4x
   - Dense text: 1.0x - 1.2x
   - Light reading: 1.4x - 1.6x

2. **Voice Selection**
   - Female voices: Generally clearer
   - Male voices: Deeper, formal
   - Try multiple to find preference

3. **Auto-Advance Workflow**
   - Great for long reading sessions
   - Tap screen to pause anytime
   - Use with headphones/speaker

4. **Clean Mode Benefits**
   - Enable for focused work
   - Disable to track progress visually
   - Toggle on demand

5. **Piper TTS Best Practices**
   - Load during WiFi for faster download
   - Use modern browser (Chrome/Firefox)
   - Stable internet for first load
   - Works great offline after that

---

## 📈 Performance Metrics

| Setting | Impact | Notes |
|---------|--------|-------|
| Auto-advance | +Memory | Minimal, <1MB |
| Clean mode | -UI | Reduces clutter |
| Piper TTS | +Quality/-Speed | 20-40MB initial, then cached |

---

## ✅ Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Auto-advance | ✅ | ✅ | ✅ | ✅ |
| Clean mode | ✅ | ✅ | ✅ | ✅ |
| Piper TTS | ✅ | ✅ | ⚠️ | ✅ |
| Web Speech | ✅ | ✅ | ✅ | ✅ |

⚠️ = May require additional setup

---

## 🎓 Learning Path

1. **Start**: Use default settings, explore
2. **Optimize**: Enable auto-advance for long PDFs
3. **Focus**: Turn on clean mode for concentration
4. **Enhance**: Try Piper AI voices for quality
5. **Master**: Combine all for perfect session

---

**Shruti2030 v1.2.0** - Reading Evolution 🎧📖

Made for the scientific community ❤️
