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
            <div class="page-title">
                <div class="content-title">
                    合作夥伴列表<p>共有<span class="text-nar">{{total}}</span>個夥伴</p>
                </div>
                <a v-if="userdata.ud_admin" @click="logo.sort ? logo.sort=false:logo.sort=true" :class="logo.sort ? 'model-cancel' : 'model-sort'" href="javascript:void(0)" v-tooltip="logo.sort ? '關閉拖拉':'開啟拖拉'" class="model-sort fa model-btn"></a>
            </div>
            <!-- 上方頁碼 -->
            <div v-if="!logo.sort" class="paginate_box">
                <paginate v-model="logo.page" :page-count="count" :click-handler="pushForPaginate()" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                <div class="pagination-select">
                    <select name="page_limit" id="page_limit" @change="logo.page = 1,pushForPaginate()" v-model="logo.limit">
                        <option value="10">10項 / 頁</option>
                        <option value="50">50項 / 頁</option>
                        <option value="all">全部列出</option>
                    </select>
                </div>
                <div class="model-wrap">
                    <a @click="changeDisplay(logo.display)" href="javascript:void(0)" v-tooltip="logo.display == 'list' ? '圖示':'列表'" :class="logo.display == 'image' ? 'model-img' : 'model-list'" class="fa model-btn"></a>
                    <div id="searchWrap" style="margin-top:0;">
                        <input type="text" name="ld_name" class="search-bar" v-model="search_ld_name" placeholder="Search for..." @compositionstart="listen_input_start()" @compositionend="listen_input_end()">
                        <input v-if="search_ld_name != ''" @click="search_ld_name = ''" type="button" class="close-btn">
                        <input v-else type="button" class="search-btn" value="">
                    </div>
                </div>
            </div>
            <!-- 列表模式 -->
            <div v-if="logo.display == 'list' && !logo.sort" class="logo-list-wrap clearfix">
                <div class="logo-title clearfix">
                    <div class="lo-img">縮圖</div>
                    <div class="lo-name">名稱</div>
                    <div class="lo-casino">電子分類</div>
                    <div class="lo-sports">體育分類</div>
                    <div class="lo-card">棋牌分類</div>
                    <div class="lo-live">視訊分類</div>
                    <div class="lo-lottery">彩票分類</div>
                    <div class="lo-fishing">捕魚分類</div>
                    <div class="lo-mahjong">麻將分類</div>
                    <div class="lo-edit">編輯</div>
                </div>
                <div class="logo-content clearfix">
                    <div v-for="item in newLogos" v-bind:key="item.ld_id" class="logo-item">
                        <div class="lo-img">
                            <a href="javascript:void(0)" @click="goToModify(item.ld_id)"><img :src="item.ld_img" alt=""></a>
                        </div>
                        <div class="lo-name">
                            <a href="javascript:void(0)" @click="goToModify(item.ld_id)" :title="item.ld_name">{{item.ld_name}}</a>
                        </div>
                        <!-- 電子分類 -->
                        <div :class="{'lo-active' :item.ld_casino == 1,'temp-status':true,'js-sv':true,'lo-casino':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_casino',item.ld_casino)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 體育分類 -->
                        <div :class="{'lo-active' :item.ld_sports == 1,'temp-status':true,'js-sv':true,'lo-sports':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_sports',item.ld_sports)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 棋牌分類 -->
                        <div :class="{'lo-active' :item.ld_card == 1,'temp-status':true,'js-sv':true,'lo-card':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_card',item.ld_card)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 視訊分類 -->
                        <div :class="{'lo-active' :item.ld_live == 1,'temp-status':true,'js-sv':true,'lo-live':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_live',item.ld_live)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 彩票分類 -->
                        <div :class="{'lo-active' :item.ld_lottery == 1,'temp-status':true,'js-sv':true,'lo-lottery':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_lottery',item.ld_lottery)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 捕魚分類 -->
                        <div :class="{'lo-active' :item.ld_fishing == 1,'temp-status':true,'js-sv':true,'lo-fishing':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_fishing',item.ld_fishing)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 麻將分類 -->
                        <div :class="{'lo-active' :item.ld_mahjong == 1,'temp-status':true,'js-sv':true,'lo-mahjong':true}">
                            <a href="javascript:void(0)" @click="modifySort(item.ld_id,'ld_mahjong',item.ld_mahjong)" class="btn btn-s" title=""></a>
                        </div>
                        <!-- 編輯按鈕 -->
                        <div class="lo-edit js-sv">
                            <a href="javascript:void(0)" @click="goToModify(item.ld_id)" class="btn btn-s" title="編輯"></a>
                        </div>
                    </div>
                    <p v-if="showData == 2">查無相符的合作夥伴資料</p>
                    <p v-if="showData == 3">目前暫無合作夥伴資料</p>
                </div>
            </div>
            <!-- image模式 -->
            <div v-if="logo.display == 'image' && !logo.sort" class="row logo-img-wrap">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p_l_r_dis adaptivelist_wrap">
                    <div class="x_panel logo_warp">
                        <div  v-if="showData == 1">
                            <div v-for="item in newLogos" v-bind:key="item.ld_id" class="col-lg-2 col-sm-3 col-xs-3">
                                <a href="javascript:void(0)" class="col-lg-12 col-sm-12 col-xs-12 p_l_r_dis form_item">
                                    <div class="item_block">
                                        <div class="image view view-first">
                                            <a href="javascript:void(0)" @click="goToModify(item.ld_id)" class="" :title="item.ld_name"><img style="width: 100%; display: block;" :src="item.ld_img" alt="image"></a>
                                        </div>
                                        <div class="caption">
                                            <p><strong><a href="javascript:void(0)" @click="goToModify(item.ld_id)" class="" :title="item.ld_name">{{ item.ld_name }}</a></strong></p>
                                            <a href="javascript:void(0)" @click="goToModify(item.ld_id)" class="modify_url one_btn">編輯</a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <p v-if="showData == 2">查無相符的合作夥伴資料</p>
                        <p v-if="showData == 3">目前暫無合作夥伴資料</p>
                    </div>
                </div>
            </div>
            <!-- 拖拉模式 -->
            <div v-if="logo.sort && userdata.ud_admin" class="sort-list-wrap clearfix">
                <div>
                    <SlickList v-if="showData == 1" class="sort-content clearfix row" v-model="logo.sorts" @input="modifyLogoSort()" axis="x,y">
                        <SlickItem v-for="(item, index) in logo.sorts" class="sort-item col-lg-2 col-sm-3 col-xs-3" :index="index" :key="index">
                            <div class="sort-img sort-item">
                                <a href="javascript:void(0)"><img :src="item.ld_img" alt=""></a>
                            </div>
                        </SlickItem>
                    </SlickList>
                    <p v-if="showData == 2">查無相符的合作夥伴資料</p>
                    <p v-if="showData == 3">目前暫無合作夥伴資料</p>
                </div>
            </div>
            <!-- 下方頁碼 -->
            <div v-if="!logo.sort" class="paginate_box">
                <paginate v-model="logo.page" :page-count="count" :click-handler="pushForPaginate()" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                <div class="pagination-select">
                    <select name="page_limit" id="page_limit" @change="logo.page = 1,pushForPaginate()" v-model="logo.limit">
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
</template>
<script>
import CommonHeader from '@/components/header';
import CommonStatus from '@/components/status';
import axios from 'axios';
import { Notification } from 'element-ui'
import { SlickList, SlickItem } from 'vue-slicksort';
export default {
    components: {
        CommonHeader,
        CommonStatus,
        SlickList,
        SlickItem
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'logo',
            nowView:'list',
            userdata:[], // 使用者資料
            search_ld_name:'', // 搜尋字串
            //各頁資訊////////////////////////////////////////////////////
            logo:{/// 合作夥伴
                display:'list', // 列表顯示方式 list or image
                //各式資料////////////////////////////////////////////////////
                logos:[], // 全部合作夥伴資料
                sorts:[],
                sort:false,
                logo:{}, // 單一合作夥伴資料
                pageScrollTop:0, // 距離header的數值
                //頁碼相關////////////////////////////////////////////////////
                limit:10, //每頁數的筆數
                page:1, // 目前頁數
                //搜尋相關////////////////////////////////////////////////////
                composing:true, // 監聽搜尋框輸入
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
        if(sessionStorage.getItem("localData") != null){
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.logo){
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
    },
    computed: {
        newLogos:function(){
            let self = this;
            if(self.logo.logos){
                if(self.logo.logos.length > 0){
                    if(self.logo.limit == 'all'){
                        return self.logo.logos;
                    }else{
                        var start = (parseInt(self.logo.page) - 1) * parseInt(self.logo.limit);
                        return self.logo.logos.slice(start, start + parseInt(self.logo.limit));
                    }
                }else{
                    return [];
                }
            }else{
                return [];
            }
        },
        total:function(){//總數
            let self = this;
            if(self[self.nowPage][self.nowPage+'s']){
                return self[self.nowPage][self.nowPage+'s'].length;
            }else{
                return 0;
            }
        },
        count:function(){
            let self = this;
            if(self.logo.limit == 'all'){
                self.logo.page = 1;
                return 1;
            }else{
                return Math.ceil(self.total / self.logo.limit)
            }
        },
        showData:function(){//1:有資料 2:無相符資料 3:資料庫沒資料
            let self = this;
            if(!self.logo.logos){
                return 3;
            }else{
                if(self.logo.logos.length > 0){
                    return 1;
                }else{
                    return 2;
                }
            }
        }
    },
    methods: {
        // 取得所有初始資料
        init: function () {
            let self = this;
			axios.get(this.$server_api +'/logo-all-data')
                .then(function (response) {
                    //合作夥伴相關
                    self.logo.logos = response.data.logo.logos;
                    self.logo.sorts = response.data.logo.logos;
                })
                .catch(function (response) {
                    self.notification('系統出錯：init()','failure');
                });
        },
        //////////////////////// 共用功能 //////////////////////
        ///
        // 前往修改頁
        goToModify:function(id){
            if(sessionStorage.getItem("localData") != null){
                var localData = JSON.parse(sessionStorage.getItem("localData"));
            }else{
                var localData = {};
            }
            if(localData.logo){
                var logo = localData.logo;
            }else{
                var logo = {};
            }
            logo.pageScrollTop = $(window).scrollTop();
            sessionStorage.setItem("localData",JSON.stringify(localData));
            window.location.replace('/logo/modify?ld_id='+id);
        },
        // 更新session(頁碼用)
        pushForPaginate:function(){
            let self = this;
            if(sessionStorage.getItem("localData") != null){
                var localData = JSON.parse(sessionStorage.getItem("localData"));
            }else{
                var localData = {};
            }
            if(localData.logo){
                var logo = localData.logo;
            }else{
                var logo = {};
            }
            logo.limit = self.logo.limit;
            logo.page = self.logo.page;
            localData.logo = logo;
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
            if(localData.logo){
                var logo = localData.logo;
            }else{
                var logo = {};
            }
            logo.limit = self.logo.limit;
            logo.page = self.logo.page;
            logo.display = self.logo.display;
            logo.pageScrollTop = self.logo.pageScrollTop;
            logo.search_ld_name = self.search_ld_name;
            logo.result = false;
            logo.text = "";
            localData.logo = logo;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        // 複製sessionStorage的資料
        pullLocalDataForList:function(){
            let self = this;
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.logo.limit){
                self.logo.limit = localData.logo.limit;
            }else{
                localData.logo.limit = self.logo.limit;
            }
            if(localData.logo.page){
                self.logo.page = localData.logo.page;
            }else{
                localData.logo.page = self.logo.page;
            }
            if(localData.logo.display){
                self.logo.display = localData.logo.display;
            }else{
                localData.logo.display = self.logo.display;
            }
            if(localData.logo.search_ld_name){
                self.search_ld_name = localData.logo.search_ld_name;
            }else{
                localData.logo.search_ld_name = self.search_ld_name;
            }
            if(localData.logo.pageScrollTop){
                $('html,body').animate({ 'scrollTop': localData.logo.pageScrollTop }, 250);
                localData.logo.pageScrollTop = 0;
            }
            if(localData.logo.result){
                self.notification(localData.logo.text,'success');
                localData.logo.result = false;
            }
            sessionStorage.setItem("localData",JSON.stringify(localData));
            self.getLogos();
            self.getSorts();
        },
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
        // 改變呈現方式
        changeDisplay:function(type){
            let self = this;
            self.logo.display = type == 'image' ? 'list' : 'image';
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            localData.logo.display = self.logo.display;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// 查詢功能 //////////////////////
        ///
        // 監聽搜尋框 注音輸入開始
        listen_input_start:function(){
            let self = this;
            self.logo.composing = false;
        },
        // 監聽搜尋框 注音輸入結束
        listen_input_end:function(){
            let self = this;
            self.logo.composing = true;
        },
        // 查詢功能
        search: function () {
            let self = this;
            setTimeout(function(){
                if(self.logo.composing){
                    self.logo.page = 1;
                    var localData = JSON.parse(sessionStorage.getItem("localData"));
                    localData.logo.page = 1;
                    localData.logo.search_ld_name = self.search_ld_name;
                    sessionStorage.setItem("localData",JSON.stringify(localData));
                    self.getLogos();
                }
            },10)
        },
        ///
        //////////////////////// 查詢功能 end //////////////////

        //////////////////////// 取值專區 ////////////////////////
        ///
        //取得合作夥伴的排序(只有一開始載入的時候會用到)
        getSorts:function(){
            let self = this;
			axios.get(this.$server_api +'/logos')
                .then(function (response) {
                    self.logo.sorts = response.data.logos;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getSorts()','failure');
                });
        },
        //取得合作夥伴資料
        getLogos:function(){
            let self = this;
			axios.get(this.$server_api +'/logos?ld_name='+self.search_ld_name)
                .then(function (response) {
                    self.logo.logos = response.data.logos;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getLogos()','failure');
                });
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

        //////////////////////// 修改區塊 ///////////////////////////
        ///
        //修改合作夥伴排序
        modifyLogoSort:function(){
            let self = this;
			axios.post(this.$server_api +'/logosort-modify',self.logo.sorts) //修改 -
                .then(function (response) {
                    if(response.data){
                        self.getLogos();
                        self.notification('修改成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        ///
        //////////////////////// 修改區塊 end ////////////////////////

        //////////////////////// 刪除區塊 ///////////////////////////
        ///        //刪除合作夥伴資料
        deleteLogo:function(id){
            let self = this;
            var json = {};
            json.ld_id = id;
			json.last_update_user = self.userdata.ud_name;
			axios.post(this.$server_api +'/logo-delete',json) //刪除
                .then(function (response) {
                    if(response.data){
                        self.logo.page = 1;
                        self.logo.logo = {};
                        self.getLogos();
                        self.getSorts();
                        self.notification('刪除成功','success');
                    }else{
						self.notification('刪除失敗','failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：deleteLogo()','failure');
                });
        },
        ///
        //////////////////////// 刪除區塊 end ////////////////////////

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
        // 合作夥伴列表搜尋功能
        search_ld_name:function(){
            let self = this;
            self.search();
        },
	}
}
</script>
