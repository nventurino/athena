import React from 'react';
import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import UploadZone from './components/UploadZone';
import Progress from './components/Progress';
import EmotionTextChart from './components/EmotionTextChart';



function App() {

  const [showProgres, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);



  var emotionTextData = {
    "response_dict": {
        "angry": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "caring": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "confident": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "confused": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "fearful": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "happy": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "sad": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        },
        "vulnerable": {
            "medium": 0,
            "mild": 0,
            "strong": 0
        }
    }
}


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

      <div className="results">
        <EmotionTextChart data={emotionTextData.response_dict} />
      </div>
    </div>
  );
}

export default App;
