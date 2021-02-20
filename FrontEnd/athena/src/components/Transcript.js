import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';

import '../App.css';

export default function Transcript(props){



    return (
      <div className="Transcript-Container" component="span" m={1}>
        <span className="Transcript">
          {props.data}
        </span>
      </div>
    );

}
