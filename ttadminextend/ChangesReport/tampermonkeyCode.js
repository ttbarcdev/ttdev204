// ==UserScript==
// @name        T&T Changes Report
// @namespace   //
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad/launchpad.jsp
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad.do
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.js
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.ui.js
// @require     https://ttdev204.googlecode.com/svn/common/FileSaver.js
// @require     https://ttdev204.googlecode.com/svn/common/jszip.js
// @version     0.1
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

ttDynLoadLib('https://ttdev204.googlecode.com/svn/common/FileSaver.js');
ttDynLoadLib('https://ttdev204.googlecode.com/svn/common/jszip.js');

function ttChangesReportFeedProcess() {
	if ($j('#ttChangesReportFeedProcessLink').length == 0) {
		$j('<div id="ttChangesReportFeedProcessLink" style="cursor: pointer;display: inline-block;position: relative;top: 13px;color: #CCCAAA; margin-left: 20px;" title="T&T Changes Report">@CR</div>').insertAfter('.cui header.top .crumbs');
	}

	if ($j("#ttChangesReportDialog").length == 0) {
		$j('body').append('<div id="ttChangesReportDialog" title="Get a list of the last 100 changes">'
			+ '<div style="margin-top: 10px;">'
			+ '<p style="margin-top: 10px; width: 560px;">Press "<b>Generate Report</b>" for the last 100 campaign change logs to be pulled</p>'

			+ '<div id="ttChangesReportDialogLoaderIco" style="display: none;width: 48px; height: 48px; position: absolute; top: 7px; right: 35px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" /></div>'
			+ '<div id="ttChangesReportDialogStatus" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
			+ '</div>'
			+ '</div>');
	}

	$j("#ttChangesReportDialog").dialog({
		autoOpen: false,
		modal: true,
		width: 'auto',
		buttons: {
			"Generate Report": function () {

				//reset count
				$j('#ttChangesReportDialogStatus').html('');

				var ttChangesFeedIDsArr = new Array('0', '10', '20', '30', '40', '50', '60', '70', '80', '90'),
					ttChangesFeedIDsArrIdx = 0,
					ttChangesCampaignIDsArr=new Array(),
					ttChangesCampaignIDsArrIdx= 0,
					ttAllChangeLogsHTML='';

				function ttChangesReportFeedProcess() {
					if (ttChangesFeedIDsArrIdx < ttChangesFeedIDsArr.length) {
						var ttCurFeed = ttChangesFeedIDsArr[ttChangesFeedIDsArrIdx];
						$j('#ttChangesReportDialogStatus').show();
						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/newsfeeds/load_news_feeds.jsp?campaignStateFilter=approved%2Cunapproved&searchLabels=&startIndex=' + ttCurFeed,
							cache: false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							}, beforeSend: function () {
								$j('#ttChangesReportDialogLoaderIco').show();

							}, success: function (data) {
								//handle response

								var ttCurChangesReportNewsFeed = data,
									ttCurChangesReportNewsFeedIdx= 0,
									ttCurChangesReportNewsFeedCampaignID = 0;

								$ttCurChangesReportNewsFeedHTML = $j(ttCurChangesReportNewsFeed),
									$ttCurChangesReportNewsFeedHTML.find("a").each(function(){
										ttCurChangesReportNewsFeedIdx++;
										ttCurChangesReportNewsFeedCampaignID = $j(this).attr('href').replace( /^\D+/g, ''); //get number of campaign ID from the URL
										ttChangesCampaignIDsArr.push(ttCurChangesReportNewsFeedCampaignID);

										$j('#ttChangesReportDialogStatus').html('<b>Currently Pre-Processing feeds for Campaign IDs: (' + ttChangesFeedIDsArrIdx + '/' + ttChangesFeedIDsArr.length + ')</b>').show();
									});

								ttChangesFeedIDsArrIdx++;

								//move to next iteration from the list
								ttChangesReportFeedProcess();
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {

								//console.log("Error: " + errorThrown);

								$offerValue = XMLHttpRequest.responseText; //Offer HTML Code Value


								//offer code process


								//decrease index, i.e. try again
								ttChangesFeedIDsArrIdx--;
								ttChangesReportFeedProcess();

							}
						});

					} else { //last one
						$j('#ttChangesReportDialogStatus').hide();
						$j('#ttChangesReportDialogLoaderIco').hide();
						ttChangesCampaignIDsProcess(); //first run of campaign process
					}

				};

				function ttChangesCampaignIDsProcess() {
					if (ttChangesCampaignIDsArrIdx < ttChangesCampaignIDsArr.length) {
						var ttCurCID = ttChangesCampaignIDsArr[ttChangesCampaignIDsArrIdx];
						$j('#ttChangesReportDialogStatus').show();
						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/campaign/view/campaign_change_log.jsp?campaignDescriptionId=' + ttCurCID,
							cache: false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							}, beforeSend: function () {
								$j('#ttChangesReportDialogLoaderIco').show();

							}, success: function (data) {
								//handle response

								var ttChangesCampaignIDsChangeLog = data,
									ttChangesCampaignIDsChangeLogHTML='',
									ttChangesCampaignName='';

								$j('#ttChangesReportDialogStatus').html('<b>Currently processing Change Log for Campaign with ID: '+ttChangesCampaignIDsArr[ttChangesCampaignIDsArrIdx] + ': (' + ttChangesCampaignIDsArrIdx + '/' + ttChangesCampaignIDsArr.length + ')</b>').show();

								$ttChangesCampaignIDsHTML = $j(ttChangesCampaignIDsChangeLog),
									ttChangesCampaignIDsChangeLogHTML = $ttChangesCampaignIDsHTML.find("th:contains('Campaign History'):eq(0)").closest('table').clone().wrap('<div>').parent().html().replace('Campaign History','Campaign History <div class="showAllWrap">(Showing last 10 changes only. Click <a href="#" class="showAllCTA">here to show all</a>.)</div>');
								ttChangesCampaignName = $ttChangesCampaignIDsHTML.find('h1[id*="campaign"]').text();
								ttAllChangeLogsHTML=ttAllChangeLogsHTML+'\r\n<h1 class="campaignNameHead">'+(ttChangesCampaignIDsArrIdx+1)+'. Change Log for: ' + ttChangesCampaignName + ' (<span class="campaignID">'+ ttChangesCampaignIDsArr[ttChangesCampaignIDsArrIdx] +'</span>)'+'</h1>' +ttChangesCampaignIDsChangeLogHTML;

								ttChangesCampaignIDsArrIdx++;


								//move to next iteration from the list
								ttChangesCampaignIDsProcess();
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {

								//console.log("Error: " + errorThrown);

								$offerValue = XMLHttpRequest.responseText; //Offer HTML Code Value


								//offer code process


								//decrease index, i.e. try again
								ttChangesCampaignIDsArrIdx--;
								ttChangesCampaignIDsProcess();

							}
						});

					} else { //last one
						$j('#ttChangesReportDialogStatus').hide();
						$j('#ttChangesReportDialogLoaderIco').hide();
						//create zip object
						var ttChangesReportZip = new JSZip();
						ttChangesReportZip.file("TT_Changes_Report.html", '' +
							'<body>\r\n' +
							'<head>\r\n' +
							'<title>T&amp;T Change Log Report</title>\r\n'+
							'<link href="https://ttdev204.googlecode.com/svn/ttadminextend/ChangesReport/reportLoadProcessing.css?cb='+parseInt(Math.random()*99999999)+'" rel="stylesheet" type="text/css" />\r\n' +
							'<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>\r\n' +
							'<script src="https://ttdev204.googlecode.com/svn/ttadminextend/ChangesReport/reportLoadProcessing.js?cb='+parseInt(Math.random()*99999999)+'"></script>\r\n' +
							'</head>\r\n' +
							'<div style="margin: 20px 0;"><em>Note that there may be repeated campaigns in the below list. This is due to the fact that more than one change may have happened to the same campaign in the list of the last 100 changes.</em></div>\r\n'+
							ttAllChangeLogsHTML+
							'</body>');
						var ttChangesReportZipContent = ttChangesReportZip.generate({compression: "DEFLATE", type: "blob"});
						ttD = new Date();
						var ttFilenameTime = (ttD.getFullYear()*100 + ttD.getMonth()+1)*100 + ttD.getDate() + "_" + ttD.getHours() + ttD.getMinutes();
						saveAs(ttChangesReportZipContent, "TT_Changes_Report_"+ttFilenameTime+".zip");
					}

				};

				ttChangesReportFeedProcess(); //First run


			},
			"Close": function () {
				$j("#ttChangesReportDialog").dialog("close");
			}
		}
	});
}

$j(document).on('click','#ttChangesReportFeedProcessLink',function(){
	$j("#ttChangesReportDialog").dialog("open");
});

document.addEventListener('DOMContentLoaded', function(){

	//execute on doc ready + 1s
	setTimeout(function(){ttChangesReportFeedProcess();},1000);

});
