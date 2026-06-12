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

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());
    synth.onvoiceschanged = updateVoices;
    updateVoices();
  }, []);

  useEffect(() => {
    localStorage.setItem('shruti_darkMode', darkMode);
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
