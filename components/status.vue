<template>
    <div class="status">
        <a :href="check('user','personal') ? 'javascript:void(0)':'/user/personal'" class="btn status-edit">
            {{userdata.ud_name}}
        </a>
        <a href="/login" title="登出" class="btn status-logout">登出</a>
    </div>
</template>
<script>
export default {
    props: ["data","page","view"],
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
