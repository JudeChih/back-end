const webpack = require('webpack');
export default {
	mode: 'spa',
	/*
	** Headers of the page
	*/
	head: {
		title: 'BBIN Backstage',
		meta: [
			{ charset: 'utf-8' },
			// { 'http-equiv': 'Content-Security-Policy', content:'upgrade-insecure-requests'},
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
			{ hid: 'description', name: 'description', content: 'BBIN後台' },
			{ hid: 'author', name: 'author', content:'Toby_Huang'}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
			{ rel: 'stylesheet',href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'},
			{ rel: 'stylesheet',href:'/bootstrap.min.css'},
			{ rel: 'stylesheet',href:'/bootstrap-theme.min.css'},
			{ rel: 'stylesheet',href:'/bootstrap-datetimepicker.min.css'},
			{ rel: 'stylesheet',href:'/jquery-ui.min.css'},
			{ rel: 'stylesheet',href:'/jquery-ui.theme.min.css'},
			{ rel: 'stylesheet',href:'/jquery.gridly.css'},
		],
		script: [
			{ src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js', defer: true },
			{ src: 'https://milankyncl.github.io/jquery-copy-to-clipboard/jquery.copy-to-clipboard.js', defer: true },
			{ src: '/jquery-ui.min.js', defer: true },
			{ src: '/bootstrap.min.js', defer: true },
			{ src: '/jquery.cookie.js', defer: true },
			// { src: '/isotope-docs.min.js', defer: true },
			// { src: '/slick.js', defer: true }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#000' },
	/*
	** Global CSS
	*/
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'@/assets/sass/app.scss',
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '~plugins/global-variables', ssr: false },
		'@/plugins/axios',
		'@/plugins/infinite',
		{ src: '~plugins/element-ui', ssr: false },
		// { src: '~plugins/element-ui', ssr: false },
		{ src: '~plugins/isotope', ssr: false },
		{ src: '~plugins/imagesloaded', ssr: false },
		{ src: '~plugins/notify.client', ssr: false },
		{ src: '~plugins/tooltip', ssr: false },
		{ src: '~plugins/paginate', ssr: false },
		{ src: '~plugins/slick', ssr: false },
		// { src: '~plugins/customscroll.js', ssr: false },

	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
		'nuxt-lazy-load'
	],
	axios: {
		https:false,
		proxy: true,
		prefix: '/api',
		credentials: true,
	},
	proxy: {
		'/api': {
			target: 'http://192.168.160.74:8000',
			changeOrigin: true,
			pathRewrite: {
				'^/api': '',
			},
		}
	},
	publicRuntimeConfig: {
	},
	/*
	** Build configuration
	*/
	build: {
		transpile: [/^element-ui/],
		plugins: [
			new webpack.ProvidePlugin({
				'$' : 'jquery'
			})
		],
		/*
		** You can extend webpack config here
		*/
		extend (config, { isClient }) {
		}
	}
}
