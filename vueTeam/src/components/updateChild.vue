<template>
	<div class='addTask'>
	    <!--<div style='font-size:120px;'>福</div>-->
		<div class='addTitle'>
			详情更新<span @click='hideUpdate'>X</span>
		</div>
		<div class='addDown'>
			<div class='origin-div'>
			   <div>原内容</div>
			   <textarea :value='updateOrigin' @input='jilu0' class='area1'></textarea>
		    </div>
		    <div class='update-div' v-for='(child,index) in childs'>
			   <div>更新</div>
			   <textarea :value='child' @input='jilu'></textarea>
		    </div>
		    <div class='select-div'>
			   <div>选择状态</div>
			   <select :value='updateSelect' @click='jilu2'>
			   	   <option style='color:#ff9963;'>需关注</option>
			   	   <option style='color:#6caab4;'>正在进行</option>
			   	   <option style='color:#bdc2ca;'>已完成</option>
			   </select>
		    </div>
		    <button class='btn btn-info' @click='updateChild'>确定</button>
		</div>
	</div>
</template>

<script>
   export default {
   	  data () {
          return {
          	val0:'',
          	val:'',
          	val2:''
          }
   	  },
   	  methods : {
         hideUpdate () {
         	this.$store.commit('DISPLAYUPDATE2');
         },
         updateChild () {
         	console.log(this.val0+'ss');
         	this.$store.commit('UPDATECHILD',{val0:this.val0,val:this.val,val2:this.val2});

   	  		this.$store.commit('DISPLAYUPDATE2');
         },
         jilu0 (e) {
            this.val0= e.target.value;
         },
         jilu () {
            this.val=event.target.value;
         },
         jilu2 (e) {
            this.val2=e.target.value;
         }
   	  },
   	  computed : {
   	  	
   	  	updateOrigin () {
   	  		this.val0=this.$store.state.updateOrigin;
   	  		return this.$store.state.updateOrigin
   	  	},
   	  	childs () {
   	  		 this.val=this.$store.state.displayUpdateChilds().toString();

   	  		return this.$store.state.displayUpdateChilds()
   	  	},
   	  	updateSelect () {
   	  		this.val2=this.$store.state.updateSelect;
   	  		return this.$store.state.updateSelect
   	  	}
   	  }
   }
</script>

<style scoped>
	.addTask{
		width:500px;
		background:#fff;
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		z-index:1000;
		height:400px;
		overflow-y:auto;
	}
	.addTitle{
		height: 50px;
	    padding-left: 50px;
	    color: #fff;
	    border-bottom: 1px solid #eee;
	    line-height: 50px;
	    position: relative;
	    background: #bdc2ca;
	    margin-bottom: 10px;
	    font-size: 19px;
	    text-align: center;
	}
	.addTitle span{
		color: #fff;
	    float: right;
	    border-left: 1px solid #c6cad1;
	    display: inline-block;
	    width: 50px;
	    height: 50px;
	    cursor:pointer;
	}
	.addDown{
		padding-left:60px;
	}
	.origin-div,.update-div,.select-div{
        margin-bottom: 30px;
        margin-top: 30px;
     }
    .origin-div div,.update-div div,.select-div div{
    	float:left;
    	margin-top:10px;
    	margin-right:30px;
    }
    .update-div div{
    	margin-right:45px;
    }
    .select-div div{
        margin-right:18px;
    }
    select{
    	width:120px;
    	height:34px;
    	outline:none;
    	border: 1px solid #d4d8de;
	    border-radius: 3px;
    }
    textarea{
    	border: 1px solid #d4d8de;
	    border-radius: 3px;
	    width: 320px;
	    height:40px;
        resize:none;
        outline:none;
    }
    .btn{
		margin:0 0 30px 150px;
	}
	.update-div textarea{
	   height:80px;
	}
</style>