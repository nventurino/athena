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
          <UploadZone
            setEmotionFaceData={setEmotionFaceData}
            setEmotionTextData={setEmotionTextData}
            setTranscript={setTranscript}
            updateProgress={updateProgress}
            startProgress={startProgress}
          />
          <div className="Progress-Container">{showProgres ? <Progress progress={progress} /> : null}</div>
        </div>
        <div key="d" data-grid={{ x: 0, y: 3, w: 6, h: 10, i: "c" }} className="results item">
          {emotionTextData != null ? <EmotionTextChart data={emotionTextData} /> : null}
          {emotionFaceData.length > 0 ? <EmotionFaceChart data={emotionFaceData} /> : null}
          {transcript != null ? <Transcript data={transcript} /> : null}
        </div>
        <div key="e" data-grid={{ x: 6, y: 3, w: 6, h: 10 }} className="transcripts item">
          <Transcription transcription={transcription} url="sample.json" />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
