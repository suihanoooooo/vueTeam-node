<template>
	<div class='col-xs-12'>
        <menuCt v-bind:menuct='menuct' v-bind:menushow='menushow'></menuCt>
        <objects v-for='(obj, index) in objects' v-bind:obj='obj' v-bind:index='index'></objects>
	</div>
</template>

<script>
import menuCt from './menuCt'
import objects from './object'

  export default {
  	 components: {
  	 	menuCt,
      objects
  	 },
  	 computed : {
  	 	menuct () {
  	 		return this.$store.state.shanghu.Objects
  	 	},
  	 	menushow () {
  	 		return this.$store.state.shanghu.showMenu
  	 	},
      objects () {
        return this.$store.state.shanghu.Objects
      }
  	 }
  }	
</script>

<style>
	
</style>