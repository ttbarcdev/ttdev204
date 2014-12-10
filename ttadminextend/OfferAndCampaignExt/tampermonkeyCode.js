// ==UserScript==
// @name        T&T Offer & Campaign List Extender
// @namespace   //
// @include     https://admin7.testandtarget.omniture.com/admin/campaign/spotlight/campaign_spotlight.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad.do*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad/launchpad.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/analytics/reports/campaignStep.do*
// @include     https://admin7.testandtarget.omniture.com/admin/campaigns/list/campaign_list.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/offers/offers.jsp*
// @require     https://ttdev204.googlecode.com/svn/common/jStorage.js
// @require     https://ttdev204.googlecode.com/svn/common/jszip.js
// @require     https://ttdev204.googlecode.com/svn/common/FileSaver.js
// @require     https://ttdev204.googlecode.com/svn/common/getUrlPar.js
// @version     1.1
// @grant       GM_log
/* The @grant directive is needed to work around a design change introduced in GM 1.0,
 It restores the sandbox.
 */
// ==/UserScript==

var $j = jQuery.noConflict();

function ttDynLoadLib(liburl) {

	var scripts = document.getElementsByTagName('script'),
		testScriptLoaded=false;
	for (var i = scripts.length; i--;) {
		if (scripts[i].src == liburl){
			testScriptLoaded = true;
		}
	}
	if (!testScriptLoaded){
		var c=document.createElement("script");
		c.type="text/javascript";
		c.src=liburl;
		c.onload=c.onreadystatechange=function(){if((!(d=this.readyState)||d=="loaded"||d=="complete")){}};document.documentElement.childNodes[0].appendChild(c);
	}
}

ttDynLoadLib('https://ttdev204.googlecode.com/svn/common/jStorage.js');
ttDynLoadLib('https://ttdev204.googlecode.com/svn/common/jszip.js');
ttDynLoadLib('https://ttdev204.googlecode.com/svn/common/FileSaver.js');
ttDynLoadLib('https://ttdev204.googlecode.com/svn/common/getUrlPar.js');


function ttOfferListInsert(){
	ttDynLoadLib('https://ttdev204.googlecode.com/svn/ttadminextend/OfferAndCampaignExt/ttOffersListHelper.js');
}

function ttOffFilterParamsExtend(){
	if (location.search!=""){
		var ttPrefix = ttGetUrlParameters('prefix','',true);

		$j('#searchOffersQuery').val(ttPrefix).focus();
		$j('div[id^="page-"]:first').addClass('ttKeepMe');
		$j('div[id^="page-"]:not(".ttKeepMe")').remove();
		$j('div[id^="page-"]:first table#offersSearchResult').load('/admin/common/pagination/pagination_infinite_load_response_wrapper.jsp?url=%2Foffers%2F_offers_request.jsp&containerId=offer_search&page=0&prefix='+ttPrefix+'&sortType=&sortOrder=ASCENDING&loadCurrentList=true&action=search&id=22&columnIndex=0',function(){
			$j('table#offersSearchResult:first').removeAttr('class');
		});


	}
	//Add New Icon
	$j('#offersToolbar ul:first').append('<li><a href="#" id="ttOfferListInsertIco" title="Advanced Offer Search" style="border: 2px outset #E4BC66;display: block;border-radius: 3px;margin-left: 10px;"><span class="ui-button-icon-primary ui-icon aui-icon aui-icon-search" style="margin: 3px;"></span></a></li>');
	$j('#ttOfferListInsertIco').click(function(e){
		e.preventDefault();
		ttOfferListInsert();
		return false;
	});

}

function ttCmpFilterIcoLoader(){
	//Add New Icon
	$j('#campaignListToolbar ul:first').append('<li><a href="#" title="Advanced Campaign Search" id="ttCampaignListInsertIco" style="border: 2px outset #E4BC66;display: block;border-radius: 3px;margin-left: 10px;"><span class="ui-button-icon-primary ui-icon aui-icon aui-icon-search" style="margin: 3px;"></span></a></li>');
	$j('#ttCampaignListInsertIco').click(function(e){
		e.preventDefault();
		ttCmpListInsert();
		return false;
	});
}

function ttCmpFilterIcoLoaderNextToHelp(){
	//Add New Icon
	$j('.cui header.top .drawer>a:contains("Help")').closest("div.drawer").prepend('<a href="#" title="Advanced Campaign Search" id="ttCampaignListInsertIcoNextToHelp" style="border: 2px outset #E4BC66;display: inline-block;border-radius: 3px;margin-right: 5px;margin-top: 8px;width: 25px;height: 25px;background: #797575;"><span class="ui-button-icon-primary ui-icon aui-icon aui-icon-search" style="margin: 3px;"></span></a>');
	$j('#ttCampaignListInsertIcoNextToHelp').click(function(e){
		e.preventDefault();
		ttCmpListInsert();
		return false;
	});
	$j('#linking-wizard-begin').css({right: '120px'});
}

function ttCmpListInsert(){
	ttDynLoadLib('https://ttdev204.googlecode.com/svn/ttadminextend/OfferAndCampaignExt/ttCampaignsListHelper.js');
}

function ttStartupFuncsLoader(){

	//execute on doc ready + 1s
	if (window.location.href.toString().indexOf('offers/offers.jsp')>-1){
		setTimeout(function(){ttOffFilterParamsExtend();},1000);
	}
	if (window.location.href.toString().indexOf('campaign_list.jsp')>-1){
		setTimeout(function(){ttCmpFilterIcoLoader();},1000);
	}
	if (window.location.href.toString().indexOf('/admin/')>-1){
		setTimeout(function(){ttCmpFilterIcoLoaderNextToHelp();},1000);
	}
}

$j(function(){
	ttStartupFuncsLoader();
});