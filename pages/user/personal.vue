<style scoped></style>
<template>
<div id="mainBody" class="clearfix">
    <!--header-->
    <common-header :data="userdata" :page="nowPage" :view="nowView"></common-header>
    <!--container-->
    <div id="container">
        <!--status-->
        <common-status :data="userdata" :page="nowPage" :view="nowView"></common-status>
        <!--content-->
<!--☢--><div class="content-wrap clearfix">
            <div class="content-title">
                個人資料<span class="text-nar">Admin</span>
            </div>
            <div class="content-body">
                <table class="table-order">
                    <tr class="table-sepa">
                        <td>使用者帳號</td>
                        <td><span>{{user.user.ud_account}}</span></td>
                    </tr>
                    <tr class="isname">
                        <td>使用者名稱</td>
                        <td><input type="text" name="ud_name" v-model="user.user.ud_name"></td>
                    </tr>
                    <tr class="table-sepa">
                        <td>舊密碼</td>
                        <td><input class="check_unit" v-model="user.user.ud_password" type="password" v-tooltip="'請輸入舊密碼'" name="ud_password"></td>
                    </tr>
                    <tr>
                        <td>新密碼</td>
                        <td><input class="check_unit" v-model="user.user.ud_new_password" type="password" v-tooltip="'請輸入新密碼'" name="ud_new_password"></td>
                    </tr>
                    <tr>
                        <td>確認密碼</td>
                        <td><input class="check_unit" v-model="user.user.ud_new_password_confirm" type="password" v-tooltip="'請再次輸入新密碼'" name="ud_new_password_confirm"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <a href="/" class="btn btn-cancel">返回</a>
                            <button @click="modifyUser()" type="button" class="btn_save">送出</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/header';
import CommonStatus from '@/components/status';
import axios from 'axios';
import {Notification} from 'element-ui'
export default {
    components: {
        CommonHeader,
        CommonStatus
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'user',
            nowView:'personal',
            userdata:[], // 使用者資料
            //各頁資訊////////////////////////////////////////////////////
            user:{/// 使用者
                user:{}, // 單一使用者資料
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
    },
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        let self = this;
    },
    computed: {

    },
    methods: {
        //////////////////////// 共用功能 //////////////////////
        ///
        // 取得使用者資料
		checkUser: function () {
			let self = this;
			if (sessionStorage.getItem("loginData") != null) {
				var loginData = JSON.parse(sessionStorage.getItem("loginData"));
				var json = {};
				json.user = loginData.login;
				json.token = loginData.token;
				axios.post(this.$server_api + '/user-check', json)
					.then(function (response) {
						if (response.data) {
							loginData.login = response.data.user;
							loginData.token = response.data.token;
							self.userdata = response.data.user;
							self.user.user.ud_account = response.data.user.ud_account;
							self.user.user.ud_name = response.data.user.ud_name;
							self.user.user.ud_id = response.data.user.ud_id;
							sessionStorage.setItem("loginData", JSON.stringify(loginData));
						} else {
							sessionStorage.removeItem('localData');
							window.location.replace('/login');
						}
					})
					.catch(function (response) {
						self.notification('系統出錯：checkUser()', 'failure');
					});
			} else {
				sessionStorage.removeItem('localData');
				window.location.replace('/login');
			}

		},
        // 更新sessionStorage的資料
        pushLocalData:function(boolean,string){
            if(sessionStorage.getItem("localData") != null){
                var localData = JSON.parse(sessionStorage.getItem("localData"));
            }else{
                var localData = {};
            }
            if(localData.user){
                var user = localData.user;
            }else{
                var user = {};
            }
            user.result = boolean;
            user.text = string;
            localData.user = user;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
		// 更新session 使用者的資訊
		updateLoginData:function(data){
			let self = this;
			var loginData = JSON.parse(sessionStorage.getItem("loginData"));
			loginData.login = data;
			sessionStorage.setItem("loginData",JSON.stringify(loginData));
		},
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// 修改區塊 ///////////////////////////
        ///
        //修改使用者資料
        modifyUser:function(){
            let self = this;
            /// 檢查必填欄位是否傳入
            //名稱
            if(!self.user.user.ud_name){
                self.notification('請輸入使用者名稱','warning');
                return false;
            }
            //舊密碼
            if((self.user.user.ud_password || self.user.user.ud_password == 0) && self.user.user.ud_password != ''){
                if(!self.user.user.ud_new_password && self.user.user.ud_new_password != 0){
                    self.notification('請輸入新密碼','warning');
                    return false;
                }else if(!self.user.user.ud_new_password_confirm && self.user.user.ud_new_password_confirm != 0){
                    self.notification('請輸入確認密碼','warning');
                    return false;
                }else if(self.user.user.ud_new_password != self.user.user.ud_new_password_confirm){
                    self.notification('新密碼和確認密碼不一致','warning');
                    return false;
                }
            }
			self.user.user.last_update_user = self.userdata.ud_name;
            // 回傳修改
            axios.post(this.$server_api+'/user-modify-personal',self.user.user) //修改 - 版型資料
                .then(function (response) {
                    if(response.data){
                        self.pushLocalData(true,'修改成功');
						self.updateLoginData(response.data);
                        window.location.replace('/');
                    }else{
                        self.notification('修改失敗','failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifyUser()','failure');
                });
        },
        ///
        //////////////////////// 修改區塊 end ////////////////////////

        //////////////////////// 推播框設定 //////////////////////////
        ///
        // 推撥提示框
        notification:function(string,type){
            if(type == 'success'){
                Notification({
                    title: 'SUCCESS',
                    message: string,
                    type:'success'
                });
            }else if(type == 'failure'){
                Notification({
                    title: 'FAILURE',
                    message: string,
					type:'error'
                });
            }else if(type == 'warning'){
                Notification({
                    title: 'WARNING',
                    message: string,
                    type:'warning'
                })
            }
        },
        ///
        //////////////////////// 推播框設定 end /////////////////////
    },
    watch: {
	}
}
</script>
