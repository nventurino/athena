import React from "react";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import logo from "./logo.svg";
import "./App.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import UploadZone from "./components/UploadZone";
import Progress from "./components/Progress";
import EmotionTextChart from "./components/EmotionTextChart";
import Transcription from "./components/Transcription";

const ResponsiveGridLayout = WidthProvider(Responsive);

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

  const transcription = [
    {
      time: "2:00",
      text: "hello",
      person: "Mark",
    },
    {
      time: "2:01",
      text: "hello",
      person: "me",
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
      <ResponsiveGridLayout
        className="layout"
        isResizable
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={() => {}}
      >
        <header key="header" data-grid={{ x: 0, y: 0, w: 12, h: 1, static: true }} className="App-header">
          Welcome to Athena
        </header>
        <div key="c" data-grid={{ x: 3, y: 1, w: 6, h: 3 }} className="uploadContainer item">
          <UploadZone updateProgress={updateProgress} startProgress={startProgress} />
          {showProgres ? <Progress progress={progress} /> : null}
        </div>
        <div key="d" data-grid={{ x: 0, y: 3, w: 6, h: 10, i: "c" }} className="results item">
          <EmotionTextChart data={emotionTextData.response_dict} />
        </div>
        <div key="e" data-grid={{ x: 6, y: 3, w: 6, h: 10 }} className="transcripts item">
          <Transcription transcription={transcription} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
