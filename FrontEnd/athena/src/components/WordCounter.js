  import React, { useEffect, useState } from "react";
  import PropTypes from "prop-types";
  import { makeStyles } from "@material-ui/core/styles";
  import { blue } from "@material-ui/core/colors";

  import ReactApexChart from "react-apexcharts";

  Transcription.propTypes = {
    transcription: PropTypes.object.isRequired,
  };

  const useStyles = makeStyles({
    root: {
      width: "100%",
      overflow: "auto",
      height: "100%",
    },

  });

  export default function Transcription(props) {
    const classes = useStyles();

  console.log(props.transcription)
    const wordData = props.transcription.filter(input => input.start_time);
    const totalTime = wordData[wordData.length - 1].end_time;
    console.log('total time', totalTime)

    const totalWordPerMinute = (wordData.length / totalTime) * 60;

    console.log('Total word / minute: ', totalWordPerMinute)
    var wordCountTime = [];
    var timeRange = [];
    var timeCounter = 10;
    var currentTimeCount = 0;
    for (var i = 0; i < wordData.length; i++) {
      const currentWord = wordData[i];
      if(currentWord.end_time < timeCounter){
        currentTimeCount++;
      }else{
        wordCountTime.push(currentTimeCount);
        currentTimeCount = 0;
        timeCounter += 10;
        timeRange.push(timeCounter)
        currentTimeCount++
      }
    }

    console.log('wordCountTime: ', wordCountTime)

    const data = {

              series: [{
                  // name: "Desktops",
                  data: wordCountTime
              }],
              options: {
                chart: {
                  height: 350,
                  type: 'line',
                  zoom: {
                    enabled: false
                  }
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'straight'
                },
                title: {
                  // text: 'Word per minute',
                  // align: 'left'
                },
                grid: {
                  row: {
                    colors: ['white'],
                    // colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                  },
                },
                xaxis: {
                  categories: timeRange,
                  title: {
                    text: 'seconds',
                  },
                  labels: {
                    style:{
                      colors: 'white',
                    }
                  }
                },
                yaxis: {
                  labels: {
                    style:{
                      colors: 'white',
                    }
                  }
                },

              }
            }

    return (
      <div>
      <div className="Widget-Title">Words counter: {parseInt(totalWordPerMinute)} WPM</div>
        <div className={classes.root}>
          <ReactApexChart options={data.options} series={data.series} type="line" height={350} />
        </div>
      </div>
    );
  }
