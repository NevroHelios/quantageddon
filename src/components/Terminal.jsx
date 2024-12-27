import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

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
    '██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗ ██████╗ ███████╗',
    '██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██╔═══██╗██╔════╝',
    '██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║███████╗',
    '██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║╚════██║',
    '╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝███████║',
    '╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚══════╝',
    '                                                                ',
    '════════════════════════════════════════════════════════════════',
    '• Type "help" for available commands                           ',
    '• Type "theme" to change colors                               ',
    '• Running on [CPU: Potato Threadripper] [RAM: 128GB DDR5]       ',
    '• Quantum Processing Unit: Active | Qubit Status: Stable      ',
    '════════════════════════════════════════════════════════════════',
    ''
  ].join('\n');

  // Scroll to bottom whenever history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    
    // Add input event listener to input ref
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('input', scrollToBottom);
    }

    // Cleanup
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', scrollToBottom);
      }
    };
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
        setHistory(fullWelcomeMessage.split('\n'));
        return;
      }
      
      const totalChars = fullWelcomeMessage.length;
      const charsToShow = Math.floor((progress / totalDuration) * totalChars);
      
      setHistory(fullWelcomeMessage.substring(0, charsToShow).split('\n'));
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
      bg: 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900',
      text: 'text-cyan-500 hover:text-cyan-400 transition-colors',
      highlight: 'text-pink-500 hover:text-pink-400 transition-colors',
      error: 'text-red-500',
      success: 'text-purple-400',
      prompt: 'text-yellow-400',
      border: 'border-cyan-500',
      link: 'text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1'
    },
    quantum: {
      bg: 'bg-gradient-to-b from-[#0a192f] via-[#0c1b2b] to-[#0a192f]',
      text: 'text-[#64ffda] hover:text-[#7affda] transition-colors',
      highlight: 'text-[#ff79c6] hover:text-[#ff89d6] transition-colors',
      error: 'text-red-500',
      success: 'text-[#50fa7b]',
      prompt: 'text-[#bd93f9]',
      border: 'border-[#64ffda]',
      link: 'text-[#64ffda] hover:text-[#7affda] underline flex items-center gap-1'
    }
  };




  const resources = {
    books: {
      type: 'directory',
      content: {
        'quant-basics.txt': `# Essential Quant Books

## Modern Classics
- [Python for Finance](https://www.oreilly.com/library/view/python-for-finance/9781492024323/) by Yves Hilpisch
- [Advances in Financial Machine Learning](https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086) by Marcos Lopez de Prado
- [Machine Learning for Asset Managers](https://www.cambridge.org/core/books/machine-learning-for-asset-managers/6D9211305EA2E425D33A9F38D0AE3545) by Marcos Lopez de Prado

## Deep Dive Materials
![Quant Books Collection](https://dlt.mobi/wp-content/uploads/2021/03/quant-community-logo.png)

### Additional Resources
- Code samples on [GitHub](https://github.com/topics/quantitative-finance)
- Join our [Discord Community](https://discord.gg/quantfinance)`,

        'math-stats.txt': `# Mathematics & Statistics Books

## Foundation Texts
1. [Stochastic Calculus for Finance I & II](https://link.springer.com/book/10.1007/978-0-387-22527-2) by Steven Shreve
2. [Options, Futures, and Other Derivatives](https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000006417) by John Hull

## Advanced Topics
\`\`\`python
# Example of stochastic process simulation
import numpy as np

def geometric_brownian_motion(S0, mu, sigma, T, N):
    dt = T/N
    t = np.linspace(0, T, N)
    W = np.random.standard_normal(size = N)
    W = np.cumsum(W)*np.sqrt(dt)
    return S0 * np.exp((mu - 0.5 * sigma**2)*t + sigma*W)
\`\`\`

### Online Courses
Visit our [Learning Portal](https://quantlearning.com) for interactive courses.`
      }
    },
    tutorials: {
      type: 'directory',
      content: {
        'video-courses.txt': `# Free Video Resources

## Top Playlists
1. [Quantopian Lecture Series](https://www.youtube.com/playlist?list=PLQVvvaa0QuDcOdF96TBtRtuQksErCEBYZ)
2. [QuantStart Machine Learning](https://www.youtube.com/c/quantstart)

![Tutorial Preview](/api/placeholder/600/300)

## Interactive Notebooks
- Access our [Jupyter Collection](https://github.com/jupyter/jupyter/wiki)
- Try our [Google Colab Templates](https://colab.research.google.com)`,

        'online-platforms.txt': '# Learning Platforms\n\n- [Coursera: Financial Engineering](https://www.coursera.org/learn/financial-engineering-1)\n- [edX: Computational Investing](https://www.edx.org/learn/investing)\n- [Udacity: AI for Trading](https://www.udacity.com/course/ai-for-trading--nd880)'
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
      '├─ Other Commands ─────────────────────────┤',
      '│ pwd     - Print working directory        │',
      '│ clear   - Clear terminal                 │',
      '│ theme   - Change color theme             │',
      '│ date    - Show current date and time     │',
      '│ tree    - Show resource structure        │',
      '│ whoami  - Show current user              │',
      '└──────────────────────────────────────────┘'
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
        // Return special object to indicate markdown content
        return [{
          type: 'markdown',
          content: currentLevel[file]
        }];
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
        '- quantum ',
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
    let output = commands[command] 
      ? commands[command](...args) 
      : [`Command '${command}' not found. Type 'help' for available commands`];
    
    // Flatten output array to remove empty lines
    output = output.filter(line => line !== '');
    
    setHistory(prev => [
      ...prev,
      `${currentPath} $ ${cmd}`,
      ...output
    ]);
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const renderOutput = (line) => {
    // Handle string output
    if (typeof line === 'string') {
      return (
        <div 
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
      );
    }

    // Handle object output (including markdown)
    if (typeof line === 'object' && line !== null) {
      if (line.type === 'markdown') {
        return (
          <div className={`markdown-content ${themes[theme].text} prose prose-invert max-w-none p-4`}>
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={themes[theme].link}
                  />
                ),
                img: ({node, ...props}) => (
                  <img
                    {...props}
                    className="max-w-full h-auto rounded-lg my-4"
                    loading="lazy"
                  />
                ),
                code: ({node, inline, ...props}) => (
                  <code
                    {...props}
                    className={`${inline ? 'bg-gray-800 px-1 rounded' : 'block bg-gray-800 p-4 rounded-lg'}`}
                  />
                ),
                pre: ({node, ...props}) => (
                  <pre
                    {...props}
                    className="bg-gray-800 p-4 rounded-lg overflow-x-auto"
                  />
                )
              }}
            >
              {line.content}
            </ReactMarkdown>
          </div>
        );
      }
      return <div>{JSON.stringify(line)}</div>;
    }
    return null;
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

  // Add this new function
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Modify your input handler to include scrolling
  const handleInput = (e) => {
    // ...existing input handling code...
    scrollToBottom();
  };

  return (
    <div 
      ref={terminalRef}
      className={`${themes[theme].bg} p-4 font-mono h-screen overflow-y-auto`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4">
        {history.map((line, i) => (
          <div key={`history-${i}`}>
            {renderOutput(line)}
          </div>
        ))}
      </div>
      
      <div className="flex items-center sticky bottom-0 bg-opacity-90 py-2">
        <span className={`mr-2 ${themes[theme].prompt}`}>{currentPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`bg-transparent border-none outline-none flex-grow ${themes[theme].text} caret-current`}
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className={`mt-2 p-2 rounded ${themes[theme].bg} border ${themes[theme].border} sticky bottom-16`}>
          <div className={`${themes[theme].text} flex flex-wrap gap-2`}>
            {suggestions.map((suggestion, index) => (
              <span 
                key={index}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  const args = input.split(' ');
                  args[args.length - 1] = suggestion;
                  setInput(args.join(' '));
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Command history preview */}
      {historyIndex >= 0 && (
        <div className={`absolute bottom-16 right-4 ${themes[theme].text} opacity-50`}>
          History: {commandHistory.length - historyIndex}/{commandHistory.length}
        </div>
      )}

      {/* Theme indicator */}
      <div className={`fixed top-4 right-4 ${themes[theme].text} opacity-50 text-sm`}>
        Theme: {theme}
      </div>

      {/* Help hint */}
      <div className={`fixed bottom-4 right-4 ${themes[theme].text} opacity-50 text-sm`}>
        Type 'help' for commands
      </div>
    </div>
  );
};

export default Terminal;