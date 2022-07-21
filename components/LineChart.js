import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data","options"],
  mounted() {
    this.renderLineChart();
  },
  methods: {
    renderLineChart: function() {
      this.renderChart(this.data,this.options);
    }
  },
  watch: {
    data: function() {
      this.renderLineChart();
    }
  }
};
