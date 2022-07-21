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
                    網版列表<p>共有<span class="text-nar">{{total}}</span>個版</p>
                    <div id="searchWrap">
                        <input type="text" name="pd_num" class="search-bar" v-model="search_pd_num" placeholder="Search for..." @compositionstart="listen_input_start()" @compositionend="listen_input_end()">
                        <input v-if="search_pd_num != ''" @click="search_pd_num = ''" type="button" class="close-btn">
                        <input v-else type="button" class="search-btn" value="">
                    </div>
                </div>
            </div>
            <!-- 上方頁碼 -->
            <div class="paginate_box">
                <paginate v-model="project.page" :page-count="count" :click-handler="pushForPaginate()" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                <div class="pagination-select">
                    <select name="page_limit" id="page_limit" @change="project.page = 1,pushForPaginate()" v-model="project.limit">
                        <option value=10>10項 / 頁</option>
                        <option value=50>50項 / 頁</option>
                        <option value="all">全部列出</option>
                    </select>
                </div>
                <div class="model-wrap">
                    未被選中<el-checkbox v-on:change="getNoneProjects('five')" v-model="project.five_checked">五年</el-checkbox>
                    <el-checkbox v-on:change="getNoneProjects('four')" v-model="project.four_checked">四年</el-checkbox>
                    <el-checkbox v-on:change="getNoneProjects('three')" v-model="project.three_checked">三年</el-checkbox>
                </div>
            </div>
            <!-- list模式 -->
            <div class="template-list-wrap clearfix">
                <div class="template-title clearfix">
                    <div class="temp-img"><span>縮圖</span></div>
                    <div @click="changeOrderTarget('project','pd_num')" class="temp-name hasSomeFeatures">
                        <span>名稱</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_num','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_num','DESC') ? 'active': ''"></i>
                    </div>
                    <div @click="changeOrderTarget('project','pd_date')" class="temp-date hasSomeFeatures">
                        <span>上線日期</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_date','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_date','DESC') ? 'active': ''"></i>
                    </div>
                    <div @click="changeOrderTarget('project','times')" class="temp-times hasSomeFeatures">
                        <span>選中次數</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','times','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','times','DESC') ? 'active': ''"></i>
                    </div>
                    <div class="temp-color"><span>色系</span></div>
                    <div @click="changeOrderTarget('project','pd_elements')" class="temp-elements hasSomeFeatures">
                        <span>主色五行</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_elements','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_elements','DESC') ? 'active': ''"></i>
                    </div>
                    <div @click="changeOrderTarget('project','pd_elements_sub')" class="temp-elements-sub hasSomeFeatures">
                        <span>輔色五行</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_elements_sub','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_elements_sub','DESC') ? 'active': ''"></i>
                    </div>
                    <div class="temp-sign"><span>星座</span></div>
                    <div @click="changeOrderTarget('project','pd_type')" class="temp-type hasSomeFeatures">
                        <span>主題</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_type','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_type','DESC') ? 'active': ''"></i>
                    </div>
                    <div class="temp-style"><span>風格</span></div>
                    <div @click="changeOrderTarget('project','pd_new')" class="temp-icon hasSomeFeatures">
                        <span>New icon</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_new','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_new','DESC') ? 'active': ''"></i>
                    </div>
                    <div @click="changeOrderTarget('project','pd_show')" class="temp-status hasSomeFeatures">
                        <span>狀態</span>
                        <i class="fas fa-caret-up icon_up" :class="whichActive('project','pd_show','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('project','pd_show','DESC') ? 'active': ''"></i>
                    </div>
                </div>
                <div class="template-content clearfix">
                    <div v-if="showData == 1" v-for="item in newProjects" class="template-item">
                        <div class="temp-img">
                            <a v-if="item.pd_live == 1" :href="webbbin_front+'/_template/'+item.pd_num" target="_blank"><img :src="webbbin_front + item.pd_view_img" alt=""></a>
                            <a v-else href="javascript:void(0)"><img :src="webbbin_front + item.pd_view_img" alt=""></a>
                        </div>
                        <div class="temp-name">
                            <a href="javascript:void(0)" @click="goToModify(item.pd_id)" :title="item.pd_num">{{item.pd_num}}</a>
                        </div>
                        <div class="temp-date">{{item.pd_date}}</div>
                        <div v-if="item.count > 0" class="temp-times">
                            <a href="javascript:void(0)" @click="item.m_item ? (model.model_modify_mode = true,model.modify_model = item.m_item) : false">{{item.count}}</a></div>
                        <div v-else class="temp-times">{{item.count}}</div>
                        <!-- pd_colors -->
                        <div class="temp-color alLeft">
                            <span v-if="JSON.parse(item.pd_colors)[0]" :class="'main color color-'+JSON.parse(item.pd_colors)[0]"></span>
                            <span v-if="JSON.parse(item.pd_colors)[1]" :class="'sub color color-'+JSON.parse(item.pd_colors)[1]"></span>
                            <span v-if="JSON.parse(item.pd_colors)[2]" :class="'sub color color-'+JSON.parse(item.pd_colors)[2]"></span>
                        </div>
                        <div class="temp-elements">{{checkByElementsForList(item.pd_elements)}}</div>
                        <div class="temp-elements-sub">{{checkByElementsForList(item.pd_elements_sub)}}</div>
                        <div class="temp-sign"><span :class="check_sign_number(JSON.parse(item.pd_colors)[0]) ? 'one_line' : 'two_line'">{{checkBySignsForList(JSON.parse(item.pd_colors)[0])}}</span></div>
                        <div class="temp-type">{{checkByTypeForList(item.pd_type)}}</div>
                        <div class="temp-style">{{checkByStyleForList(item.pd_style)}}</div>
                        <!-- 最新顯示 -->
                        <div :class="{'temp-active' :item.pd_new == 1,'temp-icon':true,'js-sv':true}">
                            <a href="javascript:void(0)" @click="modifyNew(item.pd_id,item.pd_new,item.pd_show)" class="btn btn-s" title=""></a>
                            <div v-if="item.pd_new == 1">
                                <p>{{item.pd_new_start}} ~</p>
                                <p>{{item.pd_new_end}}</p>
                            </div>
                        </div>
                        <!-- 狀態顯示 -->
                        <div class="temp-status">
                            <select name="pd_show" id="pd_show" @change="modifyShow(item.pd_id,item.pd_show)" v-model="item.pd_show">
                                <option value=1>顯示</option>
                                <option value=0>關閉</option>
                                <option value=2>下架</option>
                            </select>
                        </div>
                    </div>
                    <p v-if="showData == 2">查無相符的固定網版資料</p>
                    <p v-if="showData == 3">目前暫無固定網版資料</p>
                </div>
            </div>
            <!-- 下方頁碼 -->
            <div class="paginate_box">
                <paginate v-model="project.page" :page-count="count" :click-handler="pushForPaginate()" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                <div class="pagination-select">
                    <select name="page_limit" id="page_limit" @change="project.page = 1,pushForPaginate()" v-model="project.limit">
                        <option value="10">10項 / 頁</option>
                        <option value="50">50項 / 頁</option>
                        <option value="all">全部列出</option>
                    </select>
                </div>
                <div class="pagination-gotoTop"><a @click="goToTop()" href="javascript:void(0)" class="fa js-gotoTop"></a></div>
            </div>
        </div>
    </div>
    <div v-if="model.model_modify_mode" class="overlay_for_model" @click="model.model_modify_mode=false">
        <div class="model_modify_wrap" @click.stop="model.model_modify_mode=true">
            <div class="content-title">
                {{model.modify_model.pd_num}}
                <p>共有<span class="text-nar">{{model.modify_model.data.length}}</span>次紀錄</p>
            </div>
            <div class="content_scroll">
                <table class="model_table">
                    <tr class="temp-title">
                        <td>日期</td>
                        <td>編輯</td>
                    </tr>
                    <tr v-for="item in model.modify_model.data" class="isdate" v-if="item.mr_date">
                        <td v-if="model.model.mr_id == item.mr_id" class="date_wrap">
                            <label for="" class="fa date-icon"></label>
                            <datepicker id="datepicker" class="date-input check_unit" name="mr_date" v-model="model.model.mr_date" :format="'yyyy-MM-dd'" v-tooltip="'請選擇日期'"></datepicker>
                        </td>
                        <td v-else>
                            <span class="text">{{item.mr_date}}</span>
                        </td>
                        <td v-if="model.model.mr_id == item.mr_id">
                            <button  @click="modifyModel()" class="model_btn btn_check"><i class="fas fa-check"></i></button>
                            <button @click="initModel()" class="model_btn btn_times"><i class="fas fa-times"></i></button>
                        </td>
                        <td v-else>
                            <button @click="model.model = item" class="model_btn btn_edit"><i class="fas fa-edit"></i></button>
                            <button @click="deleteModel(item.mr_id),item.mr_date = ''" class="model_btn btn_trash"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </table>
            </div>
            <button @click.stop="model.model_modify_mode = false" class="btn btn-cancel btn_back">關閉</button>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/header';
import CommonStatus from '@/components/status';
import axios from 'axios';
import { Notification } from 'element-ui'
import Datepicker from 'vuejs-datepicker';
import Clipboard from "clipboard";
export default {
    components: {
        CommonHeader,
        CommonStatus,
        Datepicker,
        Clipboard,
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'project',
            nowView:'list',
            pageScrollTop:0, // 卷軸距離頂端
            userdata:[], // 使用者資料
            disabledStartDates:{}, // new icon 顯示日期的區間上限(一年)
            disabledEndDates:{}, // new icon 顯示日期的區間上限(一年)
            //各頁排序依據/////////////////////////////////////////////////
            project_orderBy:['pd_date','DESC'], //
            search_pd_num:'', // 版型列表搜尋字串
            //各頁資訊////////////////////////////////////////////////////
            project:{/// 網版
                //各式資料////
                projects:[], // 全部固定網版資料
                signs:{
					"fire": {'sp_parametervalue':''},
					"water": {'sp_parametervalue':''},
					"earth": {'sp_parametervalue':''},
					"wind": {'sp_parametervalue':''}
				}, // 當年星象主色
                five_checked:false, // 五年內未被選中
                four_checked:false, // 四年內未被選中
                three_checked:false, // 三年內未被選中
                pageScrollTop:0, // 距離header的數值
                //頁碼相關////
                limit:10, //每頁數的筆數
                page:1, // 目前頁數
                //搜尋相關////
                composing:true, // 監聽搜尋框輸入

            },
            model:{///租網
                //各式資料////
                models:[], // 全部租網資料
                model:{}, // 單一租網資料
                modify_model:{}, // 單一租網修改時的資料
                model_setting:[], // 租網設定
                date:{}, //時間區間
                model_modify_mode:false, // 自動熱門編輯模式 true:開啟  false:關閉
            },
            //線上路徑////////////////////////////////////////////////////
            webbbin_front:'', // 前端路徑
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
        self.checkUrl();
        if(sessionStorage.getItem("localData") != null){
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.project){
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
        newProjects:function(){
            let self = this;
            if(self.project.projects){
                if(self.project.projects.length > 0){
                    var p = self.project.projects;
                    var m = self.model.models;
                    for (let i = 0; i < p.length; i++) {
                        var boolean = false;
                        var number = 0;
                        for (let j = 0; j < m.length; j++) {
                            if(p[i].pd_num == m[j].pd_num){
                                number = m[j].data.length;
                                p[i].m_item = m[j];
                                boolean = true;
                                break;
                            }
                        }
                        if(boolean){
                            p[i].count = number;
                        }else{
                            p[i].count = 0;
                        }
                    }
                    if(self.project_orderBy[0] == 'times'){
                        if(self.project_orderBy[1] == 'DESC'){
                            p.sort(function(a,b){
                                return b.count - a.count;
                            })
                        }else{
                            p.sort(function(a,b){
                                return a.count - b.count;
                            })
                        }
                    }
                    self.project.projects = p;
                    if(self.project.limit == 'all'){
                        return self.project.projects;
                    }else{
                        var start = (parseInt(self.project.page) - 1) * parseInt(self.project.limit);
                        return self.project.projects.slice(start, start + parseInt(self.project.limit));
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
            if(self[self.nowPage][self.nowPage+'s']){
                return self[self.nowPage][self.nowPage+'s'].length;
            }else{
                return 0;
            }
        },
        count:function(){
            let self = this;
            if(self[self.nowPage].limit == 'all'){
                self[self.nowPage].page = 1;
                return 1;
            }else{
                return Math.ceil(self.total / self[self.nowPage].limit)
            }
        },
        showData:function(){//1:有資料 2:無相符資料 3:資料庫沒資料
            let self = this;
            if(!self.project.projects){
                return 3;
            }else{
                if(self.project.projects.length > 0){
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
			axios.get(this.$server_api +'/project-all-data')
                .then(function (response) {
                    //網版相關
                    self.project.projects = response.data.project.projects;
                    self.project.signs.fire = response.data.project.sign_fire;
                    self.project.signs.water = response.data.project.sign_water;
                    self.project.signs.earth = response.data.project.sign_earth;
                    self.project.signs.wind = response.data.project.sign_wind;
                    self.model.models = response.data.model.models;
                    self.changeModels();
                })
                .catch(function (response) {
                    self.notification('系統出錯：getAllData()','failure');
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
            if(localData.project){
                var project = localData.project;
            }else{
                var project = {};
            }
            project.pageScrollTop = $(window).scrollTop();
            sessionStorage.setItem("localData",JSON.stringify(localData));
            window.location.replace('/project/modify?pd_id='+id);
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
        // 設定new icon顯示日期的可選區間(一年)
        setDisabledDate:function(){
            let self = this;
            //找到結束時間
            var now_end_date = Date.parse(self.project.project.pd_new_end).valueOf();
            var now_date = new Date();
            now_date = now_date.valueOf();
            var s_boolean = false; //用以判斷是否變更結束時間的根據
            var e_boolean = false; //用以判斷是否變更結束時間的根據

            //找到開始時間
            var before_start_date = new Date(self.project.project.pd_new_start);
            before_start_date = before_start_date.valueOf();
            if(now_date < before_start_date){
                before_start_date = new Date();
            }else{
                before_start_date = new Date(before_start_date);
            }
            var b_year = before_start_date.getFullYear();
            var b_month = before_start_date.getMonth()+1 < 10 ? '0'+ (before_start_date.getMonth()+1) : (before_start_date.getMonth()+1);
            var b_day = before_start_date.getDate() < 10 ? '0'+ before_start_date.getDate(): before_start_date.getDate();
            var before = b_year+"-"+b_month+"-"+b_day;

            //找到開始時間
            var after_start_date = new Date(self.project.project.pd_new_start);
            after_start_date = after_start_date.setDate(after_start_date.getDate() +1);
            if(now_end_date < end_date){
                s_boolean = true;
            }
            //轉換時間格式
            after_start_date = new Date(after_start_date);
            var a_year = after_start_date.getFullYear();
            var a_month = after_start_date.getMonth()+1 < 10 ? '0'+ (after_start_date.getMonth()+1) : (after_start_date.getMonth()+1);
            var a_day = after_start_date.getDate() < 10 ? '0'+ after_start_date.getDate(): after_start_date.getDate();
            var after = a_year+"-"+a_month+"-"+a_day;
            //檢查結束時間是否在一年範圍內
            if(s_boolean){
                self.project.project.pd_new_end = after;
            }

            //找到開始時間
            var start_date_end = new Date(self.project.project.pd_new_start);
            //針對開始時間增加一年期限
            var end_date = start_date_end.setYear(start_date_end.getFullYear() +1);
            if(now_end_date > end_date){
                e_boolean = true;
            }
            //轉換時間格式
            end_date = new Date(end_date);
            var e_year = end_date.getFullYear();
            var e_month = end_date.getMonth()+1 < 10 ? '0'+ (end_date.getMonth()+1) : (end_date.getMonth()+1);
            var e_day = end_date.getDate() < 10 ? '0'+ end_date.getDate(): end_date.getDate();
            var end = e_year+"-"+e_month+"-"+e_day;
            //檢查結束時間是否在一年範圍內
            if(e_boolean){
                self.project.project.pd_new_end = end;
            }
            //回傳時間
            self.disabledStartDates = {
                to: new Date(before),
            }
            self.disabledEndDates =  {
                to: new Date(after),
                from: new Date(end)
            };
        },
        // 檢查該使用者是否可以瀏覽該頁面
        checkUrl:function(){
            let self = this;
            var uuu = location.hostname;
			var uuu_array = uuu.split(".");
			if(uuu_array[0] == 'wms'){  // 正式站
				self.webbbin_front = 'https://web.bbinpartner.com';
			}else{  // 測試站
				self.webbbin_front = 'https://dev-web.bbinpartner.com';
			}
        },
        // 回最上面位置
        goToTop:function(){
            $('html').animate({ 'scrollTop': 0 }, 250);
        },
        // 檢查pd_elements回傳中文字 - 五行判斷用
        checkByElementsForList:function(pd_elements){
            if(pd_elements == 1){
                return '金';
            }else if(pd_elements == 2){
                return '木';
            }else if(pd_elements == 3){
                return '水';
            }else if(pd_elements == 4){
                return '火';
            }else if(pd_elements == 5){
                return '土';
            }else{
                return '';
            }
        },
        // 檢查該網版符合幾個星象
        check_sign_number:function(color){
            let self = this;
            var fire = JSON.parse(self.project.signs.fire.sp_parametervalue);
            var water = JSON.parse(self.project.signs.water.sp_parametervalue);
            var earth = JSON.parse(self.project.signs.earth.sp_parametervalue);
            var wind = JSON.parse(self.project.signs.wind.sp_parametervalue);
            var number = 0;
            for (let j = 0; j < fire.length; j++) {
                if(fire[j] == color){
                    number++;
                }
            }
            for (let k = 0; k < water.length; k++) {
                if(water[k] == color){
                    number++;
                }
            }
            for (let l = 0; l < earth.length; l++) {
                if(earth[l] == color){
                    number++;
                }
            }
            for (let m = 0; m < wind.length; m++) {
                if(wind[m] == color){
                    number++;
                }
            }
            if(number > 2){
                return false;
            }else{
                return true;
            }
        },
        // 檢查pd_color回傳中文字 - 星象判斷用
        checkBySignsForList:function(color){
            let self = this;
            var fire = JSON.parse(self.project.signs.fire.sp_parametervalue);
            var water = JSON.parse(self.project.signs.water.sp_parametervalue);
            var earth = JSON.parse(self.project.signs.earth.sp_parametervalue);
            var wind = JSON.parse(self.project.signs.wind.sp_parametervalue);
            var array = [];
            var string = '';
            for (let j = 0; j < fire.length; j++) {
                if(fire[j] == color){
                    array.push('火象');
                }
            }
            for (let k = 0; k < water.length; k++) {
                if(water[k] == color){
                    array.push('水象');
                }
            }
            for (let l = 0; l < earth.length; l++) {
                if(earth[l] == color){
                    array.push('土象');
                }
            }
            for (let m = 0; m < wind.length; m++) {
                if(wind[m] == color){
                    array.push('風象');
                }
            }
            for (let n = 0; n < array.length; n++) {
                if(n == 0){
                    string = array[n];
                }else{
                    string = string + '、' + array[n];
                }
            }
            if(string == ''){
                return '無';
            }else{
                return string;
            }
        },
        // 檢查pd_type回傳中文字 - 主題判斷用
        checkByTypeForList:function(pd_type){
            if(pd_type == 0){
                return '一般';
            }else if(pd_type == 1){
                return '機率';
            }else if(pd_type == 2){
                return '體育';
            }else if(pd_type == 3){
                return '棋牌';
            }else if(pd_type == 4){
                return '視訊';
            }else if(pd_type == 5){
                return '彩票';
            }else if(pd_type == 6){
                return '麻將';
            }else if(pd_type == 7){
                return '捕魚';
            }else if(pd_type == 8){
                return '電競';
            }else{
                return '無主題';
            }
        },
        // 檢查pd_style回傳中文字 - 風格判斷用
        checkByStyleForList:function(pd_style){
            if(pd_style == 1){
                return '前衛時尚';
            }else if(pd_style == 2){
                return '復古典雅';
            }else if(pd_style == 3){
                return '精緻華麗';
            }else if(pd_style == 4){
                return '簡約大氣';
            }else{
                return '無風格';
            }
        },
        // 切換排序依據
        changeOrderTarget:function(target,item){
            let self = this;
            var old_item = self.project_orderBy[0];
            var old_sort = self.project_orderBy[1];

            var new_orderBy = [];
            if(item == old_item){
                if(old_sort == 'DESC'){
                    new_orderBy[0] = item;
                    new_orderBy[1] = 'ASC';
                }else if(old_sort == 'ASC'){
                    new_orderBy[0] = item;
                    new_orderBy[1] = 'DESC';
                }
            }else{
                new_orderBy[0] = item;
                new_orderBy[1] = 'DESC';
            }

            var localData = JSON.parse(sessionStorage.getItem("localData"));
            localData.project.orderBy = new_orderBy[0];
            localData.project.sort = new_orderBy[1];
            sessionStorage.setItem("localData",JSON.stringify(localData));
            self.project_orderBy = new_orderBy;
        },
        // 目前排序依據為何
        whichActive:function(target,item,type){
            let self = this;
            var nowItem = self.project_orderBy[0];
            var nowType = self.project_orderBy[1];

            if(nowItem == item && nowType == type){
                return true;
            }else{
                return false;
            }
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
            if(localData.project){
                var project = localData.project;
            }else{
                var project = {};
            }
            project.limit = self.project.limit;
            project.page = self.project.page;
            localData.project = project;
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
            if(localData.project){
                var project = localData.project;
            }else{
                var project = {};
            }
            project.limit = self.project.limit;
            project.page = self.project.page;
            project.orderBy = self.project_orderBy[0];
            project.sort = self.project_orderBy[1];
            project.three_checked = self.project.three_checked;
            project.four_checked = self.project.four_checked;
            project.five_checked = self.project.five_checked;
            project.pageScrollTop = self.project.pageScrollTop;
            project.search_pd_num = self.search_pd_num;
            project.result = false;
            project.text = "";
            localData.project = project;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        // 複製sessionStorage的資料
        pullLocalDataForList:function(){
            let self = this;
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.project.limit){
                self.project.limit = localData.project.limit;
            }else{
                localData.project.limit = self.project.limit;
            }
            if(localData.project.page){
                self.project.page = localData.project.page;
            }else{
                localData.project.page = self.project.page;
            }
            if(localData.project.orderBy){
                self.project_orderBy[0] = localData.project.orderBy;
            }else{
                localData.project.orderBy = self.project_orderBy[0];
            }
            if(localData.project.sort){
                self.project_orderBy[1] = localData.project.sort;
            }else{
                localData.project.sort = self.project_orderBy[1];
            }
            if(localData.project.three_checked){
                self.project.three_checked = localData.project.three_checked;
            }else{
                localData.project.three_checked = self.project.three_checked;
            }
            if(localData.project.four_checked){
                self.project.four_checked = localData.project.four_checked;
            }else{
                localData.project.four_checked = self.project.four_checked;
            }
            if(localData.project.five_checked){
                self.project.five_checked = localData.project.five_checked;
            }else{
                localData.project.five_checked = self.project.five_checked;
            }
            if(localData.project.pageScrollTop > 0){
                $('html,body').animate({ 'scrollTop': localData.project.pageScrollTop }, 250);
                localData.project.pageScrollTop = 0;
            }
            if(localData.project.search_pd_num){
                self.search_pd_num = localData.project.search_pd_num;
            }else{
                localData.project.search_pd_num = self.search_pd_num;
            }
            if(localData.project.result){
                self.notification(localData.project.text,'success');
                localData.project.result = false;
            }
            sessionStorage.setItem("localData",JSON.stringify(localData));
            self.getSigns();
            self.getModels();
            self.getProjects(self.project_orderBy);
        },
        ///
        //////////////////////// session功能 end ////////////////////

        //////////////////////// 初始化各項目 //////////////////////
        ///
        // 版型資料初始化
        initProject:function(){
            this.project.project = {};
            this.project.project = Object.assign({}, this.project.project, {
                pd_num:'',
                pd_date:'',
                pd_designer:'',
                pd_show: 0,
                pd_new: 0,
                pd_hot: 0,
                pd_layout: 1,
                pd_style: 1,
                pd_colors:'[]',
                pd_type: 0,
                pd_live: 0,
                pd_live_url: '',
                pd_view_img:'',
                pd_banner_img:'',
                pd_template_img:'[]',
                pd_model_img:'[]',
                pd_notices:'',
            })
            this.project.project.pd_date = new Date();
            this.project.project.pd_new_start = new Date();
            var d = new Date();
            d.setMonth(d.getMonth() + 3)
            this.project.project.pd_new_end = d;
            this.setDisabledDate();
        },
        // 版型紀錄初始化
        initModel:function(){
            this.model.model =  {};
            this.model.model = Object.assign({}, this.model.model, {
                pd_id: '',
                mr_date: '',
                pd_num:''
            })
            this.model.model.mr_date = new Date();
        },
        ///
        //////////////////////// 初始化各項目 end //////////////////

        //////////////////////// 各頁面功能 //////////////////////
        ///
        // 處理熱門版型的資料顯示方式
        changeModels:function(){
            let self = this;
            var new_models = [],old_models = self.model.models;
            for (var i = 0; i < old_models.length; i++) {
                if(new_models.length == 0){
                    var json = {};
                    json.pd_num = old_models[i].pd_num;
                    json.pd_view_img = old_models[i].pd_view_img;
                    json.data = [];
                    json.data.push(old_models[i]);
                    new_models.push(json);
                }else{
                    var k = true;
                    for(var j = 0; j < new_models.length;j++){
                        if(new_models[j].pd_num == old_models[i].pd_num){
                            new_models[j].data.push(old_models[i]);
                            k = false;
                            break;
                        }
                    }
                    if(k){
                        var json = {};
                        json.pd_num = old_models[i].pd_num;
                        json.pd_view_img = old_models[i].pd_view_img;
                        json.data = [];
                        json.data.push(old_models[i]);
                        new_models.push(json);
                    }
                }
            }
            //編輯排序
            new_models.sort(function(a,b){
                return b.data.length - a.data.length;
            })
            var rank = 0,rank_total = 0,same_rank = false;
            for (let x = 0; x < new_models.length; x++) {
                if(x == 0){
                    rank_total = new_models[x].data.length;
                    rank = rank+1;
                    new_models[x].rank = rank;
                }else if(new_models[x].data.length < rank_total){
                    rank_total = new_models[x].data.length;
                    if(same_rank){
                        same_rank = false;
                        rank = x+1;
                        new_models[x].rank = x+1;
                    }else{
                        rank = rank+1;
                        new_models[x].rank = rank;
                    }
                }else if(new_models[x].data.length == rank_total){
                    same_rank = true;
                    new_models[x].rank = rank;
                }

            }
            self.model.models = new_models;
        },
        // 初始化複製功能
        initClipboard(e){
            let self = this;
            var url = '';
            url = self.webbbin_front + $(e.target).siblings('input[type=text]').val();

            // 創建
            const clipboard = new Clipboard(this.$refs.copyUrl,{
                text: function(){
                    return url;
                }
            });
            clipboard.on('success', (e) => {
                self.notification('複製成功','success');
            });
            clipboard.on('error', (e) => {
                self.notification('複製失敗','failure');
            });
            // 點擊
            this.$refs.copyUrl.click();
            // 清除
            clipboard.destroy();
        },
        ///
        //////////////////////// 各頁面功能 end //////////////////

        //////////////////////// 查詢功能 //////////////////////
        ///
        // 監聽搜尋框 注音輸入開始
        listen_input_start:function(){
            let self = this;
            self.project.composing = false;
        },
        // 監聽搜尋框 注音輸入結束
        listen_input_end:function(){
            let self = this;
            self.project.composing = true;
        },
        // 查詢功能
        search: function () {
            let self = this;
            setTimeout(function(){
                if(self.project.composing){
                    self.project.page = 1;
                    var localData = JSON.parse(sessionStorage.getItem("localData"));
                    localData.project.page = 1;
                    localData.project.search_pd_num = self.search_pd_num;
                    sessionStorage.setItem("localData",JSON.stringify(localData));
                    self.getProjects(self.project_orderBy);
                }
            },10)
        },
        ///
        //////////////////////// 查詢功能 end //////////////////

        //////////////////////// 取值專區 ////////////////////////
        ///
        //取得星象資料
        getSigns:function(){
            let self = this;
			axios.get(this.$server_api +'/signs')
                .then(function (response) {
                    self.project.signs.fire = response.data.sign_fire;
                    self.project.signs.earth = response.data.sign_earth;
                    self.project.signs.wind = response.data.sign_wind;
                    self.project.signs.water = response.data.sign_water;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getSigns()','failure');
                });
        },
        //取得租網資料
        getModels:function(){
            let self = this;
			axios.get(this.$server_api +'/models')
                .then(function (response) {
                    self.model.models = response.data.models;
                    self.changeModels();
                })
                .catch(function (response) {
                    self.notification('系統出錯：getModels()','failure');
                });
        },
        //取得五年內或是四年內沒被選中的版型資料
        getNoneProjects:function(type){
            let self = this;
            if(type == 'five'){
                self.project.four_checked = false;
                self.project.three_checked = false;
            }else if(type == 'four'){
                self.project.five_checked = false;
                self.project.three_checked = false;
            }else if(type == 'three'){
                self.project.four_checked = false;
                self.project.five_checked = false;
            }
            self.getProjects(self.project_orderBy);
        },
        //取得網版資料
        getProjects:function(orderBy){
            let self = this;
            var checked = '';
            if(self.project.five_checked){
                checked = 'five';
            }else if(self.project.four_checked){
                checked = 'four';
            }else if(self.project.three_checked){
                checked = 'three';
            }
			axios.get(this.$server_api +'/projects?orderBy='+orderBy[0]+'&sort='+orderBy[1]+'&pd_num='+self.search_pd_num+'&checked='+checked)
                .then(function (response) {
                    self.project.projects = response.data.projects;
                    self.project_orderBy[0] = response.data.orderBy;
                    self.project_orderBy[1] = response.data.sort;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getProjects()','failure');
                });
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

        //////////////////////// 修改區塊 ///////////////////////////
        ///
        //修改顯示狀態
        modifyShow:function(id,pd_show){
            let self = this;
            var json = {};

            json.pd_id = id;
            json.pd_show = pd_show;
            if(pd_show != 1){
                json.pd_new = 0;
                json.pd_new_start = "";
                json.pd_new_end = "";
            }
			json.last_update_user = self.userdata.ud_name;
			axios.post(this.$server_api +'/project-modify',json) //修改 -
                .then(function (response) {
                    if(response.data){
                        if(self.nowPage == 'index'){
                            self.getProjectData(self.index_orderBy);
                        }else if(self.nowPage == 'project'){
                            self.getProjects(self.project_orderBy);
                        }
                        self.notification('修改成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifyShow()','failure');
                });
        },
        //修改最新項目狀態
        modifyNew:function(id,pd_new,pd_show){
            let self = this;

            if(pd_show == 1){
                var json = {};
                json.pd_id = id;
                json.pd_new = pd_new ? 0 : 1;
                if(json.pd_new){
                    var start = new Date();
                    var s_year = start.getFullYear();
                    var s_month = start.getMonth()+1 < 10 ? '0'+ (start.getMonth()+1) : (start.getMonth()+1);
                    var s_day = start.getDate() < 10 ? '0'+ start.getDate(): start.getDate();
                    json.pd_new_start = s_year+'-'+s_month+'-'+s_day;

                    var end = new Date(start.setMonth(start.getMonth() + 3));
                    var e_year = end.getFullYear();
                    var e_month = end.getMonth()+1 < 10 ? '0'+ (end.getMonth()+1) : (end.getMonth()+1);
                    var e_day = end.getDate() < 10 ? '0'+ end.getDate(): end.getDate();
                    json.pd_new_end = e_year+'-'+e_month+'-'+e_day;
                }else{
                    json.pd_new_start = "";
                    json.pd_new_end = "";
                }
				json.last_update_user = self.userdata.ud_name;
				axios.post(this.$server_api +'/project-modify',json) //修改 -
                    .then(function (response) {
                        if(response.data){
                            self.getProjects(self.project_orderBy);
                            self.notification('修改成功','success');
                        }else{
                            self.notification(response.data,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.notification('系統出錯：modifyNew()','failure');
                    });
            }else{
                self.notification('請先開啟該網版狀態，才可設定New icon','warning');
            }

        },
        //修改租網資料
        modifyModel:function(){
            let self = this;
            /// 檢查必填欄位是否傳入
            //時間格式轉換
            if(!self.model.model.mr_date){
                self.notification('請選擇選中日期','warning');
                return false;
            }else{
                var fromDate = new Date(self.model.model.mr_date);
                var year = fromDate.getFullYear();
                var month = fromDate.getMonth() < 10 ? '0'+ (fromDate.getMonth()+1) : (fromDate.getMonth()+1);
                var day = fromDate.getDate() < 10 ? '0'+ fromDate.getDate(): fromDate.getDate();
                self.model.model.mr_date = year+'-'+month+'-'+day;
            }
			self.model.model.last_update_user = self.userdata.ud_name;
            // 回傳修改
			axios.post(this.$server_api +'/model-modify',self.model.model) //修改 - 版型資料
                .then(function (response) {
                    if(response.data){
                        self.initModel();
                        self.getModels();
                        self.changeModels();
                        self.notification('修改成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifyModel()','failure');
                });
        },
        ///
        //////////////////////// 修改區塊 end ////////////////////////

        //////////////////////// 刪除區塊 ///////////////////////////
        ///
        //刪除網版資料
        deleteProject:function(id){
            let self = this;
            var json = {};
            json.pd_id = id;
			json.last_update_user = self.userdata.ud_name;
			axios.post(this.$server_api +'/project-delete',json) //刪除
                .then(function (response) {
                    if(response.data){
                        self.project.page = 1;
                        self.project.project = {};
                        self.getProjects(self.project_orderBy);
                        self.notification('刪除成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：deleteProject()','failure');
                });
        },
        //刪除租網資料
        deleteModel:function(id){
            let self = this;
            var json = {};
            json.mr_id = id;
			json.last_update_user = self.userdata.ud_name;
			axios.post(this.$server_api +'/model-delete',json) //刪除
                .then(function (response) {
                    if(response.data){
                        self.initModel();
                        self.getModels();
                        self.changeModels();
                        self.notification('刪除成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：deleteModel()','failure');
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
        // 版型列表的排序功能
        project_orderBy:function(){
            let self = this;
            self.getProjects(self.project_orderBy);
        },
        // 版型列表搜尋功能
        search_pd_num:function(){
            let self = this;
            self.search();
        },
	}
}
</script>
