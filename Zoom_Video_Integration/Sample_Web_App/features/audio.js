import './feature.css';
import client from './join';

const mediaStream = client.getMediaStream();

const updateState = () => {
    const isAudioMuted = mediaStream.isAudioMuted();
    const microphoneList = mediaStream.getMicList();
    const speakerList = mediaStream.getSpeakerList();
    const activeMicrophone = mediaStream.getActiveMicrophone();
    const activeSpeaker = mediaStream.getActiveSpeaker();
    // audio-mic-status audio-speaker-status audio-mute-status
    document.getElementById('audio-mic-status').value = "Mic:" + activeMicrophone;
    document.getElementById('audio-speaker-status').value = "Speaker:" + activeSpeaker;
    document.getElementById('audio-mute-status').value = isAudioMuted ? "muted" : "unmuted";
}

const start = async () => {
    await mediaStream.startAudio();
    document.getElementById('audio-status').classList.remove("hidden");
    document.getElementById('audio-mute-group').classList.remove("hidden");
    updateState();
  };
  
const stop = async () => {
    await mediaStream.stopAudio();
    document.getElementById('audio-status').classList.add("hidden");
    document.getElementById('audio-mute-group').classList.add("hidden");
    updateState();
  };

  const mute = async () => {
    const userId = client.getCurrentUserInfo().userId;
    try {
      await mediaStream.muteAudio(userId);
      updateState();
    } catch (error) {
      console.error(error);
    }
  };
  
  const unmute = async () => {
    const userId = client.getCurrentUserInfo().userId;
    try {
      await mediaStream.unmuteAudio(userId);
      updateState();
    } catch (error) {
      console.error(error);
    }
  };

  // If the user does not have any interactive actions on the page,
  // the web page may not be able to automatically play audio.
  client.on('auto-play-audio-failed',()=>{
    console.log('auto play failed, waiting user interaction');
  });

document.getElementById('startCaptureAudio').addEventListener('click', start);
document.getElementById('stopCaptureAudio').addEventListener('click', stop);
document.getElementById('muteCaptureAudio').addEventListener('click', mute);
document.getElementById('unmuteCaptureAudio').addEventListener('click', unmute);

