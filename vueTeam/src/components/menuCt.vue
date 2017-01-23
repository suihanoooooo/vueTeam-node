<template>
	<div class='menu-ct' v-if='menushow'>
		<div class='menu-ct-title'>
			<span>项目目录</span><img @click='displayCreate'  src='../assets/plus.png'/>
		</div>
		<ul class='menu-ct-ct'>
			<li v-for='(list, index) in menuct' @click='changeIndex(index)'>{{ list.objName }}</li>
		</ul>
	</div>
</template>

<script>
  export default {
     props:['menuct','menushow'] ,
     methods : {
     	displayCreate () {
           this.$store.commit('DISPLAYCREATE'); 
     	},
     	changeIndex (index) {
     	   var route=this.$route.path.slice(1);
           this.$store.commit('CHANGEINDEX',{'index': index,'route': route});

     	}
     }
  }	
</script>

<style>
  .menu-ct{
  	width: 290px;
    height: 550px;
    background: #f0f4f7;
    padding: 20px 10px 0px 10px;
    position: absolute;
    right: 0;
    top: 0;
  }	
  .menu-ct-title{
  	height: 35px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size:16px;
  }
  .menu-ct-title img{
  	float:right;
  	cursor:pointer;
  }
  .menu-ct-ct{
    line-height: 35px;
    color: #828890;
    padding:0;
  }
  .menu-ct-ct li{
  	border-bottom: 1px solid #ddd;
  	cursor:pointer;
  }
</style>