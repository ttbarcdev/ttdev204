// ==UserScript==
// @name        T&T Report Assistant (Process List)
// @namespace   //
// @include     https://admin7.testandtarget.omniture.com/admin/campaign/spotlight/campaign_spotlight.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp*
// @include    	https://admin7.testandtarget.omniture.com/admin/analytics/reports/campaignDetailedSummary.do*
// @include    	https://admin7.testandtarget.omniture.com/admin/campaigns/list/campaign_list.jsp*
// @include    	https://admin7.testandtarget.omniture.com/admin/campaign/view/campaign_change_log.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad.do*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad/launchpad.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/analytics/reports/campaignStep.do*
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.js
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.ui.js
// @require     https://ttdev204.googlecode.com/svn/common/jStorage.js
// @require     https://ttdev204.googlecode.com/svn/common/jszip.js
// @require     https://ttdev204.googlecode.com/svn/common/FileSaver.js
// @require     https://ttdev204.googlecode.com/svn/common/getUrlPar.js
// @require     https://ttdev204.googlecode.com/svn/common/Base64.js
// @version     1.1
// @grant       GM_log
/* The @grant directive is needed to work around a design change introduced in GM 1.0,
 It restores the sandbox.
 */
// ==/UserScript==

var $j = jQuery.noConflict();

//$j.jStorage.deleteKey("ttReportAssistantList"); //uncomment to reset

function ttGetCampDescIdFromURL($tturl){
	var results = new RegExp('[\?&amp;]campaignDescriptionId=([^&amp;#]*)').exec($tturl);
	if (results != null && results !== undefined && results[1] != null && results[1] !== undefined) {
		return results[1];
	}else{
		return 0;
	}
}

function ttGetCampIdFromURL($tturl){
	var results = new RegExp('[\?&amp;]campaignId=([^&amp;#]*)').exec($tturl);
	if (results != null && results !== undefined && results[1] != null && results[1] !== undefined) {
		return results[1];
	}else{
		return 0;
	}
}



var ttReportAssistantListArr = $j.jStorage.get("ttReportAssistantList");
if (ttReportAssistantListArr){
}else{
	ttReportAssistantListArr = new Array();
}


$j("<style>#ui-datepicker-div.ui-widget-content {z-index: 9999 !important; border: 1px solid #ccc !important;} "+
	"#ui-datepicker-div.ui-datepicker .ui-datepicker-next, #ui-datepicker-div.ui-datepicker .ui-datepicker-prev {border: 1px solid rgba(204, 204, 204, 0.35);}"+
	"#ui-datepicker-div .ui-widget-header .ui-icon {background: url(http://download.jqueryui.com/themeroller/images/ui-icons_222222_256x240.png);}"+
	"#ui-datepicker-div .ui-widget-header .ui-datepicker-prev .ui-icon {background-position: -80px -192px;}"+
	"#ui-datepicker-div .ui-widget-header .ui-datepicker-next .ui-icon {background-position: -48px -192px;}"+
	"#ui-datepicker-div .ui-state-active {outline: 1px solid rgba(255, 0, 0, 0.34);}"+
	"#ttReportProcessIDE a.ttPrcsRpItem.ttViewed {color: #008000;font-style: italic;text-decoration: line-through;}"+
	"</style>" ).appendTo("head");


var ttReportAssistantProcessListArr = $j.jStorage.get("ttReportAssistantList");

if (ttReportAssistantProcessListArr){
}else{
	ttReportAssistantProcessListArr = new Array();
}
var ttReportAssistantProcessedListArr = new Array();
var dateFromDD, dateFromMM, dateFromYY, dateToDD, dateToMM, dateToYY;

function ttReportSaveArrayFromIDE(){
	if ($j('#ttReportProcessIDE p a.ttPrcsRpItem').length!=0){
		ttReportAssistantProcessedListArr=[];
		$j('#ttReportProcessIDE p a.ttPrcsRpItem').each(function(){
			var viewedState = false;
			if ($j(this).hasClass('ttViewed')) {
				viewedState = true;
			}
			ttReportAssistantProcessedListArr.push({title: $j(this).text(), url:$j(this).attr('href'), viewed: viewedState});
		});

		$j.jStorage.deleteKey("ttReportAssistantList");
		$j.jStorage.set("ttReportAssistantList",ttReportAssistantProcessedListArr);

	}else{
		$j.jStorage.deleteKey("ttReportAssistantList");
	}
}

function ttReportAssistProcess(){
	if ($j('#ttAddToReportProcessList').length==0){
		$j('<div id="ttAddToReportProcessList" style="cursor: pointer;display: inline-block;position: relative;top: 13px;color: #5B91FF; margin-left: 20px;" title="T&T Process My Report List">@R</div>').insertAfter('.cui header.top .crumbs');
	}
	$j(document).on('click','#ttAddToReportProcessList',function(){
		$j('#ttReportProcessIDE').toggle();
	});

	$j(document).on('click','#ttReportProcessIDE a.ttRmv',function(){ //Remove from Array, and update and save
		$j(this).closest('p').remove();
		ttReportSaveArrayFromIDE();
		return false;
	});

	$j(document).on('click','#ttReportProcessIDE a.ttUpl',function(){ //Up the list in Array, and update and save
		if ($j('#ttReportProcessIDE p').length<=1) {
			return false;
		}
		var prv = $j(this).closest('p').prev();
		var nxt = $j(this).closest('p').next();
		if (prv.length==0){
			$j(this).closest('p').insertAfter($j('#ttReportProcessIDE p:last'));
		}else{
			$j(this).closest('p').insertBefore(prv);
		}
		ttReportSaveArrayFromIDE();
		return false;
	});

	$j(document).on('click','#ttReportProcessIDE a.ttDownl',function(){ //Down the list in Array, and update and save
		if ($j('#ttReportProcessIDE p').length<=1) {
			return false;
		}
		var prv = $j(this).closest('p').prev();
		var nxt = $j(this).closest('p').next();
		if (nxt.length==0){
			$j(this).closest('p').insertBefore($j('#ttReportProcessIDE p:first'));
		}else{
			$j(this).closest('p').insertAfter(nxt);
		}
		ttReportSaveArrayFromIDE();
		return false;
	});

	$j(document).on('click','#ttReportProcessIDE a.ttPrcsRpItem',function(e){ //View item on the list / save status
		//e.preventDefault();
		$j(this).addClass('ttViewed');
		ttReportSaveArrayFromIDE();
		//window.location=$j(this).attr("href");
	});

	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEExport',function(){ //Export Progress
		ttReportExport();
		return false;
	});

	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEAutoProcess',function(){ //Auto Process Progress
		ttReportAutoProcess();
		return false;
	});

	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEImport',function(){ //Import Progress
		var importAgree=confirm("Please be aware that this will reset your progress, as you're importing, are you sure you want to proceed? If yes, please browse for the export file (must be the unzipped campaigns_list_YYYYMMDD.txt).");
		if (importAgree){
			ttReportImport();
			return false;
		}else{
			return false ;
		}

	});

	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEResetProgress',function(){ //Reset
		var resetAgree=confirm("Are you sure you want to reset your progress?");
		if (resetAgree){
			$j('#ttReportProcessIDE p a.ttPrcsRpItem.ttViewed').removeClass('ttViewed');
			ttReportSaveArrayFromIDE();
			return false;
		}else{
			return false ;
		}

	});

	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEUpdDates',function(){ //Update Dates
		var fromDDMMYYArr = $j('#fromDDMMYY').val().split('/');
		var toDDMMYYArr = $j('#toDDMMYY').val().split('/');
		dateFromDD = fromDDMMYYArr[0];
		dateFromMM = fromDDMMYYArr[1];
		dateFromYY = fromDDMMYYArr[2];
		dateToDD = toDDMMYYArr[0];
		dateToMM = toDDMMYYArr[1];
		dateToYY = toDDMMYYArr[2];

		$j('#ttReportProcessIDE p a.ttPrcsRpItem').each(function(){
			var curHref = $j(this).attr('href');
			var newHref = curHref.replace(/(dateForm.toDayDateForm.startDateForm.month=).*?(&)/,'$1' + dateFromMM + '$2');
			newHref = newHref.replace(/(dateForm.toDayDateForm.startDateForm.day=).*?(&)/,'$1' + dateFromDD + '$2');
			newHref = newHref.replace(/(dateForm.toDayDateForm.startDateForm.year=).*?(&)/,'$1' + dateFromYY + '$2');
			newHref = newHref.replace(/(dateForm.toDayDateForm.endDateForm.month=).*?(&)/,'$1' + dateToMM + '$2');
			newHref = newHref.replace(/(dateForm.toDayDateForm.endDateForm.day=).*?(&)/,'$1' + dateToDD + '$2');
			newHref = newHref.replace(/(dateForm.toDayDateForm.endDateForm.year=).*?(&)/,'$1' + dateToYY + '$2');
			$j(this).attr('href',newHref);
		});
		return false;
	});


	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEAdd',function() { //Add Campaign (via ID)

		var ttReportProcessIDEAddPrompt=0;

		if (ttGetCampDescIdFromURL(window.location.href)==0 && ttGetCampIdFromURL(window.location.href)==0){ //not on a campaign page
			ttReportProcessIDEAddPrompt = prompt("Please enter campaign id;\r\n\r\nAn API call will be made to Adobe to pull the Campaign Name from the given ID;","");
		} else{
			//it will be one or the other
			if (ttGetCampDescIdFromURL(window.location.href)!=0){
				ttReportProcessIDEAddPrompt=ttGetCampDescIdFromURL(window.location.href);
			}
			if (ttGetCampIdFromURL(window.location.href)!=0){
				ttReportProcessIDEAddPrompt=ttGetCampIdFromURL(window.location.href);
			}

		}

		if (ttReportProcessIDEAddPrompt == null || ttReportProcessIDEAddPrompt == undefined) {
			alert("No campaign ID has been specified!");
			return false;
		}

		//Get name from ID
		$j.ajax({
			url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+parseInt(ttReportProcessIDEAddPrompt).toString()+'&version=1',
			cache:false,
			timeout:18000,
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function(){
				$j('#ttReportProcessIDEProgressIco').show();
				$j('#ttReportProcessIDEMsgArea').html('Campaign name check for ID: ' + parseInt(ttReportProcessIDEAddPrompt).toString());
			},
			success:function(data){
				//handle response

				var xmlDoc = data,
					$xml = $j(xmlDoc),
					$cmpID = $xml.find("id:first").text(), //Campaign ID,
					$cmpName = $xml.find("name:first").text(); //Campaign Name


				if ($j.grep(ttReportAssistantListArr, function(n) { return n.title == $cmpName; }).length==0){
					ttReportAssistantListArr.push({title: $cmpName, url:window.location.toString()});
					$j('#ttReportProcessIDEMsgArea').html("<b>"+$cmpName + "</b> has been added");
					if ($j('#ttReportProcessIDE .fldsLinks').length==0){
						$j('.cui header.top').closest('div').append('<div id="ttReportProcessIDE" style="display: block; margin-top: 0; margin-bottom: 20px; border: 1px solid #5B91FF; max-height: 185px; overflow: auto;"><fieldset class="fldsLinks" style="width: 700px;"></fieldset></div>');
					}
					$j('#ttReportProcessIDE .fldsLinks').append("<p style='margin: 5px 10px 5px 5px;'>"
						+"<a href='#' class='ttRmv' title='Remove from list'>&nbsp;-&nbsp;</a>&nbsp;&nbsp;"
						+"<a href='#' class='ttUpl' title='Move up the list' style='font-size: 11px;'>&nbsp;^&nbsp;</a>&nbsp;&nbsp;"
						+"<a href='#' class='ttDownl' title='Move down the list' style='font-size: 8px;'>&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;</a>&nbsp;&nbsp;"
						+"<a href=\""+ "https://admin7.testandtarget.omniture.com/admin/analytics/reports/campaignStep.do?environmentId=57&campaignDescriptionId="+parseInt(ttReportProcessIDEAddPrompt).toString()+"&dateForm.dateSelectionMethod=startEndDateToDay&previousCampaignDescriptionId="+parseInt(ttReportProcessIDEAddPrompt).toString()+"&dateForm.timeNameDateForm.timeName=startEndDateToDay&metricDenominatorDisplay=IMPRESSION&liftForm.liftCriteria=Conversion+Rate&dateForm.toDayDateForm.startDateForm.month=4&dateForm.toDayDateForm.startDateForm.day=6&dateForm.toDayDateForm.startDateForm.year="+parseInt(ttReportProcessIDEAddPrompt).toString()+"&liftForm.liftControlBranch=23&eventFilterSetForm.weekPartFilterForm.weekPartFilterValue=ANY_DAY&dateForm.toDayDateForm.endDateForm.month=6&dateForm.toDayDateForm.endDateForm.day=11&dateForm.toDayDateForm.endDateForm.year=2014&eventFilterSetForm.branchSegmentEventFilterForm.branchSegmentId=&activeStepsOnly=true&action=show" +"\" class='ttPrcsRpItem'>" + $cmpName +"</a></p>");
					$j('#ttReportProcessIDEProgressIco').hide();
					setTimeout(function(){
						$j('#ttReportProcessIDEMsgArea').html('');
					},3000);
					$j.jStorage.set("ttReportAssistantList",ttReportAssistantListArr);
				}else{
					$j('#ttReportProcessIDEMsgArea').html("<b>"+$cmpName + "</b> is already on the list");
					$j('#ttReportProcessIDEProgressIco').hide();
					setTimeout(function(){
						$j('#ttReportProcessIDEMsgArea').html('');
					},3000);
				}


				ttReportSaveArrayFromIDE();

			},
			error:function(err){
				alert("There is a problem getting the name of campaign with ID: " + ttReportProcessIDEAddPrompt + "! Please check the ID and try again.\r\n\r\nPlease note that the page will refresh now (limitation of Adobe API/UI).");
				$j('#ttReportProcessIDEProgressIco').hide();
				$j('#ttReportProcessIDEMsgArea').html('');
				return false;
			}
		});

		return false;
	});

	$j(document).on('click','#ttReportProcessIDE #ttReportProcessIDEUpdNames',function(){ //Update Campaign Names
		var ttReportProcessIDEUpdNamesUpdArr = new Array(),
			elmtch="", elmtchCID=0, ttReportProcessIDEUpdNamesUpdArrIdxUp = 0;

		$j('.ttPrcsRpItem').each(function(){
			ttReportProcessIDEUpdNamesUpdArr.push(ttGetCampDescIdFromURL($j(this).attr('href')));
		});


		//ajax get on all from the locally saved
		function tReportProcessIDEUpdNamesUpd(){
			if (ttReportProcessIDEUpdNamesUpdArrIdxUp < ttReportProcessIDEUpdNamesUpdArr.length){
				var ttCurCampaign = ttReportProcessIDEUpdNamesUpdArr[ttReportProcessIDEUpdNamesUpdArrIdxUp++],
					el=ttCurCampaign,
					elmtch = el.match(/\d+/g);
				elmtchCID = parseInt(elmtch[elmtch.length-1]);


				ajaxAutoProcArrErrMsg="";
				ajaxAutoProcArrMsgCut=35;
				ajaxAutoProcArrErrMsgDots="";

				$j('#jqUIDialAPICampSearchAllResult').show();
				$j('#ttReportProcessIDEProgressIco').show();
				$j('#ttReportProcessIDEMsgArea').show();

				$j.ajax({
					url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=1',
					cache:false,
					//timeout:18000,
					xhrFields: {
						withCredentials: true
					},
					success:function(data){
						//handle response

						var xmlDoc = data,
							$xml = $j(xmlDoc),
							$cmpID = $xml.find("id:first").text(), //Campaign ID,
							$cmpName = $xml.find("name:first").text(); //Campaign Name

						$j('.ttPrcsRpItem[href*="campaignDescriptionId='+elmtchCID+'"]').html($cmpName); //update the name

						$j('#ttReportProcessIDEMsgArea').html('Campaign being checked: <b>(' + ttReportProcessIDEUpdNamesUpdArrIdxUp + '/' +ttReportProcessIDEUpdNamesUpdArr.length + ') '  + $cmpName.substring(0, ajaxAutoProcArrMsgCut) + ajaxAutoProcArrErrMsgDots + ajaxAutoProcArrErrMsg+"</b>");


						tReportProcessIDEUpdNamesUpd();

					}
				});
			}else{ //last one
				$j('#ttReportProcessIDEProgressIco').hide();
				$j('#ttReportProcessIDEMsgArea').hide();

				//save to cookie
				ttReportSaveArrayFromIDE();

				//refresh page
				location.reload();

			}

		}
		tReportProcessIDEUpdNamesUpd(); //First run




	});
}

function ttReportExport(){

	var $ttCurrentReportAssistantList = $j.jStorage.get("ttReportAssistantList");
	var $ttCurrentReportAssistantListOutput = '';

	$ttCurrentReportAssistantList.each(function(el){
		$ttCurrentReportAssistantListOutput+=Base64.encode(el.title) + ',' + Base64.encode(el.url) + ',' + Base64.encode((el.viewed).toString())  + ';';
	});

	$ttCurrentReportAssistantListOutput = $ttCurrentReportAssistantListOutput.substring(0, $ttCurrentReportAssistantListOutput.length - 1); //remove last ;

	var $ttCurrentReportAssistantListDate = new Date();

	var $ttCurrentReportAssistantListDateYear = $ttCurrentReportAssistantListDate.getFullYear();
	var $ttCurrentReportAssistantListDateMonth = $ttCurrentReportAssistantListDate.getMonth() + 1;
	if ($ttCurrentReportAssistantListDateMonth<10){
		$ttCurrentReportAssistantListDateMonth=("0"+$ttCurrentReportAssistantListDateMonth).toString();
	}
	var $ttCurrentReportAssistantListDateDay = $ttCurrentReportAssistantListDate.getDate();
	if ($ttCurrentReportAssistantListDateDay<10){
		$ttCurrentReportAssistantListDateDay=("0"+$ttCurrentReportAssistantListDateDay).toString();
	}

	//create zip object
	var $ttCurrentReportAssistantListOutputZip = new JSZip();
	$ttCurrentReportAssistantListOutputZip.file("campaigns_list_"+ $ttCurrentReportAssistantListDateYear + $ttCurrentReportAssistantListDateMonth + $ttCurrentReportAssistantListDateDay + ".txt", $ttCurrentReportAssistantListOutput);

	var $ttCurrentReportAssistantListOutputZipContent = $ttCurrentReportAssistantListOutputZip.generate({compression: "DEFLATE", type: "blob"});
	saveAs($ttCurrentReportAssistantListOutputZipContent, "campaigns_list_export_"+$ttCurrentReportAssistantListDateYear + $ttCurrentReportAssistantListDateMonth + $ttCurrentReportAssistantListDateDay+".zip");

}

function ttReportAutoProcess(){
	if ($j('#ttReportProcessIDE p a.ttPrcsRpItem:not(".ttViewed")').length==0){
		$j('#ttReportProcessIDEMsgArea').html('All campaigns in your list are marked as processed!').show();
		setTimeout(function(){
			$j('#ttReportProcessIDEMsgArea').fadeOut(600);
			$j('#ttReportProcessIDEMsgArea').html('');

		},2500);
		return false;
	}else{

		$j('#ttReportProcessIDEMsgArea').html('');
		var autoProcessAgree=confirm("By clicking OK you will auto process all campaigns in your list. \n\nIf you have campaigns in your list that are marked as processed, they will not be included in the list of auto processed campaigns.\n\nUse the 'Reset' button first if need to reset to full list.\n\nDates in the From/To fields ("+$j('#fromDDMMYY').val()+" - "+$j('#toDDMMYY').val()+ ") will be automatically applied to downloaded reports.\n\nYou will get a ZIP with all processed campaigns in the end.");
		if (autoProcessAgree) {


			var fromDDMMYYArr = $j('#fromDDMMYY').val().split('/');
			var toDDMMYYArr = $j('#toDDMMYY').val().split('/');
			dateFromDD = fromDDMMYYArr[0];
			dateFromMM = fromDDMMYYArr[1];
			dateFromYY = fromDDMMYYArr[2];
			dateToDD = toDDMMYYArr[0];
			dateToMM = toDDMMYYArr[1];
			dateToYY = toDDMMYYArr[2];

			var ttReportAutoProcessIterateArr = new Array(),
				ajaxAutoProcArrIdx, ajaxAutoProcArrErrMsg="",ajaxAutoProcArrErrMsgDots="", ajaxAutoProcArrMsgCut=35;
			var toDate, fromDate;

			$j('#ttReportProcessIDE p a.ttPrcsRpItem:not(".ttViewed")').each(function () {
				var curName = $j(this).text();
				var curHref = $j(this).attr('href').replace('action=show', 'action=download');
				var newHref = curHref.replace(/(dateForm.toDayDateForm.startDateForm.month=).*?(&)/, '$1' + parseInt(dateFromMM) + '$2');
				newHref = newHref.replace(/(dateForm.toDayDateForm.startDateForm.day=).*?(&)/, '$1' + parseInt(dateFromDD) + '$2');
				newHref = newHref.replace(/(dateForm.toDayDateForm.startDateForm.year=).*?(&)/, '$1' + parseInt(dateFromYY) + '$2');
				newHref = newHref.replace(/(dateForm.toDayDateForm.endDateForm.month=).*?(&)/, '$1' + parseInt(dateToMM) + '$2');
				newHref = newHref.replace(/(dateForm.toDayDateForm.endDateForm.day=).*?(&)/, '$1' + parseInt(dateToDD) + '$2');
				newHref = newHref.replace(/(dateForm.toDayDateForm.endDateForm.year=).*?(&)/, '$1' + parseInt(dateToYY) + '$2');

				if (parseInt(dateFromMM) < 10) {
					dateFromMM = "0" + parseInt(dateFromMM)
				}
				;
				if (parseInt(dateFromDD) < 10) {
					dateFromDD = "0" + parseInt(dateFromDD)
				}
				;
				fromDate = dateFromYY + dateFromMM + dateFromDD;
				if (parseInt(dateToMM) < 10) {
					dateToMM = "0" + parseInt(dateToMM)
				}
				;
				if (parseInt(dateToDD) < 10) {
					dateToDD = "0" + parseInt(dateToDD)
				}
				;
				toDate = dateToYY + dateToMM + dateToDD;
				ttReportAutoProcessIterateArr.push(new Array(curName, newHref, fromDate, toDate));
			});

			ajaxAutoProcArrIdx = 0;
			ajaxAutoProcArrErrMsg="";
			ajaxAutoProcArrMsgCut=35;
			ajaxAutoProcArrErrMsgDots="";

			//create zip object
			var ttReportAutoProcessIterateZip = new JSZip();

			function ttReportAutoProcessIterate() {


				if (ajaxAutoProcArrIdx < ttReportAutoProcessIterateArr.length) {

					var ttCurCampaignName = ttReportAutoProcessIterateArr[ajaxAutoProcArrIdx][0];
					var ttCurCampaignUrl = ttReportAutoProcessIterateArr[ajaxAutoProcArrIdx][1];
					var ttCurCampaignFromDate = ttReportAutoProcessIterateArr[ajaxAutoProcArrIdx][2];
					var ttCurCampaignToDate = ttReportAutoProcessIterateArr[ajaxAutoProcArrIdx][3];
					var ajaxAutoProcArrIdxZeroPadded=0;

					ajaxAutoProcArrIdx++;

					if (ajaxAutoProcArrErrMsg!=""){
						ajaxAutoProcArrMsgCut=25;
					}else{
						ajaxAutoProcArrMsgCut=35;
					}

					if (ttCurCampaignName.length==ttCurCampaignName.substring(0, ajaxAutoProcArrMsgCut).length){
						ajaxAutoProcArrErrMsgDots="";
					}else{
						ajaxAutoProcArrErrMsgDots="...";
					}

					$j('#ttReportProcessIDEProgressIco').show();
					$j('#ttReportProcessIDEAutoProcess').attr('disabled', 'disabled');
					$j('#ttReportProcessIDEMsgArea').html('Campaign being auto processed: <b>(' + ajaxAutoProcArrIdx + '/' +ttReportAutoProcessIterateArr.length + ') '  + ttCurCampaignName.substring(0, ajaxAutoProcArrMsgCut) + ajaxAutoProcArrErrMsgDots + ajaxAutoProcArrErrMsg+"</b>");
					$j('#ttReportProcessIDEMsgArea').show();
					$j('#ttReportProcessIDE p a.ttPrcsRpItem:contains(' + ttCurCampaignName + ')').addClass('ttViewed')/*.focus()*/;


					$j.ajax({
						url: ttCurCampaignUrl,
						cache: false,
						timeout: 180000,
						xhrFields: {
							withCredentials: true
						},
						success: function (data) {
							//handle response
							if (ajaxAutoProcArrIdx<10){
								ajaxAutoProcArrIdxZeroPadded = '0' + ajaxAutoProcArrIdx;
							}else{
								ajaxAutoProcArrIdxZeroPadded = ajaxAutoProcArrIdx;
							}
							ttReportAutoProcessIterateZip.file(ajaxAutoProcArrIdxZeroPadded + "_" + ttCurCampaignName.replace(/\s+/gi, '-').replace(/[^a-zA-Z0-9\-]/gi, '') + "___" + ttCurCampaignFromDate + "-" + ttCurCampaignToDate + ".csv", data);
							ajaxAutoProcArrErrMsg="";
							//move to next iteration
							ttReportAutoProcessIterate();
						},
						error: function(x, t, m) {
							if(t==="timeout") {
								window.console && console.log("got timeout with: " + ttCurCampaignName);
							} else {
								window.console && console.log("got other type of error with: " + ttCurCampaignName);
							}
							window.console && console.log("Retrying: " + ttCurCampaignName);
							ajaxAutoProcArrIdx--; //decrease index so same element is retried again
							ajaxAutoProcArrErrMsg=" <em style=\"font-weight: bold;font-style: italic;color: rgb(255, 0, 224);\">(retry)</em> ";
							//retry iteration as Adobe response on the bigger campaigns isn't always on time (within the 3 mins preset timeout)
							ttReportAutoProcessIterate();
						}
					});

				} else {
					//last iteration
					var ttReportAutoProcessIterateZipContent = ttReportAutoProcessIterateZip.generate({compression: "DEFLATE", type: "blob"});
					saveAs(ttReportAutoProcessIterateZipContent, "campaigns_reports_"+fromDate+"-"+toDate+".zip");

					$j('#ttReportProcessIDEMsgArea').html('All done!');
					setTimeout(function () {
						$j('#ttReportProcessIDEMsgArea').html('');
					}, 4000);
					$j('#ttReportProcessIDEAutoProcess').removeAttr('disabled');
					$j('#ttReportProcessIDEProgressIco').hide();
				}
			}

			//first iteration
			ttReportAutoProcessIterate();

			return false;
		}

	}
}

function ttReportImport(){

	$j('#ttReportProcessIDEImportFile').show();

	$j('input[type=file]#ttReportProcessIDEImportFile').change(function(e){


		//get file object
		var ttReportProcessIDEImportFileObj = document.getElementById('ttReportProcessIDEImportFile').files[0];
		if (ttReportProcessIDEImportFileObj) {
			// create reader
			var ttReportProcessIDEImportFileObjReader = new FileReader();
			ttReportProcessIDEImportFileObjReader.readAsText(ttReportProcessIDEImportFileObj);
			ttReportProcessIDEImportFileObjReader.onload = function(e) {
				// browser completed reading file - display it
				var $ttReportProcessIDEImportData = e.target.result;

				//clear current list
				$j('#ttReportProcessIDE p a.ttPrcsRpItem.ttViewed').removeClass('ttViewed');

				$j('#ttReportProcessIDE p a.ttPrcsRpItem, #ttReportProcessIDE p a.ttRmv, #ttReportProcessIDE p a.ttUpl, #ttReportProcessIDE p a.ttDownl').remove();

				var $ttReportProcessIDEImportDataArr = $ttReportProcessIDEImportData.split(';');

				$j('#reportForm .fldsLinks').html("");

				$ttReportProcessIDEImportDataArr.each(function($ttReportProcessIDEImportDataElement){
					var $ttReportProcessIDEImportDataElementProps = $ttReportProcessIDEImportDataElement.split(',');

					var viewedClassImport = "";
					if (Base64.decode($ttReportProcessIDEImportDataElementProps[2])=="true"){
						viewedClassImport=" ttViewed";
					}else{
						viewedClassImport="";
					}

					//build visual list
					$j('#reportForm .fldsLinks').append("<p style='margin: 5px 10px 5px 5px;'>"
						+"<a href='#' class='ttRmv' title='Remove from list'>&nbsp;-&nbsp;</a>&nbsp;&nbsp;"
						+"<a href='#' class='ttUpl' title='Move up the list' style='font-size: 11px;'>&nbsp;^&nbsp;</a>&nbsp;&nbsp;"
						+"<a href='#' class='ttDownl' title='Move down the list' style='font-size: 8px;'>&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;</a>&nbsp;&nbsp;"
						+"<a href=\""+ Base64.decode($ttReportProcessIDEImportDataElementProps[1])+"\" class='ttPrcsRpItem"+viewedClassImport+"'>" + Base64.decode($ttReportProcessIDEImportDataElementProps[0]) +"</a></p>");
				});

				//save to cookie
				ttReportSaveArrayFromIDE();

				$j('#ttReportProcessIDEImportFile').hide();


			};
		}

	});


}


function ttReportAssistantStartupFuncsLoader(){
	//execute on doc ready + 1s
	setTimeout(function(){ttReportAssistProcess();},1000);
}


$j(function(){
	ttReportAssistantStartupFuncsLoader();


	var prepareTTReportProcessIDEContent='';
	if (ttReportAssistantProcessListArr){
		$j.each(ttReportAssistantProcessListArr, function( index, value ) {
			var viewedClass = '';
			if (value.viewed) {
				viewedClass = ' ttViewed';
			}
			prepareTTReportProcessIDEContent+="<p style='margin: 5px 10px 5px 5px;'><a href='#' class='ttRmv' title='Remove from list'>&nbsp;-&nbsp;</a>&nbsp;&nbsp;<a href='#' class='ttUpl' title='Move up the list' style='font-size: 11px;'>&nbsp;^&nbsp;</a>&nbsp;&nbsp;<a href='#' class='ttDownl' title='Move down the list' style='font-size: 8px;'>&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;</a>&nbsp;&nbsp;<a href=\""+ value.url+"\" class='ttPrcsRpItem"+viewedClass+"'>" + value.title +"</a></p>";
		});
	}

	if ($j('#ttReportProcessIDE').length==0){
		var ttReportProcessIDEDate = new Date();
		ttReportProcessIDEDate.setDate(ttReportProcessIDEDate.getDate() - 9); //9 Days ago, if Report done on Monday will be previous to last Saturday
		var ttReportProcessIDEDateFrom = ttReportProcessIDEDate.getDate()+'/'+ (ttReportProcessIDEDate.getMonth()+1) +'/'+ttReportProcessIDEDate.getFullYear();
		ttReportProcessIDEDate.setDate(ttReportProcessIDEDate.getDate() + 6); //3 days ago, if Report done on Monday will be last Friday

		var ttReportProcessIDEDateTo = ttReportProcessIDEDate.getDate()+'/'+ (ttReportProcessIDEDate.getMonth()+1) +'/'+ttReportProcessIDEDate.getFullYear();
		$j('.cui header.top').closest('div').append('<div id="ttReportProcessIDE" style="display: none; position: relative; margin-top: 0; margin-bottom: 20px; border: 2px ridge #F2F4F7; min-height: 100px; max-height: 185px; overflow: auto;">'+

			'<div id="reportForm">'+
			'	<fieldset class="fldsLinks" style="width: 700px;">'+
			prepareTTReportProcessIDEContent+
			'    </fieldset>    '+
			'	<fieldset class="fldsDates" style="position: absolute; top: 0; right: 10px;">'+
			'    <div class="fromTo">'+
			'    <label style="padding-right: 10px;">From:</label>'+
			'    <input type="text" value="'+ttReportProcessIDEDateFrom+'" id="fromDDMMYY" />'+
			'    <label style="padding-left:5px; padding-right: 5px;">To:</label>'+
			'    <input type="text" value="'+ttReportProcessIDEDateTo+'" id="toDDMMYY" />'+
			'   </fieldset>    '+
			'	<fieldset class="fldsButtons" style="position: absolute;top: 50px;right: 10px;">'+
			'    <div id="ttReportProcessIDEProgressIco" style="position: absolute;top: -40px;right: 0px; width: 444px; display: none;" ><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" style="width: 32px; height: 32px;" /></div>'+
			'    <input type="submit" value="Auto Process" id="ttReportProcessIDEAutoProcess" title="Press this to auto process your list" style="padding: 0 10px; color: #FF2900;" />'+
			'    <input type="submit" value="Export" id="ttReportProcessIDEExport" title="Press this to export your list" style="padding: 0 10px; color: #0F7728;" />'+
			'    <input type="submit" value="Import" id="ttReportProcessIDEImport" title="Press this to import your list" style="padding: 0 10px; color: #0F7728;" />'+
			'    <input type="file" value="Import" id="ttReportProcessIDEImportFile" title="Press this to import your list" style="color: #0F7728;width: 140px;font-size: 10px;padding: 0;background: #FFEED5; display:none;" />'+
			'    <input type="submit" value="Reset" id="ttReportProcessIDEResetProgress" title="Press this to reset the progress in your list" style="padding: 0 10px; color: #981A1A;" />'+
			'    <input type="submit" value="Add" id="ttReportProcessIDEAdd" title="Press this to add campaign (via ID) to in your list" style="padding: 0 10px; color: #AD00FF;" />'+
			'    <input type="submit" value="Update Names" id="ttReportProcessIDEUpdNames" title="Press this to update the campaign names (Live to Ended, etc) in the links you have in your list" style="padding: 0 10px; color: #FF7A00;" />'+
			'    <input type="submit" value="Update Dates" id="ttReportProcessIDEUpdDates" title="Press this to update the dates in the links you have in your list" style="padding: 0 10px; color: #000DFF;" />'+
			'    <div id="ttReportProcessIDEMsgArea" style="position: absolute;top: 24px;right: 0px; width: 526px; color: red;" ></div>'+
			'    </div>'+
			'   </fieldset>    '+
			'</div>'+
			'</div>');

		//Setup datepicker
		$j('#fromDDMMYY').datepicker({
			numberOfMonths: 2,
			firstDay: 1,
			showButtonPanel: true,
			showWeek: true,
			showCurrentAtPos: 1,
			dateFormat: "d/m/yy" });

		$j('#toDDMMYY').datepicker({
			numberOfMonths: 2,
			firstDay: 1,
			showButtonPanel: true,
			showWeek: true,
			showCurrentAtPos: 1,
			dateFormat: "d/m/yy" });
	}


});