import React, { useState, useRef } from 'react';
import Board from './components/Board';

function App() {
  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef<number>();
  scoreRef.current = score;

  const addToScore = (points: number) => {
    setScore(scoreRef.current! + points);
  }

  return (
    <div className="App">
      <div className="top-bar">
        <span>2048 Clone</span>
        <span>Score:  {score}</span>
      </div>
      <Board addToScore={addToScore}/>
      <h3 style={{fontFamily: "monospace", fontSize: "1.9em"}}>By Sandy Chadalavada</h3>
    </div>
  );
}

export default App;
