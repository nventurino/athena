import React, { Component } from "react";
import { useState, useEffect } from "react";

import ReactApexChart from "react-apexcharts";

export default function EmotionTextChart(props) {
  // const seriesNameArray = props.data.map((v,k) => k)
  // console.log('seriesNameArray', seriesNameArray)

  const inputData = props.data;

  var data = {
    angry: 0,
    caring: 0,
    confident: 0,
    confused: 0,
    fearful: 0,
    happy: 0,
    sad: 0,
    vulnerable: 0,
  };

  // data = Object.key(data).map(key => {
  //   inputData[key].medium + inputData[key].mild + inputData[key].strong;
  // })
  console.log('inputData text', inputData);
  for (var i = 0; i < inputData.length; i++) {
    const tempData = inputData[i].emotion_map;
    Object.keys(tempData).map((key) => {
      // console.log("key", key.toLowerCase());
      // console.log(inputData[key], inputData[key].medium);
      data[key] += tempData[key].medium*2 + tempData[key].mild + tempData[key].strong*3
    });
  }

  console.log('data text calculated', data)

  // data = Object.keys(data).map((key) => {
  //   console.log("key", key.toLowerCase());
  //   console.log(inputData[key], inputData[key].medium);
  //   return inputData[key].medium + inputData[key].mild + inputData[key].strong;
  // });

    var chartData = [];
  Object.keys(data).map((key) => {
    chartData.push(data[key]);
  });

  console.log('chartData text', chartData)

  let series = [
    {
      name: "Text emotion",
      // data: seriesNameArray,
      data: chartData,
    },
  ];

  const options = {
    chart: {
      type: "radar",
    },
    title: {
      // text: 'Basic Radar Chart'
    },
    xaxis: {
      categories: ["angry", "caring", "confident", "confused", "fearful", "happy", "sad", "vulnerable"],
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radar"  height={350}/>
    </div>
  );
}
