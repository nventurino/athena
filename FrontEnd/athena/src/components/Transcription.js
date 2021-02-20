import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

Transcription.propTypes = {
  transcription: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      text: PropTypes.string,
      person: PropTypes.string,
    })
  ).isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  line: {
    color: "white",
    display: "flex",
    margin: "6px 12px",
  },
  meta: {
    width: "80px",
    textAlign: "right",
    paddingRight: "24px",
  },
  text: {
    flex: 3,
    textAlign: "left",
  },
  highlight: {
    color: "#8181ef",
  },
  name: {
    opacity: 0.8,
    marginBottom: "4px",
  },
});

export default function Transcription(props) {
  const classes = useStyles();
  // React.useEffect(() => {
  //   // const timer = setInterval(() => {
  //   //   setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   // }, 800);
  //   // return () => {
  //   //   clearInterval(timer);
  //   // };
  //   console.log("props", props);
  //   if (props) {
  //     setProgress(props.progress);
  //   }
  // }, [props.progress]);

  return (
    <div className={classes.root}>
      {props.transcription.map((t) => {
        return (
          <div className={classes.line}>
            <div className={classes.meta}>
              <span>{t.time}</span>
            </div>
            <div className={t.person === "me" ? `${classes.text}` : `${classes.text} ${classes.highlight}`}>
              <div className={classes.name}>{t.person}</div>
              <div>{t.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
