<template>
	<div class='shadow'></div>
</template>

<script>
  export default {

  }
</script>

<style>
	.shadow{
		width: 100%;
	    height: 100%;
	    background-color: #000;
	    filter: alpha(opacity=50);
	    -moz-opacity: 0.5;
	    opacity: 0.5;
	    position: absolute;
	    left: 0px;
	    top: 0px;
	    bottom: 0px;
	    z-index: 1000;
	}
</style>