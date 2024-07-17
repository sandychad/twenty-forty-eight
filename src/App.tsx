import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1>2048</h1>
      <Board />
      <h3 style={{fontFamily: "monospace", fontSize: "1.9em"}}>By Sandy Chadalavada</h3>
    </div>
  );
}

export default App;
