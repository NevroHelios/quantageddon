import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const [theme, setTheme] = useState('cyberpunk');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const animationRef = useRef(null);

  const fullWelcomeMessage = [
    '',
    '                Welcome to QuantOS Terminal v1.0.0               ',
    '════════════════════════════════════════════════════════════════',
    '                                                                ',
    ' ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗ ██████╗ ███████╗',
    '██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██╔═══██╗██╔════╝',
    '██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║███████╗',
    '██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║╚════██║',
    '╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝███████║',
    ' ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚══════╝',
    '                                                                ',
    '════════════════════════════════════════════════════════════════',
    ' • Type "help" for available commands                           ',
    ' • Type "theme" to change colors                               ',
    ' • Running on [CPU: Potato Threadripper] [RAM: 128GB DDR5]       ',
    ' • Quantum Processing Unit: Active | Qubit Status: Stable      ',
    '════════════════════════════════════════════════════════════════',
    ''
  ];

  // Scroll to bottom whenever history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Keep input focused
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('click', focusInput);
    return () => window.removeEventListener('click', focusInput);
  }, []);

  // Welcome message animation
  useEffect(() => {
    let startTime = null;
    const totalDuration = 4000;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress >= totalDuration) {
        setHistory(fullWelcomeMessage);
        return;
      }
      
      const totalChars = fullWelcomeMessage.join('\n').length;
      const charsToShow = Math.floor((progress / totalDuration) * totalChars);
      
      let currentChar = 0;
      let currentLines = [];
      
      for (const line of fullWelcomeMessage) {
        if (currentChar + line.length <= charsToShow) {
          currentLines.push(line);
          currentChar += line.length + 1;
        } else if (currentChar < charsToShow) {
          currentLines.push(line.substring(0, charsToShow - currentChar));
          break;
        } else {
          break;
        }
      }
      
      setHistory(currentLines);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (showWelcome) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showWelcome]);

  const themes = {
    cyberpunk: {
      bg: 'bg-gray-900',
      text: 'text-cyan-500',
      highlight: 'text-pink-500',
      error: 'text-red-500',
      success: 'text-purple-400',
      prompt: 'text-yellow-400',
      border: 'border-cyan-500'
    },
    quantum: {
      bg: 'bg-[#0a192f]',
      text: 'text-[#64ffda]',
      highlight: 'text-[#ff79c6]',
      error: 'text-red-500',
      success: 'text-[#50fa7b]',
      prompt: 'text-[#bd93f9]',
      border: 'border-[#64ffda]'
    },
    matrix: {
      bg: 'bg-black',
      text: 'text-green-500',
      highlight: 'text-green-300',
      error: 'text-red-500',
      success: 'text-green-400',
      prompt: 'text-yellow-500',
      border: 'border-green-500'
    }
  };


  const resources = {
    books: {
      type: 'directory',
      content: {
        'quant-basics.txt': '# Essential Quant Books\n\n- "Python for Finance" by Yves Hilpisch\n- "Advances in Financial Machine Learning" by Marcos Lopez de Prado\n- "Machine Learning for Asset Managers" by Marcos Lopez de Prado\n- "Inside the Black Box" by Rishi K. Narang',
        'math-stats.txt': '# Mathematics & Statistics Books\n\n- "Stochastic Calculus for Finance I & II" by Steven Shreve\n- "Options, Futures, and Other Derivatives" by John Hull\n- "Statistical Inference" by Casella and Berger'
      }
    },
    tutorials: {
      type: 'directory',
      content: {
        'video-courses.txt': '# Free Video Resources\n\n- Quantopian Lecture Series on YouTube\n- QuantStart Machine Learning for Trading\n- Two Sigma Financial Modeling Challenge\n- World Quant University Free Courses',
        'online-platforms.txt': '# Learning Platforms\n\n- Coursera: Financial Engineering and Risk Management\n- edX: Computational Investing\n- Udacity: Artificial Intelligence for Trading\n- DataCamp: Python for Finance'
      }
    },
    repositories: {
      type: 'directory',
      content: {
        'frameworks.txt': '# Popular Quant Frameworks\n\n- QuantConnect: Open-source algorithmic trading\n- Zipline: Pythonic algorithmic trading\n- Backtrader: Python backtesting library\n- TA-Lib: Technical Analysis Library',
        'starter-code.txt': '# GitHub Repositories\n\n- google/tf-quant-finance\n- microsoft/qlib\n- enigmampc/catalyst\n- quantopian/research_public'
      }
    }
  };

  // Updated commands object with new quant command
  const commands = {
    quant: () => [
      '╔══════════════════ QUANTAGEDDON ══════════════════╗',
      '║                                                  ║',
      '║                                                  ║',
      '║                                                  ║',
      '╠══════════════════════════════════════════════════╣',
      '║ Competition Link: xyz                            ║',
      '║                                                  ║',
      '║ Kaggle Comp Details:                             ║',
      '║ • Stock market prediction challenge              ║',
      '║ • Machine learning-based market analysis         ║',
      '║                                                  ║',
      '║ Timeline:                                        ║',
      '║ Day 1: Kickoff & Dataset Release                 ║',
      '║ Day 2: Development & Public Leaderboard          ║',
      '║ Day 3: Feature Engineering Workshop              ║',
      '║ Day 4: Finals & Winner Announcement              ║',
      '║                                                  ║',
      '║ Evaluation:                                      ║',
      '║ • 80% Model Performance                          ║',
      '║ • 20% Documentation                              ║',
      '║                                                  ║',
      '║ Required Skills:                                 ║',
      '║ • Python                                         ║',
      '║ • Financial Analysis                             ║',
      '║ • Machine Learning                               ║',
      '║                                                  ║',
      '║ Type "ls" to explore learning resources          ║',
      '╚══════════════════════════════════════════════════╝'
    ],
    help: () => [
      '┌─ Essential Commands ─────────────────────┐',
      '│ quant   - View competition details       │',
      '│ ls      - List available resources       │',
      '│ cat     - View resource contents         │',
      '├─ Other Commands ──────────────────────────┤',
      '│ pwd     - Print working directory        │',
      '│ clear   - Clear terminal                 │',
      '│ theme   - Change color theme             │',
      '│ date    - Show current date and time     │',
      '│ tree    - Show resource structure        │',
      '│ whoami  - Show current user              │',
      '└─────────────────────────────────────────┘'
    ],
    ls: () => {
      const currentLevel = currentPath === '~' ? resources : 
        currentPath.split('/').slice(1).reduce((acc, curr) => acc[curr].content, resources);
      return ['Directory contents:', '', ...Object.keys(currentLevel)];
    },
    pwd: () => [currentPath],
    cd: (dir) => {
      if (dir === '..') {
        if (currentPath === '~') return ['Already at root'];
        setCurrentPath(currentPath.split('/').slice(0, -1).join('/') || '~');
        return ['Directory changed'];
      }
      if (dir === '~') {
        setCurrentPath('~');
        return ['Directory changed'];
      }
      const currentLevel = currentPath === '~' ? resources : 
        currentPath.split('/').slice(1).reduce((acc, curr) => acc[curr].content, resources);
      if (currentLevel[dir] && currentLevel[dir].type === 'directory') {
        setCurrentPath(currentPath === '~' ? `~/${dir}` : `${currentPath}/${dir}`);
        return ['Directory changed'];
      }
      return [`Directory '${dir}' not found`];
    },
    cat: (file) => {
      const currentLevel = currentPath === '~' ? resources : 
        currentPath.split('/').slice(1).reduce((acc, curr) => acc[curr].content, resources);
      if (currentLevel[file]) {
        return ['', currentLevel[file], ''];
      }
      return [`File '${file}' not found`];
    },
    clear: () => {
      setShowWelcome(false);
      setHistory([]);
      return [];
    },
    theme: (newTheme) => {
      if (newTheme && themes[newTheme]) {
        setTheme(newTheme);
        return [`Theme changed to ${newTheme}`];
      }
      return [
        'Available themes:',
        '- matrix ',
        '- cyberpunk (default)',
        'Usage: theme <theme-name>'
      ];
    },
    date: () => [new Date().toLocaleString()],
    tree: () => {
      const buildTree = (obj, prefix = '') => {
        return Object.keys(obj).map((key, index, arr) => {
          const isLast = index === arr.length - 1;
          const item = obj[key];
          const connector = isLast ? '└── ' : '├── ';
          const newPrefix = prefix + (isLast ? '    ' : '│   ');
          
          if (item.type === 'directory') {
            return [
              prefix + connector + key,
              ...buildTree(item.content, newPrefix)
            ];
          }
          return prefix + connector + key;
        }).flat();
      };
      
      return ['Directory structure:', '', ...buildTree(resources)];
    },
    whoami: () => ['guest@resource-terminal'],
    echo: (...args) => [args.join(' ')],
    open: (url) => {
      if (url === 'quantageddon.com') {
        return ['Opening Quantageddon.com...'];
      }
      return ['Usage: open quantageddon.com'];
    }
  };

  const getSuggestions = (inputValue) => {
    const currentLevel = currentPath === '~' ? resources : 
      currentPath.split('/').slice(1).reduce((acc, curr) => acc[curr].content, resources);
    
    const args = inputValue.split(' ');
    const command = args[0];
    const partial = args[args.length - 1];

    if (args.length === 1) {
      return Object.keys(commands).filter(cmd => cmd.startsWith(partial));
    } else if (['cd', 'cat'].includes(command)) {
      return Object.keys(currentLevel).filter(item => item.startsWith(partial));
    }
    return [];
  };

  const handleCommand = (cmd) => {
    if (!cmd.trim()) return;
    
    const [command, ...args] = cmd.trim().split(' ');
    const output = commands[command] 
      ? commands[command](...args) 
      : [`Command '${command}' not found. Type 'help' for available commands`];
    
    setHistory(prev => [...prev, `${currentPath} $ ${cmd}`, ...output]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    // Ensure cursor stays visible
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = getSuggestions(input);
      if (matches.length === 1) {
        const args = input.split(' ');
        args[args.length - 1] = matches[0];
        setInput(args.join(' '));
      } else if (matches.length > 0) {
        setSuggestions(matches);
        setShowSuggestions(true);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      setShowSuggestions(false);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div 
      ref={terminalRef}
      className={`${themes[theme].bg} p-4 font-mono h-screen overflow-y-auto`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4">
        {history.map((line, i) => (
          <div 
            key={`history-${i}`} 
            className={`whitespace-pre-wrap ${
              line.startsWith('~') || line.includes('$') 
                ? themes[theme].prompt
                : line.includes('not found') 
                  ? themes[theme].error 
                  : themes[theme].text
            }`}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center sticky bottom-0">
        <span className={`mr-2 ${themes[theme].prompt}`}>{currentPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`bg-transparent border-none outline-none flex-grow ${themes[theme].text} caret-current`}
          autoFocus
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className={`mt-2 ${themes[theme].text}`}>
          {suggestions.join('  ')}
        </div>
      )}
    </div>
  );
};

export default Terminal;