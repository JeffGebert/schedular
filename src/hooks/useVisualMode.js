import React, {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

 function transition(newMode, replace =false) {
  setMode(newMode)
  setHistory([...history, newMode])
  if (replace === true) {
    setHistory([...history]);
  }
}
 function back() {
   setMode(history[history.length-2])
   setHistory([...history.slice(0,history.length-1)])
 }

  return { 
    mode, 
    transition,
    back
  };
}