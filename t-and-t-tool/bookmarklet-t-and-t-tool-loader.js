$(function(){
	var ttRandCacheBuster=parseInt(Math.random()*99999999);  // cache buster
	if ($('.ttHighLLabelWrap').length>0){
		alert("Page needs to be refreshed before using the T&T Tools again. Press OK to proceed with refresh. After page is reloaded, use the tool again.");
		window.location = location.protocol + '//' + location.host + location.pathname;
	}
	/* check and load T&T Tool */
	function isMyTTToolLoaded() {
	scripts = document.getElementsByTagName('script');
		for (var i = scripts.length; i--;) {
			if (scripts[i].src == "https://ttdev204.googlecode.com/svn/t-and-t-tool/t-and-t-tool.js?cb="+ttRandCacheBuster) return true;
		}
	return false;
	}
	if (isMyTTToolLoaded()===false){
		c=document.createElement("script");c.type="text/javascript";c.src="https://ttdev204.googlecode.com/svn/t-and-t-tool/t-and-t-tool.js?cb="+ttRandCacheBuster;c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h(b=1);f(c).remove()}};document.documentElement.childNodes[0].appendChild(c);
	}
});