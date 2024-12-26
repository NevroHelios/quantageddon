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
  const [welcomeMessage, setWelcomeMessage] = useState(['']);
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

  useEffect(() => {
    let startTime = null;
    let currentIndex = 0;
    const totalDuration = 4000; // 3 seconds total
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate how many characters should be shown by now
      const totalChars = fullWelcomeMessage.join('\n').length;
      const charsToShow = Math.floor((progress / totalDuration) * totalChars);
      
      if (charsToShow >= totalChars) {
        setHistory(fullWelcomeMessage);
        return;
      }
      
      let currentChar = 0;
      let currentLines = [''];
      let currentLineIndex = 0;
      
      // Build up the message character by character
      for (const line of fullWelcomeMessage) {
        if (currentChar + line.length <= charsToShow) {
          currentLines[currentLineIndex] = line;
          currentChar += line.length + 1; // +1 for newline
          currentLineIndex++;
          currentLines[currentLineIndex] = '';
        } else if (currentChar < charsToShow) {
          const remainingChars = charsToShow - currentChar;
          currentLines[currentLineIndex] = line.substring(0, remainingChars);
          break;
        } else {
          break;
        }
      }
      
      setWelcomeMessage(currentLines);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
    javascript: {
      type: 'directory',
      content: {
        'basics.txt': '# JavaScript Fundamentals\n\n- Variables and Data Types\n- Control Flow\n- Functions\n- Objects and Arrays',
        'advanced.txt': '# Advanced JavaScript\n\n- Closures\n- Promises\n- Async/Await\n- Design Patterns',
        'frameworks.txt': '# Popular Frameworks\n\n- React\n- Vue\n- Angular\n- Svelte'
      }
    },
    python: {
      type: 'directory',
      content: {
        'getting-started.txt': '# Python Setup Guide\n\n- Installation\n- Virtual Environments\n- Package Management\n- IDE Setup',
        'data-structures.txt': '# Data Structures\n\n- Lists\n- Dictionaries\n- Sets\n- Tuples',
        'libraries.txt': '# Essential Libraries\n\n- NumPy\n- Pandas\n- Matplotlib\n- Requests'
      }
    },
    tools: {
      type: 'directory',
      content: {
        'git.txt': '# Git Commands\n\n- git init\n- git add\n- git commit\n- git push',
        'docker.txt': '# Docker Basics\n\n- Containers\n- Images\n- Docker Compose\n- Networks',
        'deployment.txt': '# Deployment Options\n\n- Heroku\n- Vercel\n- AWS\n- Digital Ocean'
      }
    }
  };

  const commands = {
    help: () => [
      '┌─ Available Commands ────────────────────┐',
      '│ ls      - List contents                │',
      '│ cd      - Change directory             │',
      '│ cat     - View file contents           │',
      '│ pwd     - Print working directory      │',
      '│ clear   - Clear terminal               │',
      '│ theme   - Change color theme           │',
      '│ date    - Show current date and time   │',
      '│ tree    - Show directory structure     │',
      '│ whoami  - Show current user            │',
      '│ echo    - Print text                   │',
      '│ open    - Open website                 │',
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
    
    if (command === 'open' && args[0] === 'quantageddon.com') {
      window.open('https://quantageddon.com', '_blank');
    }

    setHistory(prev => [...prev, `${currentPath} $ ${cmd}`, ...output]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = getSuggestions(input);
      if (matches.length === 1) {
        const args = input.split(' ');
        args[args.length - 1] = matches[0];
        setInput(args.join(' '));
      } else if (matches.length > 1) {
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
    <div className={`${themes[theme].bg} p-4 font-mono h-screen overflow-y-auto`}>
      <div className="mb-4">
        {welcomeMessage.map((line, i) => (
          <div 
            key={i} 
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
        {history.slice(welcomeMessage.length).map((line, i) => (
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
      <div className="flex items-center">
        <span className={`mr-2 ${themes[theme].prompt}`}>{currentPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`bg-transparent border-none outline-none flex-grow ${themes[theme].text}`}
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
