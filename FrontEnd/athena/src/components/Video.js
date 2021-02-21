import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "auto",
    height: "100%",
  },
  video: {
    width: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
});

export default function VideoPlayer(props) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const envRef = useRef(null);

  function play() {
    setPlaying(!playing);
    playing ? envRef.current?.pause() : envRef.current?.play();
  }

  console.log("render");

  return (
    <div className={classes.root}>
      <video className={classes.video} autoPlay muted loop ref={envRef}>
        <source src={props.url} />
      </video>
      <div click={play}>{playing ? "pause" : "play"}</div>
    </div>
  );
}
