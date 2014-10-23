// ==UserScript==
// @name       T&T Tracking Number Resolver
// @namespace  //
// @version    0.1
// @description  Gets the campaign id: recipe id combo and comes back with campaign name and experience name and offer name
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad.do*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad/launchpad.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId=*
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.js
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.ui.js
// @grant       GM_log
// ==/UserScript==

var $j = jQuery.noConflict();

if (typeof ttGetCampIdFromURL!=='function'){
	function ttGetCampIdFromURL($tturl){
		var results = new RegExp('[\?&amp;]campaignId=([^&amp;#]*)').exec($tturl);
		if (results != null && results !== undefined && results[1] != null && results[1] !== undefined) {
			return results[1];
		}else{
			return 0;
		}
	}
}

/* Force Scrollbars in Chrome under Mac OSX Lion+ */
var ttinscss = document.createElement("style");
ttinscss.type = "text/css";
ttinscss.innerHTML = "::-webkit-scrollbar {"+
	"    -webkit-appearance: none;"+
	"    width: 7px;"+
	"}"+
	"::-webkit-scrollbar-thumb {"+
	"    border-radius: 4px;"+
	"    background-color: rgba(0,0,0,.5);"+
	"    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);"+
	"}";
document.getElementsByTagName('head')[0].appendChild(ttinscss);

document.addEventListener('DOMContentLoaded', function(){

	if ($j('#ttTrackingNumberResolverLink').length == 0) {
		$j('<div id="ttTrackingNumberResolverLink" style="cursor: pointer;display: inline-block;position: relative;top: 13px;color: #CCABAA; margin-left: 20px;" title="T&T Changes Report">@TNR</div>').insertAfter('.cui header.top .crumbs');
	}

	//Add dialog to the page

	$j('body').append('<div id="ttTrackingNumberResolverLinkDialog" title="Resolve a Tracking number or get one from Campaign ID?"><p style="font-weight: bold; padding-right: 50px;" id="ttTrackingNumberResolverQuestion">Do you want to Resolve an existing Tracking Number (XXX:XXX:XXX) or get one based on a Campaign/Experience selection?</p><div id="ttTrackingNumberResolverLinkDialogLoaderIco" style="display: none;width: 48px; height: 48px; position: absolute; top: 10px; right: 20px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" /></div><div id="ttTrackingNumberResolverLinkDialogResult" style="margin-top: 10px; font-style: italic; display: none;"></div></div>');
	$j("#ttTrackingNumberResolverLinkDialog").dialog({
		resizable: false,
		autoOpen: false,
		height: 'auto',
		width: 550,
		modal: true,
		buttons: {
			"Resolve existing": function() {

				$j('#ttTrackingNumberResolverLinkDialogResult').html(''); //reset result
				$j('#ttTrackingNumberResolverQuestion').show();

				var TRCode = prompt("Please provide Tracking Number in the following format XXX:XXX:XXX", "");
				if (TRCode != null && $j.trim(TRCode)!='') { //example: 7986:6:0
					var TRCodeSplit = TRCode.split(':'),
						TRCodeCampID = TRCodeSplit[0],
						TRCodeRecipeID = TRCodeSplit[1];

					$j('#ttTrackingNumberResolverQuestion').hide();

					//Get to the campaign:
					function ttTrackingNumberResolverProcess() {
						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId=' + TRCodeCampID,
							cache: false,
							timeout:18000,
							xhrFields: {
								withCredentials: true
							}, beforeSend: function () {
								$j('#ttTrackingNumberResolverLinkDialogLoaderIco').show();
								$j('#ttTrackingNumberResolverLinkDialogResult').html('Loading data from campaign: ' + TRCodeCampID).show();

							}, success: function (data) {
								var ttTrackingNumberResolverData = $j(data),
									ttTrackingNumberResolverCampName='',
									ttTrackingNumberResolverExpName='',
									ttTrackingNumberResolverOfferName='';

								if (ttTrackingNumberResolverData!=null && ttTrackingNumberResolverData!=''){
									ttTrackingNumberResolverCampName = ttTrackingNumberResolverData.find('h1#campaignName_' + TRCodeCampID).text();
									ttTrackingNumberResolverExpName = ttTrackingNumberResolverData.find('table.experienceOffers li[id^="'+TRCodeRecipeID+'."]:eq(0)').closest('div[id^=branch]').find('input[id^=branch]').val();
									if (ttTrackingNumberResolverData.find('table.experienceOffers li[id^="'+TRCodeRecipeID+'."]').closest('td').length>1){
										//More than one offer. Loop through all:
										ttTrackingNumberResolverData.find('table.experienceOffers li[id^="'+TRCodeRecipeID+'."]').closest('td').each(function(i){
											$j.get('https://admin7.testandtarget.omniture.com/admin/offers/offer_html_edit.jsp?id='+$j(this).find('.offerNameDiv').attr('offerid')+'&type=html',function(dataoffer){
												var ttofnm = $j(dataoffer).find('input.-offerName').val();
												ttTrackingNumberResolverOfferName+=ttofnm + ', ';
												if (i==ttTrackingNumberResolverData.find('table.experienceOffers li[id^="'+TRCodeRecipeID+'."]').closest('td').length-1){
													ttTrackingNumberResolverOfferName=ttTrackingNumberResolverOfferName.substr(0,((ttTrackingNumberResolverOfferName.length)-2)); //last comma gone
												}
												$j('#ttTrackingNumberResolverLinkDialogLoaderIco').hide();
												$j('#ttTrackingNumberResolverLinkDialogResult').html('Here\'s the result for Tracking Number <span style="font-weight: bold;">'+TRCode+ '</span> : <p style="margin-top: 15px;">Campaign Name: <span style="font-weight:bold">'+ttTrackingNumberResolverCampName+'</span></p><p>Experience Name: <span style="font-weight:bold">'+ttTrackingNumberResolverExpName+'</span></p><p>Offer(s) Name(s): <span style="font-weight:bold">'+ttTrackingNumberResolverOfferName+'</span></p>');
											});
										});

									}else{
										//Single offer										
										$j.get('https://admin7.testandtarget.omniture.com/admin/offers/offer_html_edit.jsp?id='+ttTrackingNumberResolverData.find('table.experienceOffers li[id^="'+TRCodeRecipeID+'."]').closest('td').first().find('.offerNameDiv').attr('offerid')+'&type=html',function(dataoffer){
											var ttofnm = $j(dataoffer).find('input.-offerName').val();
											ttTrackingNumberResolverOfferName=ttofnm;
											$j('#ttTrackingNumberResolverLinkDialogLoaderIco').hide();
											$j('#ttTrackingNumberResolverLinkDialogResult').html('Here\'s the result for Tracking Number <span style="font-weight: bold;">'+TRCode+ '</span> : <p style="margin-top: 15px;">Campaign Name: <span style="font-weight:bold">'+ttTrackingNumberResolverCampName+'</span></p><p>Experience Name: <span style="font-weight:bold">'+ttTrackingNumberResolverExpName+'</span></p><p>Offer(s) Name(s): <span style="font-weight:bold">'+ttTrackingNumberResolverOfferName+'</span></p>');
										});
									}
								}else{
									//console.log('Cannot get Name');
								}

							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								$j('#ttTrackingNumberResolverLinkDialogResult').html('There was an error getting the campaign data, will try again... ');
								ttTrackingNumberResolverProcess();

							}
						});
					}

					//First Run
					ttTrackingNumberResolverProcess();

				}else{
					alert('No value provided');
				}
			},
			"Generate from campaign": function() {
				$j('#ttTrackingNumberResolverLinkDialogResult').html(''); //reset result
				$j('#ttTrackingNumberResolverQuestion').show();

				var ttCurCID = '';
				if (ttGetCampIdFromURL(window.location.href)!==''){
					ttCurCID=ttGetCampIdFromURL(window.location.href);
				}

				var TRCampaignCode = prompt("Please provide Campaign ID (if you're already \r\nin a campaign's Edit screen, it'll be prefilled for you,\r\nif not you'll be offered to be navigate to it.)", ttCurCID);
				if (TRCampaignCode != null && $j.trim(TRCampaignCode)!='') { //example: 7986

					$j('#ttTrackingNumberResolverQuestion').hide();

					if (ttGetCampIdFromURL(window.location.href)==$j.trim(TRCampaignCode)){//if already on the page, do it quicker as no AJAX would be needed
						var ttTRCodeOutput='';
						ttTRCodeOutput+='<p>Here\'s the result for Campaign ID <span style="font-weight: bold;">'+TRCampaignCode+':</span></p>';
						//Get Campaign Name
						ttTRCodeOutput+='<p>Campaign Name: ' + $j.trim($j('h1#campaignName_' + TRCampaignCode).text()) + '</p><p style="font-size: 10px;">The result below may be scrollable if there are too many experiences.</p>';
						ttTRCodeOutput+='<div style="overflow: scroll;height: 200px; margin-top:10px;">'; //div will be closed later
						//Get List of Experience Names
						$j('table.experienceOffers').each(function(){
							ttTRCodeOutput+='<p style="margin-top: 5px;">Experience Name: <span style="font-weight: bold;">' + $j.trim($j(this).closest('div[id^=branch]').find('input[id^=branch]').val()) + '</span></p>';
							//Get List of Offers in each Experience
							$j(this).find('.offerNameDiv').each(function(){
								ttTRCodeOutput+='<p>Offer Name: <span style="font-weight: bold;">' + $j(this).text() + '</span></p>';
								//Produce the XXX:XXX:XXX Tracking Number
								ttTRCodeOutput+='<p>Tracking Number: <span style="font-weight: bold;">' + ttGetCampIdFromURL(window.location.href) + ':' + $j(this).attr('id').split('.')[0] + ':0'  + '</span></p>'; //assuming last will always be 0, yet to find a case it's not
							});

						});
						ttTRCodeOutput+='</div>'; //close div
						ttTRCodeOutput+="<div style='margin-top: 10px;'><span style='font-weight: bold;'>Note</span> that the above Tracking Numbers would only work for the experiences that have the following code implemented in a binding event of some sort in their offer code: <br/><pre style='font-size: 10px;margin-top: 10px;color: purple;'>s.eVar44='${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}';</pre></div>";
						$j('#ttTrackingNumberResolverLinkDialogResult').html(ttTRCodeOutput).show();
					}else{
						alert('You\'ll now be navigated to the Edit screen of \r\nCampaign with ID ' + $j.trim(TRCampaignCode) + '.\r\nPlease use the tool again once there. ');
						$j(this).dialog("close");
						location.href='https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId='+$j.trim(TRCampaignCode);
						//Navigate the user to the campaign/Edit screen based on the campaign ID
					}
				}else{
					alert('No value provided');
				}



				//$j(this).dialog("close");
			},
			"Close": function() {
				$j('#ttTrackingNumberResolverLinkDialogResult').html(''); //reset result
				$j(this).dialog("close");
			}
		}
	});

	$j(document).on('click','#ttTrackingNumberResolverLink',function(){
		$j('#ttTrackingNumberResolverLinkDialogResult').html(''); //reset result
		$j('#ttTrackingNumberResolverQuestion').show();
		$j("#ttTrackingNumberResolverLinkDialog").dialog("open");
	});


});