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
                使用者列表
                <p>共有<span class="text-nar">{{total}}</span>個使用者</p>
                <a href="/user/create" class="btn btn-cancel content-righttop-btn">
                    <span class="fa"></span>新增使用者
                </a>
            </div>
            <!-- 上方頁碼 -->
            <div class="paginate_box">
                <paginate v-model="user.page" :page-count="count" :click-handler="pushForPaginate()" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                <div id="searchWrap">
                    <input type="text" name="ud_name" class="search-bar" v-model="search_ud_name" placeholder="Search for..." @compositionstart="listen_input_start()" @compositionend="listen_input_end()">
                    <input v-if="search_ud_name != ''" @click="search_ud_name = ''" type="button" class="close-btn">
                    <input v-else type="button" class="search-btn" value="">
                </div>
            </div>
            <div class="content-body">
                <table class="table-list">
                    <thead>
                        <tr class="table-list-user">
                            <td class="tNum">序號</td>
                            <td class="tName">名稱</td>
                            <td class="tId">帳號</td>
                            <td class="tPw">密碼</td>
                            <td class="tPer">權限</td>
                            <td class="tstatus">狀態</td>
                            <td class="tDate">最後一次登入</td>
                            <td class="tEdit">編輯</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="showData == 1" v-for="(item,index) in newUsers" v-bind:key="index">
                            <td>{{index+1+(user.page-1)*15}}</td>
                            <td class="tLeft table-username">
                                <a href="javascript:void(0)" @click="goToModify(item.ud_id)">
                                    {{item.ud_name}}
                                </a>
                            </td>
                            <td class="tLeft">{{item.ud_account}}</td>
                            <td class="tLeft">{{item.ud_password}}</td>
                            <td v-text="item.ud_admin == 1 ? '管理員' : '一般使用者'"></td>
                            <td>
                                <span :class="item.ud_status == 1 ? '' : 'text-warning'" v-text="item.ud_status == 1 ? '啟用中' : '停用中'">啟用中</span>
                            </td>
                            <td v-text="item.ud_last_login ? item.ud_last_login : '尚未登入過'">
                            </td>
                            <td class="tLink">
                                <a href="javascript:void(0)" @click="goToModify(item.ud_id)" class="btn btn-s">編輯</a>
                                <button @click="deleteUser(item.ud_id)" type="button" class="btn btn-s btn-s-del">刪除</button>
                            </td>
                        </tr>
                        <tr v-else-if="showData == 2">
                            <td colspan="6">查無相符的使用者資料</td>
                        </tr>
                        <tr v-else-if="showData == 3">
                            <td colspan="6">目前暫無使用者資料</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 下方頁碼 -->
            <div class="paginate_box">
                <paginate v-model="user.page" :page-count="count" :click-handler="pushForPaginate()" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
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
            nowView:'list',
            userdata:[], // 使用者資料
            search_ud_name:'', // 使用者列表搜尋字串
            //各頁資訊////////////////////////////////////////////////////
            user:{/// 使用者
                //各式資料////////////////////////////////////////////////////
                users:[], // 全部使用者資料
                pageScrollTop:0, // 距離header的數值
                //頁碼相關////////////////////////////////////////////////////
                limit:15, //每頁數的筆數
                page:1, // 目前頁數
                //搜尋相關////////////////////////////////////////////////////
                composing:true, // 監聽搜尋框輸入
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;

        if(sessionStorage.getItem("localData") != null){
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.user){
                self.pullLocalDataForList();
            }else{
                self.init();
            }
        }else{
            self.init();
        }
    },
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        let self = this;
		self.checkUser();
    },
    computed: {
        newUsers:function(){
            let self = this;
            if(self.user.users){
                if(self.user.users.length > 0){
                    if(self.user.limit == 'all'){
                        return self.user.users;
                    }else{
                        var start = (parseInt(self.user.page) - 1) * parseInt(self.user.limit);
                        return self.user.users.slice(start, start + parseInt(self.user.limit));
                    }
                }else{
                    return [];
                }
            }else{
                return [];
            }
        },
        total:function(){//版型總數
            let self = this;
            if(self.user.users){
                return self.user.users.length;
            }else{
                return 0;
            }
        },
        count:function(){
            let self = this;
            if(self.user.limit == 'all'){
                self.user.page = 1;
                return 1;
            }else{
                return Math.ceil(self.total / self.user.limit)
            }
        },
        showData:function(){//1:有資料 2:無相符資料 3:資料庫沒資料
            let self = this;
            if(!self.user.users){
                return 3;
            }else{
                if(self.user.users.length > 0){
                    return 1;
                }else{
                    return 2;
                }
            }
        },
    },
    methods: {
        // 取得所有初始資料
        init: function () {
            let self = this;
			axios.get(this.$server_api+'/user-all-data')
				.then(function (response) {
					//使用者相關
					self.user.users = response.data.user.users;
					self.pushLocalDataForList();
				})
				.catch(function (response) {
					self.notification('系統出錯：init()','failure');
				});
        },
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
        // 回最上面位置
        goToTop:function(){
            $('html').animate({ 'scrollTop': 0 }, 250);
        },
        // 前往修改頁
        goToModify:function(id){
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
            user.pageScrollTop = $(window).scrollTop();
            sessionStorage.setItem("localData",JSON.stringify(localData));
            window.location.replace('/user/modify?ud_id='+id);
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// session功能 //////////////////////
        ///
        // 更新session(頁碼用)
        pushForPaginate:function(){
            let self = this;
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
            user.limit = self.user.limit;
            user.page = self.user.page;
            localData.user = user;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        // 更新sessionStorage的資料
        pushLocalDataForList:function(){
            let self = this;
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
            user.limit = self.user.limit;
            user.page = self.user.page;
            user.pageScrollTop = self.user.pageScrollTop;
            user.search_ud_name = self.search_ud_name;
            user.result = false;
            user.text = "";
            localData.user = user;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        // 複製sessionStorage的資料
        pullLocalDataForList:function(){
            let self = this;
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.user.limit){
                self.user.limit = localData.user.limit;
            }else{
                localData.user.limit = self.user.limit;
            }
            if(localData.user.page){
                self.user.page = localData.user.page;
            }else{
                localData.user.page = self.user.page;
            }
            if(localData.user.search_ud_name){
                self.search_ud_name = localData.user.search_ud_name;
            }else{
                localData.user.search_ud_name = self.search_ud_name;
            }
            if(localData.user.pageScrollTop){
                $('html,body').animate({ 'scrollTop': localData.user.pageScrollTop }, 250);
                localData.user.pageScrollTop = 0;
            }
            if(localData.user.result){
                self.notification(localData.user.text,'success');
                localData.user.result = false;
            }
            sessionStorage.setItem("localData",JSON.stringify(localData));
            self.getUsers();
        },
        ///
        //////////////////////// session功能 end ////////////////////

        //////////////////////// 查詢功能 //////////////////////
        ///
        // 監聽搜尋框 注音輸入開始
        listen_input_start:function(){
            let self = this;
            self.user.composing = false;
        },
        // 監聽搜尋框 注音輸入結束
        listen_input_end:function(){
            let self = this;
            self.user.composing = true;
        },
        // 查詢功能
        search: function () {
            let self = this;
            setTimeout(function(){
                if(self.user.composing){
                    self.user.page = 1;
                    var localData = JSON.parse(sessionStorage.getItem("localData"));
                    localData.user.page = 1;
                    localData.user.search_ud_name = self.search_ud_name;
                    sessionStorage.setItem("localData",JSON.stringify(localData));
                    self.getUsers();
                }
            },10)
        },
        ///
        //////////////////////// 查詢功能 end //////////////////

        //////////////////////// 取值區塊 ///////////////////////////
        ///
        //取得使用者資料
        getUsers:function(){
            let self = this;
			axios.get(this.$server_api+'/users?ud_name='+self.search_ud_name)
				.then(function (response) {
					console.log(response.data)
					self.user.users = response.data.users;
				})
				.catch(function (response) {
					self.notification('系統出錯：getUsers()','failure');
				});
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

        //////////////////////// 刪除區塊 ///////////////////////////
        ///
        //刪除使用者資料
        deleteUser:function(id){
            let self = this;
            var json = {};
            json.ud_id = id;
			json.last_update_user = self.userdata.ud_name;
            axios.post(this.$server_api+'/user-delete',json) //刪除
                .then(function (response) {
                    if(response.data){
                        self.getUsers();
                        self.notification('刪除成功','success');
                    }else{
                        self.notification('刪除失敗','failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：deleteUser()','failure');
                });
        },
        ///
        //////////////////////// 刪除區塊 end ////////////////////////

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
        // 使用者列表搜尋功能
        search_ud_name:function(){
            let self = this;
            self.search();
        }
	}
}
</script>
