import './feature.css';
import client from './join';

const mediaStream = client.getMediaStream();

const localCanvasId = 'local-capture';
const remoteCanvasId = 'remote-video';
const start = async () => {
  try {
    if (mediaStream && !mediaStream.isCapturingVideo()) {
      document.getElementById(localCanvasId).classList.remove("hidden");
      await mediaStream.startVideo(localCanvasId);
    }
  } catch (error) {
    console.error(error);
  }
}

const stop = async () => {
  try {
    if (mediaStream && mediaStream.isCapturingVideo()){
      await mediaStream.stopVideo();
      document.getElementById(localCanvasId).classList.add("hidden");
    }
  } catch (error) {
    console.error(error);
  }
}

const activeCallback = async (payload) => {
  console.log(`event: video-active-change! Video of id ${payload.id} is ${payload.state}.`);
  if (payload.state === 'Active' && !mediaStream.isReceivingVideo() && payload.id !== mediaStream.getCurrentUserVideoSsrc()) {
    const renderCanvas = document.getElementById(remoteCanvasId);
    await mediaStream.renderVideo(renderCanvas, 2, payload.id);
    document.getElementById(remoteCanvasId).classList.remove("hidden");
  } else {
    if (payload.state === 'Inactive' && mediaStream.isReceivingVideo()) {
      await mediaStream.stopRenderVideo();
      document.getElementById(remoteCanvasId).classList.add("hidden");
    }
  }
};

const decodeCallback = (payload) => {
  console.log(`event: video-decode-status-change! Video decode initial ${payload.state}`);
};
const encodeCallback = (payload) => {
  console.log(`event: video-encode-status-change! Video encode initial ${payload.state}`);
};

client.on('video-decode-status-change', decodeCallback);
client.on('video-encode-status-change', encodeCallback);
client.on('video-active-change', activeCallback);

document.getElementById('startCaptureVideo').addEventListener('click', start);
document.getElementById('stopCaptureVideo').addEventListener('click', stop);
