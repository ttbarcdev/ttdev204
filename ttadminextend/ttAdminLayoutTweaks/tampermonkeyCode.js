// ==UserScript==
// @name       T&T Admin Layout Tweaks
// @namespace  //
// @description  T&T Admin Layout Tweaks
// @include     https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad/launchpad.jsp
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad.do
// @version     0.1
// @grant       GM_log
// ==/UserScript==

var ttinslayouttweakshead = document.getElementsByTagName('head')[0];

var ttinslayouttweakscss = document.createElement("style"), ttinslayouttweakscssInnerHTML='';
ttinslayouttweakscss.type = "text/css";
if (window.location.href.indexOf("campaign_edit_forward.jsp") >= 0) {
	ttinslayouttweakscssInnerHTML+="\r\n div.aui-container-screen {" +
		"width: 98% !important;" +
		"}"+
		"{}"+

		".aui-contextMenu {top: 8px;}";
}
if (window.location.href.indexOf("/launchpad/") >= 0) {
	ttinslayouttweakscssInnerHTML+="\r\n {}";
}

ttinslayouttweakscss.innerHTML = ttinslayouttweakscssInnerHTML;
ttinslayouttweakshead.appendChild(ttinslayouttweakscss);

var ttinslayouttweaksscript = document.createElement('script');
ttinslayouttweaksscript.type = 'text/javascript';
ttinslayouttweaksscript.text = ["document.addEventListener('DOMContentLoaded', function(){setInterval(function() {"+
	"if (window.location.href.indexOf(\"campaign_edit_forward.jsp\") >= 0) {"+
	"$j('span.-ellipsified').each(function(e){$j(this).html($j('#tooltip_'+$j(this).attr('id')).html());	});"+
	"}"+
	"if (window.location.href.indexOf(\"/launchpad/\") >= 0) {"+
	"$j('.launchpad-column:not(:contains(\"News Feed\"))').remove();"+ /* maybe not suitable for everyone, but works for me, Dashboard showing only recent history of changes */
	"}"+
	"}, 2000);});",
	""
].join('');
ttinslayouttweakshead.appendChild(ttinslayouttweaksscript);