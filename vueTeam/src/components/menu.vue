<template>
	<div class='menu' @click='showMenu'>
       <img src='../assets/line.png' />
	   菜单栏
	</div>
</template>

<script>
	export default {
       methods : {
       	  showMenu () {
             this.$store.commit('DISPLAYMENU',this.$route.path.slice(1));
             
       	  }
       }
	}
</script>

<style scoped>
	.menu{
	    height: 55px;
	    line-height: 55px;
	    color: #fff;
	    padding-left: 20px;
	    padding-right: 20px;
	    border-left: 1px solid #3798c4;
	    border-right: 1px solid #3798c4;
	    float: right;
	    cursor: pointer;
	}
</style>