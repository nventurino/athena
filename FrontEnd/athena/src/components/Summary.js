import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

import '../App.css';

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "auto",
    height: "100%",
    'margin-top': '15px',
    // 'padding-lefsht': '15px',
    // padding: '25px',
  },

  transcript:{
    width: '90%',
    'padding-left': '15px',
    'padding-right': '15px',
    'text-align': 'left',
    "display": "flex",
  }

});
export default function Transcript(props){
  const classes = useStyles();
  // console.

    return (
      <div className={classes.root} component="span" m={1}>
        <span className={classes.transcript}>
          {props.summary}
        </span>
      </div>
    );

}
