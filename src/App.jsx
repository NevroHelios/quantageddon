import { useState } from "react";
import SearchInterface from "./components/SearchInterface";
import Terminal from "./components/Terminal";

const App = () => {
  const [isTerminal, setIsTerminal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startTerminal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsTerminal(!isTerminal);
    }, 1000); 
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`
          absolute w-full h-full transition-opacity duration-1 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-100'}
        `}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {isTerminal ? (
          <Terminal />
        ) : (
          <SearchInterface startTerminal={startTerminal} />
        )}
      </div>
    </div>
  );
};

export default App;