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

import CircularProgress from '@material-ui/core/CircularProgress';

import { getTranscriptData, getEmotionText, getEmotionFaceData } from './api/HttpClient'

// import emotionFaceData from './fakeData/faceEmotion';

import Transcription from "./components/Transcription";

const ResponsiveGridLayout = WidthProvider(Responsive);

function App( { match } ) {
  const uniqueId = match.params.uniqueId;
  const [showProgres, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const [emotionFaceData, setEmotionFaceData] = useState([]);
  const [transcription, setTranscription] = useState([]);
  const [emotionTextData, setEmotionTextData] = useState(null);
  const [transcript, setTranscript] = useState(null);


  //

  //console.log('match' ,match);


  useEffect(() => {

    getTranscriptData(uniqueId,async function(data){

      // setTranscript(data.results);
      setTranscription(data.results.items);

      const emotionText = await getEmotionText(uniqueId);
      if(emotionText){
        setEmotionTextData(emotionText)
      }
    });

    getEmotionFaceData(uniqueId,function(data){
      setEmotionFaceData(data);
    });
  }, []);

  // const transcription = [
  //   {
  //     time: "2:00",
  //     text: "hello",
  //     person: "Mark",
  //   },
  //   {
  //     time: "2:01",
  //     text: "hello",
  //     person: "me",
  //   },
  // ];

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
      <header key="header" data-grid={{ x: 0, y: 0, w: 12, h: 5, static: true }} className="App-header">
        <img className="Header-Logo" src="/athena_logo.jpeg"/>
        <div className="Header-Name" >Athena AI</div>
      </header>
        <div key="emotionText" data-grid={{ x: 0, y: 3, w: 6, h: 10, i: "c" }} className="results item">
          <div className="Widget">
            <div className="Widget-Title">Text emotions</div>
              {emotionTextData != null ? <EmotionTextChart data={emotionTextData} /> : <div className="Loader-Container"><CircularProgress size={80} className="Dashboard-Loader" /></div> }
          </div>
        </div>
        <div key="emotionFace" data-grid={{ x: 0, y: 3, w: 6, h: 10, i: "c" }} className="results item">
          <div className="Widget">
            <div className="Widget-Title">Face emotions</div>
              {emotionFaceData.length > 0 ? <EmotionFaceChart data={emotionFaceData} /> : <div className="Loader-Container"><CircularProgress size={80} className="Dashboard-Loader" /></div> }
          </div>
        </div>
        <div key="transcript" data-grid={{ x: 0, y: 3, w: 6, h: 10, i: "c" }} className="results item">
          {transcript != null ? <Transcript data={transcript} /> : null}
        </div>
        <div key="transcription" data-grid={{ x: 6, y: 3, w: 6, h: 10 }} className="transcripts item">
          <Transcription transcription={transcription} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
