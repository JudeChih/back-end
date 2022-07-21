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
                編輯合作夥伴
                <span class="text-nar">{{ logo.logo.ld_name }}</span>
                <button @click="deleteLogo(logo.logo.ld_id)" type="button" class="btn btn-del content-righttop-btn">刪除</button>
            </div>
            <table class="table-template-edit">
                <tr class="temp-title">
                    <td colspan="2">基本設定</td>
                </tr>
                <tr class="islogoimg">
                    <td>logo上傳</td>
                    <td @dragover="allowDrop($event)" @drop="drop($event)"  class="check_unit" id="dragArea" data-toggle="tooltip" title="請上傳圖片">
                        <div id="previewDiv">
                            <img v-if="logo.logo.ld_img" :src="logo.logo.ld_img" width="250">
                            <p v-else>請拖曳圖片至此</p>
                        </div>
                    </td>
                </tr>
                <tr class="isname">
                    <td>合作夥伴名稱</td>
                    <td>
                        <input type="text" class="check_unit" name="ld_name" v-model="logo.logo.ld_name" v-tooltip="'請輸入合作夥伴名稱'">
                    </td>
                </tr>
                <tr class="temp-title">
                    <td colspan="2">分類設定</td>
                </tr>
                <tr class="iscasino">
                    <td>電子分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_casino == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_casino = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_casino == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_casino = 0">隱藏</button>
                    </td>
                </tr>
                <tr class="issports">
                    <td>體育分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_sports == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_sports = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_sports == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_sports = 0">隱藏</button>
                    </td>
                </tr>
                <tr class="iscard">
                    <td>棋牌分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_card == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_card = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_card == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_card = 0">隱藏</button>
                    </td>
                </tr>
                <tr class="islive">
                    <td>視訊分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_live == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_live = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_live == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_live = 0">隱藏</button>
                    </td>
                </tr>
                <tr class="islottery">
                    <td>彩票分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_lottery == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_lottery = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_lottery == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_lottery = 0">隱藏</button>
                    </td>
                </tr>
                <tr class="isfishing">
                    <td>捕魚分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_fishing == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_fishing = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_fishing == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_fishing = 0">隱藏</button>
                    </td>
                </tr>
                <tr class="ismahjong">
                    <td>麻將分類</td>
                    <td class="js-table-btn">
                        <button type="button" :class="logo.logo.ld_mahjong == 1 ? 'table-active':''" class="table-enable" @click="logo.logo.ld_mahjong = 1">顯示</button>
                        <button type="button" :class="logo.logo.ld_mahjong == 0 ? 'table-active':''" class="table-disable" @click="logo.logo.ld_mahjong = 0">隱藏</button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button @click="modifyLogo()" type="button" class="btn btn_save">送出</button>
                        <a href="/logo/list" class="btn btn-cancel btn_back">返回</a>
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
            nowView:'modify',
            userdata:[], // 使用者資料
            //各頁資訊////////////////////////////////////////////////////
            logo:{/// 合作夥伴
                logo:{}, // 單一合作夥伴資料
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
		var url = location.search;
		var url_array = url.split("?");
		var ld_id = url_array[1].split("=");
		self.getLogo(ld_id[1]);
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
            if(localData.logo){
                var logo = localData.logo;
            }else{
                var logo = {};
            }
            logo.result = boolean;
            logo.text = string;
            localData.logo = logo;
            sessionStorage.setItem("localData",JSON.stringify(localData));
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// 圖片上傳功能 //////////////////////
        ///
        // 預覽圖片，將取得的files一個個取出丟到convertFile()
        previewFiles:function(files){
            let self = this;
            if (files && files.length >= 1) {
                $.map(files, file => {
                    self.convertFile(file)
                        .then(data => {
                            $('input[name=ld_img]').val(data);
                            self.showPreviewImage(data, file.name)
                        })
                        .catch(err => console.log(err))
                })
            }
        },
        // 使用FileReader讀取檔案，並且回傳Base64編碼後的source
        convertFile:function(file){
            let self = this;
            return new Promise((resolve,reject)=>{
                // 建立FileReader物件
                let reader = new FileReader()
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            })
        },
        // 在頁面上新增<img>
        showPreviewImage:function(src, fileName){
            let self = this;
            let image = new Image(250) // 設定寬250px
            image.name = fileName
            image.src = src // <img>中src屬性除了接url外也可以直接接Base64字串
            $("#previewDiv").append(image);//.append(`<p>File: ${image.name}`)
            self.logo.logo.ld_img = src;
        },
        // dragover事件：拖曳(滑鼠還沒鬆開)至放置區時，就要先防止瀏覽器進行開圖
        allowDrop:function(e){
            e.preventDefault();
        },
        // 當拖曳區發生drop事件時，接受格式為image的資料
        drop:function(e){
            let self = this;
            // 防止事件傳遞及預設事件發生
            e.stopPropagation()
            e.preventDefault()
            // 取得data type為image/*的資料
            e.dataTransfer.getData("image/*")
            let files = e.dataTransfer.files
            if(files.length){
                $("#previewDiv").empty() // 清空當下預覽
                self.previewFiles(files)
            }
        },
        ///
        //////////////////////// 圖片上傳功能 end ////////////////////
        // 合作夥伴資料初始化
        initLogo:function(){
            this.logo.logo = {};
            this.logo.logo = Object.assign({}, this.logo.logo, {
                ld_img: '',
                ld_name: '',
                ld_casino: 0,
                ld_sports: 0,
                ld_card: 0,
                ld_live: 0,
                ld_lottery: 0,
                ld_fishing: 0,
                ld_mahjong:0,
            })
        },
        //////////////////////// 取值專區 ////////////////////////
        ///
        //取得單一合作夥伴資料
        getLogo:function(id){
            let self = this;
			axios.get(this.$server_api +'/logo?ld_id='+id)
                .then(function (response) {
                    self.logo.logo = response.data;
                })
                .catch(function (response) {
                    self.notification('系統出錯：getLogo()','failure');
                });
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

        //////////////////////// 修改區塊 ///////////////////////////
        ///
        //修改合作夥伴資料
        modifyLogo:function(){
            let self = this;
            /// 檢查必填欄位是否傳入
            //名稱
            if(!self.logo.logo.ld_name){
                self.notification('請輸入合作夥伴名稱','warning');
                return false;
            }
            //圖片
            if(!self.logo.logo.ld_img){
                self.notification('請上傳圖片','warning');
                return false;
            }
			self.logo.logo.last_update_user = self.userdata.ud_name;
            // 回傳修改
			axios.post(this.$server_api +'/logo-modify',self.logo.logo) //修改
                .then(function (response) {
					self.pushLocalData(true, '修改成功');
					window.location.replace('/logo/list');
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifyLogo()','failure');
                });
        },
        ///
        //////////////////////// 修改區塊 end ////////////////////////

        //////////////////////// 刪除區塊 ///////////////////////////
        ///
        //刪除合作夥伴資料
        deleteLogo:function(id){
            let self = this;
            var json = {};
            json.ld_id = id;
			axios.post(this.$server_api +'/logo-delete',json) //刪除
                .then(function (response) {
					if (response.data) {
						self.pushLocalData(true, '刪除成功');
						window.location.replace('/logo/list');
					} else {
						self.notification('刪除失敗', 'failure');
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
	}
}
</script>
