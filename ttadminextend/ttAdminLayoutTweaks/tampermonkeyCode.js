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
		".aui-tooltip-new .aui-tooltip-item.aui-ellipsis.aui-grid-45{"+
		"white-space: normal!important;  width: auto!important;  max-width: 708px;" + 
		+"}"+

		".aui-contextMenu {top: 8px;}";
}


if (window.location.href.indexOf("/launchpad") >= 0) {
	ttinslayouttweakscssInnerHTML+="\r\n .launchpad-column.-last{width: 100%}"+
		".aui-container-screen{width: 95%}\r\n"+
		"#aui-main table{width: 100%}\r\n"+
		"#notesFeed .m2-notesFeed {clear: both; min-height: 20px;}\r\n"+
		"#notesFeed .m2-notesFeed div:first-child {float: left; display: inline-block; margin-right: 5px;}\r\n"+
		"#notesFeed .m2-notesFeed .m2-notesFeed-text {margin: 0 5px 0 0; float: left; display: inline-block;}\r\n"+
		"#notesFeed .m2-notesFeed .m2-notesFeed-date {margin: 0 5px 0 0; float: left; display: inline-block;}\r\n"+
		"#notesFeed .m2-notesFeed .m2-helper-breakWord {font-weight: bold;}\r\n"+
		"#notesFeed .m2-notesFeed .m2-notesFeed-date::after { content: \", \"}\r\n";
}

ttinslayouttweakscss.innerHTML = ttinslayouttweakscssInnerHTML;
ttinslayouttweakshead.appendChild(ttinslayouttweakscss);
var ttinslayouttweaksscript = document.createElement('script');
ttinslayouttweaksscript.type = 'text/javascript';
ttinslayouttweaksscript.text = [
	"if (window.location.href.indexOf(\"campaign_edit_forward.jsp\") >= 0) {"+
	"	setInterval(function() {" +
	"		$j('span.aui-ellipsis').each(function(e){$j(this).html($j('#tooltip_'+$j(this).attr('id')).html());	});" +
	"	}, 2000);"+
	"}"+
	"if (window.location.href.indexOf(\"/launchpad\") >= 0) { "+
	"	setTimeout(function() {" +
	"		//$j('.launchpad-column:not(:contains(\"News Feed\"))').remove();\r\n"+ /* maybe not suitable for everyone, but works for me, Dashboard showing only recent history of changes */
	"		$j('#aui-main table .aui-v-align-t:eq(0)').css({width: '200px'});\r\n"+
	"		$j('.aui-container:contains(\"Learn how\"), h1:contains(\"Your Program Overview\")').remove();\r\n"+
	"		$j('#notesFeed .m2-notesFeed .m2-helper-breakWord a').live('click',function(e){\r\n" + /* Go to Edit tab rather then spotlight */
	"			e.preventDefault();\r\n" +
	"			var ttCurId = $j(this).attr('href').split('=')[1];\r\n" +
	"			location.href='https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId='+ ttCurId;\r\n" +
	"			return false;\r\n" +
	"		});\r\n"+
	"	}, 2000);\r\n"+
	"}",
].join('');
ttinslayouttweakshead.appendChild(ttinslayouttweaksscript);
