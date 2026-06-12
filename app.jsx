import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

export default function PDFAudioReader() {
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
  const synthRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize Web Speech API
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());
    synth.onvoiceschanged = updateVoices;
    updateVoices();
  }, []);

  // Load PDF with PDF.js
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
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
    };
    reader.readAsArrayBuffer(file);
  };

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

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>📖 SciReader</h1>
          <p className="tagline">PDF to Audio for Scientific Reading</p>
        </div>
      </header>

      <div className="main-grid">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>PDF Upload</h3>
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
            <p className="file-name">{pdfName}</p>
          </div>

          {pages.length > 0 && (
            <>
              <div className="sidebar-section">
                <h3>Navigation</h3>
                <div className="page-info">
                  Page <strong>{currentPage + 1}</strong> of <strong>{pages.length}</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max={pages.length}
                  value={currentPage + 1}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className="page-slider"
                />
                <div className="button-group">
                  <button onClick={prevPage} className="btn btn-small">← Prev</button>
                  <button onClick={nextPage} className="btn btn-small">Next →</button>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Voice</h3>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
                  className="voice-select"
                >
                  {voices.map((voice, idx) => (
                    <option key={idx} value={idx}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sidebar-section">
                <h3>Speed</h3>
                <div className="speed-control">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="speed-slider"
                  />
                  <span className="speed-value">{speed.toFixed(1)}x</span>
                </div>
              </div>

              {savedProgress.timestamp && (
                <div className="sidebar-section progress-info">
                  <p>📍 Last read: {new Date(savedProgress.timestamp).toLocaleDateString()}</p>
                </div>
              )}
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="content">
          {!pages.length ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h2>Ready to listen</h2>
              <p>Upload a PDF to get started. SciReader will extract the text and read it aloud with natural voices.</p>
            </div>
          ) : (
            <>
              <div className="page-header">
                <h2>Page {currentPage + 1}</h2>
              </div>

              <div className="text-display">
                <p>{currentPageData?.text}</p>
              </div>

              <div className="controls">
                <button
                  onClick={handlePlayPage}
                  disabled={isPlaying}
                  className="btn btn-play"
                >
                  ▶ Play Page
                </button>
                <button
                  onClick={handlePause}
                  disabled={!isPlaying}
                  className="btn btn-control"
                >
                  ⏸ Pause
                </button>
                <button
                  onClick={handleResume}
                  disabled={!isPlaying}
                  className="btn btn-control"
                >
                  ▶ Resume
                </button>
                <button
                  onClick={handleStop}
                  disabled={!isPlaying}
                  className="btn btn-stop"
                >
                  ⏹ Stop
                </button>
              </div>

              <div className="playback-info">
                {isPlaying && <p>🔊 Playing...</p>}
                {!isPlaying && currentText && <p>⏸ Paused</p>}
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>Open source • Works offline • Privacy first</p>
      </footer>
    </div>
  );
}
