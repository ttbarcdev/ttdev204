// ==UserScript==
// @name       T&T Tracking Number Resolver
// @namespace  //
// @version    0.1
// @description  Gets the campaign id: recipe id combo and comes back with campaign name and experience name and offer name
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad.do*
// @include     https://admin7.testandtarget.omniture.com/admin/launchpad/launchpad.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/analytics/reports/campaignStep.do*
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.js
// @require     https://admin7.testandtarget.omniture.com/admin/scripts/jquery/jquery.ui.js
// ==/UserScript==

var $j = jQuery.noConflict();

document.addEventListener('DOMContentLoaded', function(){

	if ($j('#ttTrackingNumberResolverLink').length == 0) {
		$j('<div id="ttTrackingNumberResolverLink" style="cursor: pointer;display: inline-block;position: relative;top: 13px;color: #CCABAA; margin-left: 20px;" title="T&T Changes Report">@TNR</div>').insertAfter('.cui header.top .crumbs');
	}

	//Add dialog to the page

	$j('body').append('<div id="ttTrackingNumberResolverLinkDialog" title="Resolve a Tracking number or get one from Campaign ID?"><p style="font-weight: bold; padding-right: 50px;">Do you want to Resolve an existing Tracking Number (XXX:XXX:XXX) or get one based on a Campaign/Experience selection?</p><div id="ttTrackingNumberResolverLinkDialogLoaderIco" style="display: none;width: 48px; height: 48px; position: absolute; top: 10px; right: 35px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" /></div><div id="ttTrackingNumberResolverLinkDialogResult" style="margin-top: 10px; font-style: italic; display: none;"></div></div>');
	$j("#ttTrackingNumberResolverLinkDialog").dialog({
		resizable: false,
		autoOpen: false,
		height: 'auto',
		width: 450,
		modal: true,
		buttons: {
			"Resolve existing": function() {
				var TRCode = prompt("Please provide Tracking Number in the following format XXX:XXX:XXX", "");
				if (TRCode != null && $j.trim(TRCode)!='') { //example: 7986:6:0
					var TRCodeSplit = TRCode.split(':'),
						TRCodeCampID = TRCodeSplit[0],
						TRCodeRecipeID = TRCodeSplit[1];

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

								//console.log(data);
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
				//$j(this).dialog("close");
			},
			"Generate from campaign": function() {
				$j(this).dialog("close");
			},
			"Close": function() {
				$j(this).dialog("close");
			}
		}
	});

	$j(document).on('click','#ttTrackingNumberResolverLink',function(){
		$j("#ttTrackingNumberResolverLinkDialog").dialog("open");
	});


});