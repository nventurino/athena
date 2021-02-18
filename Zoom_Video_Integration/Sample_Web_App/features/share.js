import './feature.css';
import client from './join';


const mediaStream = client.getMediaStream();

const canvasId = 'capture-screen-canvas';
const start = async () => {
  try {
    await mediaStream.startShareScreen(canvasId);
    document.getElementById('capture-screen-canvas').classList.remove("hidden");
  } catch (error) {
    console.error(error);
  }
};

const stop = async () => {
  try {
    await mediaStream.stopShareScreen();
    document.getElementById('capture-screen-canvas').classList.add("hidden");
  } catch (error) {
    console.error(error);
  }
};

client.on('active-share-change', payload => {
  console.log(payload);
  if (payload.state === 'Active') {
    document.getElementById('remote-screen-canvas').classList.remove("hidden");
    mediaStream.startShareView(payload.activeUserId, document.getElementById('remote-screen-canvas'));
  } else if (payload.state === 'Inactive') {
    mediaStream.stopShareView();
    document.getElementById('remote-screen-canvas').classList.add("hidden");
  }
});

client.on('share-content-dimension-change',payload=>{
  if (payload.type === "sended") {
    // local capture dimension;
    // viewportElement.style.width = `${payload.width}px`;
    // viewportElement.style.height = `${payload.height}px`;
    
  } else {
  }
 })


document.getElementById('startCaptureShare').addEventListener('click', start);
document.getElementById('stopCaptureShare').addEventListener('click', stop);