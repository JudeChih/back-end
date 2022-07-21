<style scoped></style>
<template>
<div id="mainBody" class="clearfix index_page">
    <!--header-->
    <common-header :data="userdata" :page="nowPage" :view="nowView"></common-header>
    <!--container-->
    <div id="container">
        <!--status-->
        <common-status :data="userdata" :page="nowPage" :view="nowView"></common-status>
        <!--content-->
<!--☢--><div class="content-wrap clearfix">
            <div class="first-wrap">
                <div class="first-count">{{index.project_count}}</div>
                <div class="first-count">{{index.project_show_count}}</div>
                <div class="first-count">{{index.project_hide_count}}</div>
                <div class="first-count">{{index.project_off_count}}</div>
                <div style="color:red;">★排除已下架數量</div>
                <div class="first-item-wrap">
                    <!-- 五行-主色 -->
                    <div class="first-item">
                        <div class="title">五行-主色</div>
                        <div class="first-temp-wrap">
                            <ul>
                                <li><span class="chart4_bg1"></span>金：{{index.element_count[0]}}</li>
                                <li><span class="chart4_bg2"></span>木：{{index.element_count[1]}}</li>
                                <li><span class="chart4_bg3"></span>水：{{index.element_count[2]}}</li>
                                <li><span class="chart4_bg4"></span>火：{{index.element_count[3]}}</li>
                                <li><span class="chart4_bg5"></span>土：{{index.element_count[4]}}</li>
                            </ul>
                        </div>
                        <!--圓餅圖-->
                        <pie-chart id="chart4" class="chart_pie" :data="chart4" :options="{legend:{display: false,},plugins:{datalabels:{display: false}},tooltips:{bodyFontSize:20,titleFontSize:20}}"></pie-chart>
                    </div>
                    <!-- 五行-輔色 -->
                    <div class="first-item">
                        <div class="title">五行-輔色</div>
                        <div class="first-temp-wrap">
                            <ul>
                                <li><span class="chart4_bg1"></span>金：{{index.element_sub_count[0]}}</li>
                                <li><span class="chart4_bg2"></span>木：{{index.element_sub_count[1]}}</li>
                                <li><span class="chart4_bg3"></span>水：{{index.element_sub_count[2]}}</li>
                                <li><span class="chart4_bg4"></span>火：{{index.element_sub_count[3]}}</li>
                                <li><span class="chart4_bg5"></span>土：{{index.element_sub_count[4]}}</li>
                            </ul>
                        </div>
                        <!--圓餅圖-->
                        <pie-chart id="chart5" class="chart_pie" :data="chart5" :options="{legend:{display: false,},plugins:{datalabels:{display: false}},tooltips:{bodyFontSize:20,titleFontSize:20}}"></pie-chart>
                    </div>
                    <!-- 星座 -->
                    <div class="first-item">
                        <div class="title">星座</div>
                        <div class="first-temp-wrap">
                            <ul>
                                <li><span class="chart1_bg1"></span>火象：{{index.sign_count[0]}}</li>
                                <li><span class="chart1_bg2"></span>土象：{{index.sign_count[1]}}</li>
                                <li><span class="chart1_bg3"></span>風象：{{index.sign_count[2]}}</li>
                                <li><span class="chart1_bg4"></span>水象：{{index.sign_count[3]}}</li>
                            </ul>
                        </div>
                        <!--圓餅圖-->
                        <pie-chart id="chart1" class="chart_pie" :data="chart1" :options="{legend:{display: false,},plugins:{datalabels:{display: false}},tooltips:{bodyFontSize:20,titleFontSize:20}}"></pie-chart>
                    </div>
                    <!-- 主題 -->
                    <div class="first-item">
                        <div class="title">主題</div>
                        <div class="first-temp-wrap">
                            <ul>
                                <li><span class="chart6_bg1"></span>一般：{{index.type_count[0]}}</li>
                                <li><span class="chart6_bg2"></span>機率：{{index.type_count[1]}}</li>
                                <li><span class="chart6_bg3"></span>捕魚：{{index.type_count[2]}}</li>
                                <li><span class="chart6_bg4"></span>視訊：{{index.type_count[3]}}</li>
                                <li><span class="chart6_bg1"></span>彩票：{{index.type_count[4]}}</li>
                                <li><span class="chart6_bg2"></span>體育：{{index.type_count[5]}}</li>
                                <li><span class="chart6_bg3"></span>電競：{{index.type_count[6]}}</li>
                                <li><span class="chart6_bg4"></span>棋牌：{{index.type_count[7]}}</li>
                            </ul>
                        </div>
                        <!--圓餅圖-->
                        <pie-chart id="chart6" class="chart_pie line_none" :data="chart6" :options="{legend:{display: false,},plugins:{datalabels:{display: false}},tooltips:{bodyFontSize:20,titleFontSize:20}}"></pie-chart>
                    </div>
                </div>
                <div class="first-item-wrap">
                    <!-- 風格 -->
                    <div class="first-item">
                        <div class="title">網版風格</div>
                        <div class="first-temp-wrap">
                            <ul>
                                <li><span class="chart2_bg1"></span>前衛時尚：{{index.style_count[0]}}</li>
                                <li><span class="chart2_bg2"></span>復古典雅：{{index.style_count[1]}}</li>
                                <li><span class="chart2_bg3"></span>精緻華麗：{{index.style_count[2]}}</li>
                                <li><span class="chart2_bg4"></span>簡約大氣：{{index.style_count[3]}}</li>
                            </ul>
                        </div>
                        <!--圓餅圖-->
                        <pie-chart id="chart2" class="chart_pie" :data="chart2" :options="{legend:{display: false,},plugins:{datalabels:{display: false}},tooltips:{bodyFontSize:20,titleFontSize:20}}"></pie-chart>
                    </div>
                    <!--色系 -->
                    <div class="first-item">
                        <div class="title">色系</div>
                        <div class="first-temp-wrap">
                            <ul class="color_setting">
                                <li><span class="white"></span>white：{{index.color_count['white']}}</li>
                                <li><span class="lightgrey"></span>lightgrey：{{index.color_count['lightgrey']}}</li>
                                <li><span class="darkgrey"></span>darkgrey：{{index.color_count['darkgrey']}}</li>
                                <li><span class="black"></span>black：{{index.color_count['black']}}</li>
                                <li><span class="blue"></span>blue：{{index.color_count['blue']}}</li>
                                <li><span class="green"></span>green：{{index.color_count['green']}}</li>
                                <li><span class="greenblue"></span>greenblue：{{index.color_count['greenblue']}}</li>
                                <li><span class="yellow"></span>yellow：{{index.color_count['yellow']}}</li>
                                <li><span class="coffee"></span>coffee：{{index.color_count['coffee']}}</li>
                                <li><span class="earth"></span>earth：{{index.color_count['earth']}}</li>
                                <li><span class="orange"></span>orange：{{index.color_count['orange']}}</li>
                                <li><span class="red"></span>red：{{index.color_count['red']}}</li>
                                <li><span class="purple"></span>purple：{{index.color_count['purple']}}</li>
                            </ul>
                        </div>
                        <!--圓餅圖-->
                        <pie-chart id="chart3" class="chart_pie line_none" :data="chart3" :options="{legend:{display: false,},plugins:{datalabels:{display: false}},tooltips:{bodyFontSize:20,titleFontSize:20}}"></pie-chart>
                    </div>
                </div>
                <!-- 選中模版成長線圖 -->
                <div class="line">
                    <div class="title">選中模版成長線圖</div>
                    <line-chart id="line2" :height="285" :options="index.growOptions" :data="index.growdata"></line-chart>
                </div>
                <!-- 當月選中次數 -->
                <div class="line">
                    <div class="title">當月選中次數</div>
                    <div class="line-content">
                        <div class="line-date">
                            <span class="btn_prev" @click="getLineModels(lineValue(-1),line_orderBy)"><i class="fas fa-caret-left"></i></span>
                            <span>{{line_year}}年{{line_month}}月</span>
                            <span v-if="line_next" class="btn_next" @click="getLineModels(lineValue(1),line_orderBy)"><i class="fas fa-caret-right"></i></span>
                            <span v-else class="btn_next no"><i class="fas fa-caret-right"></i></span>
                        </div>
                        <div class="line-total">
                            <div>總數</div>
                            <div>{{index.linetotal}}</div>
                        </div>
                    </div>
                    <div id="tab-link">
                        <ul class="clearfix">
                            <li><a href="javascript:void(0)" @click="nowLineView = 'line'" :class="{'active':nowLineView == 'line'}">圖表分佈</a></li>
                            <li><a href="javascript:void(0)" @click="nowLineView = 'list'" :class="{'active':nowLineView == 'list'}">列表清單</a></li>
                        </ul>
                    </div>
                    <line-chart v-if="nowLineView == 'line'" id="line1" :height="285" :options="index.lineOptions" :data="index.linedata"></line-chart>
                    <div v-if="nowLineView == 'list'" class="chart-list-wrap clearfix">
                        <div class="chart-title clearfix">
                            <div @click="changeOrderTarget('line','wms_modelrecord.mr_date')" class="ch-date hasSomeFeatures">選中日期<i class="fas fa-caret-up icon_up" :class="whichActive('line','wms_modelrecord.mr_date','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('line','wms_modelrecord.mr_date','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('line','wms_projectdata.pd_num')" class="ch-name hasSomeFeatures">名稱<i class="fas fa-caret-up icon_up" :class="whichActive('line','wms_projectdata.pd_num','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('line','wms_projectdata.pd_num','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('line','wms_projectdata.pd_colors')" class="ch-color hasSomeFeatures">色系<i class="fas fa-caret-up icon_up" :class="whichActive('line','wms_projectdata.pd_colors','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('line','wms_projectdata.pd_colors','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('line','wms_projectdata.pd_elements')" class="ch-element hasSomeFeatures">五行<i class="fas fa-caret-up icon_up" :class="whichActive('line','wms_projectdata.pd_elements','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('line','wms_projectdata.pd_elements','DESC') ? 'active': ''"></i></div>
                            <div class="ch-count">次數</div>
                        </div>
                        <div class="chart-content clearfix">
                            <div v-for="item in newLineData" class="chart-item">
                                <div class="ch-date">{{item.mr_date}}</div>
                                <div class="ch-name">
                                    <a href="javascript:void(0)" :title="item.pd_num">{{item.pd_num}}</a>
                                </div>
                                <div class="ch-color">
                                    <span v-if="JSON.parse(item.pd_colors)[0]" :class="'main color color-'+JSON.parse(item.pd_colors)[0]"></span>
                                    <span v-if="JSON.parse(item.pd_colors)[1]" :class="'sub color color-'+JSON.parse(item.pd_colors)[1]"></span>
                                    <span v-if="JSON.parse(item.pd_colors)[2]" :class="'sub color color-'+JSON.parse(item.pd_colors)[2]"></span>
                                </div>
                                <div class="ch-element">{{checkByElementsForList(item.pd_elements)}}</div>
                                <div class="ch-count">{{item.count}}</div>
                            </div>
                        </div>
                        <div class="paginate_box">
                            <paginate name="model_line" v-model="index.line_page" :page-count="indexCount('line')" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                        </div>
                    </div>
                </div>
                <!-- 五行分佈 - 選中版型 -->
                <div class="pie left">
                    <div class="title">五行分佈 - 選中版型</div>
                    <a href="javascript:void(0)" @click="getElementsByBtn('now')" class="btn btn-s" title="">當年</a>
                    <a href="javascript:void(0)" @click="getElementsByBtn('all')" class="btn btn-s" title="">全年度</a>
                    <div class="pie-content clearfix">
                        <div class="pie-date clearfix">
                            <span>區間：</span>
                            <datepicker id="pie-datepicker-start" class="date-input check_unit" @selected="getElements()" v-model="index.pie_project_date[0]" :format="'yyyy-MM-dd'" v-tooltip="'請選擇開始日期'"></datepicker>
                            <span class="pie-icon">~</span>
                            <datepicker id="pie-datepicker-end" class="date-input check_unit" @selected="getElements()" v-model="index.pie_project_date[1]" :format="'yyyy-MM-dd'" v-tooltip="'請選擇結束日期'"></datepicker>
                        </div>
                        <div class="pie-total clearfix">
                            <span>總數：</span><span>{{index.models_pie_list.length}}</span>
                        </div>
                    </div>
                    <div id="tab-link">
                        <ul class="clearfix">
                            <li><a href="javascript:void(0)" @click="nowPieView = 'pie'" :class="{'active':nowPieView == 'pie'}">圖表分佈</a></li>
                            <li><a href="javascript:void(0)" @click="nowPieView = 'list'" :class="{'active':nowPieView == 'list'}">列表清單</a></li>
                        </ul>
                    </div>
                    <!--圓餅圖-->
                    <div v-if="nowPieView == 'pie'" class="pie-wrap">
                        <div class="pie-item">
                            <span class="color color-metal"></span><span>金：{{index.projects_pie[0]}}</span>
                        </div>
                        <div class="pie-item">
                            <span class="color color-wood"></span><span>木：{{index.projects_pie[1]}}</span>
                        </div>
                        <div class="pie-item">
                            <span class="color color-water"></span><span>水：{{index.projects_pie[2]}}</span>
                        </div>
                        <div class="pie-item">
                            <span class="color color-fire"></span><span>火：{{index.projects_pie[3]}}</span>
                        </div>
                        <div class="pie-item">
                            <span class="color color-earth"></span><span>土：{{index.projects_pie[4]}}</span>
                        </div>
                    </div>
                    <pie-chart v-if="nowPieView == 'pie'" id="pie1" :height="260" :data="index.piedata" :options="index.pieOptions"></pie-chart>
                    <div v-if="nowPieView == 'list'" class="chart-list-wrap clearfix">
                        <div class="chart-title clearfix">
                            <div @click="changeOrderTarget('pie','wms_modelrecord.mr_date')" class="ch-date hasSomeFeatures">選中日期<i class="fas fa-caret-up icon_up" :class="whichActive('pie','wms_modelrecord.mr_date','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('pie','wms_modelrecord.mr_date','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('pie','wms_projectdata.pd_num')" class="ch-name hasSomeFeatures">名稱<i class="fas fa-caret-up icon_up" :class="whichActive('pie','wms_projectdata.pd_num','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('pie','wms_projectdata.pd_num','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('pie','wms_projectdata.pd_colors')" class="ch-color hasSomeFeatures">色系<i class="fas fa-caret-up icon_up" :class="whichActive('pie','wms_projectdata.pd_colors','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('pie','wms_projectdata.pd_colors','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('pie','wms_projectdata.pd_elements')" class="ch-element hasSomeFeatures">五行<i class="fas fa-caret-up icon_up" :class="whichActive('pie','wms_projectdata.pd_elements','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('pie','wms_projectdata.pd_elements','DESC') ? 'active': ''"></i></div>
                            <div class="ch-count">次數</div>
                        </div>
                        <div class="chart-content clearfix">
                            <div v-for="item in newPieData" class="chart-item">
                                <div class="ch-date">{{item.mr_date}}</div>
                                <div class="ch-name">
                                    <a href="javascript:void(0)" :title="item.pd_num">{{item.pd_num}}</a>
                                </div>
                                <div class="ch-color">
                                    <span v-if="JSON.parse(item.pd_colors)[0]" :class="'main color color-'+JSON.parse(item.pd_colors)[0]"></span>
                                    <span v-if="JSON.parse(item.pd_colors)[1]" :class="'sub color color-'+JSON.parse(item.pd_colors)[1]"></span>
                                    <span v-if="JSON.parse(item.pd_colors)[2]" :class="'sub color color-'+JSON.parse(item.pd_colors)[2]"></span>
                                </div>
                                <div class="ch-element">{{checkByElementsForList(item.pd_elements)}}</div>
                                <div class="ch-count">{{item.count}}</div>
                            </div>
                        </div>
                        <div class="paginate_box">
                            <paginate name="element_pie" v-model="index.pie_page" :page-count="indexCount('pie')" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                        </div>
                    </div>
                </div>
                <!-- 星座分佈 - 選中版型 -->
                <div class="pie right">
                    <div class="title">星座分佈 - 選中版型</div>
                    <div class="pie-content clearfix">
                        <div class="pie-date clearfix">
                            <span>區間：</span><span>{{index.pie_sign_date[0]}} ~ {{index.pie_sign_date[1]}}(今天)</span>
                        </div>
                        <div class="pie-total clearfix">
                            <span>總數：</span><span>{{index.models_sign_list.length}}</span>
                        </div>
                    </div>
                    <div id="tab-link">
                        <ul class="clearfix">
                            <li><a href="javascript:void(0)" @click="nowSignView = 'pie'" :class="{'active':nowSignView == 'pie'}">圖表分佈</a></li>
                            <li><a href="javascript:void(0)" @click="nowSignView = 'list'" :class="{'active':nowSignView == 'list'}">列表清單</a></li>
                        </ul>
                    </div>
                    <!--圓餅圖-->
                    <div v-if="nowSignView == 'pie'" class="pie-wrap">
                        <div class="pie-item sign_data">
                            <span class="color color-sign-fire"></span><span>火象：{{index.sign_pie[0]}}</span>
                        </div>
                        <div class="pie-item sign_data">
                            <span class="color color-sign-earth"></span><span>土象：{{index.sign_pie[1]}}</span>
                        </div>
                        <div class="pie-item sign_data">
                            <span class="color color-sign-wind"></span><span>風象：{{index.sign_pie[2]}}</span>
                        </div>
                        <div class="pie-item sign_data">
                            <span class="color color-sign-water"></span><span>水象：{{index.sign_pie[3]}}</span>
                        </div>
                    </div>
                    <pie-chart v-if="nowSignView == 'pie'" id="pie1" :height="260" :data="index.signdata" :options="index.signOptions"></pie-chart>
                    <div v-if="nowSignView == 'list'" class="chart-list-wrap clearfix">
                        <div class="chart-title clearfix">
                            <div @click="changeOrderTarget('sign','wms_modelrecord.mr_date')" class="ch-date hasSomeFeatures">選中日期<i class="fas fa-caret-up icon_up" :class="whichActive('sign','wms_modelrecord.mr_date','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('sign','wms_modelrecord.mr_date','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('sign','wms_projectdata.pd_num')" class="ch-name hasSomeFeatures">名稱<i class="fas fa-caret-up icon_up" :class="whichActive('sign','wms_projectdata.pd_num','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('sign','wms_projectdata.pd_num','DESC') ? 'active': ''"></i></div>
                            <div @click="changeOrderTarget('sign','wms_projectdata.pd_colors')" class="ch-color hasSomeFeatures">色系<i class="fas fa-caret-up icon_up" :class="whichActive('sign','wms_projectdata.pd_colors','ASC') ? 'active': ''"></i><i class="fas fa-caret-down icon_down" :class="whichActive('sign','wms_projectdata.pd_colors','DESC') ? 'active': ''"></i></div>
                            <div class="ch-sign hasSomeFeatures sign_setting">星座</div>
                            <div class="ch-count">次數</div>
                        </div>
                        <div class="chart-content clearfix">
                            <div v-for="item in newSignData" class="chart-item">
                                <div class="ch-date">{{item.mr_date}}</div>
                                <div class="ch-name">
                                    <a href="javascript:void(0)" :title="item.pd_num">{{item.pd_num}}</a>
                                </div>
                                <div class="ch-color">
                                    <span v-if="JSON.parse(item.pd_colors)[0]" :class="'main color color-'+JSON.parse(item.pd_colors)[0]"></span>
                                    <span v-if="JSON.parse(item.pd_colors)[1]" :class="'sub color color-'+JSON.parse(item.pd_colors)[1]"></span>
                                    <span v-if="JSON.parse(item.pd_colors)[2]" :class="'sub color color-'+JSON.parse(item.pd_colors)[2]"></span>
                                </div>
                                <div class="ch-sign">{{checkBySignsForList(JSON.parse(item.pd_colors)[0])}}</div>
                                <div class="ch-count">{{item.count}}</div>
                            </div>
                        </div>
                        <div class="paginate_box">
                            <paginate name="sign_pie" v-model="index.sign_page" :page-count="indexCount('sign')" :page-range="3" :margin-pages="2" :prev-text="'<'" :next-text="'>'"></paginate>
                        </div>
                    </div>
                </div>
                <div class="bar">
                    <div class="title">兩年內模板使用量</div>
                    <div class="bar-content clearfix">
                        <div class="bar-date">
                            <span>區間：</span><span>{{index.twoyear_models_date.startDate}} ~ {{index.twoyear_models_date.endDate}}(今天)</span>
                        </div>
                        <div class="bar-total">
                            <span>總數：</span><span>{{index.twoyearbartotal}}</span>
                        </div>
                    </div>
                    <div id="bar2">
                        <bar-chart class="bar-box" :class="index.twoyearbarcount > 15 ? 'over' : ''" :height="300" :options="index.twoyearbarOptions" :data="index.twoyearbardata" :responsive="false"></bar-chart>
                    </div>
                </div>
                <div class="bar">
                    <div class="title">最熱門模板使用量</div>
                    <a href="javascript:void(0)" @click="getHotsByBtn('now')" class="btn btn-s" title="">當年</a>
                    <a href="javascript:void(0)" @click="getHotsByBtn('all')" class="btn btn-s" title="">全年度</a>
                    <div class="bar-content clearfix">
                        <div class="bar-date clearfix">
                            <span>區間：</span>
                            <datepicker id="bar-datepicker-start" class="date-input check_unit" @selected="getHots()" v-model="index.hot_models_date.startDate" :format="'yyyy-MM-dd'" v-tooltip="'請選擇開始日期'"></datepicker>
                            <span class="bar-icon">~</span>
                            <datepicker id="bar-datepicker-end" class="date-input check_unit" @selected="getHots()" v-model="index.hot_models_date.endDate" :format="'yyyy-MM-dd'" v-tooltip="'請選擇結束日期'"></datepicker>
                        </div>
                        <div class="bar-range"><el-checkbox v-on:change="getHots()" v-model="index.hotbar_checked">顯示已下架</el-checkbox></div>
                        <div class="bar-total clearfix">
                            <span>總數：</span><span>{{index.hotbartotal}}</span>
                        </div>
                    </div>
                    <div id="bar1">
                        <bar-chart class="bar-box" :class="index.hotbarcount > 15 ? 'over' : ''" :height="300" :options="index.hotbarOptions" :data="index.hotbardata" :responsive="false"></bar-chart>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '../components/header';
import CommonStatus from '../components/status';
import PieChart from '../components/PieChart.js';
import LineChart from '../components/LineChart.js';
import BarChart from '../components/BarChart.js';
import Datepicker from 'vuejs-datepicker';
import axios from 'axios';
import {Notification} from 'element-ui'
export default {
    components: {
        CommonHeader,
        CommonStatus,
        PieChart,
        LineChart,
        BarChart,
        Datepicker
    },
	middleware: 'authenticated',
	data() {
        return {
            //共用資訊////////////////////////////////////////////////////
            nowPage:'index',
            nowView:'list',
            nowLineView:'line', // 首頁當月選中數據的顯示依據  line 圖表  list 列表
            nowPieView:'pie', // 首頁五行分佈的顯示依據  pie 圖表  list 列表
            nowSignView:'pie', // 首頁星座分布的顯示依據  pie 圖表  list 列表
            userdata:[], // 使用者資料
            //圖表需求變數
            line_date:'', // 線性圖表搜尋日期
            line_year:'', // 線性圖表搜尋年
            line_month:'', // 線性圖表搜尋月
            line_next:false, // 線性圖表是否有下一個月資料
            //各頁排序依據/////////////////////////////////////////////////
            line_orderBy:['wms_modelrecord.mr_date','DESC'], // 首頁當月選中數據排序
            pie_orderBy:['wms_modelrecord.mr_date','DESC'], // 首頁五行分佈排序
            sign_orderBy:['wms_modelrecord.mr_date','DESC'], // 首頁星座分佈排序
            //各頁資訊////////////////////////////////////////////////////
            index:{/// 首頁
                project_count:'', // 網版總數
                project_show_count:'', // 網版顯示總數
                project_hide_count:'', // 網版隱藏總數
                project_off_count:'', // 網版下架總數
                element_count:[], // 各主色五行總數
                element_sub_count:[], // 各輔色五行總數
                sign_count:[], // 各星座屬象總數
                style_count:[], // 各風格總數
                color_count:[], // 各色系總數
                type_count:[], // 各主題總數
                projectdata:[], // 最新五筆的固定網版資料
                models_line:[], // 當月數據資料(線性圖)
                sign_pie:[], // 星座總數(圓餅圖)
                signdata:'', // 星座分佈
                pie_sign_date:[], // 星座圓餅圖搜尋時間區間
                models_sign_list:[], // 星座圓餅圖的資料
                sign_limit:10, //每頁數的筆數
                sign_page:1, // 目前頁數
                sign_total:0, // 星座分布總數
                signOptions:{ // 相關設定
                    tooltips: {
                        // enabled: false,
						bodyFontSize:20,
						titleFontSize:20
                    },
                    legend:{
                        display: false
                    },
                    plugins: {
                        datalabels: {
                            display: true,
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                if(((value / sum)*100).toFixed(1) != '0.0'){
                                    return ((value / sum)*100).toFixed(1)+"%";
                                }else{
                                    return ' ';
                                }
                            },
                            color: '#fff',
                        }
                    },
                    layout: {
                        height: '200',
                        width:'200',
                    },
                    maintainAspectRatio: false,
                },
                projects_pie:[], // 五行總數(圓餅圖)
                piedata:'', // 五行分佈
                pie_project_date:[], // 五行圓餅圖搜尋時間區間
                models_pie_list:[], // 五行圓餅圖的資料
                pie_limit:10, //每頁數的筆數
                pie_page:1, // 目前頁數
                pie_total:0, //五行分佈總數
                pieOptions:{ // 相關設定
                    tooltips: {
                        // enabled: false,
						bodyFontSize:20,
						titleFontSize:20
                    },
                    legend:{
                        display: false
                    },
                    plugins: {
                        datalabels: {
                            display: true,
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                if(((value / sum)*100).toFixed(1) != '0.0'){
                                    return ((value / sum)*100).toFixed(1)+"%";
                                }else{
                                    return ' ';
                                }
                            },
                            color: '#fff',
                        }
                    },
                    layout: {
                        height: '200',
                        width:'200',
                    },
                    maintainAspectRatio: false,
                },
                grow_line:[],
                growdata:[], // 每年選取次數
                growOptions:{ // 相關設定
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        bodyFontSize:20,
                        titleFontSize:20,
                    },
                    legend:{
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '年份'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                min: 0,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '數量'
                            }
                        }]
                    },
                    plugins: {
                        datalabels: {
                            display: false,
                        }
                    },
                    maintainAspectRatio: false,
                },
                models_line_list:[], // 所選月份的選中次數的資料
                line_limit:10, //每頁數的筆數
                line_page:1, // 目前頁數
                line_total:0, // 當月顯示總筆數
                linedata:'', // 當月每日選取次數
                linetotal:'', // 當月選取總次數
                lineOptions:{ // 相關設定
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        bodyFontSize:20,
                        titleFontSize:20,
                    },
                    legend:{
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '日期'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                min: 0,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '數量'
                            }
                        }]
                    },
                    plugins: {
                        datalabels: {
                            display: false,
                        }
                    },
                    maintainAspectRatio: false,
                },
                twoyear_models_bar:[], // 兩年內模板使用量資料
                twoyear_models_date:[], // 兩年內模板搜尋的日期區間
                twoyearbardata:'', // 兩年內網版選取次數
                twoyearbarcount:'', // 網版數量
                twoyearbarOptions:{ // 相關設定
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        bodyFontSize:20,
                        titleFontSize:20,
                    },
                    legend:{
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '版型名稱'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                min: 0,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '次數'
                            }
                        }]
                    },
                    plugins: {
                        datalabels: {
                            color: '#fff',
                        }
                    },
                    maintainAspectRatio: false,
                },
                hot_models_bar:[], // 熱門模板使用量資料
                hot_models_date:[], // 熱門模板搜尋的日期區間
                hotbardata:'', // 當年各熱門網版選取次數
                hotbar_checked:false, // 是否顯示已下架版型
                hotbarcount:'', // 網版數量
                hotbarOptions:{ // 相關設定
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        bodyFontSize:20,
                        titleFontSize:20,
                    },
                    legend:{
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '版型名稱'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                min: 0,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '次數'
                            }
                        }]
                    },
                    plugins: {
                        datalabels: {
                            color: '#fff',
                        }
                    },
                    maintainAspectRatio: false,
                },
                sign_fire:{},
                sign_water:{},
                sign_earth:{},
                sign_wind:{},
            },
        }
    },
    // 模板渲染成html或是模板編譯進路由之前
    created:function(){
        let self = this;
        self.checkUser();
        if(sessionStorage.getItem("localData") != null){
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.user){
                self.pullLocalDataForList();
            }
        }
    },
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        let self = this;
        self.init();
        self.bar1scrollInit();
        self.bar2scrollInit();
    },
    computed: {
        chart1:function(){//星象
            let self = this;
            var labels = ['火象', '土象', '風象', '水象'];
            return{
            labels: labels,
            datasets: [{
                data: self.index.sign_count,
                backgroundColor: [
                    //資料顏色
                    "#bf190a",
                    "#733f0b",
                    "#3cb300",
                    "#0080ff"
                ],
            }]
            }
        },
        chart2:function(){//網版風格
            let self = this;
            var labels2 = ['前衛時尚', '復古典雅', '精緻華麗', '簡約大氣'];
            return{
            labels: labels2,
            datasets: [{
                data: self.index.style_count,
                backgroundColor: [
                    //資料顏色
                    "#7d66f4",
                    "#ff7e00",
                    "#ffd200",
                    "#bc00ff"
                ],
            }]
            }
        },
        chart3:function(){//網版色系
            let self = this;
            var labels3 = ['white', 'lightgrey', 'darkgrey', 'black', 'blue', 'green', 'greenblue', 'yellow', 'coffee', 'earth', 'orange',  'red', 'purple'];
            return{
            labels: labels3,
            datasets: [{
                data: [self.index.color_count.white,self.index.color_count.lightgrey,self.index.color_count.darkgrey,self.index.color_count.black,self.index.color_count.blue,self.index.color_count.green,self.index.color_count.greenblue,self.index.color_count.yellow,self.index.color_count.coffee,self.index.color_count.earth,self.index.color_count.orange,self.index.color_count.red,self.index.color_count.purple],
                backgroundColor: [
                    //資料顏色
                    "#fff",
                    "#D5D5D5",
                    "#666464",
                    "#000",
                    "#008fe4",
                    "#46c100",
                    "#309793",
                    "#f1f500",
                    "#5b2900",
                    "#C38F22",
                    "#ff7e00",
                    "#f31809",
                    "#bc00ff"
                ],
            }]
            }
        },
        chart4:function(){//主色五行分佈
            let self = this;
            var labels4 = ['金', '木', '水', '火', '土'];
            return{
                labels: labels4,
                datasets: [{
                    data: self.index.element_count,
                    backgroundColor: [
                        //資料顏色
                        "#F3CE3F",
                        "#359836",
                        "#2684B8",
                        "#D22327",
                        "#846B46"
                    ],
                }]
            }
        },
        chart5:function(){//輔色五行分佈
            let self = this;
            var labels5 = ['金', '木', '水', '火', '土'];
            return{
                labels: labels5,
                datasets: [{
                    data: self.index.element_sub_count,
                    backgroundColor: [
                        //資料顏色
                        "#F3CE3F",
                        "#359836",
                        "#2684B8",
                        "#D22327",
                        "#846B46"
                    ],
                }]
            }
        },
        chart6:function(){//主題
            let self = this;
            var labels = ['一般', '機率', '捕魚', '視訊', '彩票', '體育', '電競', '棋牌'];
            return{
            labels: labels,
            datasets: [{
                data: self.index.type_count,
                backgroundColor: [
                    //資料顏色
                    "#FB040B",
                    "#50029C",
                    "#0F70C9",
                    "#1F816D",
                    "#D37047",
                    "#F15192",
                    "#891500",
                    "#8E99CE"
                ],
            }]
            }
        },
        newLineData:function(){
            let self = this;
            var line = self.index.models_line_list;
            if(line){
                if(line.length > 0){
                    var start = (parseInt(self.index.line_page) - 1) * parseInt(self.index.line_limit);
                    var pd_array = [];
                    var now_date = '';
                    var new_array = [];
                    for (let i = 0; i < line.length; i++) {
                        if(i == 0 && i == line.length -1){//第一次也是最後一次的設定
                            var json = {};
                            json.mr_date = line[i].mr_date;
                            json.pd_id = line[i].pd_id;
                            json.pd_num = line[i].pd_num;
                            json.pd_colors = line[i].pd_colors;
                            json.pd_elements = line[i].pd_elements;
                            json.count = 1;
                            new_array.push(json);
                        }else if(i == 0){//第一次進來的設定
                            now_date = line[i].mr_date;
                            var json = {};
                            json.pd_id = line[i].pd_id;
                            json.pd_num = line[i].pd_num;
                            json.pd_colors = line[i].pd_colors;
                            json.pd_elements = line[i].pd_elements;
                            json.count = 1;
                            pd_array.push(json);
                        }else if(i == line.length -1){//最後一次進來的設定
                            if(now_date != line[i].mr_date){
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                                var json = {};
                                json.mr_date = line[i].mr_date;
                                json.pd_id = line[i].pd_id;
                                json.pd_num = line[i].pd_num;
                                json.pd_colors = line[i].pd_colors;
                                json.pd_elements = line[i].pd_elements;
                                json.count = 1;
                                new_array.push(json);
                            }else{
                                var boolean = true;
                                for (let j = 0; j < pd_array.length; j++) {
                                    if(line[i].pd_id == pd_array[j].pd_id) {
                                        pd_array[j].count++;
                                        boolean = false;
                                    }
                                }
                                if(boolean){
                                    var json = {};
                                    json.pd_id = line[i].pd_id;
                                    json.pd_num = line[i].pd_num;
                                    json.pd_colors = line[i].pd_colors;
                                    json.pd_elements = line[i].pd_elements;
                                    json.count = 1;
                                    pd_array.push(json);
                                }
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                            }
                        }else{
                            if(now_date != line[i].mr_date){
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                                pd_array = [];
                                now_date = line[i].mr_date;
                                var json = {};
                                json.pd_id = line[i].pd_id;
                                json.pd_num = line[i].pd_num;
                                json.pd_colors = line[i].pd_colors;
                                json.pd_elements = line[i].pd_elements;
                                json.count = 1;
                                pd_array.push(json);
                            }else{
                                var boolean = true;
                                for (let j = 0; j < pd_array.length; j++) {
                                    if(line[i].pd_num == pd_array[j].pd_num) {
                                        pd_array[j].count++;
                                        boolean = false;
                                    }
                                }
                                if(boolean){
                                    var json = {};
                                    json.pd_id = line[i].pd_id;
                                    json.pd_num = line[i].pd_num;
                                    json.pd_colors = line[i].pd_colors;
                                    json.pd_elements = line[i].pd_elements;
                                    json.count = 1;
                                    pd_array.push(json);
                                }
                            }
                        }
                    }
                    self.index.line_total = new_array.length;
                    return new_array.slice(start, start + parseInt(self.index.line_limit));
                }else{
                    return [];
                }
            }else{
                return [];
            }
        },
        newPieData:function(){
            let self = this;
            var pie = self.index.models_pie_list;
            if(pie){
                if(pie.length > 0){
                    var start = (parseInt(self.index.pie_page) - 1) * parseInt(self.index.pie_limit);
                    var pd_array = [];
                    var now_date = '';
                    var new_array = [];
                    for (let i = 0; i < pie.length; i++) {
                        if(i == 0 && i == pie.length -1){//第一次也是最後一次的設定
                            var json = {};
                            json.mr_date = pie[i].mr_date;
                            json.pd_id = pie[i].pd_id;
                            json.pd_num = pie[i].pd_num;
                            json.pd_colors = pie[i].pd_colors;
                            json.pd_elements = pie[i].pd_elements;
                            json.count = 1;
                            new_array.push(json);
                        }else if(i == 0){//第一次進來的設定
                            now_date = pie[i].mr_date;
                            var json = {};
                            json.pd_id = pie[i].pd_id;
                            json.pd_num = pie[i].pd_num;
                            json.pd_colors = pie[i].pd_colors;
                            json.pd_elements = pie[i].pd_elements;
                            json.count = 1;
                            pd_array.push(json);
                        }else if(i == pie.length -1){//最後一次進來的設定
                            if(now_date != pie[i].mr_date){
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                                var json = {};
                                json.mr_date = pie[i].mr_date;
                                json.pd_id = pie[i].pd_id;
                                json.pd_num = pie[i].pd_num;
                                json.pd_colors = pie[i].pd_colors;
                                json.pd_elements = pie[i].pd_elements;
                                json.count = 1;
                                new_array.push(json);
                            }else{
                                var boolean = true;
                                for (let j = 0; j < pd_array.length; j++) {
                                    if(pie[i].pd_id == pd_array[j].pd_id) {
                                        pd_array[j].count++;
                                        boolean = false;
                                    }
                                }
                                if(boolean){
                                    var json = {};
                                    json.pd_id = pie[i].pd_id;
                                    json.pd_num = pie[i].pd_num;
                                    json.pd_colors = pie[i].pd_colors;
                                    json.pd_elements = pie[i].pd_elements;
                                    json.count = 1;
                                    pd_array.push(json);
                                }
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                            }
                        }else{
                            if(now_date != pie[i].mr_date){
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                                pd_array = [];
                                now_date = pie[i].mr_date;
                                var json = {};
                                json.pd_id = pie[i].pd_id;
                                json.pd_num = pie[i].pd_num;
                                json.pd_colors = pie[i].pd_colors;
                                json.pd_elements = pie[i].pd_elements;
                                json.count = 1;
                                pd_array.push(json);
                            }else{
                                var boolean = true;
                                for (let j = 0; j < pd_array.length; j++) {
                                    if(pie[i].pd_num == pd_array[j].pd_num) {
                                        pd_array[j].count++;
                                        boolean = false;
                                    }
                                }
                                if(boolean){
                                    var json = {};
                                    json.pd_id = pie[i].pd_id;
                                    json.pd_num = pie[i].pd_num;
                                    json.pd_colors = pie[i].pd_colors;
                                    json.pd_elements = pie[i].pd_elements;
                                    json.count = 1;
                                    pd_array.push(json);
                                }
                            }
                        }
                    }
                    self.index.pie_total = new_array.length;
                    return new_array.slice(start, start + parseInt(self.index.pie_limit));
                }else{
                    return [];
                }
            }else{
                return [];
            }
        },
        newSignData:function(){
            let self = this;
            var sign = self.index.models_sign_list;
            if(sign){
                if(sign.length > 0){
                    var start = (parseInt(self.index.sign_page) - 1) * parseInt(self.index.sign_limit);
                    var pd_array = [];
                    var now_date = '';
                    var new_array = [];
                    for (let i = 0; i < sign.length; i++) {
                        if(i == 0 && i == sign.length -1){//第一次也是最後一次的設定
                            var json = {};
                            json.mr_date = sign[i].mr_date;
                            json.pd_id = sign[i].pd_id;
                            json.pd_num = sign[i].pd_num;
                            json.pd_colors = sign[i].pd_colors;
                            json.pd_elements = sign[i].pd_elements;
                            json.count = 1;
                            new_array.push(json);
                        }else if(i == 0){//第一次進來的設定
                            now_date = sign[i].mr_date;
                            var json = {};
                            json.pd_id = sign[i].pd_id;
                            json.pd_num = sign[i].pd_num;
                            json.pd_colors = sign[i].pd_colors;
                            json.pd_elements = sign[i].pd_elements;
                            json.count = 1;
                            pd_array.push(json);
                        }else if(i == sign.length -1){//最後一次進來的設定
                            if(now_date != sign[i].mr_date){
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                                var json = {};
                                json.mr_date = sign[i].mr_date;
                                json.pd_id = sign[i].pd_id;
                                json.pd_num = sign[i].pd_num;
                                json.pd_colors = sign[i].pd_colors;
                                json.pd_elements = sign[i].pd_elements;
                                json.count = 1;
                                new_array.push(json);
                            }else{
                                var boolean = true;
                                for (let j = 0; j < pd_array.length; j++) {
                                    if(sign[i].pd_id == pd_array[j].pd_id) {
                                        pd_array[j].count++;
                                        boolean = false;
                                    }
                                }
                                if(boolean){
                                    var json = {};
                                    json.pd_id = sign[i].pd_id;
                                    json.pd_num = sign[i].pd_num;
                                    json.pd_colors = sign[i].pd_colors;
                                    json.pd_elements = sign[i].pd_elements;
                                    json.count = 1;
                                    pd_array.push(json);
                                }
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                            }
                        }else{
                            if(now_date != sign[i].mr_date){
                                for (let j = 0; j < pd_array.length; j++) {
                                    var json = {};
                                    json.mr_date = now_date;
                                    json.pd_id = pd_array[j].pd_id;
                                    json.pd_num = pd_array[j].pd_num;
                                    json.pd_colors = pd_array[j].pd_colors;
                                    json.pd_elements = pd_array[j].pd_elements;
                                    json.count = pd_array[j].count;
                                    new_array.push(json);
                                }
                                pd_array = [];
                                now_date = sign[i].mr_date;
                                var json = {};
                                json.pd_id = sign[i].pd_id;
                                json.pd_num = sign[i].pd_num;
                                json.pd_colors = sign[i].pd_colors;
                                json.pd_elements = sign[i].pd_elements;
                                json.count = 1;
                                pd_array.push(json);
                            }else{
                                var boolean = true;
                                for (let j = 0; j < pd_array.length; j++) {
                                    if(sign[i].pd_num == pd_array[j].pd_num) {
                                        pd_array[j].count++;
                                        boolean = false;
                                    }
                                }
                                if(boolean){
                                    var json = {};
                                    json.pd_id = sign[i].pd_id;
                                    json.pd_num = sign[i].pd_num;
                                    json.pd_colors = sign[i].pd_colors;
                                    json.pd_elements = sign[i].pd_elements;
                                    json.count = 1;
                                    pd_array.push(json);
                                }
                            }
                        }
                    }
                    self.index.sign_total = new_array.length;
                    return new_array.slice(start, start + parseInt(self.index.sign_limit));
                }else{
                    return [];
                }
            }else{
                return [];
            }
        },
    },
    methods: {
        // 取得所有初始資料
        init: function () {
            let self = this;
            axios.get(this.$server_api+'/index-all-data')
                .then(function (response) {
                    //首頁相關
                    // self.index.projectdata = response.data.index.projectdata;
                    // 最上方統計總數
                    self.index.project_count = response.data.index.project_count;
                    self.index.project_show_count = response.data.index.project_show_count;
                    self.index.project_hide_count = response.data.index.project_hide_count;
                    self.index.project_off_count = response.data.index.project_off_count;
                    // 圖表區
                    self.index.element_count = response.data.index.element_count;
                    self.index.element_sub_count = response.data.index.element_sub_count;
                    self.index.sign_count = response.data.index.sign_count;
                    self.index.style_count = response.data.index.style_count;
                    self.index.type_count = response.data.index.type_count;
                    self.index.color_count = response.data.index.color_count;
                    // 五行分佈 - 選中版型
                    self.index.pie_project_date = response.data.index.pie_project_date;
                    self.index.projects_pie = response.data.index.projects_pie;
                    self.index.models_pie_list = response.data.index.models_pie_list;
                    self.pieData();
                    // 星座分佈 - 選中版型
                    self.index.pie_sign_date = response.data.index.pie_sign_date;
                    self.index.sign_pie = response.data.index.sign_pie;
                    self.index.models_sign_list = response.data.index.models_sign_list;
                    self.signData();
                    // 最熱門模板使用量
                    self.index.hot_models_bar = response.data.index.hot_models_bar;
                    self.index.hot_models_date = response.data.index.hot_models_date;
                    self.changeHotBarModels();
                    // 兩年內模板使用量
                    self.index.twoyear_models_bar = response.data.index.twoyear_models_bar;
                    self.index.twoyear_models_date = response.data.index.twoyear_models_date;
                    self.changeTwoYearBarModels();
                    // 當月選中次數
                    self.index.models_line = response.data.index.models_line;
                    self.index.models_line_list = response.data.index.models_line_list;
                    self.lineData();
                    self.line_date = response.data.index.line_date;
                    // 選中模版成長線圖
                    self.index.grow_line = response.data.index.grow_line;
                    self.growLineData();
                    var str = self.line_date;
                    var array = str.split('-');
                    self.line_year = array[0];
                    self.line_month = array[1];
                    if(self.lineValue(1)){
                        self.line_next = true;
                    }else{
                        self.line_next = false;
                    }
                    self.index.sign_fire = response.data.index.sign_fire;
                    self.index.sign_water = response.data.index.sign_water;
                    self.index.sign_earth = response.data.index.sign_earth;
                    self.index.sign_wind = response.data.index.sign_wind;
                })
                .catch(function (response) {
                    self.notification('系統出錯：init()','failure');
                });
        },
        //////////////////////// 共用功能 //////////////////////
        ///
        // 複製sessionStorage的資料
        pullLocalDataForList:function(){
            let self = this;
            var localData = JSON.parse(sessionStorage.getItem("localData"));
            if(localData.user.result){
                self.notification(localData.user.text,'success');
                localData.user.result = false;
            }
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
        // 首頁圖表列表頁用
        indexCount:function(type){
            let self = this;
            if(type == 'line'){
                if(self.index.models_line_list){
                    return Math.ceil(self.index.line_total / self.index.line_limit)
                }else{
                    return 0;
                }
            }else if(type == 'pie'){
                if(self.index.models_pie_list){
                    return Math.ceil(self.index.pie_total / self.index.pie_limit)
                }else{
                    return 0;
                }
            }else if(type == 'sign'){
                if(self.index.models_sign_list){
                    return Math.ceil(self.index.sign_total / self.index.sign_limit)
                }else{
                    return 0;
                }
            }
        },
        // 預防圖表資料爆表，新增左右捲動的功能
        bar1scrollInit() {
            // 获取要绑定事件的元素
            const scrollDiv = document.getElementById("bar1");
            // document.addEventListener('DOMMouseScroll', handler, false)
            // 添加滚轮滚动监听事件，一般是用下面的方法，上面的是火狐的写法
            scrollDiv.addEventListener('mousewheel', handler, false)
            // 滚动事件的出来函数
            function handler(event) {
                event.preventDefault();
                // 获取滚动方向
                const detail = event.wheelDelta || event.detail;
                // 定义滚动方向，其实也可以在赋值的时候写
                const moveForwardStep = 1;
                const moveBackStep = -1;
                // 定义滚动距离
                let step = 0;
                // 判断滚动方向,这里的100可以改，代表滚动幅度，也就是说滚动幅度是自定义的
                if (detail < 0) {
                step = moveForwardStep * 100;
                } else {
                step = moveBackStep * 100;
                }
                // 对需要滚动的元素进行滚动操作
                scrollDiv.scrollLeft += step;
            }
        },
        // 預防圖表資料爆表，新增左右捲動的功能
        bar2scrollInit() {
            // 获取要绑定事件的元素
            const scrollDiv = document.getElementById("bar2");
            // document.addEventListener('DOMMouseScroll', handler, false)
            // 添加滚轮滚动监听事件，一般是用下面的方法，上面的是火狐的写法
            scrollDiv.addEventListener('mousewheel', handler, false)
            // 滚动事件的出来函数
            function handler(event) {
                event.preventDefault();
                // 获取滚动方向
                const detail = event.wheelDelta || event.detail;
                // 定义滚动方向，其实也可以在赋值的时候写
                const moveForwardStep = 1;
                const moveBackStep = -1;
                // 定义滚动距离
                let step = 0;
                // 判断滚动方向,这里的100可以改，代表滚动幅度，也就是说滚动幅度是自定义的
                if (detail < 0) {
                step = moveForwardStep * 100;
                } else {
                step = moveBackStep * 100;
                }
                // 对需要滚动的元素进行滚动操作
                scrollDiv.scrollLeft += step;
            }
        },
        // 開闔左側選單
        dropGroup:function(e){
            let self = this;
            $(e.target).parent().find('.drop-group').slideToggle('drop-open');
            $(e.target).toggleClass('drop-title-down');
        },
        //熱門模板使用量資料
        hotBarData:function(){
            let self = this;
            var label_array = [];
            var data_array = [];
            var total = 0;
            var old_data = self.index.hot_models_bar;
            old_data.sort(function(a,b){
                return b.data.length - a.data.length;
            })
            for (let i = 0; i < old_data.length; i++) {
                label_array.push(old_data[i].pd_num);
                data_array.push(old_data[i].data.length);
                total = total + old_data[i].data.length;
            }
            self.index.hotbartotal = total;
            self.index.hotbarcount = data_array.length;
            self.index.hotbardata = {
                labels: label_array,
                datasets: [{
                    label:'選中次數',
                    data: data_array,
                    backgroundColor:'#7766B2',
                }]
            }
        },
        //兩年內模板使用量資料
        twoyearBarData:function(){
            let self = this;
            var label_array = [];
            var data_array = [];
            var total = 0;
            var old_data = self.index.twoyear_models_bar;
            // old_data.sort(function(a,b){
            //     return b.data.length - a.data.length;
            // })
            for (let i = 0; i < old_data.length; i++) {
                label_array.push(old_data[i].pd_num);
                data_array.push(old_data[i].data.length);
                total = total + old_data[i].data.length;
            }
            self.index.twoyearbartotal = total;
            self.index.twoyearbarcount = data_array.length;
            self.index.twoyearbardata = {
                labels: label_array,
                datasets: [{
                    label:'選中次數',
                    data: data_array,
                    backgroundColor:'#7766B2',
                }]
            }
        },
        //星座總數
        signData:function(){
            let self = this;
            var label_array = ['火象', '土象', '風象', '水象'];
            self.index.signdata = {
                labels: label_array,
                datasets: [{
                    data: self.index.sign_pie,
                    backgroundColor: [
                        //資料顏色
                        "#bf190a",
                        "#733f0b",
                        "#3cb300",
                        "#0080ff"
                    ],
                }],
            }
        },
        //五行總數
        pieData:function(){
            let self = this;
            var label_array = ['金', '木', '水', '火', '土'];
            self.index.piedata = {
                labels: label_array,
                datasets: [{
                    data: self.index.projects_pie,
                    backgroundColor: [
                        //資料顏色
                        "#F3CE3F",
                        "#359836",
                        "#2684B8",
                        "#D22327",
                        "#846B46"
                    ],

                }],
            }
        },
        //選中成長線圖
        growLineData:function(){
            let self = this;
            var old_data = self.index.grow_line;
            var label_array = [];
            var data_array = [];
            for (let i = 0; i < old_data.length; i++) {
                label_array.push(old_data[i].year);
                data_array.push(old_data[i].count);
            }
            self.index.growdata = {
                labels: label_array,
                datasets: [{
                    label:'次數',
                    data: data_array,
                    backgroundColor:'#7766B2',
                    borderColor:'#7766B2',
                    fill:false,
                    pointBorderWidth:5,
                    pointHoverBorderWidth:10,
                    lineTension: 0 //線條張力 0就是直線
                }],
            }
        },
        //當月選中次數
        lineData:function(){
            let self = this;
            var label_array = [];
            var data_array = [];
            var num_array = [];
            var total = 0;
            var old_data = self.index.models_line;
            for (let i = 0; i < old_data.length; i++) {
                label_array.push(old_data[i].day + '日');
                data_array.push(old_data[i].data.length);
                var a_array = [];
                for(let j = 0 ; j < old_data[i].data.length ; j++){
                    a_array.push(old_data[i].data[j].pd_num);
                }
                total = total + old_data[i].data.length;
                num_array.push(a_array)
            }
            self.index.linetotal = total;
            self.index.linedata = {
                labels: label_array,
                datasets: [{
                    label:'當日數量',
                    data: data_array,
                    backgroundColor:'#7766B2',
                    borderColor:'#7766B2',
                    fill:false,
                    pointBorderWidth:5,
                    pointHoverBorderWidth:10,
                    lineTension: 0 //線條張力 0就是直線

                }],
            }
        },
        // 線性圖表下拉選單的回傳值
        lineValue:function(num){
            let self = this;
            var nowdate = new Date();
            var month = Number(self.line_month);
            var year = Number(self.line_year);
            if(num == -1){
                if(month -1 > 0){
                    return year + '-' + (month-1);
                }else{
                    return (year-1) + '-12';
                }
            }else if(num == 1){
                if(self.line_year == nowdate.getFullYear() && self.line_month == (nowdate.getMonth() +1) ){
                    return false;
                }else{
                    if(month +1 <= 12){
                        return year + '-' + (month+1);
                    }else{
                        return (year+1) + '-1';
                    }
                }
            }
        },
        // 檢查該網版屬於哪個星象
        checkBySigns:function(){
            let self = this;
            var colors = JSON.parse(self.project.project.pd_colors);
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
            return string;
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
        // 檢查pd_color回傳中文字 - 星象判斷用
        checkBySignsForList:function(color){
            let self = this;
            var fire = JSON.parse(self.index.sign_fire.sp_parametervalue);
            var water = JSON.parse(self.index.sign_water.sp_parametervalue);
            var earth = JSON.parse(self.index.sign_earth.sp_parametervalue);
            var wind = JSON.parse(self.index.sign_wind.sp_parametervalue);
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
        // 切換排序依據
        changeOrderTarget:function(target,item){
            let self = this;
            if(target == 'line'){
                var old_item = self.line_orderBy[0];
                var old_sort = self.line_orderBy[1];
            }else if(target == 'pie'){
                var old_item = self.pie_orderBy[0];
                var old_sort = self.pie_orderBy[1];
            }else if(target == 'sign'){
                var old_item = self.sign_orderBy[0];
                var old_sort = self.sign_orderBy[1];
            }

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

            if(target == 'line'){
                self.line_orderBy = new_orderBy;
            }else if(target == 'pie'){
                self.pie_orderBy = new_orderBy;
            }else if(target == 'sign'){
                self.sign_orderBy = new_orderBy;
            }
        },
        // 目前排序依據為何
        whichActive:function(target,item,type){
            let self = this;
            if(target == 'line'){
                var nowItem = self.line_orderBy[0];
                var nowType = self.line_orderBy[1];
            }else if(target == 'pie'){
                var nowItem = self.pie_orderBy[0];
                var nowType = self.pie_orderBy[1];
            }else if(target == 'sign'){
                var nowItem = self.sign_orderBy[0];
                var nowType = self.sign_orderBy[1];
            }

            if(nowItem == item && nowType == type){
                return true;
            }else{
                return false;
            }
        },
        // 處理首頁的最新模板使用量的資料
        changeTwoYearBarModels:function(){
            let self = this;
            var new_array = [],old_array = self.index.twoyear_models_bar;
            for (let i = 0; i < old_array.length; i++) {
                if(new_array.length == 0){
                    var json = {};
                    json.pd_num = old_array[i].pd_num;
                    json.data = [];
                    json.data.push(old_array[i]);
                    new_array.push(json);
                }else{
                    var k = true;
                    for(var j = 0; j < new_array.length;j++){
                        if(new_array[j].pd_num == old_array[i].pd_num){
                            new_array[j].data.push(old_array[i]);
                            k = false;
                            break;
                        }
                    }
                    if(k){
                        var json = {};
                        json.pd_num = old_array[i].pd_num;
                        json.data = [];
                        json.data.push(old_array[i]);
                        new_array.push(json);
                    }
                }

            }
            self.index.twoyear_models_bar = new_array;
            self.twoyearBarData();
        },
        // 處理首頁的熱門模板使用量的資料
        changeHotBarModels:function(){
            let self = this;
            var hot_array = [],old_array = self.index.hot_models_bar;
            for (let i = 0; i < old_array.length; i++) {
                if(hot_array.length == 0){
                    var json = {};
                    json.pd_num = old_array[i].pd_num;
                    json.data = [];
                    json.data.push(old_array[i]);
                    hot_array.push(json);
                }else{
                    var k = true;
                    for(var j = 0; j < hot_array.length;j++){
                        if(hot_array[j].pd_num == old_array[i].pd_num){
                            hot_array[j].data.push(old_array[i]);
                            k = false;
                            break;
                        }
                    }
                    if(k){
                        var json = {};
                        json.pd_num = old_array[i].pd_num;
                        json.data = [];
                        json.data.push(old_array[i]);
                        hot_array.push(json);
                    }
                }

            }
            self.index.hot_models_bar = hot_array;
            self.hotBarData();
        },
        ///
        //////////////////////// 共用功能 end ////////////////////

        //////////////////////// 取值專區 ////////////////////////
        ///
        //取得星座資料
        getSignsForIndex:function(){
            let self = this;
            this.$nextTick(function(){
                axios.get(this.$server_api+'/signsforindex?orderBy='+self.sign_orderBy[0]+'&sort='+self.sign_orderBy[1])
                    .then(function (response) {
                        self.index.sign_page = 1;
                        self.index.sign_pie = response.data.sign_pie;
                        self.index.models_sign_list = response.data.models_sign_list;
                        self.signData();
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            })
        },
        //透過按鈕來決定時間區間
        getElementsByBtn:function(type){
            let self = this;
            if(type == 'all'){
                self.index.pie_project_date[0] = '2010-01-01';
                self.index.pie_project_date[1] = new Date();
            }else if(type == 'now'){
                var date = new Date();
                self.index.pie_project_date[0] = date.getFullYear() + '-01-01';
                self.index.pie_project_date[1] = new Date();
            }
            self.getElements();
        },
        //取得五行資料
        getElements:function(){
            let self = this;
            var start = '';
            var end = '';
            this.$nextTick(function(){
                start = self.index.pie_project_date[0];
                end = self.index.pie_project_date[1];
                //日期
                if ((Date.parse(start)).valueOf() > (Date.parse(end)).valueOf()){
                    self.notification('開始時間不能晚於結束時間','warning');
                    return false;
                }
                axios.get(this.$server_api+'/elements?start='+(Date.parse(start)).valueOf()+'&end='+(Date.parse(end)).valueOf()+'&orderBy='+self.pie_orderBy[0]+'&sort='+self.pie_orderBy[1])
                    .then(function (response) {
                        self.index.pie_page = 1;
                        self.index.projects_pie = response.data.projects_pie;
                        self.index.models_pie_list = response.data.models_pie_list;
                        self.pieData();
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            })
        },
        //透過按鈕來決定時間區間
        getHotsByBtn:function(type){
            let self = this;
            if(type == 'all'){
                self.index.hot_models_date.startDate = '2010-01-01';
                self.index.hot_models_date.endDate = new Date();
            }else if(type == 'now'){
                var date = new Date();
                self.index.hot_models_date.startDate = date.getFullYear() + '-01-01';
                self.index.hot_models_date.endDate = new Date();
            }
            self.getHots();
        },
        getHots:function(){
            let self = this;
            var start = '';
            var end = '';
            var show = '';
            this.$nextTick(function(){
                start = self.index.hot_models_date.startDate;
                end = self.index.hot_models_date.endDate;
                if(self.index.hotbar_checked){
                    show = 1;
                }else{
                    show = 0;
                }
                //日期
                if ((Date.parse(start)).valueOf() > (Date.parse(end)).valueOf()){
                    self.notification('開始時間不能晚於結束時間','warning');
                    return false;
                }
                axios.get(this.$server_api+'/hots?start='+(Date.parse(start)).valueOf()+'&end='+(Date.parse(end)).valueOf()+'&show='+show)
                    .then(function (response) {
                        self.index.hot_models_bar = response.data.hot_models_bar;
                        self.changeHotBarModels();
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            })
        },
        //取得當月數據
        getLineModels:function(date,orderBy){
            let self = this;

            if(date&&orderBy){
                axios.get(this.$server_api+'/linemodels?date='+date+'&orderBy='+orderBy[0]+'&sort='+orderBy[1])
                    .then(function (response) {
                        self.index.line_page = 1;
                        self.index.models_line = response.data.index.models_line;
                        self.index.models_line_list = response.data.index.models_line_list;
                        self.line_date = response.data.index.line_date;
                        var str = self.line_date;
                        var array = str.split('-');
                        self.line_year = array[0];
                        self.line_month = array[1];
                        self.lineData();
                        if(self.lineValue(1)){
                            self.line_next = true;
                        }else{
                            self.line_next = false;
                        }
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }
        },
        ///
        //////////////////////// 取值專區 end ////////////////////////

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
        // 首頁的排序功能
        line_orderBy:function(){
            let self = this;
            self.getLineModels(self.line_date,self.line_orderBy);
        },
        // 首頁的排序功能
        pie_orderBy:function(){
            let self = this;
            self.getElements();
        },
        // 首頁的排序功能
        sign_orderBy:function(){
            let self = this;
            self.getSignsForIndex();
        },
	}
}
</script>
