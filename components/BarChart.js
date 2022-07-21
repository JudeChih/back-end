import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data","options"],
  mounted() {
    this.renderBarChart();
  },
  methods: {
    renderBarChart: function() {
      this.renderChart(this.data,this.options);
    }
  },
  watch: {
    data: function() {
      this.renderBarChart();
    }
  }
};
