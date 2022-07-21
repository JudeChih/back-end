<style scoped></style>
<template>
<div id="mainBody" class="model_page clearfix">
	<!--header-->
	<common-header :data="userdata" :page="nowPage" :view="nowView"></common-header>
	<!--container-->
	<div id="container">
		<!--status-->
		<common-status :data="userdata" :page="nowPage" :view="nowView"></common-status>
		<!--content-->
		<!--☢-->
		<div class="content-wrap clearfix">
			<div class="page-title">
				<div class="content-title">
					租網列表<p><span class="text-nar">Hot</span></p>
					<table v-if="model.setting_mode" class="table-model">
						<tr>
							<td class="model-list">顯示模式</td>
							<td class="model-content">
								<p>
									<input name="mod" id="auto" type="radio"
										v-model="model.model_setting.mod.sp_parametervalue" value="1"
										checked="checked">
									<label name="mod" for="auto">自動</label>
								</p>
								<p>
									<input name="mod" id="hand" type="radio"
										v-model="model.model_setting.mod.sp_parametervalue" value="2">
									<label name="mod" for="hand">手動</label>
								</p>
							</td>
						</tr>
						<tr v-if="model.model_setting.mod.sp_parametervalue == 1">
							<td class="model-list">顯示區間</td>
							<td class="model-content">
								<span>
									<label for="" class="fa date-icon"></label>
									<datepicker id="datepicker-start" class="date-input check_unit"
										name="date_start" v-model="model.date.start" minimum-view="year"
										maximum-view="year" :format="'yyyy'" v-tooltip="'請選擇年份區間 start'">
									</datepicker>
								</span>
								<span> ~ </span>
								<span>
									<label for="" class="fa date-icon"></label>
									<datepicker id="datepicker-end" class="date-input check_unit" name="date_end"
										v-model="model.date.end" minimum-view="year" maximum-view="year"
										:format="'yyyy'" v-tooltip="'請選擇年份區間 end'"></datepicker>
								</span>
								<button @click="getModelSetting()" class="btn btn-cancel btn_back">取消</button>
								<button @click="modifySystem()" type="button" class="btn btn_save">儲存</button>
							</td>
						</tr>
						<tr v-if="model.model_setting.mod.sp_parametervalue == 2">
							<td class="model-list">新增版型</td>
							<td class="model-content">
								<input type="text" v-model="model.hot_project.pd_num" list="not_hot_projects"
									v-tooltip="'請選擇版型'">
								<datalist id="not_hot_projects">
									<option v-for="project in model.not_hot_projects">{{project.pd_num}}</option>
								</datalist>
								<button @click="createHotProject()" type="button" class="btn btn-select"><i
										class="fas fa-plus"></i></button>
								<button @click="getModelSetting()" class="btn btn-cancel btn_back">取消</button>
								<button @click="modifySystem()" type="button" class="btn btn_save">儲存</button>
							</td>
						</tr>
					</table>
					<div class="setting-wrap" v-else>
						<div v-if="model.model_setting.mod.sp_parametervalue == 1">前台顯示模式：自動</div>
						<div v-else>前台顯示模式：手動</div>
						<div v-if="model.model_setting.mod.sp_parametervalue == 1">
							前台顯示區間：{{dateGetYear(model.date.start)}} - {{dateGetYear(model.date.end)}}</div>
					</div>
				</div>
			</div>
			<!-- 上方頁碼 -->
			<div class="paginate_box"
				v-if="!(model.model_setting.mod.sp_parametervalue == 2 && model.setting_mode)">
				<paginate v-model="model.page" :page-count="count" :click-handler="pushForPaginate()"
					:page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
				<div class="pagination-select">
					<select name="page_limit" id="page_limit" @change="model.page = 1,pushForPaginate()"
						v-model="model.limit">
						<option value=10>10項 / 頁</option>
						<option value=50>50項 / 頁</option>
						<option value="all">全部列出</option>
					</select>
				</div>
				<div class="model-wrap">
					<!-- 編輯按鈕 -->
					<button v-if="!model.setting_mode" @click="model.setting_mode = true" type="button"
						class="btn btn_save">編輯</button>
				</div>
			</div>
			<!-- list模式 自動 -->
			<div v-if="model.model_setting.mod.sp_parametervalue == 1" class="template-list-wrap clearfix">
				<div class="template-title clearfix">
					<div class="model-rank">排行</div>
					<div class="model-img">縮圖</div>
					<div class="model-name">名稱</div>
					<div class="model-times">選中次數</div>
				</div>
				<div class="template-content clearfix">
					<div v-if="showData == 1" v-for="(item,index) in newModels" class="template-item">
						<div class="model-rank">
							<span title="排行">{{item.rank}}</span>
						</div>
						<div class="model-img">
							<a :href="webbbin_front+'/_template/'+item.pd_num" target="_blank"><img
									:src="webbbin_front + item.pd_view_img" alt=""></a>
						</div>
						<div class="model-name">
							<span :title="item.pd_num">{{item.pd_num}}</span>
						</div>
						<!-- 次數 -->
						<div class="model-times">
							<a href="javascript:void(0)" title="選中次數"
								@click="modelDetail(true,item)">{{item.data.length}}</a>
						</div>
					</div>
					<p v-if="showData == 2">查無相符的自動熱門網版資料</p>
					<p v-if="showData == 3">目前暫無自動熱門網版資料</p>
				</div>
			</div>
			<!-- image模式 手動 可刪除版-->
			<div v-if="model.model_setting.mod.sp_parametervalue == 2 && !model.setting_mode"
				class="row model_image">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p_l_r_dis adaptivelist_wrap">
					<div class="x_panel">
						<div v-if="showData == 1" v-for="item in newModels"
							class="col-lg-3 col-sm-4 col-xs-4 model-list">
							<a href="javascript:void(0)" class="col-lg-12 col-sm-12 col-xs-12 p_l_r_dis form_item">
								<div class="item_block">
									<div class="image view view-first">
										<a href="javascript:void(0)" class="" :title="item.pd_num"><img
												style="width: 100%; display: block;"
												:src="webbbin_front + item.pd_view_img" alt="image"></a>
										<div class="overlay">
											<button @click="deleteHotProject(item)" class="btn btn-del">刪除</button>
										</div>
									</div>

								</div>
							</a>
						</div>
						<p v-if="showData == 2">查無相符的手動熱門網版資料</p>
						<p v-if="showData == 3">目前暫無手動熱門網版資料</p>
					</div>
				</div>
			</div>
			<!-- image模式 手動 可拖拉版-->
			<div v-if="model.model_setting.mod.sp_parametervalue == 2 && model.setting_mode"
				class="row model_image">
				<div class="sort-list-wrap clearfix">
					<div>
						<SlickList helperClass="model_state" v-if="showData == 1"
							class="sort-content col-lg-12 col-md-12 col-sm-12 col-xs-12 p_l_r_dis"
							v-model="model.sorts" @input="modifyModelSort()" axis="x,y">
							<SlickItem v-for="(item, index) in model.sorts"
								class="sort-item col-lg-3 col-sm-4 col-xs-4" :index="index" :key="index">
								<div class="sort-img">
									<a href="javascript:void(0)"><img :src="webbbin_front + item.pd_view_img"
											alt=""></a>
								</div>
							</SlickItem>
						</SlickList>
						<p v-if="showData == 2">查無相符的手動熱門網版資料</p>
						<p v-if="showData == 3">目前暫無手動熱門網版資料</p>
					</div>
				</div>
			</div>
			<!-- 下方頁碼 -->
			<div class="paginate_box"
				v-if="!(model.model_setting.mod.sp_parametervalue == 2 && model.setting_mode)">
				<paginate v-model="model.page" :page-count="count" :click-handler="pushForPaginate()"
					:page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
				<div class="pagination-select">
					<select name="page_limit" id="page_limit" @change="model.page = 1,pushForPaginate()"
						v-model="model.limit">
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
							<datepicker id="datepicker" class="date-input check_unit" name="mr_date"
								v-model="model.model.mr_date" :format="'yyyy-MM-dd'" v-tooltip="'請選擇日期'">
							</datepicker>
						</td>
						<td v-else>
							<span class="text">{{item.mr_date}}</span>
						</td>
						<td v-if="model.model.mr_id == item.mr_id">
							<button @click="modifyModel()" class="model_btn btn_check"><i
									class="fas fa-check"></i></button>
							<button @click="model.model = {}" class="model_btn btn_times"><i
									class="fas fa-times"></i></button>
						</td>
						<td v-else>
							<button @click="model.model = item" class="model_btn btn_edit"><i
									class="fas fa-edit"></i></button>
							<button @click="deleteModel(item.mr_id),item.mr_date = ''"
								class="model_btn btn_trash"><i class="fas fa-trash-alt"></i></button>
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
import { SlickList, SlickItem } from 'vue-slicksort';
export default {
    components: {
        CommonHeader,
        CommonStatus,
        Datepicker,
        SlickList,
        SlickItem
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'model', // index:首頁 project:網版頁 model:租網頁 logo:合作夥伴頁 user:使用者頁 transaction:紀錄頁
            nowView:'list', // list:列表頁 create:新增頁 modify:修改頁 setting:設定頁
            userdata:[], // 使用者資料
            //各頁資訊////////////////////////////////////////////////////
            project:{/// 網版
                projects:[], // 全部固定網版資料
            },
            model:{///租網
                //各式資料////
                models:[], // 全部租網資料
                sorts:[], // 手動熱門的排序後的版型資料
                model:{}, // 單一租網資料
                modify_model:{}, // 單一租網修改時的資料
				model_setting: {'mod': { 'sp_parametervalue': '' }, 'date': {'sp_parametervalue':''}}, // 租網設定
                not_hot_projects:[], // 不熱門的版型
				hot_project: {'pd_num':''}, // 單一熱門版型資料
                date:{}, //時間區間
                //頁碼相關////
                limit:10, //每頁數的筆數
                page:1, // 目前頁數
                //參數編輯模式
                setting_mode:false, // true:開啟  false:關閉
                //自動熱門編輯模式
                model_modify_mode:false, // true:開啟  false:關閉
                //排名設定
                rank:0, //目前名次
                rank_total:0, //該名次的次數
                same_rank:false, //有經歷過相同名次
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
            if(localData.model){
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
        newModels:function(){
            let self = this;
            if(self.model.model_setting.mod.sp_parametervalue == 1){
                if(self.model.models){
                    if(self.model.models.length > 0){
                        if(self.model.limit == 'all'){
                            return self.model.models;
                        }else{
                            var start = (parseInt(self.model.page) - 1) * parseInt(self.model.limit);
                            return self.model.models.slice(start, start + parseInt(self.model.limit));
                        }
                    }else{
                        return [];
                    }
                }else{
                    return [];
                }
            }else if(self.model.model_setting.mod.sp_parametervalue == 2){
                if(self.model.sorts){
                    if(self.model.sorts.length > 0){
                        if(self.model.limit == 'all'){
                            return self.model.sorts;
                        }else{
                            var start = (parseInt(self.model.page) - 1) * parseInt(self.model.limit);
                            return self.model.sorts.slice(start, start + parseInt(self.model.limit));
                        }
                    }else{
                        return [];
                    }
                }else{
                    return [];
                }
            }

        },
        total:function(){//版型總數
            let self = this;
            if(self.model.model_setting.mod.sp_parametervalue == 1){
                if(self.model.models){
                    return self.model.models.length;
                }else{
                    return 0;
                }
            }else if(self.model.model_setting.mod.sp_parametervalue == 2){
                if(self.model.sorts){
                    return self.model.sorts.length;
                }else{
                    return 0;
                }
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
            if(self.model.model_setting.mod.sp_parametervalue == 1){
                if(!self.model.models){
                    return 3;
                }else{
                    if(self.model.models.length > 0){
                        return 1;
                    }else{
                        return 2;
                    }
                }
            }else if(self.model.model_setting.mod.sp_parametervalue == 2){
                if(!self.model.sorts){
                    return 3;
                }else{
                    if(self.model.sorts.length > 0){
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
			axios.get(this.$server_api +'/model-all-data')
                .then(function (response) {
                    //租網相關
                    self.model.model_setting = response.data.model.model_setting;
                    var str = self.model.model_setting.date.sp_parametervalue;
                    var array = str.split('~');
                    self.model.date.start = array[0];
                    self.model.date.end = array[1];
                    self.model.models = response.data.model.models;
                    self.model.sorts = response.data.model.sorts;
                    self.model.not_hot_projects = response.data.model.not_hot_projects;
                    self.changeModels();
                })
                .catch(function (response) {
                    self.notification('系統出錯：getAllData()','failure');
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
        // 顯示熱門版型單一細節頁
        modelDetail:function(boolean,data){
            let self = this;
            self.model.model_modify_mode = boolean;
            self.model.modify_model = data;
        },
        // 取得時間裡面的年份
        dateGetYear:function(date){
            var fromDate = new Date(date);
            return fromDate.getFullYear();
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
            if(localData.model){
                var model = localData.model;
            }else{
                var model = {};
            }
            model.limit = self.model.limit;
            model.page = self.model.page;
            localData.model = model;
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
            if(localData.model){
                var model = localData.model;
            }else{
                var model = {};
            }
            model.limit = self.model.limit;
            model.page = self.model.page;
            model.result = false;
            model.text = "";
            localData.model = model;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        // 複製sessionStorage的資料
        pullLocalDataForList:function(){
            let self = this;
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.model.limit){
                self.model.limit = localData.model.limit;
            }else{
                localData.model.limit = self.model.limit;
            }
            if(localData.model.page){
                self.model.page = localData.model.page;
            }else{
                localData.model.page = self.model.page;
            }
            if(localData.model.result){
                self.notification(localData.model.text,'success');
                localData.model.result = false;
            }
            sessionStorage.setItem("localData",JSON.stringify(localData));
            self.getNotHotProjects();
            self.getModels();
            self.getModelSetting();
            self.getModelSorts();
        },
        ///
        //////////////////////// session功能 end ////////////////////

        //////////////////////// 初始化各項目 //////////////////////
        ///
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
        ///
        //////////////////////// 各頁面功能 end //////////////////

        //////////////////////// 取值專區 ////////////////////////
        ///
        //取得不熱門版型資料
        getNotHotProjects:function(){
            let self = this;
			axios.get(this.$server_api +'/nothotprojects')
                .then(function (response) {
                    self.model.not_hot_projects = response.data.not_hot_projects;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getNotHotProjects()','failure');
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
        //取得租網相關參數
        getModelSetting:function(){
            let self = this;
			axios.get(this.$server_api +'/system-model-setting')
                .then(function (response) {
                    self.model.setting_mode = false;
                    self.model.model_setting = response.data;
                    var str = self.model.model_setting.date.sp_parametervalue;
                    var array = str.split('~');
                    self.model.date.start = array[0];
                    self.model.date.end = array[1];
                })
                .catch(function (response) {
                    self.notification('系統出錯：getModelSetting()','failure');
                });
        },
        //取得排序過後的手動熱門版型選單
        getModelSorts:function(){
            let self = this;
			axios.get(this.$server_api +'/modelsort')
                .then(function (response) {
                    self.model.sorts = response.data.sorts;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getModelSorts()','failure');
                });
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

        //////////////////////// 新增區塊 ////////////////////////
        ///
        //新增手動熱門版型
        createHotProject:function(){
            let self = this;
            //選中的網版
            if(!self.model.hot_project.pd_num){
                self.notification('請選擇一個網版','warning');
                return false;
            }
            self.model.hot_project.hot_or_not = true;
            // 回傳修改
			axios.post(this.$server_api +'/project-modify-for-model',self.model.hot_project) //新增 - 熱門版型
                .then(function (response) {
                    if(response.data){
                        self.model.hot_project = {};
                        self.getNotHotProjects();
                        self.getModelSorts();
                        self.notification('新增成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：createHotProject()','failure');
                });
        },
        ///
        //////////////////////// 新增區塊 end ////////////////////////

        //////////////////////// 修改區塊 ///////////////////////////
        ///
        //修改版型排序
        modifyModelSort:function(){
            let self = this;
			axios.post(this.$server_api +'/modelsort-modify',self.model.sorts) //修改 -
                .then(function (response) {
                    if(response.data){
                        self.getModelSorts();
                        self.notification('修改成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
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
                        self.notification('修改成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifyModel()','failure');
                });
        },
        //修改參數
        modifySystem:function(data){
            let self = this;
            /// 檢查必填欄位是否傳入
            //日期
            var fromDate = new Date(self.model.date.start);
            var year = fromDate.getFullYear();
            self.model.date.start = year+'-01-01';

            var fromDate = new Date(self.model.date.end);
            var year = fromDate.getFullYear();
            self.model.date.end = year+'-12-31';

            if ((Date.parse(self.model.date.start)).valueOf() > (Date.parse(self.model.date.end)).valueOf()){
                self.notification('開始時間不能晚於結束時間','warning');
                return false;
            }
            var string = self.model.date.start + "~" + self.model.date.end;
            self.model.model_setting.date.sp_parametervalue = string;
            // 回傳修改
			axios.post(this.$server_api +'/system-model-modify',self.model.model_setting) //修改
                .then(function (response) {
                    if(response.data){
                        var localData = JSON.parse(sessionStorage.getItem("localData"));
                        self.model.page = 1;
                        localData.model.page = 1;
                        self.model.limit = 10;
                        localData.model.limit = 10;
                        sessionStorage.setItem("localData",JSON.stringify(localData));
                        self.getModelSetting();
                        self.getModels();
                        self.notification('修改成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifySystem()','failure');
                });
        },
        ///
        //////////////////////// 修改區塊 end ////////////////////////

        //////////////////////// 刪除區塊 ///////////////////////////
        ///
        //刪除手動熱門版型
        deleteHotProject:function(item){
            let self = this;
            item.hot_or_not = false;
            // 回傳修改
			axios.post(this.$server_api +'/project-modify-for-model',item) //刪除 - 手動熱門版型
                .then(function (response) {
                    if(response.data){
                        self.getModelSorts();
                        self.notification('新增成功','success');
                    }else{
                        self.notification(response.data,'failure');
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：deleteHotProject()','failure');
                });
        },
        //刪除租網資料
        deleteModel:function(id){
            let self = this;
            var json = {};
            json.mr_id = id;
			axios.post(this.$server_api +'/model-delete',json) //刪除
                .then(function (response) {
                    if(response.data){
                        self.model.model = {};
                        self.getModels();
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
	}
}
</script>
