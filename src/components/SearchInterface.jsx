import React, { useState, useEffect } from 'react';
import { Mic, Camera, Search, Grid, Settings } from 'lucide-react';

const SearchInterface = (props) => {
  const [searchText, setSearchText] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showGamePrompt, setShowGamePrompt] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Centralized redirect URL for easy updates
  const REDIRECT_URL = 'https://cramyy.github.io/notgeddon/yay.mp4';

  const generateGlitchText = () => {
    const chars = '!@#$%^&*()_+QWERTYUIOPASDGHJKLZXCVBNM';
    return Array(12).fill().map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  // Handle form submission (search)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.toLowerCase() !== 'quantageddon') {

      window.location.href = "https://cramyy.github.io/quantageddon.in/reward.mp4";
    }
  };

  // Voice recognition setup
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchText(transcript);
      };

      recognition.start();
    }
  };

  useEffect(() => {
    let glitchInterval;

    if (searchText.toLowerCase() === 'quantageddon') {
      setIsFlipping(true);
      setShowGamePrompt(true);
      glitchInterval = setInterval(() => {
        setGlitchText(generateGlitchText());
      }, 50);

      setTimeout(() => {
        clearInterval(glitchInterval);
      }, 2000);
    } else {
      setIsFlipping(false);
      setShowGamePrompt(false);
      setShowEasterEgg(false);
    }

    return () => clearInterval(glitchInterval);
  }, [searchText]);

  const handleGameResponse = (response) => {
    if (response === 'play') {
      setShowGamePrompt(false);
      setShowEasterEgg(true);
    } else {
      setShowGamePrompt(false);
      setIsFlipping(false);
      setSearchText('');
      window.location.href = REDIRECT_URL;
    }
  };

  const letterColors = {
    Q: 'text-white',
    u: 'text-white',
    a: 'text-white',
    n: 'text-white',
    t: 'text-white',
    g: 'text-white',
    e: 'text-white',
    d: 'text-white',
    o: 'text-white'
  };

  const LogoLetter = ({ children }) => (
    <span
      className={`${letterColors[children] || 'text-white'} text-6xl font-bold tracking-tighter animate-pulse hover:animate-none transition-all duration-200`}
      style={{ textShadow: '0 0 10px rgba(255,255,255,0.1)' }}
    >
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center relative overflow-hidden">
      <div className="w-full min-h-screen relative" style={{ perspective: '2000px', perspectiveOrigin: 'center bottom' }}>
        <div
          className="absolute inset-0 w-full min-h-screen transition-transform duration-1000"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipping ? 'rotateX(14deg)' : 'rotateX(0deg)',
            transformOrigin: 'bottom',
          }}
          id='glitch'
        >
          <div
            className="absolute inset-0 w-full min-h-screen bg-[#202124]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <header className="w-full p-4 flex justify-end items-center space-x-4">
              <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white text-sm transition-colors duration-200">Mail</a>
              <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white text-sm transition-colors duration-200">Images</a>
              <button onClick={() => window.location.href = REDIRECT_URL} className="w-10 h-10 flex items-center justify-center hover:bg-[#303134] rounded-full transition-colors duration-200">
                <Grid className="w-5 h-5 text-[#999da2]" />
              </button>
              <button onClick={() => window.location.href = REDIRECT_URL} className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center">
                <span className="text-white font-medium">Q</span>
              </button>
            </header>

            <main className="flex flex-col items-center justify-center h-[calc(100vh-200px)] w-full max-w-4xl mx-auto px-4">
              <div className={`mb-8 ${isFlipping ? 'animate-glitch' : ''}`}>
                {isFlipping ? (
                  <div className="text-6xl font-bold text-white font-mono">{glitchText}</div>
                ) : (
                  <div className="flex items-center justify-center">
                    {'Quantageddon'.split('').map((letter, index) => (
                      <LogoLetter key={index}>{letter}</LogoLetter>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full max-w-2xl">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="flex items-center bg-[#303134] rounded-full border border-[#5f6368] group-hover:border-[#8ab4f8] focus-within:border-[#8ab4f8] px-6 py-3 shadow-lg transition-all duration-200">
                    <Search className="w-5 h-5 text-[#999da2]" />
                    <input
                      type="text"
                      className="flex-grow bg-transparent text-white outline-none mx-4 text-lg"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Type your favorite technical event name, it should be us!!"
                    />
                    <div className="flex items-center space-x-4">
                      <button type="button" className="hover:bg-[#3c4043] p-2 rounded-full transition-colors duration-200">
                        <Camera className="w-5 h-5 text-[#999da2]" />
                      </button>
                      <button
                        type="button"
                        onClick={handleVoiceInput}
                        className={`hover:bg-[#3c4043] p-2 rounded-full transition-colors duration-200 ${isListening ? 'bg-red-500' : ''}`}
                      >
                        <Mic className="w-5 h-5 text-[#999da2]" />
                      </button>
                    </div>
                  </div>
                </form>

                <div className="flex justify-center mt-8 space-x-3">
                  <button
                    onClick={() => window.open("https://discord.gg/xNtTUe9Euk", "_blank")}
                    className="px-6 py-2 bg-[#303134] text-[#e8eaed] text-sm rounded-md hover:border-[#5f6368] border border-transparent ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] transition-all duration-200"
                  >
                    Quant Search
                  </button>
                  <button onClick={() => window.location.href = REDIRECT_URL} className="px-6 py-2 bg-[#303134] text-[#e8eaed] text-sm rounded-md hover:border-[#5f6368] border border-transparent ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] transition-all duration-200">
                    I'm Feeling Lucky
                  </button>
                </div>
              </div>
            </main>

            <footer className="w-full bg-[#171717] absolute bottom-0">
              <div className="border-b border-[#3c4043] p-4">
                <span className="text-[#999da2]">India</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-4 text-sm">
                <div className="flex flex-wrap gap-6">
                  <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200">About</a>
                  <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200">Advertising</a>
                  <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200">Business</a>
                  <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200">How Search works</a>
                </div>
                <div className="flex flex-wrap gap-6 mt-4 sm:mt-0">
                  <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200">Privacy</a>
                  <a href={REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200">Terms</a>
                  <button onClick={() => window.location.href = REDIRECT_URL} className="text-[#999da2] hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>
            </footer>
          </div>

          <div
            className="absolute inset-0 w-full min-h-screen bg-black bg-opacity-80"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)'
            }}
          />
        </div>

        <div
          className={`fixed inset-x-0 top-0 flex items-start justify-center transition-all duration-1000`}
          style={{
            zIndex: 55,
            transform: showGamePrompt
              ? 'translateY(10px) rotateX(-25deg)'
              : 'translateY(-100%) rotateX(-25deg)',
            transformOrigin: 'center top',
            perspective: 'none',
            opacity: showGamePrompt ? 1 : 0
          }}
        >
          <div className="text-center space-y-4 bg-black bg-opacity-90 p-3 rounded-lg border-2 border-white-500  w-full max-w-3xl" id='invitation'>
            <div className="text-white text-xl font-mono mb-4">
              You're speaking our language. Up for a challenge?
            </div>
            <div className="flex space-x-10 justify-center">
              <button
                // onClick={() => handleGameResponse('play')}
                onClick={() => {
                  var glitch = document.getElementById('glitch');
                  var invitation = document.getElementById('invitation');

                  handleGameResponse('play');

                  glitch.style.transform = 'rotateX(90deg)';
                  invitation.style.transition = 'transform 2s';
                  invitation.style.transform = ' rotateX(-90deg)';

                  // start terminal 
                  setTimeout(() => {
                    props.startTerminal();
                  }, 0)
                }}
                className="px-4 py-2 bg-cyan-500 text-black font-mono text-sm hover:bg-cyan-400 transition-colors transform hover:scale-105"
              >
                I want to play
              </button>
              <button
                onClick={() => handleGameResponse('no')}
                className="px-4 py-2 bg-red-500 text-black font-mono text-sm hover:bg-red-400 transition-colors transform hover:scale-105"
              >
                Return to safety
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEasterEgg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-cyan-500 font-mono animate-pulse space-y-1">
          <div>{`> Initialization complete.`}</div>

        </div>
      )}
    </div>
  );
};

export default SearchInterface;