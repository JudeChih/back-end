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
                新增使用者
            </div>
            <div class="content-body">
                <table class="table-order">
                    <tr class="table-sepa isaccount">
                        <td>使用者帳號</td>
                        <td><input type="text" v-model="user.user.ud_account" class="check_unit" name="ud_account" v-tooltip="'請輸入使用者帳號'"></td>
                    </tr>
                    <tr class="ispass">
                        <td>使用者密碼</td>
                        <td><input type="password" v-model="user.user.ud_password" class="check_unit" name="ud_password" v-tooltip="'請輸入使用者密碼'"></td>
                    </tr>
                    <tr class="isname">
                        <td>使用者名稱</td>
                        <td><input type="text" v-model="user.user.ud_name" class="check_unit" name="ud_name" v-tooltip="'請輸入使用者名稱'"></td>
                    </tr>
                    <tr class="isstatus">
                        <td>使用者狀態</td>
                        <td class="js-table-btn">
                            <button type="button" :class="user.user.ud_status == 1 ? 'table-active':''" class="table-enable" @click="user.user.ud_status = 1">啟用</button>
                            <button type="button" :class="user.user.ud_status == 0 ? 'table-active':''" class="table-disable" @click="user.user.ud_status = 0">停用</button>
                        </td>
                    </tr>
                    <tr class="isadmin">
                        <td>使用者權限</td>
                        <td>
                            <p>
                                <input name="isadmin" id="normaluser" type="radio" v-model="user.user.ud_admin" value="0" checked="checked">
                                <label name="isadmin" for="normaluser">一般使用者</label>
                            </p>
                            <p>
                                <input name="isadmin" id="adminuser" type="radio" v-model="user.user.ud_admin" value="1">
                                <label name="isadmin" for="adminuser">管理員</label>
                            </p>
                        </td>
                    </tr>
                    <tr class="">
                        <td></td>
                        <td>
                            <button @click="createUser()" type="button" class="btn_save">送出</button>
                            <a href="/user/list" class="btn btn-cancel">返回</a>
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
        CommonStatus,
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'user',
            nowView:'create',
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
        self.initUser();
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
            var user = {};
            user.result = boolean;
            user.text = string;
            localData.user = user;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// 初始化各項目 //////////////////////
        ///
        // 使用者資料初始化
        initUser:function(){
            this.user.user = {};
            this.user.user = Object.assign({}, this.user.user, {
                ud_name: '',
                ud_account: '',
                ud_password: '',
                ud_status: 0,
                ud_admin: 0,
                ud_last_login: ''
            })
        },
        ///
        //////////////////////// 初始化各項目 end //////////////////

        //////////////////////// 新增區塊 ////////////////////////
        ///
        //新增使用者
        createUser:function(){
            let self = this;
            /// 檢查必填欄位是否傳入
            //帳號
            if(!self.user.user.ud_account){
                self.notification('請輸入使用者帳號','warning');
                return false;
            }
            //密碼
            if(!self.user.user.ud_password){
                self.notification('請輸入使用者密碼','warning');
                return false;
            }
            //名稱
            if(!self.user.user.ud_name){
                self.notification('請輸入使用者名稱','warning');
                return false;
            }
			self.user.user.create_user = self.userdata.ud_name;
            // 回傳修改
            axios.post(this.$server_api+'/user-create',self.user.user) //新增 - 使用者資料
                .then(function (response) {
                    if(response.data){
                        self.pushLocalData(true,'新增成功');
                        window.location.replace('/user/list');
                    }else{
                        self.notification('新增失敗','failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：createUser()','failure');
                });
        },
        ///
        //////////////////////// 新增區塊 end ////////////////////////

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
