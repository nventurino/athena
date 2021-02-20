import React from "react";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";

import logo from "./logo.svg";
import "./App.css";

import UploadZone from "./components/UploadZone";
import Progress from "./components/Progress";
import EmotionTextChart from "./components/EmotionTextChart";
import Transcripts from "./components/Transcripts";

function App() {
  const [showProgres, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  var emotionTextData = {
    response_dict: {
      angry: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      caring: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      confident: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      confused: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      fearful: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      happy: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      sad: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
      vulnerable: {
        medium: 0,
        mild: 0,
        strong: 0,
      },
    },
  };

  const transcripts = [
    {
      time: "2:00",
      text: "hello",
      person: "therapist",
    },
  ];

  const startProgress = () => {
    console.log("OK");
    setShowProgress(true);
    setProgress(0);
  };

  const updateProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <div className="App">
      <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <header key="a" data-grid={{ x: 0, y: 0, w: 12, h: 1, static: true }} className="App-header">
          Welcome to Athena
        </header>
        <div key="b" data-grid={{ x: 1, y: 1, w: 3, h: 1, minW: 2, maxW: 4 }} className="Progress-Container">
          {showProgres ? <Progress progress={progress} /> : null}
        </div>
        <div key="c" data-grid={{ x: 0, y: 2, w: 12, h: 1 }} className="uploadContainer">
          <UploadZone updateProgress={updateProgress} startProgress={startProgress} />
        </div>
        <div key="d" data-grid={{ x: 0, y: 3, w: 6, h: 6 }} className="results">
          <EmotionTextChart data={emotionTextData.response_dict} />
        </div>
        <div key="e" data-grid={{ x: 6, y: 3, w: 6, h: 6 }} className="transcripts">
          <Transcripts data={transcripts} />
        </div>
      </GridLayout>
    </div>
  );
}

export default App;
