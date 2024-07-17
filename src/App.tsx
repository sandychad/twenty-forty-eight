import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <h1>2048</h1>
      <Game />
      <h3 style={{fontFamily: "monospace", fontSize: "2em"}}>By Sandy Chadalavada</h3>
    </div>
  );
}

export default App;
