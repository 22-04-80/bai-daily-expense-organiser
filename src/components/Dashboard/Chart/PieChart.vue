<template>
  <canvas id="pieChart"></canvas>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "PieChart",
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
    var context = document.getElementById("pieChart");
    this.pieChart = new Chart(context, {
      type: "pie",
      data: this.chartData,
      options: this.chartOptions,
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
