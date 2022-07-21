<style scoped></style>
<template>
<div class="login-wrap">
	<div class="login-bg">
		<!-- logo -->
		<div class="logo"></div>
		<p class="login-txt-wrap">
			<span class="login-txt">bbin template system</span>
			<span v-if="show_error" class="login-tip text-warning">{{error_text}}</span>
			<span v-else class="login-tip text-warning"></span>
		</p>
		<!--login form-->
		<div id="LoginForm">
			<p>
				<input v-model="account" placeholder="ID" type="text" id="ud_account" class="login-input" name="ud_account" >
			</p>
			<p>
				<input v-model="password" placeholder="PW" id="ud_pwd" name="ud_pwd" type="password" class="login-input">
			</p>
			<p>
				<span @click="login()" class="login-submit login_btn">登入</span>
			</p>
		</div>
		<div class="login-ball01"></div>
		<div class="login-ball02"></div>
	</div>
</div>
</template>
<script>
import axios from 'axios'
export default {
	data() {
        return {
            show_error:false,
			error_text:'',
			account:'',
            password:'',
        }
    },
    created:function(){
		sessionStorage.clear();
    },
    mounted: function () {
		let self = this;
		// 按下enter等於送出表單
		$(document).keydown(function (e) {
            if ((e.which || e.keyCode) == 13) {
                self.login();
            }
        });
    },
    computed: {

	},
    methods: {
		login:function(){
			let self = this;
			if(!self.account){
				self.show_error = true;
				self.error_text = "請填入帳號";
				return false;
			}
			if(!self.password){
				self.show_error = true;
				self.error_text = "請填入密碼";
				return false;
			}
			let json = {};
			json.ud_account = self.account;
			json.ud_password = self.password;
			axios.post(this.$server_api+'/login',json)
                .then(function (response) {
                    if(response.data){
						var loginData = {};
						loginData.login = response.data.user;
						loginData.token = response.data.token;
						sessionStorage.setItem("loginData",JSON.stringify(loginData));
                        window.location.replace('/');
                    }else{
						self.show_error = true;
						self.error_text = '帳號密碼有誤，請重新輸入';
					}
                })
                .catch(function (response) {
                    self.show_error = true;
					self.error_text = response;
                });
		},
    },
    watch: {
	}
}
</script>
