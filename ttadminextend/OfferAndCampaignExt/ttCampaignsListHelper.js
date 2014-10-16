/*var jquijsfileref=document.createElement('script');
jquijsfileref.setAttribute("type","text/javascript");
jquijsfileref.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js");
document.getElementsByTagName("head")[0].appendChild(jquijsfileref);
*/
$j( "<style>.ttUIAutoComplete .ui-autocomplete {max-height: 200px;	max-width: 690px;	overflow-y: auto;	overflow-x: hidden;	} .ttUIAutoComplete .ui-state-hover {background-color: #ccc;	} #jqUIDialAPIListGenResetLoaderIco, #jqUIDialAPIListGenBackupResetLoaderIco {display: block; width: 48px; height: 48px; position: absolute; top: 95px; right: 35px;} #jqUIDialAPIListGen {width: 560px !important;}  #jqUIDialAPIListGenResetUP, #jqUIDialAPIListGenBackupResetUP {outline: none;} #jqUIDialAPICampSearchAllForm {width: 690px; float: left; clear: left;} #jqUIDialAPICampSearchAllForm input {margin-right: 10px;} #jqUIDialAPICampSearchAllForm label {display: block; float: left; padding-top: 10px; }; #jqUIDialAPICampSearchAllProgressBar .ui-progressbar-value, #jqUIDialAPICampSearchAllProgressBarUpdBackup .ui-progressbar-value {background-color: #CCC;}</style>" ).appendTo("head");

var ttCampSearchStopAjaxLoop = false;

/*
function ttCleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}
*/

/* ****** NOTE: Assume that the tampermonkey/greasemonkey plugin has loaded jszip.js, jStorage.js and FileSaver.js - without these the below code won't work ****** */


var ttHelperCampaignListStrToArr = $j.jStorage.get("ttHelperCampaignsList");
if ($j("#ttCampList").length==0){
	$j('body').append("<div id='jqUIDialCampList' title='Select Campaings from the list. Type any part of the campaign name. Case insensitive!'><input type='text' title='Campaing List' id='ttCampList' style='width: 690px' /></div>");
}

$j("#jqUIDialCampList").dialog({
  autoOpen: false,
  modal: true,
  width: 'auto',
  buttons: {
	 "Search": function() {
		if (ttHelperCampaignListStrToArr.length>0){
			$j("#jqUIDialAPICampSearchAll").dialog("open");
			$j('button:contains("Cancel search")').hide();
			$j("#jqUIDialCampList").dialog("close");   
		}else{
			alert("Please get an updated Campaigns List, by pressing the 'Update Campaign list' button");
			return false;
		}
	},
	 "Camp. Reports": function() {
		if ($j('#ttCampList').val()!=""){
			ttCurSelCampID = $j('#ttCampList').val().slice( $j('#ttCampList').val().lastIndexOf("[") + 1,  $j('#ttCampList').val().lastIndexOf("]")).replace(/\s/g,"");
			window.location.href=location.protocol+"//"+location.host+"/admin/analytics/reports/campaignDetailedSummary.do?campaignDescriptionId="+ ttCurSelCampID +"&action=show";
			$j("#jqUIDialCampList").dialog("close");
		}else{
			alert("Please select a campaign");
		}
		
	},
	"Camp. Edit": function() {
		if ($j('#ttCampList').val()!=""){
			ttCurSelCampID = $j('#ttCampList').val().slice( $j('#ttCampList').val().lastIndexOf("[") + 1,  $j('#ttCampList').val().lastIndexOf("]")).replace(/\s/g,"");
			window.location.href=location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + ttCurSelCampID;
			$j("#jqUIDialCampList").dialog("close");
		}else{
			alert("Please select a campaign");
		}
		
	},
    "Backup": function() {
        $j.jStorage.set("ttHelperCampaignsList","");
        $j("#jqUIDialAPIListGenBackup").dialog("open");
        $j("#jqUIDialCampList").dialog("close");
    },
    "Update Campaign list": function() {
		$j.jStorage.set("ttHelperCampaignsList","");
		$j("#jqUIDialAPIListGen").dialog("open");
		$j("#jqUIDialCampList").dialog("close");
	},
	"Close": function() {
		$j("#jqUIDialCampList").dialog("close");
	}
  },
  open: function(event, ui) {
	$j('#ttCampList').val("");
  }
});

if ($j("#jqUIDialAPICampSearchAll").length==0){
	$j('body').append(
	'<div id="jqUIDialAPICampSearchAll" title="Search Through Campaigns Data (using Adobe\'s API)">'
		+'<div style="margin-top: 10px;">'
			+'<p style="margin-top: 10px;">Specify different filters for the search and then press the "Search campaigns" for API calls to be made to Adobe <br />for each campaign in the (pre-saved locally) campaigns list. It\'s a good idea to <a href="#update" id="jqUIDialAPICampSearchAllUpdate" style="outline: none;">update</a> campaign list first.</p>'
			+'<form id="jqUIDialAPICampSearchAllForm">'
				+'<div style="clear: both; float: left; font-weight: bold; margin-top: 10px;">Simple search (campaign name/id):</div>'
				+'<label for="jqUIDialAPICampSearchAllForm_CampName" class="o" style="clear: both; float: left; font-weight: bold;">Campaign Name: <input type="text" id="jqUIDialAPICampSearchAllForm_CampName" name="jqUIDialAPICampSearchAllForm_CampName" placeholder="" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_CampID" class="e"> Campaign ID: <input type="text" id="jqUIDialAPICampSearchAllForm_CampID" name="jqUIDialAPICampSearchAllForm_CampID" placeholder="" /></label>'
				+'<div style="clear: both; float: left; font-weight: bold; margin-top: 10px;">'
					+'<p style="margin-bottom: 10px;"><b>OR</b></p>'
					+'Advanced search (any part of the location/experience/offer name, target value or offer id):'
				+'</div>'
				+'<label for="jqUIDialAPICampSearchAllForm_LocationName" class="o" style="clear: both; float: left; color: #8F00FF; font-weight: bold;">* Location Name: <input type="text" id="jqUIDialAPICampSearchAllForm_LocationName" name="jqUIDialAPICampSearchAllForm_LocationName" placeholder="eg: Global_Mbox" style="margin-left: 17px; width: 170px;" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_LocationTargetValue" class="e" style="color: #8F00FF;"> Location Target Value: <input type="text" id="jqUIDialAPICampSearchAllForm_LocationTargetValue" name="jqUIDialAPICampSearchAllForm_LocationTargetValue" placeholder="eg: /P1242557947640" style="margin-left: 16px;"/></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_ExperienceName" class="o" style="clear: both; float: left; color: #4EA200;font-weight: bold;">* Experience Name: <input type="text" id="jqUIDialAPICampSearchAllForm_ExperienceName" name="jqUIDialAPICampSearchAllForm_ExperienceName" placeholder="eg: Experience A" style="width: 170px;" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_ExperienceTargetValue" class="e" style="color: #4EA200;"> Experience Target Value: <input type="text" id="jqUIDialAPICampSearchAllForm_ExperienceTargetValue" name="jqUIDialAPICampSearchAllForm_ExperienceTargetValue" placeholder="ttqa value or user-agent" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_OfferName" class="o" style="clear: both; float: left; color: #3EA1CB; width: 413px;font-weight: bold;">* Offer Name: <input type="text" id="jqUIDialAPICampSearchAllForm_OfferName" name="jqUIDialAPICampSearchAllForm_OfferName" placeholder="eg: Pers_AccList_Chevron" style="width: 170px; margin-left: 41px;"/></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_OfferID" class="o" style="clear: none; float: left; color: #3EA1CB;">Offer ID: <input type="text" id="jqUIDialAPICampSearchAllForm_OfferID" name="jqUIDialAPICampSearchAllForm_OfferID" placeholder="eg: 24870" style="width: 140px;" /></label>'
				+'<div style="clear: both;margin-top: 20px;float: left;font-weight: bold;border-top: 1px solid #CCC;width: 100%;padding-top: 10px;">Applies to both Simple and Advanced search:</div>'
				+'<input type="checkbox" checked="checked" id="jqUIDialAPICampSearchAllForm_ApprovedOnly" name="jqUIDialAPICampSearchAllForm_ApprovedOnly" style="clear: both; float: left; margin-top: 13px;"/><label for="jqUIDialAPICampSearchAllForm_ApprovedOnly" class="e" style="clear: none; float: left; color: #000; font-weight: bold;">Approved Only <span style="font-size: 9px;">(unselect to search Saved/Unapproved too; note that Deactivated are always excluded)</span></label>'
				+'<div style="height: 1px;border-bottom: 1px solid #CCC;float: left;clear: both;width: 100%;margin-top: 5px;"></div>'				
			+'</form>'
			+'<p style="margin-top: 10px; clear: left; float: left; font-size: 11px;">All coloured lines of filters are <b>independent groups of filters</b>, and the results from each group will be <b>added</b> to the global result. <br />Each matched campaign will be listed only once, and coloured based on the first matching filter.<br /><span style="color: #3EA1CB;">If offer naming conventions have been followed, you can search for DR number, as part of the offer name.</span></p>'
			+'<div id="jqUIDialAPICampSearchAllLoaderIco" style="display: none; float: right; position: relative; top: 40px; right: 0;"><img src="https://t-and-t-tool.googlecode.com/svn/trunk/bs_ajax_loader.gif" /></div>'
			+'<div id="jqUIDialAPICampSearchAllStatus" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
			+'<div id="jqUIDialAPICampSearchAllProgressBar" style="padding-top: 10px; display: none; float: none; clear: both; width: 690px; height: 20px;"></div>'			
			+'<div id="jqUIDialAPICampSearchAllResultHead" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Campaigns found (<span class="numb">0</span>) <a href="#" id="ttHidCampAllowEdit">:</a> </div>'			
			+'<div id="jqUIDialAPICampSearchAllResult" style="display: none; overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'
		+'</div>'
	+'</div>'
	);
	/*
	$j('#jqUIDialAPICampSearchAllForm_CampName').click(function(){$j('#jqUIDialAPICampSearchAllForm_CampID').val("")});
	$j('#jqUIDialAPICampSearchAllForm_CampName').keypress(function(){$j('#jqUIDialAPICampSearchAllForm_CampID').val("")});
	$j('#jqUIDialAPICampSearchAllForm_CampID').click(function(){$j('#jqUIDialAPICampSearchAllForm_CampName').val("")});
	$j('#jqUIDialAPICampSearchAllForm_CampID').keypress(function(){$j('#jqUIDialAPICampSearchAllForm_CampName').val("")});
	*/
	$j('#ttHidCampAllowEdit').click(function(){
		$j('#jqUIDialAPICampSearchAllResult').attr('contenteditable','true');
	});
	
	$j('#jqUIDialAPICampSearchAllUpdate').click(function(){
		$j("#jqUIDialAPICampSearchAll").dialog("close");
		$j("#jqUIDialAPIListGen").dialog("open");
	});
	
	$j("#jqUIDialAPICampSearchAllProgressBar").progressbar({
      value: false
    });
}

$j("#jqUIDialAPICampSearchAll").dialog({
  autoOpen: false,
  modal: true,
  width: 'auto',
  height:'auto',
  position: 'center',
  buttons: {
  "Cancel search": function(){
		ttCampSearchStopAjaxLoop = true;		
		$j('#jqUIDialAPICampSearchAllLoaderIco').hide();
		$j('#jqUIDialAPICampSearchAllStatus').hide();
		$j('#jqUIDialAPICampSearchAllProgressBar').hide();
		if (parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())==0){
			$j('#jqUIDialAPICampSearchAllResult').hide();
		}
	},		   
	"Search campaigns": function() {	
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {			
			//nothing here
		}else{
			var ttCListAPIUserConf = prompt("No API User has been stored, please provide");
			if (ttCListAPIUserConf){
				$j.jStorage.set("ttHelperCampaignsListAPIUser",ttCListAPIUserConf);
			}
			var ttCListAPIPassConf = prompt("No API Pass has been stored, please provide");
			if (ttCListAPIPassConf){
				$j.jStorage.set("ttHelperCampaignsListAPIPass",ttCListAPIPassConf);
			}
			
		}
		//reset count
		$j('#jqUIDialAPICampSearchAllResultHead .numb').html(0);
		$j('button:contains("Cancel search")').show();

		
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass") && $j.jStorage.get("ttHelperCampaignsList")) {			

			var ttHelperCampaignListArr=new Array(),
				elmtch="", elmtchCID=0, ajaxArrIdx = 0, elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";
			ttHelperCampaignListArr = $j.jStorage.get("ttHelperCampaignsList");
			//Loop through all campaigns
			$j('#jqUIDialAPICampSearchAllResult').html("");
			
			ttHelperCampaignListArr.sort(); //alpha sort
			
			ttCampSearchStopAjaxLoop = false;
			
			//Simple Search
			//loop through locally saved
			if (($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase()!="") || ($j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase()!="")){ //match on campaign name/id
				$j('#jqUIDialAPICampSearchAllLoaderIco').show();
				$j('#jqUIDialAPICampSearchAllStatus').show();
				
				ttHelperCampaignListArr.each(function(el){
					elmtch = el.match(/\d+/g);
					elmtchCID = parseInt(elmtch[elmtch.length-1]);
					elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";
	
					$j('#jqUIDialAPICampSearchAllResultHead').show();
					$j('#jqUIDialAPICampSearchAllResult').show();
					
					
					//Skip if Saved/Unapproved
					if (($j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked') && $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID] && $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpState=="approved") || !$j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked')){
						
						if ($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase()!="" || $j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase()!=""){
							
							if ($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase()!="" && el.toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase())!=-1){
								if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+elmtchCID+" ]")==-1){
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
										elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
										elmtchTitle = "State: " + elmtchExtData.cmpState 
																+ " | Enabled: " + elmtchExtData.cmpEnabled
																+ " | Start Date: " + elmtchExtData.cmpStartDate
																+ " | End Date: " + elmtchExtData.cmpEndDate;
										if (elmtchExtData.cmpState=="approved"){
											elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
										}else if (elmtchExtData.cmpState=="saved"){
											elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
										}else{
											elmtchState="";
										}
									}
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
										elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
									}
									
									$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
									$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
									
									$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
								}							
							}
							
							if ($j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase()!="" && elmtchCID.toString().indexOf($j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase())!=-1){
								if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+elmtchCID+" ]")==-1){
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
										elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
										elmtchTitle = "State: " + elmtchExtData.cmpState 
																+ " | Enabled: " + elmtchExtData.cmpEnabled
																+ " | Start Date: " + elmtchExtData.cmpStartDate
																+ " | End Date: " + elmtchExtData.cmpEndDate;
										if (elmtchExtData.cmpState=="approved"){
											elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
										}else if (elmtchExtData.cmpState=="saved"){
											elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
										}else{
											elmtchState="";
										}
									}
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
	elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
}
									$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" + "<br />");
									$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
									$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
								}							
							}
							
							
						}
					
					
					}
				
				});
				$j('#jqUIDialAPICampSearchAllLoaderIco').hide();
				$j('#jqUIDialAPICampSearchAllStatus').hide();
				$j('#jqUIDialAPICampSearchAllProgressBar').hide();
				$j('button:contains("Cancel search")').hide();
			
			}else{
				//Reset ttHelperCampaignsListExtData, as it will be filled again by the below API calls
				//$j.jStorage.set("ttHelperCampaignsListExtData",""); // we'll update only in Get campaigns dialog
				
				//Advanced Search
				//ajax get on all from the locally saved					
				function ttHelperCampaignListArrSearch(){
					if (ajaxArrIdx < ttHelperCampaignListArr.length){
						var ttCurCampaign = ttHelperCampaignListArr[ajaxArrIdx++],
							el=ttCurCampaign,
							elmtch = el.match(/\d+/g);
							elmtchCID = parseInt(elmtch[elmtch.length-1]);
							elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";
							$j('#jqUIDialAPICampSearchAllResultHead').show();
							$j('#jqUIDialAPICampSearchAllResult').show();

						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=1',
							cache:false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							},
							beforeSend: function(){
								if (ttCampSearchStopAjaxLoop==true){return false;}
								$j('#jqUIDialAPICampSearchAllLoaderIco').show();
								$j('#jqUIDialAPICampSearchAllStatus').html('<b>Currently processing: ('+ajaxArrIdx+'/'+ ttHelperCampaignListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + el + '</p>').show();
								//Set progress bar
								$j("#jqUIDialAPICampSearchAllProgressBar").progressbar( "option", {
								  value: ajaxArrIdx,
								  max: ttHelperCampaignListArr.length
								});
								$j("#jqUIDialAPICampSearchAllProgressBar").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
								$j("#jqUIDialAPICampSearchAllProgressBar").show();
							},
							success:function(data){
								//handle response
								
								var xmlDoc = data,
								$xml = $j(xmlDoc),
								$cmpID = $xml.find("id:first").text(), //Campaign ID,
								$cmpName = $xml.find("name:first").text(), //Campaign Name
								$cmpState = $xml.find("state:first").text(), //Campaign State
								$cmpEnabled = $xml.find("enabled:first").text(), //Campaign Enabled
								$cmpStartDate = $xml.find("startDate:first").text(), //Campaign startDate
								$cmpEndDate = $xml.find("endDate:first").text(), //Campaign endDate
								$locations = $xml.find("displayLocations location"), //Locations
								$experiences = $xml.find("branches branch"); //Experiences
								$offers = $xml.find("branches branch offers offerManaged"); //Offers
								
								//Check campaign state, and save in local data, so we can have info on saved/approved
								// we'll update only in Get campaigns dialog
								/*
								var ttHelperCampaignsListExtDataArr = $j.jStorage.get("ttHelperCampaignsListExtData"),
									ttHelperCampaignsListExtDataArrVal = {cmpID: $cmpID, cmpName: $cmpName, cmpState: $cmpState, cmpEnabled: $cmpEnabled, cmpStartDate: $cmpStartDate, cmpEndDate: $cmpEndDate};
								if (typeof ttHelperCampaignsListExtDataArr === "undefined" || ttHelperCampaignsListExtDataArr==""){
									ttHelperCampaignsListExtDataArr = new Array;
								}
								ttHelperCampaignsListExtDataArr[parseInt($cmpID)] = ttHelperCampaignsListExtDataArrVal;
								$j.jStorage.set("ttHelperCampaignsListExtData",ttHelperCampaignsListExtDataArr); 
								*/
								
								//Skip if Saved/Unapproved
								if (($j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked') && $cmpState == "approved") || !$j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked')){
									//Loop through Locations		
									if ($j('#jqUIDialAPICampSearchAllForm_LocationName').val()!="" || $j('#jqUIDialAPICampSearchAllForm_LocationTargetValue').val()!=""){
										$locations.each(function() {
											
											var i = $xml.find("displayLocations location").index(this);
											//Location name match
											if ($j('#jqUIDialAPICampSearchAllForm_LocationName').val()!="" && $j(this).find("targetExpression targetMbox name").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_LocationName').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}

													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #8F00FF; font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
											//Location target value match
											if ($j('#jqUIDialAPICampSearchAllForm_LocationTargetValue').val()!="" && $j(this).find("targetExpression targetParameter values").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_LocationTargetValue').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}
													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #8F00FF; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
										});	
									}
									
									//Loop through Experiences
									if ($j('#jqUIDialAPICampSearchAllForm_ExperienceName').val()!="" || $j('#jqUIDialAPICampSearchAllForm_ExperienceTargetValue').val()!=""){
										$experiences.each(function() {							
											var i = $xml.find("branches branch").index(this);
											//Experiences name match
											if ($j('#jqUIDialAPICampSearchAllForm_ExperienceName').val()!="" && $j(this).find("name:first").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_ExperienceName').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}

													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #4EA200; font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
											//Experiences target value match
											if ($j('#jqUIDialAPICampSearchAllForm_ExperienceTargetValue').val()!="" && $j(this).find("targetExpression targetParameter values").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_ExperienceTargetValue').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}

													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #4EA200; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
										});	
									}
									
									//Loop through Offers
									if ($j('#jqUIDialAPICampSearchAllForm_OfferName').val()!="" || $j('#jqUIDialAPICampSearchAllForm_OfferID').val()!="" || $j('#jqUIDialAPICampSearchAllForm_OfferContent').val()!="" ){
										$offers.each(function() {							
											var i = $xml.find("branches branch offers offerManaged").index(this);
											//Offer name match
											if ($j('#jqUIDialAPICampSearchAllForm_OfferName').val()!="" && $j(this).find("name:first").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_OfferName').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}
													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #3EA1CB; font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
											//Offer ID match
											if ($j('#jqUIDialAPICampSearchAllForm_OfferID').val()!="" && $j(this).find("id:first").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_OfferID').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}
													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #3EA1CB; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}								
										});	
									}
								
								}
	
								//move to next iteration (campaign) from the list
								ttHelperCampaignListArrSearch();
							
							}
						});
					}else{ //last one
						$j('#jqUIDialAPICampSearchAllLoaderIco').hide();
						$j('#jqUIDialAPICampSearchAllStatus').hide();
						$j('#jqUIDialAPICampSearchAllProgressBar').hide();
						if (parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())==0){
							$j('#jqUIDialAPICampSearchAllResult').hide();
						}
						$j('button:contains("Cancel search")').hide();
					}
				
				}
				ttHelperCampaignListArrSearch(); //First run			
			}						
		}
		
		
	},	
	"Close": function() {
	  $j("#jqUIDialAPICampSearchAll").dialog("close");
	  $j("#jqUIDialCampList").dialog("open");
	}
  }
});



if ($j("#jqUIDialAPIListGen").length==0){
	$j('body').append(
	'<div id="jqUIDialAPIListGen" title="Getting Campaign List (using Adobe\'s API)">'
		+'<div style="margin-top: 10px;">'
			+'<p style="margin-top: 10px;">Press "Get campaigns" for API call to be made to Adobe and the campaigns list to be pulled. <br /><br />Once that has been done, this dialog will close automatically, and you can use <br />the updated campaign list.</p>'
			+'<p style="margin-top: 10px; font-size: 10px;">If you have incorrect API user/pass saved, you can reset them using this link: <a href="#resetuserPass" id="jqUIDialAPIListGenResetUP">Reset API user/pass</a>. <br /> Next time you use the "Get campaigns" button, you\'ll be prompted to confirm them again. <br />This would also happen if you haven\'t specified API user/pass yet.</p>'
			+'<div id="jqUIDialAPIListGenResetLoaderIco" style="display: none;"><img src="https://t-and-t-tool.googlecode.com/svn/trunk/bs_ajax_loader.gif" /></div>'
		+'<div id="jqUIDialAPICampSearchAllStatusUpd" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
		+'<div id="jqUIDialAPICampSearchAllProgressBarUpd" style="padding-top: 10px; display: none; float: none; clear: both; width: 560px; height: 20px;"></div>'			
		/*+'<div id="jqUIDialAPICampSearchAllResultHeadUpd" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Campaigns found (<span class="numb">0</span>)</div>'*/
		+'<div id="jqUIDialAPICampSearchAllResult" style="overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'
		+'</div>'
	+'</div>');
	$j('#jqUIDialAPIListGenResetUP').click(function(e){
		e.preventDefault();
		$j.jStorage.set("ttHelperCampaignsListAPIUser","");
		$j.jStorage.set("ttHelperCampaignsListAPIPass","");
		return false;
	});	
	$j("#jqUIDialAPICampSearchAllProgressBarUpd").progressbar({
      value: false
    });
}

$j("#jqUIDialAPIListGen").dialog({
  autoOpen: false,
  modal: true,
  width: 'auto',
  buttons: {			   
	"Get campaigns": function() {	
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {			
			//nothing here
		}else{
			var ttCListAPIUserConf = prompt("No API User has been stored, please provide");
			if (ttCListAPIUserConf){
				$j.jStorage.set("ttHelperCampaignsListAPIUser",ttCListAPIUserConf);
			}
			var ttCListAPIPassConf = prompt("No API Pass has been stored, please provide");
			if (ttCListAPIPassConf){
				$j.jStorage.set("ttHelperCampaignsListAPIPass",ttCListAPIPassConf);
			}
			
		}
		
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {			
		$j('#jqUIDialAPIListGenResetLoaderIco').show();
			$j.get( 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=campaignList&state=saved,activated&environment=Production&version=1', function( data ) {
				var ttHelperCampaignList=new Array(),
					ttHelperCampaignListValueToPush = {},
					xmlDoc = data,
					$xml = $j(xmlDoc),
					$campaigns = $xml.find("campaign");
				
				$campaigns.each(function() {
					var i = $xml.find("campaign").index(this);
					ttHelperCampaignListValueToPush = $j(this).find("name").text() + " [ " +  $j(this).find("id").text() + " ]";
				
					ttHelperCampaignList.push(ttHelperCampaignListValueToPush);
				});
				$j.jStorage.set("ttHelperCampaignsList",ttHelperCampaignList);
				
				//Reset ttHelperCampaignsListExtData, as it will be filled again by the below API calls
				$j.jStorage.set("ttHelperCampaignsListExtData","");
				var ttHelperCampaignListArr=new Array(),
					elmtch="", elmtchCID=0, ajaxArrIdxUp = 0, elmtchState="", elmtchExtData = {};
				ttHelperCampaignListArr = $j.jStorage.get("ttHelperCampaignsList");
				
				//ajax get on all from the locally saved					
				function ttHelperCampaignListArrSearchUpd(){
					if (ajaxArrIdxUp < ttHelperCampaignListArr.length){
						var ttCurCampaign = ttHelperCampaignListArr[ajaxArrIdxUp++],
							el=ttCurCampaign,
							elmtch = el.match(/\d+/g);
							elmtchCID = parseInt(elmtch[elmtch.length-1]);
							elmtchTitle="", elmtchState="", elmtchExtData = {};
							/*$j('#jqUIDialAPICampSearchAllResultHeadUpd').show();*/
							$j('#jqUIDialAPICampSearchAllResult').show();
				
						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=1',
							cache:false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							},
							beforeSend: function(){
								$j('#jqUIDialAPIListGenResetLoaderIco').show();
								$j('#jqUIDialAPICampSearchAllStatusUpd').html('<b>Currently processing: ('+ajaxArrIdxUp+'/'+ ttHelperCampaignListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + el + '</p>').show();
								//Set progress bar
								$j("#jqUIDialAPICampSearchAllProgressBarUpd").progressbar( "option", {
								  value: ajaxArrIdxUp,
								  max: ttHelperCampaignListArr.length
								});
								$j("#jqUIDialAPICampSearchAllProgressBarUpd").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
								$j("#jqUIDialAPICampSearchAllProgressBarUpd").show();
							},
							success:function(data){
								//handle response
								
								var xmlDoc = data,
								$xml = $j(xmlDoc),
								$cmpID = $xml.find("id:first").text(), //Campaign ID,
								$cmpName = $xml.find("name:first").text(), //Campaign Name
								$cmpState = $xml.find("state:first").text(), //Campaign State
								$cmpEnabled = $xml.find("enabled:first").text(), //Campaign Enabled
								$cmpStartDate = $xml.find("startDate:first").text(), //Campaign startDate
								$cmpEndDate = $xml.find("endDate:first").text(), //Campaign endDate
								$cmpOfferNames = $xml.find("offerManaged name"), //Offer Managed Names
								$cmpOfferNamesString = '';
								
								//Get list of offers in the current campaign
								$cmpOfferNames.each(function() {
									$cmpOfferNamesString+=$j(this).text()+'#offsep#'; //comma separated value
								})
								
								//Check campaign state, and save in local data, so we can have info on saved/approved
								var ttHelperCampaignsListExtDataArr = $j.jStorage.get("ttHelperCampaignsListExtData"),
									ttHelperCampaignsListExtDataArrVal = {cmpID: $cmpID, cmpName: $cmpName, cmpState: $cmpState, cmpEnabled: $cmpEnabled, cmpStartDate: $cmpStartDate, cmpEndDate: $cmpEndDate, cmpOfferNamesString: $cmpOfferNamesString.substr(0,$cmpOfferNamesString.length-8)};
								if (typeof ttHelperCampaignsListExtDataArr === "undefined" || ttHelperCampaignsListExtDataArr==""){
									ttHelperCampaignsListExtDataArr = new Array;
								}
								ttHelperCampaignsListExtDataArr[parseInt($cmpID)] = ttHelperCampaignsListExtDataArrVal;
								$j.jStorage.set("ttHelperCampaignsListExtData",ttHelperCampaignsListExtDataArr);
								
								/*$j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())+1);*/
								//move to next iteration (campaign) from the list
								ttHelperCampaignListArrSearchUpd();
							
							}
						});
					}else{ //last one
						$j('#jqUIDialAPIListGenResetLoaderIco').hide();
						$j('#jqUIDialAPICampSearchAllStatusUpd').hide();
						$j('#jqUIDialAPICampSearchAllProgressBarUpd').hide();
						/*if (parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())==0){
							$j('#jqUIDialAPICampSearchAllResultUpd').hide();
						}*/
						
						
						//$j('#jqUIDialAPIListGenResetLoaderIco').hide();
						$j("#jqUIDialAPIListGen").dialog("close");
						ttHelperCampaignListStrToArr = $j.jStorage.get("ttHelperCampaignsList");
						$j("#ttCampList").autocomplete({
							source: ttHelperCampaignListStrToArr,
						}).data( "autocomplete" )._renderItem = function( ul, item ) {
							var elmtch = item.label.match(/\d+/g),
								elmtchCID = parseInt(elmtch[elmtch.length-1]),
								elmtchTitle="", elmtchState="", elmtchExtData = {};
								
							if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
								elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
								elmtchTitle = "State: " + elmtchExtData.cmpState 
														+ " | Enabled: " + elmtchExtData.cmpEnabled
														+ " | Start Date: " + elmtchExtData.cmpStartDate
														+ " | End Date: " + elmtchExtData.cmpEndDate;
								if (elmtchExtData.cmpState=="approved"){
									elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
								}else if (elmtchExtData.cmpState=="saved"){
									elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
								}else{
									elmtchState="";
								}
							}
							
							return $j( "<li></li>" ).data("item.autocomplete", item)
							.append( "<a title=\""+elmtchTitle+"\">" + elmtchState + item.label + "</a>")
							.appendTo(ul);
						};
						
						
						$j("#jqUIDialCampList").dialog("open");
					}
				
				}
				ttHelperCampaignListArrSearchUpd(); //First run		
				
			});
		}
	},	
	"Close": function() {
	  $j("#jqUIDialAPIListGen").dialog("close");
	}
  }
});


if ($j("#jqUIDialAPIListGenBackup").length==0){
    $j('body').append(
            '<div id="jqUIDialAPIListGenBackup" title="Getting Campaign List (using Adobe\'s API) for Backup">'
            +'<div style="margin-top: 10px;">'
            +'<p style="margin-top: 10px;">Press "Backup campaigns" for API call to be made to Adobe and the campaigns list to be pulled. <br /><br />Once that has been done, this dialog will close automatically.<br/><br/>Each campaign\'s setup will be saved as XML file, as well as human-readable<br/>  campaign summary in a TXT file.</p>'
            +'<p style="margin-top: 10px; font-size: 10px;">If you have incorrect API user/pass saved, you can reset them using this link: <a href="#resetuserPass" id="jqUIDialAPIListGenBackupResetUP">Reset API user/pass</a>. <br /> Next time you use the "Backup campaigns" button, you\'ll be prompted to confirm them again. <br />This would also happen if you haven\'t specified API user/pass yet.</p>'
            +'<div id="jqUIDialAPIListGenBackupResetLoaderIco" style="display: none;"><img src="https://t-and-t-tool.googlecode.com/svn/trunk/bs_ajax_loader.gif" /></div>'
            +'<div id="jqUIDialAPICampSearchAllStatusUpdBackup" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
            +'<div id="jqUIDialAPICampSearchAllProgressBarUpdBackup" style="padding-top: 10px; display: none; float: none; clear: both; width: 560px; height: 20px;"></div>'
            /*+'<div id="jqUIDialAPICampSearchAllResultHeadUpd" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Campaigns found (<span class="numb">0</span>)</div>'*/
            /*+'<div id="jqUIDialAPICampSearchAllResultBackup" style="overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'*/
            +'</div>'
            +'</div>');
    $j('#jqUIDialAPIListGenBackupResetUP').click(function(e){
        e.preventDefault();
        $j.jStorage.set("ttHelperCampaignsListAPIUser","");
        $j.jStorage.set("ttHelperCampaignsListAPIPass","");
        return false;
    });
    $j("#jqUIDialAPICampSearchAllProgressBarUpdBAckup").progressbar({
        value: false
    });
}

$j("#jqUIDialAPIListGenBackup").dialog({
    autoOpen: false,
    modal: true,
    width: 'auto',
    buttons: {
        "Backup campaigns": function() {
            if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {
                //nothing here
            }else{
                var ttCListAPIUserConf = prompt("No API User has been stored, please provide");
                if (ttCListAPIUserConf){
                    $j.jStorage.set("ttHelperCampaignsListAPIUser",ttCListAPIUserConf);
                }
                var ttCListAPIPassConf = prompt("No API Pass has been stored, please provide");
                if (ttCListAPIPassConf){
                    $j.jStorage.set("ttHelperCampaignsListAPIPass",ttCListAPIPassConf);
                }

            }

            if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {
                $j('#jqUIDialAPIListGenBackupResetLoaderIco').show();
                $j.get( 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=campaignList&state=saved,activated&environment=Production&version=1', function( data ) {
                    var ttHelperCampaignList=new Array(),
                        ttHelperCampaignListValueToPush = {},
                        xmlDoc = data,
                        $xml = $j(xmlDoc),
                        $campaigns = $xml.find("campaign");

                    $campaigns.each(function() {
                        var i = $xml.find("campaign").index(this);
                        ttHelperCampaignListValueToPush = $j(this).find("name").text() + " [ " +  $j(this).find("id").text() + " ]";

                        ttHelperCampaignList.push(ttHelperCampaignListValueToPush);
                    });
                    $j.jStorage.set("ttHelperCampaignsList",ttHelperCampaignList);

                    //Reset ttHelperCampaignsListExtData, as it will be filled again by the below API calls
                    $j.jStorage.set("ttHelperCampaignsListExtData","");

                    //create zip object
                    var ttCampaignsBackupZip = new JSZip();

                    var ttHelperCampaignListArr=new Array(),
                        elmtch="", elmtchCID=0, ajaxArrIdxUp = 0, elmtchState="", elmtchExtData = {};
                    ttHelperCampaignListArr = $j.jStorage.get("ttHelperCampaignsList");

                    //ajax get on all from the locally saved
                    function ttHelperCampaignListArrSearchUpdBackup(){
                        if (ajaxArrIdxUp < ttHelperCampaignListArr.length){
                            var ttCurCampaign = ttHelperCampaignListArr[ajaxArrIdxUp++],
                                el=ttCurCampaign,
                                elmtch = el.match(/\d+/g);
                            elmtchCID = parseInt(elmtch[elmtch.length-1]);
                            elmtchTitle="", elmtchState="", elmtchExtData = {};
                            /*$j('#jqUIDialAPICampSearchAllResultHeadUpd').show();*/
                            /*$j('#jqUIDialAPICampSearchAllResultBackup').show();*/

                            //debug
                            /*
                            if (elmtchCID != "10480"){
                                //move to next iteration (campaign) from the list
                                ttHelperCampaignListArrSearchUpdBackup();
                                return false;
                            }
                            */



                            $j.ajax({
                                url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=6',
                                cache:false,
                                dataType: "xml",
                                //timeout:18000,
                                xhrFields: {
                                    withCredentials: true
                                },
                                beforeSend: function(){
                                    $j('#jqUIDialAPIListGenBackupResetLoaderIco').show();
                                    $j('#jqUIDialAPICampSearchAllStatusUpdBackup').html('<b>Currently processing: ('+ajaxArrIdxUp+'/'+ ttHelperCampaignListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + el + '</p>').show();
                                    //Set progress bar
                                    $j("#jqUIDialAPICampSearchAllProgressBarUpdBackup").progressbar( "option", {
                                        value: ajaxArrIdxUp,
                                        max: ttHelperCampaignListArr.length
                                    });

                                    /*

                                    if (ajaxArrIdxUp%401==0){
                                        ttCampaignsBackupZipContent = ttCampaignsBackupZip.generate({compression: "DEFLATE"});
                                        location.href="data:application/zip;base64,"+ttCampaignsBackupZipContent;
                                        //start a new Zip every 500 offers - prevents browser from crashing
                                        ttCampaignsBackupZip = new JSZip();
                                    }
                                    */

                                    $j("#jqUIDialAPICampSearchAllProgressBarUpdBackup").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
                                    $j("#jqUIDialAPICampSearchAllProgressBarUpdBackup").show();
                                },
                                success:function(data){
                                    //handle response

                                    var xmlDoc = data,
                                        $xml = $j(xmlDoc),
                                        $xmlAsText = new XMLSerializer().serializeToString($xml[0]),
                                        $cmpID = $xml.find("id:first").text(), //Campaign ID,
                                        $cmpName = $xml.find("name:first").text(), //Campaign Name
                                        $cmpPrior = $xml.find("priority:first").text(), //Campaign Priority
                                        $cmpState = $xml.find("state:first").text(), //Campaign State
                                        $cmpEnabled = $xml.find("enabled:first").text(), //Campaign Enabled
                                        $cmpStartDate = $xml.find("startDate:first").text(), //Campaign startDate
                                        $cmpEndDate = $xml.find("endDate:first").text(), //Campaign endDate
                                        $cmpOfferNames = $xml.find("offerManaged name"), //Offer Managed Names
                                        $cmpOfferNamesString = '',
                                        $cmpEasyDesc = '',
                                        $cmpLevelTarg = '', $cmpLocations = '', $cmpLocationsArr = new Array(),  $cmpExps = '', $cmpExpsTargetArr = new Array(), $cmpExpsOfferArr = new Array(),
                                        $cmpExpsBrName, $cmpExpsBrID, $cmpExpsBrExpr, $cmpExpsBrOffers, $cmpExpsBrTargExp, $cmpExpsBrOffers, $cmpExpsBrOffersDispLoc, $cmpExpsBrOfferName, $cmpExpsBrOfferID;

                                    $cmpLevelTarg = "\r\n\tPercent included: " + $xml.find("entry:first percentIncluded:first").text()
                                        + "\r\n\tMbox targeted: " + $xml.find("entry:first targetExpression:first targetMbox:first name:first").text();

                                    //Get list of campaign target options in the current campaign
                                    $xml.find("entry:first targetExpression:first targetParameter").each(function(i,a) {
                                        $cmpLevelTarg+="\r\n\tTargeting parameters: \r\n\t\ttype: " + $j(this).find('>type').text() + "\r\n\t\tname: " + $j(this).find('>name').text() + "\r\n\t\tmatch: " + $j(this).find('>matcher').text() + "\r\n\t\tvalue(s): ";
                                        $j(this).find('>values').each(function(ii,aa) {
                                            $j(this).find(">string").each(function(iii,aa) {
                                                $cmpLevelTarg+="\r\n\t\t\t" + $j(this).text();
                                            })
                                        })
                                    })

                                    //Get list of campaign target options in the current campaign
                                    $xml.find("displayLocations:first location targetExpression").each(function(i,a) {
                                        $cmpLocations+="\r\n\r\n\tName: " + $j(this).find('>targetMbox >name').text();
                                        $cmpLocationsArr.push($j(this).find('>targetMbox >name').text());

                                        $j(this).find('>targetParameter').each(function(iiiii,aa) {
                                            $cmpLocations+="\r\n\t\tTargeting parameters: \r\n\t\t\ttype: " + $j(this).find('>type').text() + "\r\n\t\t\tname: " + $j(this).find('>name').text() + "\r\n\t\t\tmatch: " + $j(this).find('>matcher').text() + "\r\n\t\t\tvalue(s): ";

                                            $j(this).find('>values').each(function(ii,aa) {
                                                $j(this).find(">string").each(function(iii,aa) {
                                                    $cmpLocations+="\r\n\t\t\t\t" + $j(this).text();
                                                })
                                            })

                                        })
                                    })


                                    //Get list of campaign experiences
                                    $xml.find("branches:first branch").each(function(i,a) {
                                        $cmpExpsBrName =  $j(this).find(">name").text();
                                        $cmpExpsBrID =  $j(this).find(">id").text();
                                        $cmpExpsBrTargExp = '', $cmpExpsBrOffers='';

                                        $cmpExps+= "\r\n\r\n\tName: " + $cmpExpsBrName + "\r\n\tid: " + $cmpExpsBrID;

                                        //Experience targeting
                                        $j(this).find(">targetExpression >targetParameter").each(function(ii,aa) {
                                            $cmpExpsBrTargExp="\r\n\t\tTargeting parameters: \r\n\t\t\ttype: " + $j(this).find('>type').text() + "\r\n\t\t\tname: " + $j(this).find('>name').text() + "\r\n\t\t\tmatch: " + $j(this).find('>matcher').text() + "\r\n\t\t\tvalue(s): ";
                                            $j(this).find('>values').each(function(iii,aa) {
                                                $j(this).find(">string").each(function(iiii,aa) {
                                                    $cmpExpsBrTargExp+="\r\n\t\t\t\t" + $j(this).text();
                                                })
                                            })
                                            $cmpExpsTargetArr.push($cmpExpsBrTargExp);
                                            $cmpExps+=$cmpExpsBrTargExp;
                                        })

                                        $cmpExps+= "\r\n\t\tOffers: ";

                                        //Experience offers
                                        $j(this).find(">offers").each(function(ii,aa) {
                                            //Experience locations
                                            $j(this).find(">displayLocation").each(function(iii,aa) {
                                                $cmpExpsBrOffersDispLoc = $cmpLocationsArr[(parseInt($j(this).attr("location").replace('/campaign/displayLocations/location[','').replace(']',''))-1)];

                                                if ($j(this).find('>offerManaged').length>0) { /* non default offer */
                                                    $cmpExpsBrOfferName = $j(this).find('>offerManaged >name').text();
                                                    $cmpExpsBrOfferID = $j(this).find('>offerManaged >id').text();
                                                }else if ($j(this).find('>offerDefault').length>0){ /* default offer */
                                                    $cmpExpsBrOfferName = "Default";
                                                    $cmpExpsBrOfferID = "n/a";
                                                }else{ /* don't know */
                                                    $cmpExpsBrOfferName = "n/a";
                                                    $cmpExpsBrOfferID = "n/a";
                                                }

                                                $cmpExps+="\r\n\r\n\t\t\tlocation: " + $cmpExpsBrOffersDispLoc + "\r\n\t\t\tname: " + $cmpExpsBrOfferName + "\r\n\t\t\tid: " + $cmpExpsBrOfferID;

                                            })

                                        })

                                    })

                                    //Campaign Conversions & Segments seem too complicated for now... as there are too many possibilities



                                    $cmpEasyDesc = $cmpEasyDesc
                                        + "Campaign name: " + $cmpName
                                        + "\r\n\r\n"
                                        + "Campaign ID: " + $cmpID
                                        + "\r\n\r\n"
                                        + "Campaign priority: " + $cmpPrior
                                        + "\r\n\r\n"
                                        + "Campaign state: " + $cmpState
                                        + "\r\n\r\n"
                                        + "Campaign enabled: " + $cmpEnabled
                                        + "\r\n\r\n"
                                        + "Campaign start date: " + $cmpStartDate
                                        + "\r\n\r\n"
                                        + "Campaign end date: " + $cmpEndDate
                                        + "\r\n\r\n"
                                        + "Campaign level targeting: " + $cmpLevelTarg
                                        + "\r\n\r\n"
                                        + "Campaign locations: " + $cmpLocations
                                        + "\r\n\r\n"
                                        + "Campaign Experiences: " + $cmpExps
                                        + "\r\n\r\n";


                                    //Check campaign state, and save in local data, so we can have info on saved/approved
                                    var ttHelperCampaignsListExtDataArr = $j.jStorage.get("ttHelperCampaignsListExtData"),
                                        ttHelperCampaignsListExtDataArrVal = {cmpID: $cmpID, cmpName: $cmpName, cmpState: $cmpState, cmpEnabled: $cmpEnabled, cmpStartDate: $cmpStartDate, cmpEndDate: $cmpEndDate, cmpOfferNamesString: $cmpOfferNamesString.substr(0,$cmpOfferNamesString.length-8)};
                                    if (typeof ttHelperCampaignsListExtDataArr === "undefined" || ttHelperCampaignsListExtDataArr==""){
                                        ttHelperCampaignsListExtDataArr = new Array;
                                    }
                                    ttHelperCampaignsListExtDataArr[parseInt($cmpID)] = ttHelperCampaignsListExtDataArrVal;
                                    $j.jStorage.set("ttHelperCampaignsListExtData",ttHelperCampaignsListExtDataArr);

                                    /*$j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())+1);*/


                                    var ttBackupCleanCampaignFileName = $cmpName.replace(/\s+/gi, '-').replace(/[^a-zA-Z0-9\-]/gi, ''); // Replace white space with dash & Strip any special character;

                                    ttCampaignsBackupZip.file(ttBackupCleanCampaignFileName+".xml", $xmlAsText);
                                    ttCampaignsBackupZip.file(ttBackupCleanCampaignFileName+".txt", $cmpEasyDesc);

                                    //move to next iteration (campaign) from the list
                                    ttHelperCampaignListArrSearchUpdBackup();

                                }
                            });
                        }else{ //last one
                            $j('#jqUIDialAPIListGenBackupResetLoaderIco').hide();
                            $j('#jqUIDialAPICampSearchAllStatusUpdBackup').hide();
                            $j('#jqUIDialAPICampSearchAllProgressBarUpdBackup').hide();
                            /*if (parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())==0){
                             $j('#jqUIDialAPICampSearchAllResultUpd').hide();
                             }*/

                            //var ttCampaignsBackupZipContent = ttCampaignsBackupZip.generate({compression: "DEFLATE"});
                            //location.href="data:application/zip;base64,"+ttCampaignsBackupZipContent;
                            var zipDateSt="", zipDateStYY = new Date().getFullYear(), zipDateStMM = (new Date().getMonth()+1) , zipDateStDD=new Date().getDate();
                            if (zipDateStMM<10){zipDateStMM="0"+zipDateStMM};
                            if (zipDateStDD<10){zipDateStDD="0"+zipDateStDD};
                            zipDateSt = zipDateStYY + zipDateStMM + zipDateStDD;

                            var ttCampaignsBackupZipContent = ttCampaignsBackupZip.generate({compression: "DEFLATE", type: "blob"});
                            saveAs(ttCampaignsBackupZipContent, zipDateSt + "_" + ttHelperCampaignListArr.length + "_CampaignsBackup.zip");


                            //$j('#jqUIDialAPIListGenBackupResetLoaderIco').hide();
                            $j("#jqUIDialAPIListGenBackup").dialog("close");
                            ttHelperCampaignListStrToArr = $j.jStorage.get("ttHelperCampaignsList");
                            $j("#ttCampList").autocomplete({
                                source: ttHelperCampaignListStrToArr,
                            }).data( "autocomplete" )._renderItem = function( ul, item ) {
                                var elmtch = item.label.match(/\d+/g),
                                    elmtchCID = parseInt(elmtch[elmtch.length-1]),
                                    elmtchTitle="", elmtchState="", elmtchExtData = {};

                                if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
                                    elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
                                    elmtchTitle = "State: " + elmtchExtData.cmpState
                                        + " | Enabled: " + elmtchExtData.cmpEnabled
                                        + " | Start Date: " + elmtchExtData.cmpStartDate
                                        + " | End Date: " + elmtchExtData.cmpEndDate;
                                    if (elmtchExtData.cmpState=="approved"){
                                        elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
                                    }else if (elmtchExtData.cmpState=="saved"){
                                        elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
                                    }else{
                                        elmtchState="";
                                    }
                                }

                                return $j( "<li></li>" ).data("item.autocomplete", item)
                                    .append( "<a title=\""+elmtchTitle+"\">" + elmtchState + item.label + "</a>")
                                    .appendTo(ul);
                            };


                            $j("#jqUIDialCampList").dialog("open");
                        }

                    }
                    ttHelperCampaignListArrSearchUpdBackup(); //First run

                });
            }
        },
        "Close": function() {
            $j("#jqUIDialAPIListGenBackup").dialog("close");
        }
    }
});


if (ttHelperCampaignListStrToArr) {
	ttHelperCampaignListStrToArr.sort();

	$j("#jqUIDialCampList").dialog("open");

}else{
	var ttCListConf = confirm("No campaign list has been stored locally. Do you want to generate local list now?");
	if (ttCListConf){
		$j("#jqUIDialAPIListGen").dialog("open");
	}else{
		//no action
	}
}

//jQuery UI
$j(function() {
	if ($j("body").hasClass("ttUIAutoComplete")!=-1){
		$j("body").addClass("ttUIAutoComplete");
		$j("body").addClass("ttCampaignsListMark");
	}
	$j("#ttCampList").autocomplete({
		source: ttHelperCampaignListStrToArr,
	}).data( "autocomplete" )._renderItem = function( ul, item ) {
		var elmtch = item.label.match(/\d+/g),
			elmtchCID = parseInt(elmtch[elmtch.length-1]),
			elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";

		if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
			elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
			elmtchTitle = "State: " + elmtchExtData.cmpState
									+ " | Enabled: " + elmtchExtData.cmpEnabled
									+ " | Start Date: " + elmtchExtData.cmpStartDate
									+ " | End Date: " + elmtchExtData.cmpEndDate;
			if (elmtchExtData.cmpState=="approved"){
				elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
			}else if (elmtchExtData.cmpState=="saved"){
				elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
			}else{
				elmtchState="";
			}
		}

		if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
			elmtchOffTitle = " <span title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 13px; color: #E370E1;\">[Offers]</span>";
		}

		return $j( "<li></li>" ).data("item.autocomplete", item)
		.append( "<a title=\""+elmtchTitle+"\">" + elmtchState + item.label + elmtchOffTitle + "</a>")
		.appendTo(ul);
	};
});