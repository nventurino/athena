import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

Transcription.propTypes = {
  transcription: PropTypes.object.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "auto",
    height: "100%",
  },
  line: {
    color: "white",
    display: "flex",
    margin: "24px 12px",
  },
  meta: {
    width: "96px",
    textAlign: "center",
    borderRight: "3px solid #ffffff16",
  },
  text: {
    flex: 3,
    textAlign: "left",
    paddingLeft: "24px",
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
  const getTranscription = (data) => {
    // turn into sentences.
    const results = [];

    let sentence = "";
    let time = null;
    data.forEach((i) => {
      if (!time) {
        time = i.start_time;
      }
      const token = i.alternatives[0].content;
      if (i.type === "punctuation" && token === ".") {
        results.push({
          time,
          text: sentence.trim() + ".",
        });
        time = null;
        sentence = "";
      } else {
        if (i.type === "punctuation") {
          sentence = sentence + token;
        } else {
          sentence = sentence + " " + token;
        }
      }
    });

    if (sentence.length > 0) {
      results.push({
        time,
        text: sentence,
      });
    }

    // todo: connect sentences into paragraphs when they're close together.
    // const compact = [];
    // let lastTime = null;
    // let item;
    // results.forEach((r) => {
    //   if (!lastTime) {
    //     lastTime = r.time;
    //   }
    //   if (!item) {
    //     item = r;
    //   }
    //   if (r.time - lastTime > 10) {
    //     compact.push(item);
    //     item = null;
    //     lastTime = null;
    //   } else {
    //     item.text += " " + r.text;
    //   }
    // });

    // if (item) {
    //   compact.push(item);
    // }

    return results;
  };

  const data = getTranscription(props.transcription);
  console.log(data);

  return (
    <div className={classes.root}>
      {data &&
        data.map((t) => {
          return (
            <div key={t.time} className={classes.line}>
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
