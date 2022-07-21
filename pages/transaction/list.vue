<style scoped></style>
<template>
<div id="mainBody" class="clearfix transaction_page ">
	<!--header-->
	<common-header :data="userdata" :page="nowPage" :view="nowView"></common-header>
	<!--container-->
	<div id="container">
		<!--status-->
		<common-status :data="userdata" :page="nowPage" :view="nowView"></common-status>
		<!--content-->
		<!--☢-->
		<div v-if="nowView == 'record'" class="content-wrap clearfix">
			<div class="content-title">
				紀錄列表
				<p class="tab-title1"></p>
			</div>
			<div class="content-body">
				<div id="tab-link">
					<ul class="clearfix">
						<li><a href="javascript:void(0)" :class="{'active':nowView == 'record'}">異動紀錄</a></li>
						<li><a href="javascript:void(0)" @click="nowView = 'lastlogin'"
								:class="{'active':nowView == 'lastlogin'}">登入紀錄</a></li>
					</ul>
				</div>
				<div id="tab-content">
					<table class="table-list">
						<thead>
							<tr class="table-list-modify">
								<td class="tNum">序號</td>
								<td class="tAct">動作</td>
								<td class="tCon">內容</td>
								<td class="tDate">時間</td>
							</tr>
						</thead>
						<tbody>
							<tr v-if="showData == 1" v-for="(item,index) in newRecords">
								<td
									v-text='transaction.tran_limit == "all" ? index+1 : index+1+(transaction.tran_page-1)*transaction.tran_limit'>
								</td>

								<td v-if="item.tr_action == 1" class="create_font" v-text="'新增'"></td>
								<td v-else-if="item.tr_action == 2" class="modify_font" v-text="'修改'"></td>
								<td v-else-if="item.tr_action == 3" class="delete_font" v-text="'刪除'"></td>
								<!-- <td v-else></td> -->

								<td class="tLeft" v-if="item.tr_action == 1">
									<span class="text-tip">{{item.tr_user}}</span>
									<span v-if="item.pd_id != null" v-text="'新增一個版型，版型編號為 '+item.pd_id"></span>
									<span v-if="item.ld_id != null" v-text="'新增一個合作夥伴，合作夥伴編號為 '+item.ld_id"></span>
									<span v-if="item.ud_id != null" v-text="'謹慎的新增一位使用者，使用者編號為 '+item.ud_id"></span>
								</td>
								<td class="tLeft" v-else-if="item.tr_action == 2">
									<span class="text-tip">{{item.tr_user}}</span>
									<span v-if="item.pd_id != null"
										v-text="'針對版型編號為 '+item.pd_id+' 的版型做了些微調'"></span>
									<span v-if="item.ld_id != null" v-text="'針對版型編號為 '+item.ld_id+' 的某些設定'"></span>
									<span v-if="item.ud_id != null" v-text="'針對版型編號為 '+item.ud_id+' 的相關資訊'"></span>
								</td>
								<td class="tLeft" v-else-if="item.tr_action == 3">
									<span class="text-tip">{{item.tr_user}}</span>
									<span v-if="item.pd_id != null" v-text="'忍痛刪除版型編號為 '+item.pd_id"></span>
									<span v-if="item.ld_id != null" v-text="'非常不捨的刪除合作夥伴編號為 '+item.ld_id"></span>
									<span v-if="item.ud_id != null" v-text="'刪除使用者編號為 '+item.ud_id+' 的使用者'"></span>
								</td>
								<td colspan="2" v-else>過時的動作資訊，請忽略</td>
								<td>{{item.create_date}}</td>
							</tr>
							<tr v-else-if="showData == 2">
								<td colspan="4">目前暫無異動紀錄</td>
							</tr>
							<tr v-else-if="showData == 3">
								<td colspan="4">目前暫無異動紀錄</td>
							</tr>
						</tbody>
					</table>
					<!--pagination-->
					<div class="paginate_box">
						<paginate v-model="transaction.tran_page" :click-handler="pushForPaginate()"
							:page-count="count" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'">
						</paginate>
						<div class="pagination-select">
							<select name="page_limit" id="page_limit"
								@change="transaction.tran_page = 1, pushForPaginate()"
								v-model="transaction.tran_limit">
								<option value="10">10項 / 頁</option>
								<option value="50">50項 / 頁</option>
								<option value="all">全部列出</option>
							</select>
						</div>
						<div class="pagination-gotoTop">
							<a @click="goToTop()" href="javascript:void(0)" class="fa js-gotoTop"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--☢-->
		<div v-else-if="nowView == 'lastlogin'" class="content-wrap clearfix">
			<div class="content-title">
				紀錄列表
				<p class="tab-title1"></p>
			</div>
			<div class="content-body">
				<div id="tab-link">
					<ul class="clearfix">
						<li><a @click="nowView = 'record'" :class="{'active':nowView == 'record'}"
								href="javascript:void(0)">異動紀錄</a></li>
						<li><a href="javascript:void(0)" :class="{'active':nowView == 'lastlogin'}">登入紀錄</a></li>
					</ul>
				</div>
				<div id="tab-content">
					<table class="table-list table-login-width">
						<thead>
							<tr class="table-list-login-record">
								<td class="tUser">操作者</td>
								<td class="tDate">時間</td>
							</tr>
						</thead>
						<tbody>
							<tr v-if="showData == 1" v-for="(item,index) in newLastlogins">
								<td>
									<span class="text-tip">{{item.ud_name}}</span>
								</td>
								<td>{{item.ud_last_login}}</td>
							</tr>
							<tr v-else-if="showData == 2">
								<td colspan="4">目前暫無登入紀錄</td>
							</tr>
							<tr v-else-if="showData == 3">
								<td colspan="4">目前暫無登入紀錄</td>
							</tr>
						</tbody>
					</table>
					<!--pagination-->
					<div class="paginate_box">
						<paginate v-model="transaction.login_page" :click-handler="pushForPaginate()"
							:page-count="count" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'">
						</paginate>
						<div class="pagination-select">
							<select name="page_limit" id="page_limit"
								@change="transaction.login_page = 1, pushForPaginate()"
								v-model="transaction.login_limit">
								<option value="10">10項 / 頁</option>
								<option value="50">50項 / 頁</option>
								<option value="all">全部列出</option>
							</select>
						</div>
						<div class="pagination-gotoTop">
							<a @click="goToTop()" href="javascript:void(0)" class="fa js-gotoTop"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import CommonHeader from '@/components/header';
import CommonStatus from '@/components/status';
import axios from 'axios';
import { Notification } from 'element-ui'
export default {
    components: {
        CommonHeader,
        CommonStatus
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'transaction',
            nowView:'record', // record:異動紀錄 lastlogin:登入紀錄
            userdata:[], // 使用者資料
            //各頁資訊////////////////////////////////////////////////////
            transaction:{/// 異動紀錄
                //各式資料////////////////////////////////////////////////////
                records:[], // 全部異動紀錄資料
                lastlogins:[], // 全部使用者最後登入的資料
                //頁碼相關////////////////////////////////////////////////////
                tran_limit:10, //每頁數的筆數
                tran_page:1, // 目前頁數
                login_limit:10, //每頁數的筆數
                login_page:1, // 目前頁數
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
        if(sessionStorage.getItem("localData") != null){
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.transaction){
                self.pullLocalDataForList();
            }else{
                self.pushLocalDataForList();
            }
        }else{
            self.pushLocalDataForList();
        }
        self.init();
    },
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        let self = this;
    },
    computed: {
        newRecords:function(){
            let self = this;
            if(self.transaction.records){
                if(self.transaction.records.length > 0){
                    if(self.transaction.tran_limit == 'all'){
                        return self.transaction.records;
                    }else{
                        var start = (parseInt(self.transaction.tran_page) - 1) * parseInt(self.transaction.tran_limit);
                        return self.transaction.records.slice(start, start + parseInt(self.transaction.tran_limit));
                    }
                }else{
                    return [];
                }
            }else{
                return [];
            }
        },
        newLastlogins:function(){
            let self = this;
            if(self.transaction.lastlogins){
                if(self.transaction.lastlogins.length > 0){
                    if(self.transaction.login_limit == 'all'){
                        return self.transaction.lastlogins;
                    }else{
                        var start = (parseInt(self.transaction.login_page) - 1) * parseInt(self.transaction.login_limit);
                        return self.transaction.lastlogins.slice(start, start + parseInt(self.transaction.login_limit));
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
            if(self.nowView == 'record'){
                if(self.transaction.records){
                    return self.transaction.records.length;
                }else{
                    return 0;
                }
            }else if(self.nowView == 'lastlogin'){
                if(self.transaction.lastlogins){
                    return self.transaction.lastlogins.length;
                }else{
                    return 0;
                }
            }
        },
        count:function(){
            let self = this;
            if(self.nowView == 'record'){
                if(self.transaction.tran_limit == 'all'){
                    self.transaction.tran_page = 1;
                    return 1;
                }else{
                    return Math.ceil(self.total / self.transaction.tran_limit)
                }
            }else if(self.nowView == 'lastlogin'){
                if(self.transaction.login_limit == 'all'){
                    self.transaction.login_page = 1;
                    return 1;
                }else{
                    return Math.ceil(self.total / self.transaction.login_limit)
                }
            }
        },
        showData:function(){//1:有資料 2:無相符資料 3:資料庫沒資料
            let self = this;
            if(self.nowView == 'record'){
                if(!self.transaction.records){
                    return 3;
                }else{
                    if(self.transaction.records.length > 0){
                        return 1;
                    }else{
                        return 2;
                    }
                }
            }else if(self.nowView == 'lastlogin'){
                if(!self.transaction.lastlogins){
                    return 3;
                }else{
                    if(self.transaction.lastlogins.length > 0){
                        return 1;
                    }else{
                        return 2;
                    }
                }
            }
        },
    },
    methods: {
        // 取得所有初始資料
        init: function () {
            let self = this;
			axios.get(this.$server_api +'/transaction-all-data')
                .then(function (response) {
                    //異動記錄相關
                    self.transaction.records = response.data.transaction.records;
                    self.transaction.lastlogins = response.data.transaction.lastlogins;
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
            if(localData.transaction){
                var transaction = localData.transaction;
            }else{
                var transaction = {};
            }
            if(self.nowView == 'record'){
                transaction.tran_limit = self.transaction.tran_limit;
                transaction.tran_page = self.transaction.tran_page;
            }else if(self.nowView == 'lastlogin'){
                transaction.login_limit = self.transaction.login_limit;
                transaction.login_page = self.transaction.login_page;
            }

            localData.transaction = transaction;
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
            if(localData.transaction){
                var transaction = localData.transaction;
            }else{
                var transaction = {};
            }
            transaction.tran_limit = self.transaction.tran_limit;
            transaction.tran_page = self.transaction.tran_page;
            transaction.login_limit = self.transaction.login_limit;
            transaction.login_page = self.transaction.login_page;
            localData.transaction = transaction;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        // 複製sessionStorage的資料
        pullLocalDataForList:function(){
            let self = this;
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.transaction.tran_limit){
                self.transaction.tran_limit = localData.transaction.tran_limit;
            }else{
                localData.transaction.tran_limit = self.transaction.tran_limit;
            }
            if(localData.transaction.tran_page){
                self.transaction.tran_page = localData.transaction.tran_page;
            }else{
                localData.transaction.tran_page = self.transaction.tran_page;
            }
            if(localData.transaction.login_limit){
                self.transaction.login_limit = localData.transaction.login_limit;
            }else{
                localData.transaction.login_limit = self.transaction.login_limit;
            }
            if(localData.transaction.login_page){
                self.transaction.login_page = localData.transaction.login_page;
            }else{
                localData.transaction.login_page = self.transaction.login_page;
            }
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        ///
        //////////////////////// session功能 end ////////////////////

        //////////////////////// 推播框設定 //////////////////////////
        ///
        // 推撥提示框
		notification: function (string, type) {
			if (type == 'success') {
				Notification({
					title: 'SUCCESS',
					message: string,
					type: 'success'
				});
			} else if (type == 'failure') {
				Notification({
					title: 'FAILURE',
					message: string,
					type: 'error'
				});
			} else if (type == 'warning') {
				Notification({
					title: 'WARNING',
					message: string,
					type: 'warning'
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
