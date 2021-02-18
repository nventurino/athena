function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

Highcharts.chart("container", {
  chart: {
    type: "heatmap",
    marginTop: 40,
    marginBottom: 80,
    plotBorderWidth: 1,
  },

  title: {
    text: "Emotions during our last call",
  },

  xAxis: {
    categories: [
      "Caring",
      "Happy",
      "Confident",
      "Confused",
      "Sad",
      "Vulnerable",
      "Fearful",
      "Angry",
    ],
  },

  yAxis: {
    categories: ["Mild", "Medium", "Strong"],
    title: null,
    reversed: true,
  },

  accessibility: {
    point: {
      descriptionFormatter: function (point) {
        var ix = point.index + 1,
          xName = getPointCategoryName(point, "x"),
          yName = getPointCategoryName(point, "y"),
          val = point.value;
        return ix + ". " + xName + " sales " + yName + ", " + val + ".";
      },
    },
  },

  colorAxis: {
    min: 0,
    minColor: "#FFFFFF",
    maxColor: Highcharts.getOptions().colors[3],
  },

  legend: {
    align: "right",
    layout: "vertical",
    margin: 0,
    verticalAlign: "top",
    y: 25,
    symbolHeight: 280,
  },

  tooltip: {
    formatter: function () {
      return (
        "<b>" +
        getPointCategoryName(this.point, "x") +
        "</b> sold <br><b>" +
        this.point.value +
        "</b> items on <br><b>" +
        getPointCategoryName(this.point, "y") +
        "</b>"
      );
    },
  },

  series: [
    {
      name: "Sales per employee",
      borderWidth: 1,
      data: [
        [0, 0, 10],
        [0, 1, 19],
        [0, 2, 8],
        [1, 0, 92],
        [1, 1, 58],
        [1, 2, 78],
        [2, 0, 35],
        [2, 1, 15],
        [2, 2, 123],
        [3, 0, 72],
        [3, 1, 132],
        [3, 2, 114],
        [4, 0, 38],
        [4, 1, 5],
        [4, 2, 8],
        [5, 0, 88],
        [5, 1, 32],
        [5, 2, 12],
        [6, 0, 13],
        [6, 1, 44],
        [6, 2, 88],
        [7, 0, 31],
        [7, 1, 1],
        [7, 2, 82],
      ],
      dataLabels: {
        enabled: true,
        color: "#000000",
      },
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          yAxis: {
            labels: {
              formatter: function () {
                return this.value.charAt(0);
              },
            },
          },
        },
      },
    ],
  },
});
