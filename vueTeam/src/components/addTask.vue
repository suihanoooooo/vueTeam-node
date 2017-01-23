<template>
	<div class='addTask'>
		<div class='addTitle'>
			添加任务<span @click='hideTask'>X</span>
		</div>
		<div class='addDown'>
			<div class='origin-div'>
			   <div>原内容</div>
			   <textarea :value='addOrigin' @input='backOrigin'></textarea>
		    </div>
		    <div class='update-div'>
			   <div>更新</div>
			   <textarea :value='addUpdate' @input='backUpdate'></textarea>
		    </div>
		    <div class='select-div'>
			   <div>选择状态</div>
			   <select :value='addSelect' @click='backSelect'>
			   	   <option style='color:#ff9963;'>需关注</option>
			   	   <option style='color:#6caab4;'>正在进行</option>
			   	   <option style='color:#bdc2ca;'>已完成</option>
			   </select>
		    </div>
		    <button class='btn btn-info' @click='addChild'>确定</button>
		</div>
	</div>
</template>

<script>
   export default {
   	  methods : {
   	  	hideTask () {
   	  		this.$store.commit('DISPLAYTASK');
   	  	},
   	  	backOrigin (e) {
   	  		this.$store.commit('CHANGEADDORIGIN',e.target.value);
   	  	},
   	  	backUpdate (e) {
            this.$store.commit('CHANGEADDUPDATE',e.target.value);
   	  	},
   	  	backSelect (e) {
            this.$store.commit('CHANGEADDSELECT',e.target.value);
   	  	},
   	  	addChild () {
   	  		this.$store.commit('ADDCHILD');
   	  		this.$store.commit('DISPLAYTASK2');
   	  	}
   	  },
   	  computed : {
   	  	addOrigin () {
   	  		return this.$store.state.addOrigin
   	  	},
   	  	addUpdate () {
   	  		return this.$store.state.addUpdate
   	  	},
   	  	addSelect () {
   	  		return this.$store.state.addSelect
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
		z-index:1001;
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
</style>