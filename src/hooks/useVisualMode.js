import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    setHistory(prev => {
      if (replace) {
        prev.pop()
      }
      prev.push(newMode)
      return prev;
    })
    setMode(newMode);
  }

  function back() {
    setHistory(prev => {
      if (prev.length > 1) {
        prev.pop()
        setMode(() => {        
          return prev[prev.length - 1]
        })
      }
      return prev
    })
  }

  return { mode, transition, back };
}
