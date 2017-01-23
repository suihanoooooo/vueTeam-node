<template>
	<div >
		<div class='object ' >
		   <ul class='obj-title '>
		   	  <li @click='showTask'><img src='../assets/jia2.png'/></li>
		   	  <li>{{ obj.objName }}</li>
		   	  <li>设置</li>
		   </ul>
		   <div class='obj-body'>
		   	  <div class='obj-child' >
		   	  	 <div class='childs' 
		   	  	      v-for='(child,index2) in obj.objChilds' 
                      :class='{focus:child.select=="需关注"?true:false,doing:child.select=="正在进行"?true:false,complete:child.select=="已完成"?true:false}'
                      @click='updateChild(index2)'
		   	  	      >
		   	  	 	{{ child.origin }}
		   	  	 	<!--<a>小黄<span class='num-message' v-if='false'>1</span></a>-->
		   	  	 </div>
		   	  </div>
		   	  <div class='obj-trash'>
		   	  	 <img src='../assets/trash.png' @click='delObj'/>
		   	  </div>
		   </div>
		</div>
	</div>
</template>

<script>
  export default {
    props: ['obj','index'],
    data () {
       return {
       	  who :{'index':this.index,'route':this.$route.path.slice(1),'className':this.obj.objClass,'time':this.obj.objTime}
       }
    },
    methods : {
    	delObj () {
           var _this=this;
           var who=this.who;
           this.$http.post('/del',who).then(function(data){
                 _this.$store.commit('DELOBJECT',this.who);
           });
    	},
    	showTask () {
    		this.$store.commit('DISPLAYTASK',this.who);
    	},
    	updateChild (childIndex) {
            this.$store.commit('DISPLAYUPDATE',{'index':this.index,'route':this.$route.path.slice(1),'className':this.obj.objClass,'time':this.obj.objTime,'childIndex':childIndex});
    	}
    }
  }
</script>

<style>
	.object{
		border: 1px solid #e9e9e9;
		margin:30px 50px 0 0;
		width:305px;
		float:left;
	}
    .obj-title{
    	height: 40px;
	    text-align: center;
	    line-height: 40px;
	    color: #fff;
	    background: #bdc2ca;
	    width:100%;
	    padding:0;
	    margin:0;
    }
    .obj-body{
    	height:420px;
    	background:#f0f3f7;
    }
    .obj-child{
    	height:380px;
    	overflow:auto;
    }
    .obj-trash{
    	height:40px;
    	line-height:40px;
    	text-align:center;
    }
    .obj-trash img{
    	cursor:pointer;
    }
    .obj-title img{
    	cursor:pointer;
    }
    .obj-title li:nth-child(1){
	    width: 45px;
	    float: left;
	    border-right: 1px solid #b2b7bf;
	    cursor: pointer;
	    text-align: center;
    }
    .obj-title li:nth-child(2){
    	font-size:16px;
    	width:200px;
    	float: left;
    }
    .obj-title li:nth-child(3){
    	width: 50px;
	    float: right;
	    border-left: 1px solid #b2b7bf;
	    cursor: pointer;
	    font-size: 12px;
    }
    .obj-child .childs{
	    width: 257px;
	    height:40px;
	    line-height: 40px;
	    border-radius: 5px;
	    border: 1px solid #ddd;
	    margin: 0 auto;
	    margin-top: 10px;
	    background: #fff;
	    padding-left: 5px;
    }
    .childs{
    	cursor:pointer;
    }
    .childs a {
    	font-size: 12px;
	    float: right;
	    margin-right: 5px;
	    color: #bdc2ca;
	    position: relative;
    }
    .childs a span {
	    position: absolute;
	    display: inline-block;
	    height: 16px;
	    line-height: 16px;
	    text-align: center;
	    width: 16px;
	    border-radius: 8px;
	    background: #fa5131;
	    color: #fff;
	    top: -7px;
	}
    /*****动态添加的active class*********/
    .focus{
    	border-left: 3px solid #ff9963 !important;
    }
    .doing{
    	border-left:3px solid #6ccab4 !important;
    }
    .complete{
    	border-left:3px solid #bdc2ca !important;
    }
</style>