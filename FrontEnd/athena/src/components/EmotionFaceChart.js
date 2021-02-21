import React, { Component } from 'react'
import { useState, useEffect } from 'react';

import ReactApexChart from 'react-apexcharts'

const minValue = 60;


export default function EmotionTextChart(props){


  const inputData = props.data;
console.log('inputData', inputData)
  const dataCategories = ['HAPPY','SAD','ANGRY','CONFUSED','DISGUSTED','SURPRISED','CALM','UNKNOWN','FEAR']

  var data = {
    'HAPPY':0,
    'SAD': 0,
    'ANGRY': 0,
    'CONFUSED': 0,
    'DISGUSTED': 0,
    'SURPRISED': 0,
    'CALM': 0,
    'UNKNOWN': 0,
    'FEAR': 0
  }

  console.log('face emotion input', inputData)

  for (var i = 0; i < inputData.length; i++) {
    let face = inputData[i];
    if(face.Face.Emotions[0].Confidence > minValue){
      data[face.Face.Emotions[0].Type] += 1
    }
  }

  console.log('face emotion charts data', data)

    // const seriesNameArray = props.data.map((v,k) => k)
    // console.log('seriesNameArray', seriesNameArray)
    let series = [{
              name: 'Text emotion',
              // data: seriesNameArray,
              data: Object.keys(data).map(key => data[key]),
            }]


          const options =  {
                      chart: {
                        height: 350,
                        type: 'radar',
                      },
                      title: {
                        // text: 'Basic Radar Chart'
                      },
                      xaxis: {
                        categories: dataCategories,
                        labels: {
                          style:{
                            colors: ['black', 'black','black','black','black','black','black','black','black','black','black',],
                          }
                        }
                      }
                    }

    return (
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radar" height={350} />
      </div>
    );

}
