<template>
	<div class='nav col-xs-11'>
			<ul @click='showSub'>
				<li 
				:class='{activeColor:nav.active}'
				>{{ nav.title }}</li>
				<li v-if='nav.sanjiao' 
				    v-bind:class='{sanjiaoUp:nav.showSub,sanjiaoLeft:!nav.showSub}'
				    >
				</li>
			</ul>
		<ul v-if='nav.showSub'>
			<li v-for='(sub, index) in nav.subs' 
			    :class='{bgColor:sub.active}'
                @click='toggleRoute(index)'
			    >
			    <router-link v-bind:to='sub.route' tag='li'>{{ sub.title }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
 export default {
 	props:['nav','index'],
 	methods :{
 		showSub () {
          this.$emit('showSub');
 		},
 		toggleRoute (num) {
          this.$emit('toggleRoute',num,this.index)
 		}
 	}
 }
</script>

<style>
	li{
		list-style:none;
	}
	.nav{
		background:#f0f3f7;
		color:#828890;
        border-bottom: 1px solid #e9e9e9;
	}
	.activeColor{
		color:#72c9f0;
	}
	.bgColor{
		color:#fff;
		background:#72c9f0;
		border-radius: 12px 0 0 12px;

	}
	.nav ul:nth-child(1) li:nth-child(1){/**标题左浮动***/
		font-size:16px;
        float:left;
	}
	.nav ul:nth-child(1) li:nth-child(2){/*三角右浮动*/
        float:right;
	}
	.sanjiaoUp {
	    position: absolute;
	    right: 5px;
	    top: 22px;
	    border: 5px solid transparent;
	    border-top-color: #ddd;
	    height: 1px;
	    width: 1px;
	    cursor: pointer;
	}
	.sanjiaoLeft {
	    position: absolute;
	    right: 5px;
	    top: 22px;
	    border: 5px solid transparent;
	    border-left-color: #ddd;
	    height: 1px;
	    width: 1px;
	    cursor: pointer;
	}
	.nav ul:nth-child(2){
		padding-left:50px;
	}
	.nav ul:nth-child(2) li{
		padding-left:20px;
		cursor:pointer;
		margin-bottom:6px;
	}
    .nav ul:nth-child(1){
		height:50px;
		line-height:50px;
		cursor:pointer;
	}
	
</style>