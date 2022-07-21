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
                新增選中版型
                <span class="text-nar">create</span>
                <button @click="addOneMoreModel()" type="button" class="one-more btn content-righttop-btn">多加一筆</button>
            </div>
            <table class="table-model-edit" v-for="(list,index) in model.model" v-bind:key="index">
                <tr class="temp-title">
                    <td colspan="2">
                        第{{index+1}}筆
                        <button @click="deleteOneModel(index)" class="model_btn btn_trash"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
                <tr class="isproject">
                    <td>選擇版型（可複填）</td>
                    <td class="model_style">
                        <el-tag
                            :key="int"
                            v-for="(tag,int) in list.pd_num"
                            closable
                            :type="tag.type"
                            :disable-transitions="false"
                            @close="handleClose(int,index)">
                            {{tag.name}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="list.inputVisible"
                            v-model="list.inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(index)"
                            @blur="handleInputConfirm(index)">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ 點擊輸入版型</el-button>
                    </td>
                </tr>
                <tr class="isdate">
                    <td>選中日期</td>
                    <td>
                        <label for="" class="fa date-icon"></label>
                        <datepicker id="datepicker" class="date-input check_unit" name="mr_date" v-model="list.mr_date" :format="'yyyy-MM-dd'" v-tooltip="'請選擇日期'"></datepicker>
                    </td>
                </tr>
            </table>
            <table class="table-model-edit">
                <tr class="btn_wrap">
                    <td></td>
                    <td>
                        <button @click="createModel()" type="button" class="btn btn_save">送出</button>
                        <a href="/model/list" class="btn btn-cancel btn_back">返回</a>
                    </td>
                </tr>
            </table>
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
export default {
    components: {
        CommonHeader,
        CommonStatus,
        Datepicker
    },
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'model',
            nowView:'create',
            userdata:[], // 使用者資料
            //各頁資訊////////////////////////////////////////////////////
            project:{
                projects:[],
            },
            model:{///租網
                model:[], // 單一租網資料
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
        self.initModelCreate();
    },
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        let self = this;
        self.getProjects();
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
            var model = {};
            model.result = boolean;
            model.text = string;
            localData.model = model;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// 初始化 //////////////////////
        ///
        // 版型紀錄新增頁的初始化
        initModelCreate:function(){
            this.model.model =  [];
            this.model.model = Object.assign([], this.model.model, [{
                pd_id: '',
                mr_date: '',
                pd_num:[],
                inputVisible: false,
                inputValue:''
            }])
            this.model.model[0].mr_date = new Date();
        },
        ///
        //////////////////////// 初始化 end //////////////////

        //////////////////////// 頁面功能 //////////////////////
        ///
        // 檢查輸入的選中版型是否存在
        checkProjectName(name){
            let self = this;
            let boolean = false;
            for (let i = 0; i < self.project.projects.length; i++) {
                if(self.project.projects[i].pd_num.indexOf(name.toUpperCase()) > -1) {
                    boolean = true;
                }
                if(i == (self.project.projects.length -1)){
                    return boolean;
                }
            }
        },
        // 刪除某個選中版型
        handleClose(int,index) {// int 該筆裡面的第幾個選中版型   index 第幾筆
            let self = this;
            self.model.model[index].pd_num.splice(int, 1);
        },
        // 新增一個選中版型
        showInput(index) {//第幾筆要新增一個選中版型
            let self = this;
            self.model.model[index].inputVisible = true;
            this.$nextTick(_ => {
                $('.table-model-edit').eq(index).find('.el-input__inner').focus();
            });
        },
        // 確定新增的選中版型的名字並新增到項目裡
        handleInputConfirm(index) {
            let self = this;
            let inputValue = {};
            inputValue.name = self.model.model[index].inputValue;
            inputValue.type = '';
            if (inputValue.name) {
                self.model.model[index].pd_num.push(inputValue);
            }
            self.model.model[index].inputVisible = false;
            self.model.model[index].inputValue = '';
        },
        // 新增額外一筆選中版型
        addOneMoreModel:function(){
            let self = this;
            var model = {};
            model.pd_id = '';
            model.mr_date = new Date();
            model.pd_num = [];
            model.inputVisible = false;
            model.inputValue = '';
            self.model.model.push(model)
        },
        // 刪除其中一筆要新增的選中版型
        deleteOneModel:function(index){
            let self = this;
            if(self.model.model.length > 1){
                self.model.model.splice(index,1);
            }else{
                self.notification('必須要留一筆新增資料','warning');
            }
        },
        ///
        //////////////////////// 頁面功能 end //////////////////

        //////////////////////// 取值專區 ////////////////////////
        ///
        //取得網版資料
        getProjects:function(){
            let self = this;
            var orderBy = ['pd_date','DESC'];
			axios.get(this.$server_api +"/projects?orderBy="+orderBy[0]+"&sort="+orderBy[1]+"&pd_num=&checked=")
                .then(function (response) {
                    self.project.projects = response.data.projects;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getProjects()','failure');
                });
        },
        ///
        //////////////////////// 取值專區 end //////////////////

        //////////////////////// 新增區塊 ////////////////////////
        ///
        //新增租網
        createModel:function(){
            let self = this;
            var createList = [];
            for(let i = 0 ; i < self.model.model.length ; i ++){
                var model = {};
                var date = self.model.model[i].mr_date
                var num = self.model.model[i].pd_num
                /// 檢查必填欄位是否傳入
                //選中的網版
                if(!num.length){
                    self.notification('請輸入第'+(i+1)+'筆的版型（可複填）','warning');
                    return false;
                }else{
                    var boolean = true;
                    for (let j = 0; j < num.length; j++) {
                        if(!self.checkProjectName(num[j].name)){
                            self.model.model[i].pd_num[j].type = 'danger';
                            boolean = false;
                        }
                        if(j == (num.length -1) && !boolean){
                            self.notification('版型名稱有誤，請修改紅標的版型名稱','warning');
                            return false;
                        }
                    }
                }
                //時間格式轉換
                if(!date){
                    self.notification('請選擇第'+(i+1)+'筆的選中日期','warning');
                    return false;
                }else{
                    var fromDate = new Date(date);
                    var year = fromDate.getFullYear();
                    var month = fromDate.getMonth()+1 < 10 ? '0'+ (fromDate.getMonth()+1) : (fromDate.getMonth()+1);
                    var day = fromDate.getDate() < 10 ? '0'+ fromDate.getDate(): fromDate.getDate();
                    model.mr_date = year+'-'+month+'-'+day;
                }
                for(let j = 0 ; j < num.length ; j ++){
                    model.pd_num = num[j].name;
                    model.no = "第"+(i+1)+"筆";
					model.last_update_user = self.userdata.ud_name;
                    createList.push(model);
                }
            }
            var boolean = true;
            for(let k = 0 ; k < createList.length ; k ++){
                // 回傳修改
				axios.post(this.$server_api +'/model-create',createList[k]) //新增 - 租網資料
                    .then(function (response) {
                        // if(response.data.result == 'ok'){

                        // }else{
                        //     boolean = false;
                        //     self.notification(createList[k].no + response.data.result,'failure');
                        // }
                    })
                    .catch(function (response) {
                        boolean = false;
                        self.notification('系統出錯：createModel()','failure');
                    });
                if(k+1 == createList.length){
                    if(boolean){
                        self.pushLocalData(true,'新增成功');
                        window.location.replace('/model/list');
                    }
                }
            }
        },
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
