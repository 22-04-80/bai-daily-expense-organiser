<template>
  <canvas id="barChart"></canvas>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "BarChart",
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
      barChart: null,
    };
  },
  mounted() {
    var context = document.getElementById("barChart");
    this.barChart = new Chart(context, {
      type: "bar",
      data: this.chartData,
      options: this.chartOptions,
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
