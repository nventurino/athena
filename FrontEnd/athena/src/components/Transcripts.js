import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

Transcripts.propTypes = {
  transcript: PropTypes.arrayOf(
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
  text: {
    color: "white",
  },
});

export default function Transcripts(props) {
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

  return <div className={classes.root}>hello</div>;
}
