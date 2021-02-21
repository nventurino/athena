import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  updateProgress: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  root: {
    // width: "100%",
    width: "calc(100% - 30px)",
    marginLeft: '15px',
    overflow: "auto",
    height: "calc(100% - 43px)",
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    left: "0",
    top: "0",
  },
  track: {
    position: "relative",
    height: "20px",
    width: "80%",
    background: "#00000088",
    borderRadius: "4px",
    border: "2px solid #00000033",
  },
  progress: {
    position: "absolute",
    height: "20px",
    background: "#ffffffaa",
    top: "0px",
    left: "0px",
    borderRadius: "4px",
  },
  control: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
});

export default function VideoPlayer(props) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const envRef = useRef(null);

  useEffect(() => {
    const current = envRef?.current;
    const setFromEvent = () => {
      props.updateProgress(envRef?.current?.currentTime);
      setProgress(envRef?.current?.currentTime || 0);
    };
    envRef?.current?.addEventListener("timeupdate", setFromEvent);
    return () => {
      current?.removeEventListner("timeupdate", setFromEvent);
    };
  }, []);

  function play() {
    setPlaying(!playing);
    playing ? envRef.current?.pause() : envRef.current?.play();
    console.log(playing);
  }

  const duration = envRef?.current?.duration || 1;

  console.log("render");

  return (
    <div className={classes.root}>
      <video className={classes.video} ref={envRef}>
        <source src={props.url} />
      </video>
      <div className={classes.control}>
        <div className={classes.track}>
          <div className={classes.progress} style={{ width: `${(progress / duration) * 100}%` }}></div>
        </div>
        <div className={classes.play} onClick={play}>
          {playing ? "pause" : "play"}
        </div>
      </div>
    </div>
  );
}
