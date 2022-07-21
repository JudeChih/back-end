import axios from 'axios'

export default function (ctx, inject) {
	axios.defaults.baseURL = 'https://api.example.com'
	axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	axios.defaults.headers.common = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

  /* 注入 Nuxt Instance Property */
	ctx.$axios = axios
	inject('axios', axios)
}
