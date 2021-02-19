import React from 'react';
import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import UploadZone from './components/UploadZone';
import Progress from './components/Progress';



function App() {

  const [showProgres, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const startProgress = () => {
    console.log('OK')
    setShowProgress(true);
    setProgress(0);
  }

  const updateProgress = (progress) => {
    setProgress(progress);
  }

  return (
    <div className="App">
      <header className="App-header">
        Welcome to Athena
      </header>
      <div className="Progress-Container">
        {
          showProgres ?
            <Progress progress={progress} />
          : null
        }

      </div>
      <div className="uploadContainer">
        <UploadZone updateProgress={updateProgress} startProgress={startProgress} />
      </div>
    </div>
  );
}

export default App;
