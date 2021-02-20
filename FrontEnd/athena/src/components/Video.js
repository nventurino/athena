import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default function VideoPlayer(props) {
  const [playing, setPlaying] = useState(false);
  const envRef = useRef(null);

  function play() {
    setPlaying(!playing);
    playing ? envRef.current?.pause() : envRef.current?.play();
  }

  return (
    <div>
      <video autoPlay muted loop ref={envRef}>
        <source src={props.url} />
      </video>
      <div click={play}>{playing ? "pause" : "play"}</div>
    </div>
  );
}
