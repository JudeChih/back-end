import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["data","options"],
  mounted() {
    this.renderPieChart();
  },
  methods: {
    renderPieChart: function() {
      this.renderChart(this.data,this.options);
    }
  },
  watch: {
    data: function() {
      this.renderPieChart();
    }
  }
};
