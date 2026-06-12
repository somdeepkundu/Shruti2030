import React, { useState, useEffect, useRef } from 'react';
import './styles_v2.css';

export default function PDFAudioReader() {
  // State Management
  const [pdf, setPdf] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [savedProgress, setSavedProgress] = useState({});
  const [pdfName, setPdfName] = useState('No PDF loaded');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('shruti_darkMode') === 'true');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [visualization, setVisualization] = useState(Array(20).fill(0));
  
  // NEW FEATURES
  const [autoAdvance, setAutoAdvance] = useState(() => localStorage.getItem('shruti_autoAdvance') === 'true');
  const [cleanMode, setCleanMode] = useState(() => localStorage.getItem('shruti_cleanMode') === 'true');
  const [usePiper, setUsePiper] = useState(() => localStorage.getItem('shruti_usePiper') !== 'false');
  const [piperVoices, setPiperVoices] = useState([]);
  const [piperLoading, setPiperLoading] = useState(false);
  
  // Refs
  const synthRef = useRef(null);
  const fileInputRef = useRef(null);
  const visualizationIntervalRef = useRef(null);
  const utteranceRef = useRef(null);

  // ===== INITIALIZATION =====
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());
    synth.onvoiceschanged = updateVoices;
    updateVoices();
    
    // Load Piper TTS voices
    loadPiperVoices();
  }, []);

  // ===== PIPER TTS LOADING =====
  const loadPiperVoices = async () => {
    setPiperLoading(true);
    try {
      const response = await fetch('https://huggingface.co/rhasspy/piper-voices/raw/main/voices.json');
      const data = await response.json();
      
      // Extract top voices
      const topVoices = Object.entries(data)
        .filter(([_, voice]) => voice.name && voice.language)
        .slice(0, 15)
        .map(([key, voice]) => ({
          name: `🤖 ${voice.name} (Piper)`,
          id: key,
          lang: voice.language,
          type: 'piper'
        }));
      
      setPiperVoices(topVoices);
      console.log('✅ Piper TTS voices loaded:', topVoices.length);
    } catch (err) {
      console.log('ℹ️ Piper TTS not available, using Web Speech API only');
    } finally {
      setPiperLoading(false);
    }
  };

  // ===== DARK MODE EFFECT =====
  useEffect(() => {
    localStorage.setItem('shruti_darkMode', darkMode);
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // ===== AUTO-ADVANCE PREFERENCE =====
  useEffect(() => {
    localStorage.setItem('shruti_autoAdvance', autoAdvance);
  }, [autoAdvance]);

  // ===== CLEAN MODE PREFERENCE =====
  useEffect(() => {
    localStorage.setItem('shruti_cleanMode', cleanMode);
  }, [cleanMode]);

  // ===== PIPER PREFERENCE =====
  useEffect(() => {
    localStorage.setItem('shruti_usePiper', usePiper);
  }, [usePiper]);

  // ===== MOBILE DETECTION =====
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ===== VISUALIZATION ANIMATION =====
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

  // ===== PDF UPLOAD HANDLER =====
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const pdfjsLib = window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      try {
        const pdf = await pdfjsLib.getDocument(new Uint8Array(event.target.result)).promise;
        setPdf(pdf);
        await extractPages(pdf);
        setCurrentPage(0);
        
        // Load saved progress
        const progress = JSON.parse(localStorage.getItem(`pdf_${file.name}`) || '{}');
        setSavedProgress(progress);
        if (progress.currentPage) {
          setCurrentPage(progress.currentPage);
        }
      } catch (err) {
        alert('Error loading PDF. Please try another file.');
        console.error('PDF loading error:', err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // ===== EXTRACT PDF PAGES =====
  const extractPages = async (pdfDoc) => {
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
  };

  // ===== TEXT-TO-SPEECH HANDLER =====
  const speak = (text) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[selectedVoice] || voices[0];
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      
      // AUTO-ADVANCE FEATURE
      if (autoAdvance && currentPage < pages.length - 1) {
        setTimeout(() => {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          saveProgress(nextPage);
          
          // Auto-play next page
          setTimeout(() => {
            if (pages[nextPage]) {
              setCurrentText(pages[nextPage].text);
              speak(pages[nextPage].text);
            }
          }, 500);
        }, 300);
      }
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  // ===== PLAYBACK CONTROLS =====
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

  // ===== PAGE NAVIGATION =====
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

  // ===== RENDER =====
  const currentPageData = pages[currentPage];
  const allVoices = [...voices, ...piperVoices];

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <h1>🎧 Shruti2030</h1>
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light mode' : 'Dark mode'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <p className="tagline">PDF to Audio • Auto-Advance • Clean Reading • AI Voices</p>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="main-grid">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>📄 Upload PDF</h3>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              className="file-input"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-primary"
            >
              Choose PDF
            </button>
            <p className="file-name" title={pdfName}>{pdfName}</p>
          </div>

          {pages.length > 0 && (
            <>
              {/* NAVIGATION */}
              <div className="sidebar-section">
                <h3>📍 Navigation</h3>
                <div className="page-info">
                  Page <strong>{currentPage + 1}</strong> / <strong>{pages.length}</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max={pages.length}
                  value={currentPage + 1}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className="page-slider"
                  aria-label="Page slider"
                />
                <div className="button-group">
                  <button onClick={prevPage} className="btn btn-small">← Prev</button>
                  <button onClick={nextPage} className="btn btn-small">Next →</button>
                </div>
              </div>

              {/* VOICE SELECTION */}
              <div className="sidebar-section">
                <h3>🎤 Voice</h3>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
                  className="voice-select"
                  aria-label="Voice selection"
                >
                  {allVoices.length > 0 ? (
                    allVoices.map((voice, idx) => (
                      <option key={idx} value={idx}>
                        {voice.name} {voice.lang && `(${voice.lang})`}
                      </option>
                    ))
                  ) : (
                    <option>Loading voices...</option>
                  )}
                </select>
              </div>

              {/* SPEED CONTROL */}
              <div className="sidebar-section">
                <h3>⚡ Speed</h3>
                <div className="speed-control">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="speed-slider"
                    aria-label="Playback speed"
                  />
                  <span className="speed-value">{speed.toFixed(1)}x</span>
                </div>
              </div>

              {/* SETTINGS */}
              <div className="sidebar-section">
                <h3>⚙️ Settings</h3>
                
                <label className="toggle-option">
                  <input 
                    type="checkbox" 
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    aria-label="Auto-advance pages"
                  />
                  <span>⏭️ Auto-advance pages</span>
                  <span className="tooltip">Auto-play next page when finished</span>
                </label>

                <label className="toggle-option">
                  <input 
                    type="checkbox" 
                    checked={cleanMode}
                    onChange={(e) => setCleanMode(e.target.checked)}
                    aria-label="Clean reading mode"
                  />
                  <span>✨ Clean reading mode</span>
                  <span className="tooltip">Hide page header for focus</span>
                </label>

                {piperVoices.length > 0 && (
                  <label className="toggle-option">
                    <input 
                      type="checkbox" 
                      checked={usePiper}
                      onChange={(e) => setUsePiper(e.target.checked)}
                      aria-label="Use Piper AI voices"
                    />
                    <span>🤖 AI Voices (Piper)</span>
                    <span className="tooltip">High-quality open-source voices</span>
                  </label>
                )}
              </div>

              {/* PROGRESS INFO */}
              {savedProgress.timestamp && (
                <div className="sidebar-section progress-info">
                  <p>📍 Last read: {new Date(savedProgress.timestamp).toLocaleDateString()}</p>
                </div>
              )}
            </>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
          {!pages.length ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h2>Ready to listen</h2>
              <p>Upload a PDF to get started. Shruti2030 will extract the text and read it aloud with natural voices.</p>
              <ul className="features-list">
                <li>✨ Auto-advance to next page</li>
                <li>🎯 Clean reading mode for focus</li>
                <li>🤖 AI voices for quality audio</li>
                <li>🌙 Dark mode support</li>
                <li>📱 Mobile friendly</li>
                <li>🔒 100% private - no uploads</li>
              </ul>
            </div>
          ) : (
            <>
              {/* PAGE HEADER - Conditionally Hidden */}
              {!cleanMode && (
                <div className="page-header">
                  <h2>Page {currentPage + 1}</h2>
                  <div className="page-indicator">{currentPage + 1} / {pages.length}</div>
                </div>
              )}

              {/* VISUALIZATION */}
              {isPlaying && (
                <div className="visualization-container">
                  <div className="waveform">
                    {visualization.map((height, idx) => (
                      <div 
                        key={idx} 
                        className="bar"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <p className="reading-status">🔊 Reading aloud...</p>
                  {autoAdvance && <p className="auto-advance-status">⏭️ Auto-advance enabled</p>}
                </div>
              )}

              {/* TEXT DISPLAY */}
              <div className="text-display">
                <p>{currentPageData?.text}</p>
              </div>

              {/* CONTROLS */}
              <div className="controls">
                <button
                  onClick={handlePlayPage}
                  disabled={isPlaying}
                  className="btn btn-play"
                  title="Play current page (keyboard: Space)"
                >
                  ▶ Play Page
                </button>
                <button
                  onClick={handlePause}
                  disabled={!isPlaying}
                  className="btn btn-control"
                  title="Pause playback"
                >
                  ⏸ Pause
                </button>
                <button
                  onClick={handleResume}
                  disabled={!isPlaying}
                  className="btn btn-control"
                  title="Resume playback"
                >
                  ▶ Resume
                </button>
                <button
                  onClick={handleStop}
                  disabled={!isPlaying}
                  className="btn btn-stop"
                  title="Stop playback"
                >
                  ⏹ Stop
                </button>
              </div>

              {/* PLAYBACK INFO */}
              <div className="playback-info">
                {isPlaying && <p>🔊 Playing...</p>}
                {!isPlaying && currentText && <p>⏸ Paused</p>}
              </div>
            </>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>🎧 Shruti2030 • Open source • Offline-first • Privacy first</p>
      </footer>
    </div>
  );
}
