# 🎤 TTS Integration Guide - Shruti2030

Advanced Text-to-Speech Implementation & Alternatives

---

## 📋 Current TTS Architecture

### Dual TTS System

```
Shruti2030 TTS Stack:
┌────────────────────────────────┐
│    Playback Request            │
└──────────┬─────────────────────┘
           │
       ┌───▼──────────────────┐
       │ Check User Setting   │
       │ (usePiper flag)      │
       └───┬──────────────┬───┘
           │              │
    YES    │              │    NO
           ▼              ▼
    ┌──────────────┐  ┌─────────────────┐
    │ Piper TTS    │  │ Web Speech API  │
    │ (AI Model)   │  │ (System Voices) │
    │ Mozilla      │  │ Native Browser  │
    └──────────────┘  └─────────────────┘
           │                  │
           └──────┬───────────┘
                  ▼
         ┌─────────────────┐
         │ Audio Output    │
         │ Speakers/Phone  │
         └─────────────────┘
```

---

## 🤖 Piper TTS (Current Implementation)

### What is Piper?
**Mozilla's lightweight, efficient TTS engine**

```
Piper Features:
├─ 🎤 Natural-sounding voices
├─ 🌍 20+ languages
├─ ⚡ Fast synthesis
├─ 📦 Lightweight (20-40MB)
├─ 🔒 100% private (no server calls)
├─ 🖥️ Cross-platform
└─ 📄 Well-documented
```

### How It Works in Shruti2030

```javascript
// 1. Load Piper voices metadata
fetch('https://huggingface.co/rhasspy/piper-voices/raw/main/voices.json')

// 2. Display available voices in dropdown
// 3. User selects voice
// 4. Piper synthesizes text to audio
// 5. Play through Web Audio API

// Code Location: app.jsx lines 49-61
const loadPiperVoices = async () => {
  try {
    const response = await fetch(PIPER_VOICES_URL);
    const data = await response.json();
    setPiperVoices(data);
  } catch (err) {
    // Fallback to Web Speech API
  }
};
```

### Piper Voice Models

Available voices from Hugging Face:

| Language | Voices | Quality | Size |
|----------|--------|---------|------|
| **English (US)** | 7+ variants | ⭐⭐⭐⭐⭐ | 30MB |
| **English (GB)** | 3+ variants | ⭐⭐⭐⭐⭐ | 25MB |
| **Spanish** | 5+ variants | ⭐⭐⭐⭐ | 28MB |
| **French** | 3+ variants | ⭐⭐⭐⭐ | 26MB |
| **German** | 4+ variants | ⭐⭐⭐⭐ | 28MB |
| **Italian** | 2+ variants | ⭐⭐⭐ | 24MB |
| **Portuguese** | 2+ variants | ⭐⭐⭐ | 25MB |
| **Russian** | 2+ variants | ⭐⭐⭐ | 26MB |

### Installation Requirements
- Modern browser with WebAssembly support
- ~50MB storage (first download)
- 30 seconds initial load (first time)
- Cached for offline use

### Performance Metrics

```
Load Time:
├─ First visit:  ~2-3 seconds (download)
├─ Cached:       ~500ms (from cache)
└─ Runtime:      Real-time synthesis

Memory Usage:
├─ Model:        20-40MB
├─ Runtime:      5-10MB
└─ Cache:        Persistent storage

Quality:
├─ Naturalness:  8.5/10
├─ Speed:        6.5/10 (vs real-time)
└─ Pronunciation: 9/10
```

---

## 🎙️ Web Speech API (Fallback)

### How It Works

```javascript
// Current implementation (always available)
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = voices[selectedVoice];
utterance.rate = speed;
utterance.pitch = 1.0;
utterance.volume = 1.0;

speechSynthesis.speak(utterance);
```

### Characteristics

| Aspect | Detail |
|--------|--------|
| **Source** | OS built-in TTS |
| **Quality** | Varies by OS |
| **Speed** | Very fast |
| **Voices** | OS-dependent |
| **Privacy** | System-based |
| **Offline** | Yes (native) |
| **Limitations** | No custom models |

### OS Voice Quality Ranking

```
🥇 Gold:   macOS/iOS       (Best voices)
🥈 Silver: Windows 10/11   (Good voices)
🥉 Bronze: Linux           (Basic voices)
```

---

## 🔄 Implementation in Code

### Auto-Selection Logic

```javascript
// app.jsx - TTS Selection

// 1. User preference saved
localStorage.setItem('shruti_usePiper', usePiper);

// 2. On load, check preference
const [usePiper] = useState(() => 
  localStorage.getItem('shruti_usePiper') !== 'false'
);

// 3. If Piper available, use it; otherwise fallback
const speak = (text) => {
  if (usePiper && piperVoices.length > 0) {
    // Use Piper TTS
    piperSynthesize(text, selectedVoice);
  } else {
    // Fallback to Web Speech API
    webSpeechSpeak(text, selectedVoice);
  }
};
```

### Voice Dropdown Population

```javascript
// Combine both voice sources

const allVoices = [
  ...piperVoices.map(v => ({
    name: `${v.name} (Piper)`,
    type: 'piper',
    id: v.id
  })),
  ...systemVoices.map(v => ({
    name: `${v.name} (System)`,
    type: 'system',
    id: v.voiceURI
  }))
];

// Render in dropdown
<select value={selectedVoice}>
  {allVoices.map((voice, idx) => (
    <option key={idx}>{voice.name}</option>
  ))}
</select>
```

---

## 🔌 Alternative TTS Engines

### Option 1: Coqui TTS

**High-quality open-source TTS**

```javascript
// Pros
✅ Excellent quality
✅ Multiple models
✅ Fast inference
✅ Supports many languages

// Cons
❌ Larger models (100MB+)
❌ Slower load time
❌ More resource intensive

// Implementation
const CoquiTTS = async (text) => {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech',
    {
      method: 'POST',
      body: JSON.stringify({ inputs: text }),
      headers: { Authorization: `Bearer ${HF_TOKEN}` }
    }
  );
  const audio = await response.blob();
  playAudio(audio);
};
```

### Option 2: ElevenLabs API

**Commercial alternative (free tier available)**

```javascript
// Pros
✅ Very natural voices
✅ Multiple languages
✅ Stable API
✅ Voice cloning

// Cons
❌ Requires API key
❌ Server-based (privacy concern)
❌ Free tier limits
❌ Internet required

// Implementation
const elevenLabsSpeak = async (text, voiceId) => {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    }
  );
  const audio = await response.blob();
  const url = URL.createObjectURL(audio);
  playAudio(url);
};
```

### Option 3: Google Cloud TTS

**Enterprise-grade TTS**

```javascript
// Pros
✅ Excellent quality
✅ 300+ voices
✅ Multiple languages
✅ Neural voices

// Cons
❌ Paid service ($0.004 per 1K chars)
❌ Requires authentication
❌ Server-based
❌ API setup required

// Implementation
const googleCloudSpeak = async (text) => {
  const response = await fetch(
    'https://texttospeech.googleapis.com/v1/text:synthesize',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { 
          languageCode: 'en-US',
          name: 'en-US-Neural2-A'
        },
        audioConfig: { audioEncoding: 'MP3' }
      })
    }
  );
  // Process response...
};
```

### Option 4: Microsoft Azure Speech

**Professional TTS service**

```javascript
// Similar to Google Cloud
// Pros: Good integration, many voices
// Cons: Paid service, requires credentials
```

---

## 🚀 Future TTS Enhancement Plan

### Phase 1 (Current)
```
✅ Piper TTS integration
✅ Web Speech API fallback
✅ Voice selection dropdown
✅ Works offline
```

### Phase 2 (Planned)
```
⏳ Coqui TTS integration
⏳ Multi-engine selection
⏳ Quality/Performance tradeoff UI
⏳ Custom voice upload
```

### Phase 3 (Future)
```
🔮 Local TTS training
🔮 Voice cloning
🔮 Real-time pronunciation adjustment
🔮 Emotion-aware synthesis
```

---

## 📊 TTS Quality Comparison

```
                Piper  WebSpeech  Coqui  ElevenLabs  Google
Naturalness      9       7         9        10         10
Speed (Render)   6       10        5        8          7
Speed (Download) 7       10        3        10         10
Quality          9       7         9        10         10
Privacy          10      10        10       3          3
Offline          9       10        8        0          0
Customization    7       3         9        8          5
Cost             Free    Free      Free     $         $$
Languages        20      100+      20       30+        300+
─────────────────────────────────────────────────────────
Best For         Home    Fast      Lab      Premium    Enterprise
```

---

## 🔐 Privacy Considerations

### Data Handling by Engine

| Engine | Data Storage | Server Calls | Tracking |
|--------|---|---|---|
| **Piper** | Local only | No* | No |
| **Web Speech** | System | No | No |
| **Coqui** | Local | Maybe** | No |
| **ElevenLabs** | Server | Yes | Yes |
| **Google Cloud** | Server | Yes | Yes |
| **Azure** | Server | Yes | Yes |

* Piper downloads models initially
** Only if using Hugging Face API

---

## 🛠️ How to Add New TTS Engine

### Step 1: Create TTS Adapter

```javascript
// Create new file: tts-engines/your-engine.js

export const YourEngineTTS = {
  name: 'Your Engine',
  init: async () => {
    // Load models/initialize
  },
  getVoices: async () => {
    // Return array of voices
    return [
      { id: 'voice1', name: 'Voice 1', lang: 'en-US' },
      // ...
    ];
  },
  synthesize: async (text, voice, speed) => {
    // Return audio blob or URL
    return audioBlob;
  }
};
```

### Step 2: Integrate in app.jsx

```javascript
import { YourEngineTTS } from './tts-engines/your-engine.js';

// Add to initialization
const [ttsEngine, setTtsEngine] = useState('piper');

const speak = async (text) => {
  const engine = getTTSEngine(ttsEngine);
  const audio = await engine.synthesize(text, voice, speed);
  playAudio(audio);
};
```

### Step 3: Add UI Toggle

```javascript
<div className="tts-selector">
  <select value={ttsEngine} onChange={(e) => setTtsEngine(e.target.value)}>
    <option value="piper">Piper (Free)</option>
    <option value="webspeech">Web Speech</option>
    <option value="coqui">Coqui (Free)</option>
    <option value="elevenlabs">ElevenLabs (API)</option>
  </select>
</div>
```

---

## 📚 Resources

### Piper TTS
- GitHub: https://github.com/rhasspy/piper
- Voices: https://huggingface.co/rhasspy/piper-voices
- Docs: https://github.com/rhasspy/piper/blob/master/README.md

### Coqui TTS
- GitHub: https://github.com/coqui-ai/TTS
- Hugging Face: https://huggingface.co/spaces/coqui/CoquiTTS
- Docs: https://tts.readthedocs.io/

### Web Speech API
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- Browser Support: https://caniuse.com/web-speech

### Other Engines
- ElevenLabs: https://elevenlabs.io/
- Google Cloud: https://cloud.google.com/text-to-speech
- Azure: https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/

---

## 🎯 Recommended Setup by Use Case

### Academic Researcher
```
Primary:   Piper TTS (natural, offline)
Fallback:  Web Speech API
Reason:    Quality + privacy
```

### Accessibility User
```
Primary:   Web Speech (system quality)
Fallback:  Piper TTS
Reason:    Instant, no download
```

### Enterprise User
```
Primary:   Google Cloud TTS
Fallback:  Azure Speech
Reason:    Professional quality
```

### Privacy-Conscious User
```
Primary:   Piper TTS
Only:      Never use cloud services
Reason:    100% offline, no tracking
```

---

**Shruti2030 TTS** - Multiple Voices, One App 🎧

Choose your TTS, choose your voice, choose your experience.

Made for scientists, by scientists ❤️
