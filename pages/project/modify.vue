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
                編輯網版
                <span class="text-nar">{{ project.project.pd_num }}</span>
                <button @click="deleteProject(project.project.pd_id)" type="button" class="btn btn-del content-righttop-btn">刪除</button>
            </div>
            <table class="table-template-edit">
                <tr class="temp-title">
                    <td colspan="2">基本設定</td>
                </tr>
                <tr class="isnum">
                    <td>名稱</td>
                    <td>
                        <input type="text" class="check_unit" name="pd_num" v-model="project.project.pd_num" v-tooltip="'請輸入網版名稱'">
                    </td>
                </tr>
                <tr class="isdate">
                    <td>上線日期</td>
                    <td>
                        <label for="" class="fa date-icon"></label>
                        <datepicker id="datepicker" class="date-input check_unit" name="pd_date" v-model="project.project.pd_date" :format="'yyyy-MM-dd'" v-tooltip="'請選擇上線日期'"></datepicker>
                    </td>
                </tr>
                <!-- <tr class="isdesigner">
                    <td>視覺設計</td>
                    <td>
                        <input type="text" class="check_unit" name="pd_designer" v-model="project.project.pd_designer" v-tooltip="'請輸入設計師名稱'">
                    </td>
                </tr> -->
                <tr class="isshow">
                    <td>網版狀態</td>
                    <td class="js-table-btn">
                        <button type="button" :class="project.project.pd_show == 1 ? 'table-active':''" class="table-enable" @click="project.project.pd_show = 1">顯示</button>
                        <button type="button" :class="project.project.pd_show == 0 ? 'table-active':''" class="table-disable middle" @click="project.project.pd_show = 0">隱藏</button>
                        <button type="button" :class="project.project.pd_show == 2 ? 'table-active':''" class="table-off" @click="project.project.pd_show = 2">下架</button>
                    </td>
                </tr>
                <tr class="isnew">
                    <td>new icon</td>
                    <td class="js-table-btn ">
                        <button type="button" :disabled="project.project.pd_show != 1" :class="{'table-active':project.project.pd_new == 1,'btn_disabled':project.project.pd_show != 1}" class="table-enable" @click="project.project.pd_new = 1">顯示</button>
                        <button type="button" :disabled="project.project.pd_show != 1" :class="{'table-active':project.project.pd_new == 0,'btn_disabled':project.project.pd_show != 1}" class="table-disable" @click="project.project.pd_new = 0">隱藏</button>
                        <div class="date_wrap" v-if="project.project.pd_new == 1 && project.project.pd_show == 1">
                            <label for="" class="fa date-icon"></label>
                            <datepicker id="new_startdate" class="date-input check_unit" name="pd_new_start" v-model="project.project.pd_new_start" :disabled-dates="disabledStartDates" @closed="setDisabledDate" :format="'yyyy-MM-dd'" v-tooltip="'請選擇icon開始顯示日期'"></datepicker>
                            <span class="date_mark">~</span>
                            <label for="" class="fa date-icon"></label>
                            <datepicker id="new_enddate" class="date-input check_unit" name="pd_new_end" v-model="project.project.pd_new_end" :disabled-dates="disabledEndDates" :format="'yyyy-MM-dd'" v-tooltip="'請選擇icon結束顯示日期'"></datepicker>
                        </div>
                    </td>
                </tr>
                <tr class="temp-title">
                    <td colspan="2">風格設定</td>
                </tr>
                <tr class="isstyle">
                    <td>風格</td>
                    <td>
                        <select name="pd_style" id="pd_style" v-model="project.project.pd_style">
                            <option value="1">前衛時尚</option>
                            <option value="2">復古典雅</option>
                            <option value="3">精緻華麗</option>
                            <option value="4">簡約大氣</option>
                        </select>
                    </td>
                </tr>
                <tr class="istype">
                    <td>主題</td>
                    <td>
                        <select name="pd_type" id="pd_type" v-model="project.project.pd_type">
                            <option value="0">一般</option>
                            <option value="1">機率</option>
                            <option value="7">捕魚</option>
                            <option value="4">視訊</option>
                            <option value="5">彩票</option>
                            <option value="2">體育</option>
                            <option value="8">電競</option>
                            <option value="3">棋牌</option>
                        </select>
                    </td>
                </tr>
                <tr class="iscolor">
                    <td>主色</td>
                    <td class="js-color-pick">
                        <p class="fa check_unit">
                            <span v-tooltip="'白'" @click="select_color('main','white')" :class="check_color('main','white') ? 'color-active' : ''" class="color color-white" data-value="white"></span>
                            <span v-tooltip="'淺灰'" @click="select_color('main','lightgrey')" :class="check_color('main','lightgrey') ? 'color-active' : ''" class="color color-lightgrey" data-value="lightgrey"></span>
                            <span v-tooltip="'深灰'" @click="select_color('main','darkgrey')" :class="check_color('main','darkgrey') ? 'color-active' : ''" class="color color-darkgrey" data-value="darkgrey"></span>
                            <span v-tooltip="'黑'" @click="select_color('main','black')" :class="check_color('main','black') ? 'color-active' : ''" class="color color-black" data-value="black"></span>
                            <span v-tooltip="'藍'" @click="select_color('main','blue')" :class="check_color('main','blue') ? 'color-active' : ''" class="color color-blue" data-value="blue"></span>
                            <span v-tooltip="'綠'" @click="select_color('main','green')" :class="check_color('main','green') ? 'color-active' : ''" class="color color-green" data-value="green"></span>
                            <span v-tooltip="'綠藍'" @click="select_color('main','greenblue')" :class="check_color('main','greenblue') ? 'color-active' : ''" class="color color-greenblue" data-value="greenblue"></span>
                            <span v-tooltip="'黃'" @click="select_color('main','yellow')" :class="check_color('main','yellow') ? 'color-active' : ''" class="color color-yellow" data-value="yellow"></span>
                            <span v-tooltip="'咖啡'" @click="select_color('main','coffee')" :class="check_color('main','coffee') ? 'color-active' : ''" class="color color-coffee" data-value="coffee"></span>
                            <span v-tooltip="'土黃'" @click="select_color('main','earth')" :class="check_color('main','earth') ? 'color-active' : ''" class="color color-earth main" data-value="earth"></span>
                            <span v-tooltip="'橙'" @click="select_color('main','orange')" :class="check_color('main','orange') ? 'color-active' : ''" class="color color-orange" data-value="orange"></span>
                            <span v-tooltip="'紅'" @click="select_color('main','red')" :class="check_color('main','red') ? 'color-active' : ''" class="color color-red" data-value="red"></span>
                            <span v-tooltip="'紫'" @click="select_color('main','purple')" :class="check_color('main','purple') ? 'color-active' : ''" class="color color-purple" data-value="purple"></span>
                        </p>
                        <div class="main_element">
                            <span>五行：{{checkByElements('main')}}</span>
                            <div class="color_tip main">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr class="iscolor">
                    <td>輔色</td>
                    <td class="js-color-pick">
                        <p class="fa check_unit">
                            <span v-tooltip="'白'" @click="select_color('sub','white')" :class="check_color('sub','white') ? 'color-active' : ''" class="color color-white" data-value="white" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'淺灰'" @click="select_color('sub','lightgrey')" :class="check_color('sub','lightgrey') ? 'color-active' : ''" class="color color-lightgrey" data-value="lightgrey" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'深灰'" @click="select_color('sub','darkgrey')" :class="check_color('sub','darkgrey') ? 'color-active' : ''" class="color color-darkgrey" data-value="darkgrey" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'黑'" @click="select_color('sub','black')" :class="check_color('sub','black') ? 'color-active' : ''" class="color color-black" data-value="black" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'藍'" @click="select_color('sub','blue')" :class="check_color('sub','blue') ? 'color-active' : ''" class="color color-blue" data-value="blue" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'綠'" @click="select_color('sub','green')" :class="check_color('sub','green') ? 'color-active' : ''" class="color color-green" data-value="green" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'綠藍'" @click="select_color('sub','greenblue')" :class="check_color('sub','greenblue') ? 'color-active' : ''" class="color color-greenblue" data-value="greenblue" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'黃'" @click="select_color('sub','yellow')" :class="check_color('sub','yellow') ? 'color-active' : ''" class="color color-yellow" data-value="yellow" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'咖啡'" @click="select_color('sub','coffee')" :class="check_color('sub','coffee') ? 'color-active' : ''" class="color color-coffee" data-value="coffee" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'土黃'" @click="select_color('sub','earth')" :class="check_color('sub','earth') ? 'color-active' : ''" class="color color-earth" data-value="earth" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'橙'" @click="select_color('sub','orange')" :class="check_color('sub','orange') ? 'color-active' : ''" class="color color-orange" data-value="orange" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'紅'" @click="select_color('sub','red')" :class="check_color('sub','red') ? 'color-active' : ''" class="color color-red" data-value="red" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                            <span v-tooltip="'紫'" @click="select_color('sub','purple')" :class="check_color('sub','purple') ? 'color-active' : ''" class="color color-purple" data-value="purple" @mouseover="showTipOrNot($event,'over')" @mouseleave="showTipOrNot($event,'leave')"><i class="fas fa-exclamation-circle"></i></span>
                        </p>
                        <div class="main_element">
                            <span>五行：{{checkByElements('sub')}}</span>
                            <div class="color_tip sub">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr class="issign">
                    <td>
                        星座
                        <div class="sign_wrap" @mouseover="showSignOrNot = true" @mouseleave="showSignOrNot = false,modifySignColor()">
                            <i class="fas fa-cog"></i>
                            <div v-if="showSignOrNot" class="sign_setting">
                                <div class="sign_title">火象</div>
                                <div class="sign_color">
                                    <p class="fa check_unit fire">
                                        <span @click="select_sign_color('fire','white')" :class="check_sign_color('fire','white') ? 'color-active' : ''" class="color color-white" data-value="white"></span>
                                        <span @click="select_sign_color('fire','lightgrey')" :class="check_sign_color('fire','lightgrey') ? 'color-active' : ''" class="color color-lightgrey" data-value="lightgrey"></span>
                                        <span @click="select_sign_color('fire','darkgrey')" :class="check_sign_color('fire','darkgrey') ? 'color-active' : ''" class="color color-darkgrey" data-value="darkgrey"></span>
                                        <span @click="select_sign_color('fire','black')" :class="check_sign_color('fire','black') ? 'color-active' : ''" class="color color-black" data-value="black"></span>
                                        <span @click="select_sign_color('fire','blue')" :class="check_sign_color('fire','blue') ? 'color-active' : ''" class="color color-blue" data-value="blue"></span>
                                        <span @click="select_sign_color('fire','green')" :class="check_sign_color('fire','green') ? 'color-active' : ''" class="color color-green" data-value="green"></span>
                                        <span @click="select_sign_color('fire','greenblue')" :class="check_sign_color('fire','greenblue') ? 'color-active' : ''" class="color color-greenblue" data-value="greenblue"></span>
                                        <span @click="select_sign_color('fire','yellow')" :class="check_sign_color('fire','yellow') ? 'color-active' : ''" class="color color-yellow" data-value="yellow"></span>
                                        <span @click="select_sign_color('fire','coffee')" :class="check_sign_color('fire','coffee') ? 'color-active' : ''" class="color color-coffee" data-value="coffee"></span>
                                        <span @click="select_sign_color('fire','earth')" :class="check_sign_color('fire','earth') ? 'color-active' : ''" class="color color-earth" data-value="earth"></span>
                                        <span @click="select_sign_color('fire','orange')" :class="check_sign_color('fire','orange') ? 'color-active' : ''" class="color color-orange" data-value="orange"></span>
                                        <span @click="select_sign_color('fire','red')" :class="check_sign_color('fire','red') ? 'color-active' : ''" class="color color-red" data-value="red"></span>
                                        <span @click="select_sign_color('fire','purple')" :class="check_sign_color('fire','purple') ? 'color-active' : ''" class="color color-purple" data-value="purple"></span>
                                    </p>
                                </div>
                                <div class="sign_title">土象</div>
                                <div class="sign_color">
                                    <p class="fa check_unit earth">
                                        <span @click="select_sign_color('earth','white')" :class="check_sign_color('earth','white') ? 'color-active' : ''" class="color color-white" data-value="white"></span>
                                        <span @click="select_sign_color('earth','lightgrey')" :class="check_sign_color('earth','lightgrey') ? 'color-active' : ''" class="color color-lightgrey" data-value="lightgrey"></span>
                                        <span @click="select_sign_color('earth','darkgrey')" :class="check_sign_color('earth','darkgrey') ? 'color-active' : ''" class="color color-darkgrey" data-value="darkgrey"></span>
                                        <span @click="select_sign_color('earth','black')" :class="check_sign_color('earth','black') ? 'color-active' : ''" class="color color-black" data-value="black"></span>
                                        <span @click="select_sign_color('earth','blue')" :class="check_sign_color('earth','blue') ? 'color-active' : ''" class="color color-blue" data-value="blue"></span>
                                        <span @click="select_sign_color('earth','green')" :class="check_sign_color('earth','green') ? 'color-active' : ''" class="color color-green" data-value="green"></span>
                                        <span @click="select_sign_color('earth','greenblue')" :class="check_sign_color('earth','greenblue') ? 'color-active' : ''" class="color color-greenblue" data-value="greenblue"></span>
                                        <span @click="select_sign_color('earth','yellow')" :class="check_sign_color('earth','yellow') ? 'color-active' : ''" class="color color-yellow" data-value="yellow"></span>
                                        <span @click="select_sign_color('earth','coffee')" :class="check_sign_color('earth','coffee') ? 'color-active' : ''" class="color color-coffee" data-value="coffee"></span>
                                        <span @click="select_sign_color('earth','earth')" :class="check_sign_color('earth','earth') ? 'color-active' : ''" class="color color-earth" data-value="earth"></span>
                                        <span @click="select_sign_color('earth','orange')" :class="check_sign_color('earth','orange') ? 'color-active' : ''" class="color color-orange" data-value="orange"></span>
                                        <span @click="select_sign_color('earth','red')" :class="check_sign_color('earth','red') ? 'color-active' : ''" class="color color-red" data-value="red"></span>
                                        <span @click="select_sign_color('earth','purple')" :class="check_sign_color('earth','purple') ? 'color-active' : ''" class="color color-purple" data-value="purple"></span>
                                    </p>
                                </div>
                                <div class="sign_title">風象</div>
                                <div class="sign_color">
                                    <p class="fa check_unit wind">
                                        <span @click="select_sign_color('wind','white')" :class="check_sign_color('wind','white') ? 'color-active' : ''" class="color color-white" data-value="white"></span>
                                        <span @click="select_sign_color('wind','lightgrey')" :class="check_sign_color('wind','lightgrey') ? 'color-active' : ''" class="color color-lightgrey" data-value="lightgrey"></span>
                                        <span @click="select_sign_color('wind','darkgrey')" :class="check_sign_color('wind','darkgrey') ? 'color-active' : ''" class="color color-darkgrey" data-value="darkgrey"></span>
                                        <span @click="select_sign_color('wind','black')" :class="check_sign_color('wind','black') ? 'color-active' : ''" class="color color-black" data-value="black"></span>
                                        <span @click="select_sign_color('wind','blue')" :class="check_sign_color('wind','blue') ? 'color-active' : ''" class="color color-blue" data-value="blue"></span>
                                        <span @click="select_sign_color('wind','green')" :class="check_sign_color('wind','green') ? 'color-active' : ''" class="color color-green" data-value="green"></span>
                                        <span @click="select_sign_color('wind','greenblue')" :class="check_sign_color('wind','greenblue') ? 'color-active' : ''" class="color color-greenblue" data-value="greenblue"></span>
                                        <span @click="select_sign_color('wind','yellow')" :class="check_sign_color('wind','yellow') ? 'color-active' : ''" class="color color-yellow" data-value="yellow"></span>
                                        <span @click="select_sign_color('wind','coffee')" :class="check_sign_color('wind','coffee') ? 'color-active' : ''" class="color color-coffee" data-value="coffee"></span>
                                        <span @click="select_sign_color('wind','earth')" :class="check_sign_color('wind','earth') ? 'color-active' : ''" class="color color-earth" data-value="earth"></span>
                                        <span @click="select_sign_color('wind','orange')" :class="check_sign_color('wind','orange') ? 'color-active' : ''" class="color color-orange" data-value="orange"></span>
                                        <span @click="select_sign_color('wind','red')" :class="check_sign_color('wind','red') ? 'color-active' : ''" class="color color-red" data-value="red"></span>
                                        <span @click="select_sign_color('wind','purple')" :class="check_sign_color('wind','purple') ? 'color-active' : ''" class="color color-purple" data-value="purple"></span>
                                    </p>
                                </div>
                                <div class="sign_title">水象</div>
                                <div class="sign_color">
                                    <p class="fa check_unit water">
                                        <span @click="select_sign_color('water','white')" :class="check_sign_color('water','white') ? 'color-active' : ''" class="color color-white" data-value="white"></span>
                                        <span @click="select_sign_color('water','lightgrey')" :class="check_sign_color('water','lightgrey') ? 'color-active' : ''" class="color color-lightgrey" data-value="lightgrey"></span>
                                        <span @click="select_sign_color('water','darkgrey')" :class="check_sign_color('water','darkgrey') ? 'color-active' : ''" class="color color-darkgrey" data-value="darkgrey"></span>
                                        <span @click="select_sign_color('water','black')" :class="check_sign_color('water','black') ? 'color-active' : ''" class="color color-black" data-value="black"></span>
                                        <span @click="select_sign_color('water','blue')" :class="check_sign_color('water','blue') ? 'color-active' : ''" class="color color-blue" data-value="blue"></span>
                                        <span @click="select_sign_color('water','green')" :class="check_sign_color('water','green') ? 'color-active' : ''" class="color color-green" data-value="green"></span>
                                        <span @click="select_sign_color('water','greenblue')" :class="check_sign_color('water','greenblue') ? 'color-active' : ''" class="color color-greenblue" data-value="greenblue"></span>
                                        <span @click="select_sign_color('water','yellow')" :class="check_sign_color('water','yellow') ? 'color-active' : ''" class="color color-yellow" data-value="yellow"></span>
                                        <span @click="select_sign_color('water','coffee')" :class="check_sign_color('water','coffee') ? 'color-active' : ''" class="color color-coffee" data-value="coffee"></span>
                                        <span @click="select_sign_color('water','earth')" :class="check_sign_color('water','earth') ? 'color-active' : ''" class="color color-earth" data-value="earth"></span>
                                        <span @click="select_sign_color('water','orange')" :class="check_sign_color('water','orange') ? 'color-active' : ''" class="color color-orange" data-value="orange"></span>
                                        <span @click="select_sign_color('water','red')" :class="check_sign_color('water','red') ? 'color-active' : ''" class="color color-red" data-value="red"></span>
                                        <span @click="select_sign_color('water','purple')" :class="check_sign_color('water','purple') ? 'color-active' : ''" class="color color-purple" data-value="purple"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>{{project.signText}}</td>
                </tr>
                <tr class="temp-title">
                    <td colspan="2">版面設定</td>
                </tr>
                <tr class="islive">
                    <td>網版Demo</td>
                    <td class="js-table-btn">
                        <button type="button" :class="project.project.pd_live == 1 ? 'table-active':''" class="table-enable" @click="project.project.pd_live = 1">有</button>
                        <button type="button" :class="project.project.pd_live == 0 ? 'table-active':''" class="table-disable" @click="project.project.pd_live = 0">無</button>
                        <div v-if="project.project.pd_live == 1" class="hide_or_show">
                            <div class="table-copy-btn">
                                <input type="hidden" id="pd_live_demo_url" value="">
                                <input type="text" class="check_unit" id="pd_live_url" name="pd_live_url" v-tooltip="'請輸入Demo路徑'" v-model="project.project.pd_live_url">
                                <button @click="add_url()" type="button" class="btn btn-path btn_add_url">產生路徑</button>
                                <button @click="initClipboard($event)" ref="copyUrl" type="button" class="btn btn-copy btn_copy_url"><span class="fa"></span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr class="isviewimg">
                    <td>列表圖上傳</td>
                    <td class="check_unit">
                        <input type="text" class="url_readonly check_unit" id="pd_view_img" name="pd_view_img" v-model="project.project.pd_view_img" v-tooltip="'請上傳列表圖'">

                    </td>
                </tr>
                <tr class="isbannerimg">
                    <td>Banner上傳</td>
                    <td class="check_unit">
                        <input type="text" class=" url_readonly" id="pd_banner_img" name="pd_banner_img" v-model="project.project.pd_banner_img" v-tooltip="'請上傳Banner'">
                    </td>
                </tr>
                <tr class="istemplateimg">
                    <td>示意圖上傳</td>
                    <td>
                        <div class="image_block">
                            <div v-if="pd_template_img.length > 0" v-for="(item, index) in pd_template_img" class="js-img-wrap template_image">
                                <p class="table-template-edit-add clearfix">
                                    <input type="text" class="url_readonly" v-model="pd_template_img[index]" :name="'templateimage_'+index" :id="'templateimage_'+index" v-tooltip="'請上傳'">
                                    <button type="button" @click="deleteTemplateImg(index)"  class="btn btn-del-circle js-del-input_i btn_remove_img">
                                        <span class="fa"></span>
                                    </button>
                                </p>
                            </div>
                        </div>
                        <button @click="addTemplateImage()" type="button" class="btn btn-add-item js-add-img btn_add_img">
                            <span class="fa"></span>新增圖片
                        </button>
                    </td>
                </tr>
                <tr class="isnotice">
                    <td>注意事項</td>
                    <td>
                        <textarea class="" name="pd_notices" v-model="project.project.pd_notices"></textarea>
                        <p class="text-warning">＊兩行以上請加入，區隔
                        </p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button @click="modifyProject()" type="button" class="btn btn_save">送出</button>
                        <a href="/project_list" class="btn btn-cancel btn_back">返回</a>
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
            nowView:'modify',
            userdata:[], // 使用者資料
            disabledStartDates:{}, // new icon 顯示日期的區間上限(一年)
            disabledEndDates:{}, // new icon 顯示日期的區間上限(一年)
            showSignOrNot:false, // 是否顯示星座的系統參數設定欄
            //各頁資訊////////////////////////////////////////////////////
            project:{/// 網版
                project:{}, // 單一固定網版資料
                signs:[], // 當年星象主色
                signText:'', // 星象中文顯示
                alreadyChange:{ // 是否修改星象資料
                    fire:false,
                    earth:false,
                    wind:false,
                    water:false
                },
                //資料夾路徑//////////////////////////////////////////////////
                live_demo:'/_template/',
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
        self.initProject();
    },
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        let self = this;
		var url = location.search;
		var url_array = url.split("?");
		var pd_id = url_array[1].split("=");
		self.getProject(pd_id[1]);
		self.getSigns();
    },
    computed: {
		pd_template_img: function () {//示意圖
			let self = this;
			if (self.project.project.pd_template_img) {
				return JSON.parse(self.project.project.pd_template_img);
			} else {
				return [];
			}
		},
    },
    methods: {
        //////////////////////// 共用功能 //////////////////////
        ///
        // 更新sessionStorage的資料
        pushLocalData:function(boolean,string){
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
            project.result = boolean;
            project.text = string;
            localData.project = project;
            sessionStorage.setItem("localData",JSON.stringify(localData));
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
        // 開闔左側選單
        dropGroup:function(e){
            let self = this;
            $(e.target).parent().find('.drop-group').slideToggle('drop-open');
            $(e.target).toggleClass('drop-title-down');
        },
        // 檢查該網版屬於哪個星象
        checkBySigns:function(pd_colors){
            let self = this;
            var colors = JSON.parse(pd_colors);
            var fire = JSON.parse(self.project.signs.fire.sp_parametervalue);
            var water = JSON.parse(self.project.signs.water.sp_parametervalue);
            var earth = JSON.parse(self.project.signs.earth.sp_parametervalue);
            var wind = JSON.parse(self.project.signs.wind.sp_parametervalue);
            var array = [];
            var string = '';
            if(colors[0]){
                for (let j = 0; j < fire.length; j++) {
                    if(fire[j] == colors[0]){
                        array.push('火象(白羊、獅子、射手)');
                    }
                }
                for (let k = 0; k < water.length; k++) {
                    if(water[k] == colors[0]){
                        array.push('水象(巨蠍、天蠍、雙魚)');
                    }
                }
                for (let l = 0; l < earth.length; l++) {
                    if(earth[l] == colors[0]){
                        array.push('土象(金牛、處女、摩羯)');
                    }
                }
                for (let m = 0; m < wind.length; m++) {
                    if(wind[m] == colors[0]){
                        array.push('風象(雙子、天秤、水瓶)');
                    }
                }
                for (let n = 0; n < array.length; n++) {
                    if(n == 0){
                        string = array[n];
                    }else{
                        string = string + '、' + array[n];
                    }
                }
            }else{
                string = '請先選擇主色系，方可判斷星座'
            }
            self.project.signText = string;
        },
        // 檢查該網版屬於哪個五行 - 五行判斷用
        witchElement:function(string){
            if(string == 'white' || string == 'lightgrey' || string == 'yellow'){
                return 1;
            }else if(string == 'green' || string == 'greenblue'){
                return 2;
            }else if(string == 'blue' || string == 'black' || string == 'darkgrey'){
                return 3;
            }else if(string == 'red' || string == 'orange' || string == 'purple'){
                return 4;
            }else if(string == 'earth' || string == 'coffee'){
                return 5;
            }else{
                return null;
            }
        },
        // 檢查pd_elements回傳中文字 - 五行判斷用
        checkByElements:function(type){
            let self = this;
            var pd_colors = JSON.parse(self.project.project.pd_colors);
            var elements = '';
            if(type == 'main'){
                elements = pd_colors[0];
            }else if(type == 'sub'){
                elements = pd_colors[1];
            }
            if(elements == 'white' || elements == 'lightgrey' || elements == 'yellow'){
                return '金';
            }else if(elements == 'green' || elements == 'greenblue'){
                return '木';
            }else if(elements == 'blue' || elements == 'black' || elements == 'darkgrey'){
                return '水';
            }else if(elements == 'red' || elements == 'orange' || elements == 'purple'){
                return '火';
            }else if(elements == 'earth' || elements == 'coffee'){
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
        // 檢查輔色是否與主色衝突
        showTipOrNot:function(e,type){
            let self = this;
            var pd_colors = JSON.parse(self.project.project.pd_colors);
            var color = $(e.target).data('value');
            if(type == 'over'){
                if(pd_colors[0] == color){
                    $(e.target).addClass('same_color');
                }
            }else if(type == 'leave'){
                $(e.target).removeClass("same_color");
            }
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

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
        ///
        //////////////////////// 初始化各項目 end //////////////////

        //////////////////////// 各頁面功能 //////////////////////
        ///
        // 檢查該網版色系
        check_color:function(type,color){
            let self = this;
            var pd_colors = JSON.parse(self.project.project.pd_colors);

            if(type == 'main'){
                if(pd_colors[0]){
                    if(pd_colors[0] == color){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else if(type == 'sub'){
                var array = [];
                if(pd_colors[2]){
                    array.push(pd_colors[1]);
                    array.push(pd_colors[2]);
                }else if(pd_colors[1]){
                    array.push(pd_colors[1]);
                }

                if(array.indexOf(color) > -1){
                    return true;
                }else{
                    return false;
                }
            }
        },
        // 檢查該網版星座主色
        check_sign_color:function(type,color){
            let self = this;
            var array = [];
            var boolean = false;
            if(type == 'fire'){
                array = JSON.parse(self.project.signs.fire.sp_parametervalue);
            }else if(type == 'earth'){
                array = JSON.parse(self.project.signs.earth.sp_parametervalue);
            }else if(type == 'wind'){
                array = JSON.parse(self.project.signs.wind.sp_parametervalue);
            }else if(type == 'water'){
                array = JSON.parse(self.project.signs.water.sp_parametervalue);
            }
            for (let i = 0; i < array.length; i++) {
                if(array[i] == color){
                    boolean = true;
                }
            }
            return boolean;
        },
        // 初始化複製功能
        initClipboard(e){
            let self = this;
            var url = '';
            if(self.nowPage == 'project'){
                url = self.webbbin_front + $(e.target).siblings('input[type=text]').val();
            }else if(self.nowPage == 'model'){
                url = $(e.target).siblings('input[type=text]').val();
            }

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
        // 選擇星座主色系
        select_sign_color:function(type,color){
            let self = this;
            var array = [];
            var boolean = true;
            if(type == 'fire'){
                array = JSON.parse(self.project.signs.fire.sp_parametervalue);
                for (let i = 0; i < array.length; i++) {
                    if(array[i] == color){
                        array.splice(i,1);
                        $('.sign_wrap .fire').find('.color-'+color).removeClass('color-active');
                        boolean = false;
                    }
                }
                if(boolean){
                    array.push(color);
                    $('.sign_wrap .fire').find('.color-'+color).addClass('color-active');
                }
                self.project.signs.fire.sp_parametervalue = JSON.stringify(array);
                self.project.alreadyChange.fire = true;
            }else if(type == 'earth'){
                array = JSON.parse(self.project.signs.earth.sp_parametervalue);
                for (let i = 0; i < array.length; i++) {
                    if(array[i] == color){
                        array.splice(i,1);
                        $('.sign_wrap .earth').find('.color-'+color).removeClass('color-active');
                        boolean = false;
                    }
                }
                if(boolean){
                    array.push(color);
                    $('.sign_wrap .earth').find('.color-'+color).addClass('color-active');
                }
                self.project.signs.earth.sp_parametervalue = JSON.stringify(array);
                self.project.alreadyChange.earth = true;
            }else if(type == 'wind'){
                array = JSON.parse(self.project.signs.wind.sp_parametervalue);
                for (let i = 0; i < array.length; i++) {
                    if(array[i] == color){
                        array.splice(i,1);
                        $('.sign_wrap .wind').find('.color-'+color).removeClass('color-active');
                        boolean = false;
                    }
                }
                if(boolean){
                    array.push(color);
                    $('.sign_wrap .wind').find('.color-'+color).addClass('color-active');
                }
                self.project.signs.wind.sp_parametervalue = JSON.stringify(array);
                self.project.alreadyChange.wind = true;
            }else if(type == 'water'){
                array = JSON.parse(self.project.signs.water.sp_parametervalue);
                for (let i = 0; i < array.length; i++) {
                    if(array[i] == color){
                        array.splice(i,1);
                        $('.sign_wrap .water').find('.color-'+color).removeClass('color-active');
                        boolean = false;
                    }
                }
                if(boolean){
                    array.push(color);
                    $('.sign_wrap .water').find('.color-'+color).addClass('color-active');
                }
                self.project.signs.water.sp_parametervalue = JSON.stringify(array);
                self.project.alreadyChange.water = true;
            }
        },
        // 選擇色系
        select_color:function(type,color){
            let self = this;
            var pd_colors = JSON.parse(self.project.project.pd_colors);
            if(type == 'main'){
                if(pd_colors[1] == color || pd_colors[2] == color){
                        self.notification('主、輔色不可選擇相同的顏色','warning');
                        return false;
                }else if(self.project.project.pd_colors || self.project.project.pd_colors == '[]'){
                    pd_colors[0] = color;
                    self.project.project.pd_colors = JSON.stringify(pd_colors);
                    self.checkBySigns(self.project.project.pd_colors);
                }else{
                    var array = [];
                    array[0] = color;
                    self.project.project.pd_colors = JSON.stringify(array);
                    self.checkBySigns(self.project.project.pd_colors);
                }
            }else if(type == 'sub'){
                if(self.project.project.pd_colors || self.project.project.pd_colors == '[]'){
                    var array = [];
                    if(pd_colors[0]){
                        array[0] = pd_colors[0];
                    }else{
                        array[0] = '';
                    }
                    if(pd_colors[0] == color){
                        self.notification('主、輔色不可選擇相同的顏色','warning');
                        return false;
                    }else if(self.check_color('sub',color)){
                        if(pd_colors[1] && pd_colors[1] != color){
                            array[1] = pd_colors[1];
                        }else if(pd_colors[2] && pd_colors[2] != color){
                            array[1] = pd_colors[2];
                        }
                        self.project.project.pd_colors = JSON.stringify(array);
                    }else{
                        if(pd_colors[1] && pd_colors[2]){
                            self.notification('最多選擇兩個輔色','warning');
                        }else{
                            if(pd_colors[1]){
                                array.push(pd_colors[1]);
                            }
                            array.push(color);
                            self.project.project.pd_colors = JSON.stringify(array);
                        }
                    }
                }else{
                    if(pd_colors[0] == color){
                        self.notification('主、輔色不可選擇相同的顏色','warning');
                        return false;
                    }
                    var array = [];
                    array[0] = '';
                    array[1] = color;
                    self.project.project.pd_colors = JSON.stringify(array);
                }
            }
        },
        // 產生路徑
        add_url:function(){
            let self = this;
            if(!self.project.project.pd_num){
                self.notification('請先輸入網版名稱','failure');
            }else{
                self.project.project.pd_live_url = self.project.live_demo + self.project.project.pd_num;
            }
        },
        // 刪除示意圖
        deleteTemplateImg:function(index){
            let self = this;
            var array = [];
            $('.template_image').each(function(){
                if($(this).find('input').val() != '' && $(this).index() != index){
                    array.push($(this).find('input').val());
                }
            })
            self.project.project.pd_template_img = JSON.stringify(array);
        },
        // 刪除Model圖
        deleteModelImg:function(index){
            let self = this;
            var array = [];
            $('.model_image').each(function(){
                if($(this).find('input').val() != '' && $(this).index() != index){
                    array.push($(this).find('input').val());
                }
            })
            self.project.project.pd_model_img = JSON.stringify(array);
        },
        // 新增示意圖
        addTemplateImage:function(){
            let self = this;
            var array = [];
            $('.template_image').each(function(){
                if($(this).find('input').val() != ''){
                    array.push($(this).find('input').val());
                }
            })
            array.push('')
            self.project.project.pd_template_img = JSON.stringify(array);
        },
        // 新增Model圖
        addModelImage:function(){
            let self = this;
            var array = [];
            $('.model_image').each(function(){
                if($(this).find('input').val() != ''){
                    array.push($(this).find('input').val());
                }
            })
            array.push('');
            self.project.project.pd_model_img = JSON.stringify(array);
        },
        ///
        //////////////////////// 各頁面功能 end //////////////////

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
                    self.checkBySigns(self.project.project.pd_colors);
                })
                .catch(function (response) {
                    self.notification('系統出錯：getSigns()','failure');
                });
        },
        //取得單一網版資料
        getProject:function(id){
            let self = this;
			axios.get(this.$server_api +'/project?pd_id='+id)
                .then(function (response) {
                    self.project.project = response.data;
                    // 自動添加new icon顯示區間，預設為當天開始到三個月後
                    if(!self.project.project.pd_new_start && !self.project.project.pd_new_end){
                        self.project.project.pd_new_start = new Date();
                        var d = new Date();
                        d.setMonth(d.getMonth() + 3)
                        self.project.project.pd_new_end = d;
                        self.setDisabledDate();
                    }else{
                        self.setDisabledDate();
                    }
                })
                .catch(function (response) {
                    self.notification('系統出錯：getProject()','failure');
                });
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

        //////////////////////// 修改區塊 ///////////////////////////
        ///
        //修改星座當年主色系
        modifySignColor:function(){
            let self = this;
            // if(type == 'fire'){
            //     var json = self.project.signs.fire;
            // }else if(type == 'earth'){
            //     var json = self.project.signs.earth;
            // }else if(type == 'wind'){
            //     var json = self.project.signs.wind;
            // }else if(type == 'water'){
            //     var json = self.project.signs.water;
            // }
            if(self.project.alreadyChange.fire){
				axios.post(this.$server_api +'/system-sign-modify',self.project.signs.fire) //修改 - 星座主色
                    .then(function (response) {
                        self.project.alreadyChange.fire = false;
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }else if(self.project.alreadyChange.earth){
				axios.post(this.$server_api +'/system-sign-modify',self.project.signs.earth) //修改 - 星座主色
                    .then(function (response) {
                        self.project.alreadyChange.earth = false;
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }else if(self.project.alreadyChange.wind){
				axios.post(this.$server_api +'/system-sign-modify',self.project.signs.wind) //修改 - 星座主色
                    .then(function (response) {
                        self.project.alreadyChange.wind = false;
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }else if(self.project.alreadyChange.water){
				axios.post(this.$server_api +'/system-sign-modify',self.project.signs.water) //修改 - 星座主色
                    .then(function (response) {
                        self.project.alreadyChange.water = false;
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }
        },
        //修改版型資料
        modifyProject:function(){
            let self = this;
            /// 檢查必填欄位是否傳入
            //名稱
            if(!self.project.project.pd_num){
                self.notification('請輸入網版名稱','warning');
                return false;
            }
            //時間格式轉換
            //上線日期
            if(!self.project.project.pd_date){
                self.notification('請選擇上線日期','warning');
                return false;
            }else{
                var fromDate = new Date(self.project.project.pd_date);
                var year = fromDate.getFullYear();
                var month = fromDate.getMonth() < 10 ? '0'+ (fromDate.getMonth()+1) : (fromDate.getMonth()+1);
                var day = fromDate.getDate() < 10 ? '0'+ fromDate.getDate(): fromDate.getDate();
                self.project.project.pd_date = year+'-'+month+'-'+day;
            }
            //new icon顯示區間
            if(self.project.project.pd_new && self.project.project.pd_show == 1){
                if(!self.project.project.pd_new_start){
                    self.notification('請選擇icon開始顯示日期','warning');
                    return false;
                }else if(!self.project.project.pd_new_end){
                    self.notification('請選擇icon結束顯示日期','warning');
                    return false;
                }else{
                    var now = Date.parse(new Date()).valueOf();
                    var start = Date.parse(self.project.project.pd_new_start).valueOf();
                    var end = Date.parse(self.project.project.pd_new_end).valueOf();
                    var oneYear = new Date(self.project.project.pd_new_start);
                    if(start >= end){
                        self.notification('icon顯示日期結束日期不能早於開始日期','warning');
                        return false;
                    }else if(now > end){
                        self.notification('icon顯示區間已過，請關閉new icon','warning');
                        return false;
                    }else{
                        if(end > oneYear.setYear(oneYear.getFullYear() + 1)){
                            self.notification('icon顯示區間上限為一年','warning');
                            return false;
                        }else{
                            var startDate = new Date(self.project.project.pd_new_start);
                            var s_year = startDate.getFullYear();
                            var s_month = startDate.getMonth()+1 < 10 ? '0'+ (startDate.getMonth()+1) : (startDate.getMonth()+1);
                            var s_day = startDate.getDate() < 10 ? '0'+ startDate.getDate(): startDate.getDate();
                            self.project.project.pd_new_start = s_year+'-'+s_month+'-'+s_day;

                            var endDate = new Date(self.project.project.pd_new_end);
                            var e_year = endDate.getFullYear();
                            var e_month = endDate.getMonth()+1 < 10 ? '0'+ (endDate.getMonth()+1) : (endDate.getMonth()+1);
                            var e_day = endDate.getDate() < 10 ? '0'+ endDate.getDate(): endDate.getDate();
                            self.project.project.pd_new_end = e_year+'-'+e_month+'-'+e_day;
                        }
                    }
                }
            }else{
                self.project.project.pd_new = "";
                self.project.project.pd_new_start = "";
                self.project.project.pd_new_end = "";
            }
            //色系
            var pd_colors = JSON.parse(self.project.project.pd_colors);
            if(!pd_colors[0]){
                self.notification('請選擇主色','warning');
                return false;
            }else if(!pd_colors[1] && !pd_colors[2]){
                self.notification('請選擇至少一個輔色','warning');
                return false;
            }else{
                // 設定該網版五行
                self.project.project.pd_elements = self.witchElement(pd_colors[0]);
                self.project.project.pd_elements_sub = self.witchElement(pd_colors[1]);
            }

            //網版dome
            if(self.project.project.pd_live){
                var pd_live_url = $('input[name=pd_live_url]').val();
                if(pd_live_url == ''){
                    self.notification('請輸入Demo路徑','warning');
                    return false;
                }
            }else{
                self.project.project.pd_live_url = '';
            }
            //列表圖
            var pd_view_img = $('input[name="pd_view_img"]').val();
            if(pd_view_img == ''){
                self.notification('請上傳列表圖','warning');
                return false;
            }else{
                self.project.project.pd_view_img = pd_view_img;
            }
            //banner圖
            var pd_banner_img = $('input[name="pd_banner_img"]').val();
            if(pd_banner_img == ''){
                self.notification('請上傳Banner','warning');
                return false;
            }else{
                self.project.project.pd_banner_img = pd_banner_img;
            }
            //示意圖
            var pd_template_img = [];
            $('.template_image').each(function(){
                if($(this).find('input').val() != ''){
                    pd_template_img.push($(this).find('input').val());
                }
            })
            self.project.project.pd_template_img = JSON.stringify(pd_template_img);
            //model圖
            var pd_model_img = [];
            $('.model_image').each(function(){
                if($(this).find('input').val() != ''){
                    pd_model_img.push($(this).find('input').val());
                }
            })
            self.project.project.pd_model_img = JSON.stringify(pd_model_img);
			self.project.project.last_update_user = self.userdata.ud_name;
            // 回傳修改
			axios.post(this.$server_api +'/project-modify',self.project.project) //修改 - 版型資料
                .then(function (response) {
					if (response.data.result) {
						self.pushLocalData(true, response.data.string);
						window.location.replace('/project/list');
					} else {
						self.notification(response.data.string, 'failure');
					}
                })
                .catch(function (response) {
                    self.notification('系統出錯：modifyProject()','failure');
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
					if (response.data.result) {
						self.pushLocalData(true, response.data.string);
						window.location.replace('/project/list');
					} else {
						self.notification(response.data.string, 'failure');
					}
                })
                .catch(function (response) {
                    self.notification('系統出錯：deleteProject()','failure');
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
