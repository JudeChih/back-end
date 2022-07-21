<template>
	<div id="header" class="clearfix">
		<div class="header-wrap">
			<!-- logo -->
			<a :href="check('index','list') ? 'javascript:void(0)':'/'" class="logo"></a>
			<a :href="check('index','list') ? 'javascript:void(0)':'/'" :class="check('index','list') ? 'active':false"
				class="index">首頁</a>
			<!-- nav -->
			<div class="mainnav-wrap">
				<div class="mainnav">
					<ul class="clearfix">
						<li>
							<a @click="dropGroup($event)" href="javascript:void(0)" class="fa drop-title drop-title-down">版型管理</a>
							<div class="drop-group drop-open">
								<a :href="check('project','create') ? 'javascript:void(0)':'/project/create'" :class="check('project','create') ? 'active':false">新增版型</a>
								<a :href="check('project','list') ? 'javascript:void(0)':'/project/list'" :class="check('project','list') ? 'active':false">網版列表</a>
							</div>
						</li>
						<li v-if="userdata.ud_admin">
							<a @click="dropGroup($event)" href="javascript:void(0)" class="fa drop-title drop-title-down">熱門管理</a>
							<div class="drop-group drop-open">
								<a :href="check('model','create') ? 'javascript:void(0)':'/model/create'" :class="check('model','create') ? 'active':false">新增選中版型</a>
								<a :href="check('model','list') ? 'javascript:void(0)':'/model/list'" :class="check('model','list') ? 'active':false">熱門顯示管理</a>
							</div>
						</li>
						<li>
                            <a @click="dropGroup($event)" href="javascript:void(0)" class="fa drop-title drop-title-down">合作夥伴管理</a>
                            <div class="drop-group drop-open">
                                <a :href="check('logo','create') ? 'javascript:void(0)':'/logo/create'" :class="check('logo','create') ? 'active':false">新增合作夥伴</a>
                                <a :href="check('logo','list') ? 'javascript:void(0)':'/logo/list'" :class="check('logo','list') ? 'active':false">合作夥伴列表</a>
                            </div>
                        </li>
						<li v-if="userdata.ud_admin">
							<a @click="dropGroup($event)" href="javascript:void(0)"
								class="fa drop-title drop-title-down">後台管理</a>
							<div class="drop-group drop-open">
								<a :href="check('transaction','record') ? 'javascript:void(0)':'/transaction/list'" :class="check('transaction','record') || check('transaction','lastlogin') ? 'active':false">紀錄列表</a>
								<a :href="check('user','list') ? 'javascript:void(0)':'/user/list'"
									:class="check('user','list') ? 'active':false">使用者列表</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    props: ["data","page","view"],
    // 模板渲染成html或是模板編譯進路由之後
    mounted: function () {
        // 當按下F5或是ctrl+F5的時候清除session
        $(document).keydown(function (e) {
            if ((e.which || e.keyCode) == 116) {
                sessionStorage.removeItem('localData');
            }
        });
    },
    computed: {
        userdata: function() {
            return this.data;
        },
        nowpage: function() {
            return this.page;
        },
        nowview: function(){
            return this.view;
        }
    },
    methods: {
        // 開闔左側選單
        dropGroup:function(e){
            $(e.target).parent().find('.drop-group').slideToggle('drop-open');
            $(e.target).toggleClass('drop-title-down');
        },
        check:function(page,view){
            if(this.nowpage == page && this.nowview == view){
                return true;
            }else{
                return false;
            }
        }
    },
    watch: {
	}
}
</script>
