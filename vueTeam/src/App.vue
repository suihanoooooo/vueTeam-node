<template>
  <div id='app'>
    <div class='container-fluid'>
      <!--绝对定位的alert shadow-->
      <shadows v-show='showShadow'></shadows>
      <createObj v-show='showCreate'></createObj>
      <addTask v-show='showTask'></addTask>
      <updateChild v-show='showUpdate' ></updateChild>
      <!---->
      <div id='left-list' class='col-sm-2'>
           <div class='col-xs-12 list-title'>Zteam</div>
           <objList 
           v-for='(nav,index) in navs'
           v-bind:index='index'
           v-bind:nav='nav'
           v-on:showSub='showSub(index)'
           v-on:toggleRoute='toggleRoute'
           >
           </objList>   
      </div>
      <div id='right-ct' class='col-sm-10'>
           <div class='col-xs-12 ct-title'>
               <Menus></Menus>
           </div>
           <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menus from './components/menu'
import objList from './components/objList'
import createObj from './components/createObj'
import shadows from './components/shadow'
import addTask from './components/addTask'
import updateChild from './components/updateChild'


export default {
  components: {
    Menus,
    objList,
    createObj,
    shadows,
    addTask,
    updateChild
  },
  computed : {
    showCreate () {
    	return this.$store.state.showCreate
    },
    showShadow () {
    	return this.$store.state.showShadow
    },
    showTask () {
    	return this.$store.state.showTask
    },
    showUpdate () {
    	return this.$store.state.showUpdate
    }
  },
  methods: {
    showSub (index) {
       this.navs[index].showSub=!this.navs[index].showSub;
    },
    toggleRoute (num2,num1) {
       this.navs.forEach(function(dom,index,arr){
       	   dom.active=false;
              dom.subs.forEach(function(dom2,index2,arr2){
              dom2.active=false;
           }) 
       });
       this.navs[num1].active=true;
       this.navs[num1].subs[num2].active=true;
    }
  },
  data () {
  	return {
  		navs:[
            {
            	title: '项目',
            	active: true,
            	showSub:true,
            	sanjiao: true,
                subs: [
                   {title: '内部项目',active: false,route :'/neibu'},
                   {title: '商户接入',active: false,route :'/shanghu'},
                   {title: '渠道接入',active: false,route :'/qudao'},
                   {title: '我的',active: true,route: '/mine'}
                ]
            },
            {
            	title: '周报',
            	active: false,
            	showSub:false,
            	sanjiao: true,
            	subs: [
                   {title: '周报',active: false,route: '/week'},
                   {title: '月报',active: false,route: '/month'}
                ]
            },
            {
            	title: '日历',
            	active: false,
            	showSub:false,
            	sanjiao: true,
            	subs: [
                   {title: '日历',active: false,route: '/rili'}
                ]
            },
            {
            	title: '通知',
            	active: false,
            	sanjiao: true,
            	showSub:false,
            	subs: [
                   {title: '通知',active: false,route: '/tongzhi'}
                ]
            }
  		]
  	}
  }
}
</script>

<style>

.container-fluid{
  padding:0px;
}
#left-list,#right-ct,.col-xs-12,.col-xs-11,.col-xs-10,.col-xs-9,.col-xs-8,.col-xs-7,.col-xs-6,.col-xs-5,.col-xs-4,.col-xs-3,.col-xs-2,.col-xs-1{
  padding:0px;
  margin-bottom:0;
}
.list-title{
    height: 50px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    line-height: 50px;
    background: #72c9f0;
}
.ct-title{
	background: #6dc3ea;
    height: 55px;
}
a{
	text-decoration:none;
}
body{
	font-family:'Microsoft YaHei';
}
</style>
