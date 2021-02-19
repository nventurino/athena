import React, { Component } from 'react'
import { useState, useEffect } from 'react';

import ReactApexChart from 'react-apexcharts'


export default function EmotionTextChart(props){

    // const seriesNameArray = props.data.map((v,k) => k)
    // console.log('seriesNameArray', seriesNameArray)
    let series = [{
              name: 'Text emotion',
              // data: seriesNameArray,
              data: [0,0,0,0,2,0,1,3],
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
                        categories: ['angry', 'caring', 'confident', 'confused', 'fearful', 'happy', 'sad', 'vulnerable']
                      }
                    }

    return (
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radar" height={350} />
      </div>
    );

}
