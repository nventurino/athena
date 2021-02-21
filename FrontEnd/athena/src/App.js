import React from "react";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import logo from "./logo.svg";
import "./App.css";

import UploadZone from "./components/UploadZone";
import Progress from "./components/Progress";
import EmotionTextChart from "./components/EmotionTextChart";
import EmotionFaceChart from "./components/EmotionFaceChart";
import Transcript from "./components/Transcript";

// import emotionFaceData from './fakeData/faceEmotion';

import Transcription from "./components/Transcription";

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const [showProgres, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const [emotionFaceData, setEmotionFaceData] = useState([]);
  const [emotionTextData, setEmotionTextData] = useState(null);
  const [transcript, setTranscript] = useState(null);

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

  // const updateEmotionFaceData = (data) => {
  //   setEmotionFaceData(data);
  // }

  //// Upload your video file to get started

  return (
    <div className="App">
      <ResponsiveGridLayout
        className="layout"
        isResizable
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={30}
        onLayoutChange={() => {}}
      >
        <header key="header" data-grid={{ x: 0, y: 0, w: 11.5, h: 5, static: true }} className="App-header">
          <img className="Header-Logo" src="/athena_logo.jpeg" />
          <div className="Header-Name">Athena AI</div>
        </header>
        <div key="text" data-grid={{ x: 3, y: 2, w: 6, h: 1.5 }} className="Text-Explanation">
          <div>Your humble assistant is ready to summarize your session notes.</div>
        </div>
        <div key="c" data-grid={{ x: 4, y: 2, w: 4, h: 8 }} className="uploadContainer">
          {!showProgres ? (
            <UploadZone
              setEmotionFaceData={setEmotionFaceData}
              setEmotionTextData={setEmotionTextData}
              setTranscript={setTranscript}
              updateProgress={updateProgress}
              startProgress={startProgress}
            />
          ) : (
            <div className="Progress-Container">
              <div> Uploading file...</div>
              <Progress progress={progress} />
            </div>
          )}
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
