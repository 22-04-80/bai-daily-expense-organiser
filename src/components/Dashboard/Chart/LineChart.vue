<template>
  <canvas id="lineChart"></canvas>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "LineChart",
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    chartOptions: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      pieChart: null,
    };
  },
  mounted() {
    var context = document.getElementById("lineChart");
    this.pieChart = new Chart(context, {
      type: "line",
      data: this.chartData,
      options: this.chartOptions,
    });
    this.pieChart.options.scales.xAxes[0].ticks.fontSize = 12;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
