import Vue from 'vue'
if (process.browser) {
	var infiniteScroll =  require('vue-infinite-scroll');
	Vue.use(infiniteScroll);
}

