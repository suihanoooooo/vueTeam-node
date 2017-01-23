import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
   showCreate:false,
   showShadow:false,
   showTask:false,
   showUpdate:false,
   displayUpdateChilds: function(){
   	   var _this=this;
   	   if(this.updateWho.route=='neibu'){
          return update(_this,'neibu');
   	   }
   	   else if(this.updateWho.route=='shanghu'){
          return update(_this,'shanghu');
   	   }
   	   else if(this.updateWho.route=='qudao'){
          return update(_this,'qudao');
   	   }
   	   else if (this.updateWho.route=='mine') {
           if(this.updateWho.className=='内部项目'){
           	  return  mineUpdate(_this,'neibu'); 
           }
           else if(this.updateWho.className=='商户接入'){
              return  mineUpdate(_this,'shanghu'); 
           }
           else if(this.updateWho.className=='渠道接入'){
              return  mineUpdate(_this,'qudao'); 
           }
   	   }
   	   return ''
   },
   updateWho:'',
   whichObj:'',
   /*createObj:{
      objName: '',
      objClass: '',
      objConnect: [],
      objJoin: []
   },这里不能用对象，对象传递的是地址(创建项目数据)*/
   /***创建的四个v-model******/
   objName: '',
   objClass: '内部项目',
   objConnect: [],
   objJoin: [],
   /****添加任务的v-model********/
   addOrigin: '',
   addUpdate: [],
   addSelect: '需关注',
   /****详情更新的v-model************/
   updateOrigin: '',
   updateUpdate: '',
   updateSelect: '',
   Objects: function(){
   	  var arr=[];
   	  this.neibu.Objects.forEach(function(dom,index){
          arr.push(dom);
   	  });
   	  this.shanghu.Objects.forEach(function(dom,index){
          arr.push(dom);
   	  });
   	  this.qudao.Objects.forEach(function(dom,index){
          arr.push(dom);
   	  });
      //像mine加入所有项目根据objTime创建的时间从小到大排序项目按时间渲染到mine 
	  for(var i=1;i<arr.length;i++){
		  arr.forEach(function(dom,index,arr){
		  if(index+1<arr.length){
		    if(arr[index]['objTime']>arr[index+1]['objTime']){
		        var a=arr[index];
		        arr[index]=arr[index+1];
		        arr[index+1]=a;
		   }
		  }
		});
	  }
      return arr
   },//mine页面的项目数据(所有的项目数据)
   mine:{
     showMenu: false//是否显示菜单
   },
   neibu:{
     showMenu: false,
     Objects: []
   },
   shanghu:{
     showMenu: false,
     Objects: []
   },
   qudao:{
     showMenu: false,
     Objects: []
   }  
}

const mutations = {
	DISPLAYMENU (state,who) {
		if(who!==''){
			state[who].showMenu=!state[who].showMenu;
		}  
	},
	DISPLAYCREATE (state) {
       state.showCreate=state.showCreate==true?false:true;
       state.showShadow=state.showCreate==true?true:false;
       state.objClass='内部项目';
       state.objName='';
       state.objConnect='';
       state.objJoin='';
	},
	DISPLAYTASK (state,obj) {
       state.showTask=state.showTask==true?false:true;
       state.showShadow=state.showTask==true?true:false;
       state.whichObj = obj;//确定添加子事件操作的是哪个obj
       state.addOrigin='';
       state.addUpdate=[];
       state.addSelect='需关注';
	},
	DISPLAYTASK2 (state) {
       state.showTask=state.showTask==true?false:true;
       state.showShadow=state.showTask==true?true:false;
       state.addOrigin='';
       state.addUpdate=[];
       state.addSelect='需关注';
	},
	DISPLAYUPDATE (state,obj) {
	   state.updateWho=obj;
       state.showUpdate=state.showUpdate==true?false:true;
       state.showShadow=state.showUpdate==true?true:false;
	},
	DISPLAYUPDATE2 (state) {
       state.showUpdate=state.showUpdate==true?false:true;
       state.showShadow=state.showUpdate==true?true:false;
	},
	/****迂回改变v-model双向绑定********/
	CHANGENAME (state,message) {
       state.objName = message;
	},
	CHANGECLASS (state,message) {
       state.objClass = message;
	},
	CHANGEADDORIGIN (state,message) {
       state.addOrigin = message;
	},
	CHANGEADDUPDATE (state,message) {
       state.addUpdate = message;
	},
	CHANGEADDSELECT (state,message) {
       state.addSelect = message;
	},
	/*只在前端改变项目位置，不走数据库*/
	CHANGEINDEX (state,can) {
       if(can.route!=='mine'){
          var ele=state[can.route].Objects.splice(can.index,1);
	       state[can.route].Objects.unshift(ele[0]);
	       }
	},
	/***添加子事件*******/
	ADDCHILD (state) {
       if(state.whichObj.route=='neibu'){
             Add('neibu');
       } 
       else if (state.whichObj.route=='shanghu') {
            Add('shanghu');
       }
       else if (state.whichObj.route=='qudao') {
            Add('qudao');
       }
       else if (state.whichObj.route=='mine') {
            if(state.whichObj.className=='内部项目'){
                mineAdd('neibu');
            }
            else if(state.whichObj.className=='商户接入') {
                mineAdd('shanghu');
            }
            else if(state.whichObj.className=='渠道接入') {
                mineAdd('qudao');
            }
       }
	},
	/*****更新子事件*************/
	UPDATECHILD (state,can) {
       if(state.updateWho.route!=='mine'){
           state[state.updateWho.route].Objects[state.updateWho.index].objChilds[state.updateWho.childIndex].update[0]=can.val;
           state[state.updateWho.route].Objects[state.updateWho.index].objChilds[state.updateWho.childIndex].origin=can.val0;
           state[state.updateWho.route].Objects[state.updateWho.index].objChilds[state.updateWho.childIndex].select=can.val2;
		}
		else{
           if(state.updateWho.className=='内部项目'){
                 state['neibu'].Objects.forEach(function(dom,index,arr){
                     if(state.updateWho.time==dom.objTime){
                        state['neibu'].Objects[index].objChilds[state.updateWho.childIndex].update[0]=can.val;
                        state['neibu'].Objects[index].objChilds[state.updateWho.childIndex].origin=can.val0;
                        state['neibu'].Objects[index].objChilds[state.updateWho.childIndex].select=can.val2;
                     }
                 });
        	}
        	else if(state.updateWho.className=='商户接入'){
                state['shanghu'].Objects.forEach(function(dom,index,arr){
                     if(state.updateWho.time==dom.objTime){
                        state['shanghu'].Objects[index].objChilds[state.updateWho.childIndex].update[0]=can.val;
                        state['shanghu'].Objects[index].objChilds[state.updateWho.childIndex].origin=can.val0;
                        state['shanghu'].Objects[index].objChilds[state.updateWho.childIndex].select=can.val2;
                     }
                 });
        	}
        	else if(state.updateWho.className=='渠道接入'){
                state['qudao'].Objects.forEach(function(dom,index,arr){
                     if(state.updateWho.time==dom.objTime){
                        state['qudao'].Objects[index].objChilds[state.updateWho.childIndex].update[0]=can.val;
                        state['qudao'].Objects[index].objChilds[state.updateWho.childIndex].origin=can.val0;
                        state['qudao'].Objects[index].objChilds[state.updateWho.childIndex].select=can.val2;
                     }
                 });
        	}
		}
	},
	/***创建项目****/
	CREATEOBJ (state) {
       var obj={
       	objName: state.objName,
       	objClass: state.objClass,
       	objConnect: state.objConnect,
       	objJoin: state.objJoin,
       	objTime:new Date().getTime(),
       	objChilds: []
       };
	   //state.mine.Objects.push(obj);//因为对象地址的原因，不能直接在v-model中用对象push到数组，用值组成对象再添加到数组
       if(state.objClass=='内部项目'){
           state.neibu.Objects.push(obj);
       }
       else if (state.objClass=='商户接入') {
       	   state.shanghu.Objects.push(obj);
       }
       else if (state.objClass=='渠道接入') {
       	   state.qudao.Objects.push(obj);
       }
       
	},
	DELOBJECT (state,can) {
      
       	   if(can.route=='neibu'){
              Del('neibu',can);
	       }
	       else if (can.route=='shanghu') {
	       	  Del('shanghu',can);
	       }
	       else if (can.route=='qudao') {
	       	  Del('qudao',can);
	       } 
	       else if (can.route=='mine') {
               if(can.className=='内部项目'){
                  mineDel('neibu',can);
               }
               else if (can.className=='商户接入') {
                  mineDel('shanghu',can);
               }
               else if (can.className=='渠道接入') {
                  mineDel('qudao',can);
               }
	       }  

	}
}

/****一些需要复用的函数********/
/**当用户点击mine页面中的删除项目时需要遍历确定删除的index**/
function mineDel(who,can){
   state[who].Objects.forEach(function(dom,index,arr){
        if(can.time==dom.objTime){
           state[who].Objects.splice(index,1);
        }
     });
}
/******正常的del项目*******/
function Del(who,can){
   state[who].Objects.splice(can.index,1);
}
/**当用户点击mine页面中的添加子事件时需要遍历确定index**/
function mineAdd(who){
	state[who].Objects.forEach(function(dom,index,arr){
        if(state.whichObj.time==dom.objTime){
           state[who].Objects[index].objChilds.push({origin:state.addOrigin,update:[state.addUpdate],select:state.addSelect});
        }
     });
}
/******正常添加子事件******/
function Add(who){
	var update=state.addUpdate==''?[]:[state.addUpdate];
    state[who].Objects[state.whichObj.index].objChilds.push({origin:state.addOrigin,update:update,select:state.addSelect});
}
/*****用户点击mine页面显示添加子事件的对话框时候上面显示默认的子事件******/
function mineUpdate(zhe,who){
    
	
    //
    var num;
    zhe[who].Objects.forEach(function(dom,index,arr){
    if(zhe.updateWho.time==dom.objTime){
    	state.updateOrigin=zhe[who].Objects[index].objChilds[zhe.updateWho.childIndex].origin;
    	state.updateSelect=zhe[who].Objects[index].objChilds[zhe.updateWho.childIndex].select;
        num=index;
    }
    });
    return zhe[who].Objects[num].objChilds[zhe.updateWho.childIndex].update;
}
/********正常update************/
function update(zhe,who){
	state.updateOrigin=zhe[who].Objects[zhe.updateWho.index].objChilds[zhe.updateWho.childIndex].origin;
	state.updateSelect=zhe[who].Objects[zhe.updateWho.index].objChilds[zhe.updateWho.childIndex].select;
	return zhe[who].Objects[zhe.updateWho.index].objChilds[zhe.updateWho.childIndex].update
}

export default new Vuex.Store({
	state,
	mutations
})