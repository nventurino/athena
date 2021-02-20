import React from 'react';
import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import UploadZone from './components/UploadZone';
import Progress from './components/Progress';
import EmotionTextChart from './components/EmotionTextChart';
import EmotionFaceChart from './components/EmotionFaceChart';
import Transcript from './components/Transcript';

// import emotionFaceData from './fakeData/faceEmotion';



function App() {

  const [showProgres, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const [emotionFaceData, setEmotionFaceData] = useState([]);
  const [emotionTextData, setEmotionTextData] = useState(null);
  const [transcript, setTranscript] = useState(null);



  const startProgress = () => {
    console.log('OK')
    setShowProgress(true);
    setProgress(0);
  }

  const updateProgress = (progress) => {
    setProgress(progress);
  }

  // const updateEmotionFaceData = (data) => {
  //   setEmotionFaceData(data);
  // }

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
        <UploadZone
          setEmotionFaceData={setEmotionFaceData}
          setEmotionTextData={setEmotionTextData}
          setTranscript={setTranscript}
          updateProgress={updateProgress}
          startProgress={startProgress}
          />
      </div>

      <div className="results">
      {
        (emotionTextData != null) ?
          <EmotionTextChart data={emotionTextData} />
        : null
      }
      {
        (emotionFaceData.length > 0) ?
          <EmotionFaceChart data={emotionFaceData} />
        : null
      }
      {
        (transcript != null) ?
          <Transcript data={transcript} />
        : null
      }
      </div>
    </div>
  );
}

export default App;
