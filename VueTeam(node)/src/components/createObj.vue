<template>
	<div class='createObj'>
		<div class='create-title'>新建项目<span @click='closeCreate'>X</span></div>
		<div class='create-down'>
			<div class='obj-name'>
				<span>项目名称</span>
				<input type='text' class='input-name' :value='objName' @input='backName'/>
			</div>
			<div class='class'>
				<span>选择分类</span>
				<select :value='objClass' @click='backClass'>
					<option>内部项目</option>
					<option>商户接入</option>
					<option>渠道接入</option>
				</select>
			</div>
			<div class='obj-connect'>
				<span>关联项目</span>
				<img src='../assets/serach3.png'/>
				<input type='text' class='serach'/>
				<ul class='tan' v-show='tan1'>
					<li>s</li><!--<li v-for='(tanData,index) in tanDatas'></li>-->
					
				</ul>
				<ul class='showTan' v-show='showTan1'>
					<li>s</li>
				</ul>
			</div>
			<div class='obj-join'>
				<span>邀请成员</span>
				<img src='../assets/serach3.png'/>
				<input type='text' class='serach'/>
				<ul class='tan' v-show='tan2'>
					<li>s</li><!--<li v-for='(tanData,index) in tanDatas'></li>-->
				</ul>
				<ul class='showTan' v-show='showTan2'>
					<li>s</li>
				</ul>
			</div>
			<button class='btn btn-info' @click='createObj'>创建</button>
		</div>
	</div>
</template>

<script>
  export default {
      methods : {
      	closeCreate () {
      		this.$store.commit('DISPLAYCREATE')
      	},
      	createObj () {
      		var _this=this;
      		this.$store.commit('CREATEOBJ');
      		var obj={
      			objName: this.objName,
      			objClass: this.objClass,
      			objTime: this.objTime,
      			objChilds: []
      		}
      		this.$http.post('/create',obj).then(function(data){
                _this.$store.commit('DISPLAYCREATE');
      		});
      		

      	},
      	backName (e) {
      		this.$store.commit('CHANGENAME',e.target.value)
      	},
      	backClass (e) {
      		this.$store.commit('CHANGECLASS',e.target.value)
      	}
      },
      computed : {
        objName () {
        	return this.$store.state.objName
        },
        objClass () {
        	return this.$store.state.objClass
        },
        objTime () {
        	return this.$store.state.objTime
        }
      },
      data () {
      	return {
      		showTan1: false,
      		showTan2: false,
      		tan1: false,
      		tan2: false
      	}
      }
  }
</script>

<style scoped>
	.createObj{
		width:480px;
		background:#fff;
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		z-index:1001;
	}
	.create-title{
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
	.create-title span{
		cursor:pointer;
		color: #fff;
	    float: right;
	    border-left: 1px solid #c6cad1;
	    display: inline-block;
	    width: 50px;
	    height: 50px;
	}
	.create-down {
	    padding-left: 60px;
	}
	.obj-name,.class,.obj-connect,.obj-join {
	    margin-top: 20px;
	    margin-bottom: 40px;

	}
	.obj-name span.class span,.obj-connect span，.obj-join span{
	    color: #6b7076;
	    line-height: 30px;
	}
	.input-name,.serach{
	    float: right;
	    border: 1px solid #d4d8de;
	    border-radius: 3px;
	    width: 300px;
	    height: 30px;
	    margin-right: 25px;
	    line-height: 30px;
	    outline: none;
	}
	select{
		float:right;
		margin-right:214px;
		width:110px;
		height:28px;
		outline:none;
		border: 1px solid #d4d8de;
	}
	.serach{
        width:270px;
        margin-right:0;

	}
	.obj-connect img,.obj-join img{
		float:right;
        margin-right:22px;
        cursor:pointer;
	}
	.tan,.showTan{
		margin:10px 0 0 100px; 
		width:270px;
		padding:0;
	}
	.btn{
		margin:0 0 30px 150px;
	}
</style>