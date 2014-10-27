//mbox helper functions - START
function fnTTMboxLoadDef(mbxName){
	if (typeof mbxName === "undefined" || mbxName =="" ){
		return false;
	}
	//Show/Hide particular mbox'es default/T&T content on match
	mboxFactoryDefault.getMboxes().each(function(i,e) { 
		if (i.getName()==mbxName) {
			
			//get ttHighlMbox and ttHighLLabelWrap
			$ttHighLMboxRefV = $(i.getDiv());
			$ttHighlMboxV = $(i.getDiv()).closest('.ttHighlMbox');
			$ttHighLLabelWrapV = $ttHighlMboxV.find('.ttHighLLabelWrap');
			if (typeof $ttHighLMboxRefV.data('defMboxHTML') === "undefined" && typeof $ttHighLMboxRefV.data('ttMboxHTML') === "undefined") { //first event for this mbox
				//lets save TT and Default HTML as JQ Data
				$ttHighLMboxRefV.data('defMboxHTML',$(i.getDefaultDiv()).html());
				$ttHighLMboxRefV.data('ttMboxHTML',$(i.getDiv()).html());
			}else{
				//we have mbox data stored
			}
			
			if ($(i.getDiv()).find('.ttHighLOfferRestoreDefCont').hasClass('ttoffer')){
				//Restore T&T mbox
				$(i.getDiv()).html($ttHighLMboxRefV.data('ttMboxHTML'));
				$(i.getDiv()).find('.ttHighLOfferRestoreDefCont').removeClass('ttoffer').attr('title','Click this to display the default offer').html('Show default offer');
				
			}else {
				//Restore Default mbox
				$(i.getDiv()).html($ttHighLLabelWrapV.clone().wrap('<p>').parent().html() + $ttHighLMboxRefV.data('defMboxHTML'));
				
				//cleanup non-default info as we're now showing default
				$(i.getDiv()).find('.ttHighLOfferLabel').html('offer: default');
				$(i.getDiv()).find('.ttHighLOfferRestoreDefCont').addClass('ttoffer').attr('title','Click this to display the previously loaded T&T offer').html('Show T&amp;T offer');				
			}


		}
	});
}

//Dialog show/hide function
function ttCustomMboxHTMLOverlay() {
	$dialCustomHTMLOfferOverlay = $("#ttCustomMboxHTMLOverlay");
	$dialCustomHTMLOfferContent = $("#ttCustomMboxHTMLWrap");
	$dialCustomHTMLOfferOverlay.toggle();
	$dialCustomHTMLOfferContent.slideToggle('fast');
}

function fnTTMboxLoadCustom(mbxName){
	if (typeof mbxName === "undefined" || mbxName =="" ){
		return false;
	}
	$('#ttCustomMboxHTMLWrap').remove(); //clean up previous version
	var exstHTML = '';
	
	//Grab the HTML for particular mbox on match
	mboxFactoryDefault.getMboxes().each(function(i,e) { 
		if (i.getName()==mbxName) {
			$ttHighLMboxRefV = $(i.getDiv());
			if (exstHTML == "") { //first event for this mbox
				if($(i.getDiv()).find('.ttHighLOfferRestoreDefCont').length ==1){
					//non-default offer on load
					if($(i.getDiv()).find('.ttHighLOfferRestoreDefCont.ttoffer').length !== 1){
						//T&T content is displayed
						$iGetDivClone = $(i.getDiv()).clone();
						//clean up elements that don't belong to the offer code
						$iGetDivClone.find('.ttHighLLabelWrapDef').remove();
						$iGetDivClone.find('.ttHighLLabelWrap').remove();
						$iGetDivClone.find("div[id^='mboxClick']").find(':first').unwrap(); //unwrap mbox elements
						//TODO - filter doesn't work well with inline CSS
						//exstHTML = $($iGetDivClone.html()).filter('*').html(); //filter would remove comments and script tags
						exstHTML = $iGetDivClone.html();
						//cleanup clone
						$iGetDivClone.remove();
					}else{
						//default content is displayed
						$iGetDivClone = $(i.getDefaultDiv()).clone();
						//clean up elements that don't belong to the offer code
						$iGetDivClone.find('.ttHighLLabelWrapDef').remove();
						$iGetDivClone.find('.ttHighLLabelWrap').remove();
						exstHTML = $iGetDivClone.html();
						//cleanup clone
						$iGetDivClone.remove();
					}
				}else{
					//default offer on load
					$iGetDivClone = $(i.getDiv()).clone();
					//clean up elements that don't belong to the offer code
					$iGetDivClone.find('.ttHighLLabelWrapDef').remove();
					$iGetDivClone.find('.ttHighLLabelWrap').remove();
					exstHTML = $iGetDivClone.html();
					//cleanup clone
					$iGetDivClone.remove();
				}
			}else{
				//we have mbox data stored
			}			
		}
	});

	$("html > body").append('<div id="ttCustomMboxHTMLOverlay">&nbsp;</div><div id="ttCustomMboxHTMLWrap"><div id="ttCustomMboxHTMLTitle"><span class="tt-title">Offer HTML Edit <sup style="color: yellow;">beta</sup></span><button class="tt-title-close-btn" role="button" title="close"><span class="tt-closethick"></span><span class="tt-title-close-text">close</span></button></div><div id="ttCustomMboxHTMLContent"><div class="ttIntro">Please paste or edit the Offer\'s HTML below, and click the Apply button. Note that the prepopulated HTML below is a \'close\' but not necessarily  exact match of the offer\'s HTML. This is due to many factors, mainly because it reflects the generated HTML not the source one, and as such may have been affected by other scripts and/or by having dynamic data loaded (S-snippets, etc). Ideally if you have the actual offer\'s HTML you can paste it here, after using the Clear button. Or if you want to just play with what\'s loaded, feel free to just edit.</div><textarea placeholder="Custom HTML goes here. Type/Paste to clear this placeholder text...">'+exstHTML+'</textarea><button type="button" id="ttCustomMboxHTMLApplyBtn">Apply</button><button type="button" id="ttCustomMboxHTMLClearBtn">Clear</button></div></div>');
	
	//Dialog Style 
	
	$('#ttCustomMboxHTMLOverlay').css({display: 'none',	position: 'fixed', left: '0px', top: '0px', width:'100%', height: ($(document).height())+'px', textAlign: 'center', zIndex: '1000', background: '#aaaaaa url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x', opacity: '0.3', filter: 'Alpha(Opacity=30)'});

	var inwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	 
	  $('#ttCustomMboxHTMLWrap').css({display: 'none', position: 'fixed', left: (Math.floor(inwidth/2)-350) +'px', top: '50px', width: '700px', float: 'left',	border: '1px solid #000', padding: '3px', textAlign: 'left', fontSize: '12px', fontFamily: 'Verdana,Arial,sans-serif', borderRadius: '4px', border: '1px solid #aaaaaa', background: '#ffffff url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_flat_75_ffffff_40x100.png) 50% 50% repeat-x', zIndex: '99999'});
	  
	  $('#ttCustomMboxHTMLContent').css({margin: '10px 0', padding: '5px', clear: 'both', lineHeight: '1.5'});
	  $('#ttCustomMboxHTMLContent div.ttIntro').css({display: 'block', fontSize: '11px', color: '#00aeef'});
	  $('#ttCustomMboxHTMLContent textarea').css({display: 'block', margin: '10px 0', padding: '5px', clear: 'both', width: '675px', height: '200px', textAlign: 'left', fontFamily: '"Courier New", Courier, monospace', fontSize: '12px', color: '#4169e1'});
	   
	  $('#ttCustomMboxHTMLContent button').css({display: 'inline-block', padding: '5px 10px', cursor: 'pointer', marginRight: '10px'});
	  
	  $('#ttCustomMboxHTMLTitle').css({color: '#fff', height: '20px', padding: '0.4em 1em', position: 'relative', borderRadius: '4px', fontWeight: 'bold',	border: '1px solid #aaaaaa', background: '#00aeef'});
	  
	  $('#ttCustomMboxHTMLTitle .tt-title').css({float: 'left',	margin: '0.1em 0', whiteSpace: 'nowrap', width: '90%', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', color: '#fff'});
	  
	  $('#ttCustomMboxHTMLTitle .tt-title-close-btn').css({border: '1px solid #d3d3d3', background: '#e6e6e6 url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_glass_75_e6e6e6_1x400.png) 50% 50% repeat-x', color: '#555555',	fontWeight:'normal', fontSize: '1em',	position: 'absolute', right: '0.3em', top: '50%', width: '21px', margin: '-10px 0 0 0', padding: '1px',	height: '20px', borderRadius: '4px', cursor: 'pointer'});
	  
	  $('#ttCustomMboxHTMLTitle .tt-closethick').css({backgroundImage: 'url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-icons_888888_256x240.png)', left: '50%', marginLeft: '-8px', position: 'absolute',	top: '50%',	marginTop: '-8px', backgroundPosition: '-96px -128px', width: '16px', height: '16px', display: 'block',	textIndent: '-99999px',	overflow: 'hidden',	backgroundRepeat: 'no-repeat', cursor: 'pointer'});
	  
	  $('#ttCustomMboxHTMLTitle .tt-title-close-btn:hover .tt-closethick').css({backgroundImage: 'url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-icons_454545_256x240.png)'});

	  $('#ttCustomMboxHTMLTitle .tt-title-close-text').css({padding: '.4em',	textIndent: '-9999999px', display: 'block',	lineHeight: 'normal', color: '#555555', fontSize: '1em', cursor: 'pointer', textAlign: 'center'});
		
		//set mbxName data
		$('#ttCustomMboxHTMLContent').data('mbxName',mbxName);
		
		ttCustomMboxHTMLOverlay();
}

//mbox helper functions - END

	var c;	
	
	//Dialog placeholder
	 $("html > body").append('<div id="ttHighlDialOverlay">&nbsp;</div><div id="ttHighlDialContentWrap"><div id="ttHighlDialTitle"><span class="tt-title">T&amp;T Tools <span title="v1.3 changes: Adding Anonymizer option when URL has bank.barclays.co.uk; The T&T Tools Summary & Highlights DO NOT show by default, you can use the [Show Summary] or [Highlight All Mboxes] buttons to do so - this allows quicker clean page overview; Added functionality to switch between default and T&T offer for any non-default mbox location; Added option to Show/Remove highlights; Added option to edit offers\'s HTML in place">(v1.3)</span></span><button class="tt-title-close-btn" role="button" title="close"><span class="tt-closethick"></span><span class="tt-title-close-text">close</span></button></div><div id="ttHighlDialContent">Summary of T&amp;T Campaigns, Experiences, Locations and Offers running on the page</div></div>');
	 
	//Dialog show/hide function
	function fnTTHighlDialOverlay() {
		$dialOverlay = $("#ttHighlDialOverlay");
		$dialContent = $("#ttHighlDialContentWrap");
		$dialOverlay.toggle();
		$dialContent.slideToggle('fast');
	}
	 
	 //Dialog Style
	 var inwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	 
	 $('#ttHighlDialOverlay').css({display: 'none',	position: 'fixed', left: '0px', top: '0px', width:'100%', height: ($(document).height())+'px', textAlign: 'center', zIndex: '1000', background: '#aaaaaa url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x', opacity: '0.3', filter: 'Alpha(Opacity=30)'});
	  $('#ttHighlDialContentWrap').css({display: 'none', position: 'fixed', left: (Math.floor(inwidth/2)-350) +'px', top: '130px', width: '700px', float: 'left',	border: '1px solid #000', padding: '3px', textAlign: 'left', fontSize: '12px', fontFamily: 'Verdana,Arial,sans-serif', borderRadius: '4px', border: '1px solid #aaaaaa', background: '#ffffff url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_flat_75_ffffff_40x100.png) 50% 50% repeat-x', zIndex: '999999'});
	  
	  $('#ttHighlDialContent').css({padding: '5px', clear: 'both', lineHeight: '0.8'});
	  
	  $('#ttHighlDialTitle').css({color: '#fff', height: '20px', padding: '0.4em 1em', position: 'relative', borderRadius: '4px', fontWeight: 'bold',	border: '1px solid #aaaaaa', background: '#00aeef'});
	  
	  $('#ttHighlDialTitle .tt-title').css({float: 'left',	margin: '0.1em 0', whiteSpace: 'nowrap', width: '90%', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', color: '#fff'});
	  
	  $('#ttHighlDialTitle .tt-title-close-btn').css({border: '1px solid #d3d3d3', background: '#e6e6e6 url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_glass_75_e6e6e6_1x400.png) 50% 50% repeat-x', color: '#555555',	fontWeight:'normal', fontSize: '1em',	position: 'absolute', right: '0.3em', top: '50%', width: '21px', margin: '-10px 0 0 0', padding: '1px',	height: '20px', borderRadius: '4px', cursor: 'pointer'});
	  
	  $('#ttHighlDialTitle .tt-closethick').css({backgroundImage: 'url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-icons_888888_256x240.png)', left: '50%', marginLeft: '-8px', position: 'absolute',	top: '50%',	marginTop: '-8px', backgroundPosition: '-96px -128px', width: '16px', height: '16px', display: 'block',	textIndent: '-99999px',	overflow: 'hidden',	backgroundRepeat: 'no-repeat', cursor: 'pointer'});
	  
	  $('#ttHighlDialTitle .tt-title-close-btn:hover .tt-closethick').css({backgroundImage: 'url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-icons_454545_256x240.png)'});

	  $('#ttHighlDialTitle .tt-title-close-text').css({padding: '.4em',	textIndent: '-9999999px', display: 'block',	lineHeight: 'normal', color: '#555555', fontSize: '1em', cursor: 'pointer', textAlign: 'center'});
	  
	  
	 
	
	if ($('.ttHighLLabelWrap').length>0){
		alert("Page needs to be refreshed before using the T&T Tools again. Press OK to proceed with refresh. After page is reloaded, use the tool again.");
		window.location = location.protocol + '//' + location.host + location.pathname + location.search + location.hash;
	}else {
		
		/* identify element height, and if less than 10px calculate it based on child elements largest number for height */
		function ttHightBasedOnHighestChild($ttJQEl){
			ttElHeight = $ttJQEl.outerHeight();
			minH = 50;
			var highest = 0;
			 $ttJQEl.find('*:visible').each(function(){		
				var h = $(this).outerHeight();
				if(h > highest){
					highest = h;
				}
			});
			
			if (highest > ttElHeight){
				ttElHeight = highest;
			}
			
			//provide enough for the location/offer prepend data
			ttElHeight = ttElHeight+ minH;
	
			return ttElHeight;
		}
		
		function ttPositionBtnsTop() {
			if ($(window).width()< 940){
				ttPositionBtnsLeft();
				return;
			}
			$('#ttTopFixedBack').remove();
			$("html > body").append("<div id=\"ttTopFixedBack\"></div>")
			$('#ttTopFixedBack').css({position: 'fixed', top: '0', left: '0', width: '100%', height: '40px', background: '#99CCFF', opacity: '0.8', zIndex: '9990', border: '1px solid #ccc', margin: '0', padding: '0'});
			$('.ttoutHighlToolBtn').css({top: '5px', zIndex: '9999'});
			$('#ttoutHighlToolBtnRefreshPage').css({left: '20px'});
			$('#ttoutHighlToolBtnDeleteTTCookie').css({left: '128px'});
			$('#ttoutHighlToolBtnForceDefault').css({left: '268px'});
			$('#ttoutHighlToolBtnCompareTTvsDefault').css({left: '377px'});
			$('#ttoutHighlToolBtnOpenTTSummaryInfo').css({left: '528px'});
			$('#ttoutHighlToolBtnShowHideHighlights').css({left: '647px'});
			$('#ttMouseHighlight').css({top: '10px', zIndex: '9999', left: '790px'});
			$('#ttMouseHighlightLabel').css({top: '5px', zIndex: '9999', left: '800px'});
		}
		
		function ttPositionBtnsLeft() {
			$('#ttTopFixedBack').remove();
			$('.ttoutHighlToolBtn').css({left: '8px'});
			$('#ttoutHighlToolBtnRefreshPage').css({top: '50px'});
			$('#ttoutHighlToolBtnDeleteTTCookie').css({top: '80px'});
			$('#ttoutHighlToolBtnForceDefault').css({top: '110px'});
			$('#ttoutHighlToolBtnCompareTTvsDefault').css({top: '140px'});
			$('#ttoutHighlToolBtnOpenTTSummaryInfo').css({top: '170px'});
			$('#ttoutHighlToolBtnShowHideHighlights').css({top: '200px'});
			$('#ttMouseHighlight').css({top: '230px', left: '12px'});
			$('#ttMouseHighlightLabel').css({top: '226px', left: '20px'});
		}
				
		//Delay to allow the above code to finish
		setTimeout(function(){
			
			/* Prepare data for dialog */
		
			var ttHighLightData = '', ttSameLastCampaignArr = [];
			if (mboxFactoryDefault.getMboxes().length()<1) { //0 & 1 for having none or just global mbox
				ttHighLightData = '<br /><br /><b class="note">No T&T Campaigns running on this page, just default!</b><br />'
			}else{
				ttHighLightData = '<b class="tthighlIntro">Summary of T&amp;T Campaigns, Experiences, Locations and Offers running on the page</b>';
				if (typeof window.ttMETA === "undefined"){
					//nothing yet
				}else {
					$(window.ttMETA).each(function(i, v) {					
				   
					  if ($.inArray(v.CampaignId, ttSameLastCampaignArr)==-1){
						  ttHighLightData+='<b>CampaignName: </b><a href="https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId=' + v.CampaignId +'" target="_blank" title="Click to edit this campaign (opens in a new window)"><i>' + v.CampaignName + '</i></a><br />';				 		 
					  }
					   ttHighLightData+='<b>Campaign Id: </b><a href="https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId=' + v.CampaignId +'" target="_blank" title="Click to edit this campaign (opens in a new window)"><i>' + v.CampaignId + '</i></a> | ';	
					  ttHighLightData+='<b title="RecipeName">Experience: </b><i title="Recipe Id: '+ v.RecipeId +'">' + v.RecipeName + '</i> | ';
					  ttHighLightData+='<b>Offer Name: </b><a href="#ttlabel_off_' + v.OfferId + '" title="Click to focus on the offer [OfferID: '+v.OfferId+']" onclick="fnTTHighlDialOverlay();"><i>' + v.OfferName + '</i></a><br />';
					  ttHighLightData+='<b title="MboxName">Location: </b><a href="#ttlabel_off_' + v.OfferId + '" title="Click to focus on the offer [OfferID: '+v.OfferId+']" onclick="fnTTHighlDialOverlay();"><i>' + v.MboxName + '</i></a><br /><br />';
					  
					  //add to array ttSameLastCampaignArr, so that we can group offers from the same campaign together
					  ttSameLastCampaignArr.push(v.CampaignId);
					  
					  /* Highlight all mboxes */
					  //prepend global mbox too but in a different way
					  if (v.MboxName=="Global_Mbox"){		  			  
						  $("html > body").prepend('<div class="ttHighLLabelWrap" id="ttlabel_off_'+v.OfferId+'"><div class="ttHighLMboxLabel" title="'+v.MboxName+'" style="display: none;">location: '+v.MboxName+'</div><div class="ttHighLOfferLabel" title="'+v.OfferId+' [' + v.OfferName + ']" style="display: none;">offer: [' + v.OfferName + '] </div> <div class="ttHighLOfferEditInPlace" data-mbName="'+v.MboxName+'" style="display: none;">Edit in place</div></div>');
						 
					  }else{
						  //adjust height so we can have an outline
						  $("div[id*='" + v.MboxName + "']:visible:eq(0)").addClass('ttHighlMbox');
						  $("div[id*='" + v.MboxName + "']:visible:eq(0)").prepend('<div class="ttHighLLabelWrap" id="ttlabel_off_'+v.OfferId+'"><div class="ttHighLMboxLabel" title="'+v.MboxName+'"  style="display: none;">location: '+v.MboxName+'</div><div class="ttHighLOfferLabel" title="'+v.OfferId+' [' + v.OfferName + ']" data-mbName="'+v.MboxName+'" style="display: none;">offer: ['+v.OfferName+']</div> <div class="ttHighLOfferRestoreDefCont" data-mbName="'+v.MboxName+'" title="Click this to display the default offer" style="display: none;">Show default offer</div> <div class="ttHighLOfferEditInPlace" data-mbName="'+v.MboxName+'" style="display: none;">Edit in place</div></div>');
					  }
					  
					});				
				}
				////Scan through all mboxes, if there's something additional outside window.ttMETA
				var mboxCreateStr = '', mboxCreateStrRnd=0;
				mboxFactoryDefault.getMboxes().each(function(i,e) {
					mboxCreateStrRnd = +parseInt(Math.random()*99999999);
					//skip the ones that have been processed through window.ttMETA (these should be all non-default)				
					if ($(i.getDiv()).hasClass('ttHighlMbox')==false){ 
						if (!$(i.getDiv()).prev('div').hasClass('ttHighLLabelWrap')){
							$(i.getDiv()).addClass('ttHighlMbox');
							$(i.getDiv()).prepend('<div class="ttHighLLabelWrapDef" id="ttlabel_off_'+'default_rnd_'+mboxCreateStrRnd+'"><div class="ttHighLMboxLabel" title="'+i.getName()+'" style="display: none;">location: '+i.getName()+'</div><div class="ttHighLOfferLabel default" title="default" data-mbName="'+i.getName()+'" style="display: none;">offer: '+'default'+'</div> <div class="ttHighLOfferEditInPlace" data-mbName="'+i.getName()+'" style="display: none;">Edit in place</div></div>');
							ttHighLightData+='<b>Offer: </b><a href="#ttlabel_off_' +'default_rnd_'+mboxCreateStrRnd+ '" title="Click to focus on the offer" onclick="fnTTHighlDialOverlay();"><i>' + 'default' + '</i></a> | ';
							ttHighLightData+='<b title="MboxName">Location: </b><a href="#ttlabel_off_' + 'default_rnd_'+mboxCreateStrRnd+ '" title="Click to focus on the offer" onclick="fnTTHighlDialOverlay();"><i>' + i.getName() + '</i></a><br /><br />';
						}
					}
				});
				
				//Add tool buttons
				ttHighLightData+='<div class="ttHighlToolBtnWrap"><div style="font-size: 11px; color: #00aeef; font-weight: bold; margin-bottom: 10px; margin-top: 20px;">All of the below buttons will close this dialog and refresh the page, in addition to their own action:</div>'; //open
				ttHighLightData+='<a class="ttHighlToolBtn" id="ttHighlToolBtnRefreshPage" title="Refresh current page - removing T&T Tools highlights, compare frames, etc">Refresh Page</a>';
				ttHighLightData+='<a class="ttHighlToolBtn" id="ttHighlToolBtnDeleteTTCookie" title="This would delete mbox and mboxPC cookies, allowing you to use different ttqa parameter on the page">Delete T&amp;T Cookies</a>';
				ttHighLightData+='<a class="ttHighlToolBtn" id="ttHighlToolBtnForceDefault" title="Adds ?mboxDisable=1 to the URL to disable T&T, even Global_Mbox is disabled, i.e. switches to default. To remove, just take out ?mboxDisable=1 from the URL!">Force Default</a>';
				ttHighLightData+='<a class="ttHighlToolBtn" id="ttHighlToolBtnCompareTTvsDefault" title="Compare T&T vs Default in split screen/frames; T&T will be on the LEFT, Default on the RIGHT!">Split Screen Compare</a>';
	
	
				
				ttHighLightData+='</div>'; //close
				
			}
			
			
			$('#ttHighlDialContent').html('<p class="ttHighlDialContentPWrap">'+ttHighLightData+'</p>');
						
					/* Style dialog */	
					
					$('#ttHighlDialContent .tthighlIntro').css({color: '#00aeef', fontSize: '11px', display: 'block', marginBottom: '10px'});
					$('#ttHighlDialContent p.ttHighlDialContentPWrap').css({overflow: "scroll",	height: "auto", maxHeight: "400px"});
					$('#ttHighlDialContent p b').css({color: '#00aeef', lineHeight: "1.7", fontSize: '11px', textDecoration: 'none'});
					$('#ttHighlDialContent p b.note').css({color: '#CC0000', textDecoration: 'none'});
					$('#ttHighlDialContent p i').css({color: '#00CC00', lineHeight: "1.7", fontSize: '11px', textDecoration: 'none'});
					$('#ttHighlDialContent p a').css({textDecoration: 'none'});
					$('#ttHighlDialContent p a i').css({cursor: 'help', lineHeight: "1.7", fontSize: '11px', textDecoration: 'none'});
					
					//Add tool buttons top/left fixed, outside the dialog
					$('body').append('<a id="ttoutHighlToolBtnRefreshPage" class="ttoutHighlToolBtn" style="top: 50px;" title="Refresh current page - removing T&T Tools highlights, compare frames, etc">Refresh Page</a>');
					if (mboxFactoryDefault.getMboxes().length()>0) {
						$('body').append('<a id="ttoutHighlToolBtnDeleteTTCookie" class="ttoutHighlToolBtn" style="top: 80px;" title="This would delete mbox and mboxPC cookies, allowing you to use different ttqa parameter on the page">Delete T&amp;T Cookies</a>');
						$('body').append('<a id="ttoutHighlToolBtnForceDefault" class="ttoutHighlToolBtn" style="top: 110px;" title="Adds ?mboxDisable=1 to the URL to disable T&T, even Global_Mbox is disabled, i.e. switches to default. To remove, just take out ?mboxDisable=1 from the URL!">Force Default</a>');
						$('body').append('<a id="ttoutHighlToolBtnCompareTTvsDefault" class="ttoutHighlToolBtn" style="top: 140px;" title="Compare T&T vs Default in split screen/frames; T&T will be on the LEFT, Default on the RIGHT!">Split Screen Compare</a>');
						$('body').append('<a id="ttoutHighlToolBtnOpenTTSummaryInfo" class="ttoutHighlToolBtn" style="top: 170px;" title="Show Summary of Campaigns, Experiences, Locations, Offers">Show Summary</a>');
						$('body').append('<a id="ttoutHighlToolBtnShowHideHighlights" class="ttoutHighlToolBtn show" style="top: 200px;" title="Highlight Mboxes with outlines and provide information and tools for each">Highlight All Mboxes</a>');
						$('body').append('<input type="checkbox" name="ttMouseHighlight" id="ttMouseHighlight" value="mouseHighlight" style="top: 230px;"><label for="ttMouseHighlight" style="top: 226px;" id="ttMouseHighlightLabel" title="When this is checked, you can Highlight and see Mbox info on mouse over.">Mouse Highlights</label>');
					}else {
						$('body').append('<a id="ttoutHighlToolBtnOpenTTSummaryInfo" class="ttoutHighlToolBtn" style="top: 80px;" title="Bring up the T&T Tools summary screen again">Show Summary</a>');
					}
	
					
					//Style tool buttons
					$(".ttHighlToolBtn").css({backgroundColor: '#00aeef', borderRadius: '7px', color: '#fff', cursor: 'pointer', display: 'inline-block', fontWeight: 'bold', height: '13px', padding: '5px 10px 2px', margin: '5px 10px 5px 0', width: 'auto', fontSize: '11px', textDecoration: 'none' });

					$(".ttoutHighlToolBtn").css({backgroundColor: '#00aeef', borderRadius: '7px', color: '#fff', cursor: 'pointer', display: 'inline-block', fontWeight: 'bold', height: '16px', padding: '5px 10px 2px', margin: '5px 10px 5px 0', width: 'auto', fontSize: '10px', position: 'fixed', left: '8px', textDecoration: 'none'});
					$('#ttoutHighlToolBtnOpenTTSummaryInfo').css({backgroundColor: '#ff8c00'});
					$('#ttoutHighlToolBtnShowHideHighlights').css({backgroundColor: '#ff0000'});
					$('#ttMouseHighlight').css({ display: 'inline-block', margin: '5px 10px 5px 0', position: 'fixed', left: '12px' });
					$('#ttMouseHighlightLabel').css({display: 'inline-block', fontWeight: 'bold', padding: '5px 10px 2px', margin: '5px 10px 5px 0', fontSize: '10px', position: 'fixed', left: '20px' });
					
					
					//Bind events to tool buttons
					//common code to be reused
					function ttHighlToolBtnRefreshPageClick($thisPar){
						window.location = location.protocol + '//' + location.host + location.pathname + location.search + location.hash;
						return false;
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$("#ttHighlToolBtnRefreshPage, #ttoutHighlToolBtnRefreshPage").live('click',function(e){
							ttHighlToolBtnRefreshPageClick($(this));
						});
					}else{
						$(document).on('click',"#ttHighlToolBtnRefreshPage, #ttoutHighlToolBtnRefreshPage",function(e){
							ttHighlToolBtnRefreshPageClick($(this));
						});
					
					}
					
					//common code to be reused
					function ttHighlToolBtnDeleteTTCookieClick($thisPar){
						document.cookie='mbox'+'='+(('/')?';path=/':'')+(('.barclays.co.uk')?';domain='+'.barclays.co.uk':'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';document.cookie='mboxPC'+'='+(('/')?';path=/':'')+(('.barclays.co.uk')?';domain='+'.barclays.co.uk':'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';document.cookie='mboxSession'+'='+(('/')?';path=/':'')+(('.barclays.co.uk')?';domain='+'.barclays.co.uk':'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';	
							window.location = location.protocol + '//' + location.host + location.pathname + location.search + location.hash;
							return false;						
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$("#ttHighlToolBtnDeleteTTCookie, #ttoutHighlToolBtnDeleteTTCookie").live('click',function(e){
							ttHighlToolBtnDeleteTTCookieClick($(this));
						});					
					}else{
						$(document).on('click',"#ttHighlToolBtnDeleteTTCookie, #ttoutHighlToolBtnDeleteTTCookie",function(e){
							ttHighlToolBtnDeleteTTCookieClick($(this));
						});
					
					}
					
					//common code to be reused
					function ttHighlToolBtnForceDefaultClick($thisPar){
						if(window.location.href.indexOf("?") > -1) {
							if ($thisPar.hasClass('removeForceDef')){								
								window.location = location.protocol + '//' + location.host + location.pathname + location.search.replace(/\?mboxDisable=1/g,"").replace(/&mboxDisable=1/g,"").replace(/&amp;mboxDisable=1/g,"") + location.hash;
							}else{
								window.location = location.protocol + '//' + location.host + location.pathname + location.search + '&mboxDisable=1' + location.hash;
							}								
						}else{
							window.location = location.protocol + '//' + location.host + location.pathname + location.search + '?mboxDisable=1' + location.hash;
						}
						return false;						
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$("#ttHighlToolBtnForceDefault, #ttoutHighlToolBtnForceDefault").live('click',function(e){
							ttHighlToolBtnForceDefaultClick($(this));
						});
					}else{
						$(document).on('click',"#ttHighlToolBtnForceDefault, #ttoutHighlToolBtnForceDefault",function(e){
							ttHighlToolBtnForceDefaultClick($(this));
						});					
					}
					
					//common code to be reused
					function ttHighlToolBtnCompareTTvsDefaultClick($thisPar){
						var fs = document.createElement('frameset'),
								f1 = document.createElement('frame'),
								f2 = document.createElement('frame'),
								mD1s=(window.location.href.indexOf('?')!=-1)?'&':'?';
								
								fs.cols = "*,*";
								fs.framespacing = "0";
								f1.name = "topframe";
								f1.src = window.location.href + mD1s + "rnd=" + parseInt(Math.random()*99999999);
								f1.marginwidth = "0";
								f1.marginheight = "0";
								/*f1.noresize = "noresize";*/
								f1.scrolling = "auto";
								f2.name = "bottomframe";
								f2.src = window.location.href + mD1s + "mboxDisable=1";
								f2.marginwidth = "0";
								f2.marginheight = "0";
								f2.scrolling = "auto";
								f2.frameborder = "0";
								fs.appendChild(f1);
								fs.appendChild(f2);
								$("body").replaceWith(fs);
	
							return false;
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$("#ttHighlToolBtnCompareTTvsDefault, #ttoutHighlToolBtnCompareTTvsDefault").live('click',function(e){
							ttHighlToolBtnCompareTTvsDefaultClick($(this));
						});
					}else{
						$(document).on('click',"#ttHighlToolBtnCompareTTvsDefault, #ttoutHighlToolBtnCompareTTvsDefault", function(e){
							 ttHighlToolBtnCompareTTvsDefaultClick($(this));
						});					
					}
					//common code to be reused
					function ttoutHighlToolBtnOpenTTSummaryInfoClick(ev){
						ev.preventDefault();
						fnTTHighlDialOverlay();
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('#ttHighlDialTitle .tt-title-close-btn, #ttoutHighlToolBtnOpenTTSummaryInfo').live('click',function(e){
							ttoutHighlToolBtnOpenTTSummaryInfoClick(e);
						});					
					}else{
						$(document).on('click','#ttHighlDialTitle .tt-title-close-btn, #ttoutHighlToolBtnOpenTTSummaryInfo',function(e){
							ttoutHighlToolBtnOpenTTSummaryInfoClick(e);
						});					
					}
					
					//common code to be reused
					function ttoutHighlToolBtnShowHideHighlightsShowClick(ev,$thisPar){					
						ev.preventDefault();
						
						$('.ttHighLMboxLabel, .ttHighLOfferLabel, .ttHighLOfferRestoreDefCont, .ttHighLOfferEditInPlace').show();
						$(".ttHighLLabelWrapDef").css({backgroundColor: '#00aeef', color: '#fff', padding: '5px', fontSize: '11px'});
						$(".ttHighLLabelWrap").css({backgroundColor: '#00aeef', color: '#fff', padding: '5px', fontSize: '11px'});
						$('div.ttHighlMbox').css({border: '3px outset red', clear: 'both', width: '101%'});
						$('div.ttHighlMbox:visible').each(function(i,e){
							$(this).height(ttHightBasedOnHighestChild($(this))+30+'px');	
						});
						$thisPar.removeClass('show').addClass('remove').attr('title','Remove mbox-es/Locations highlight outlines and info').html('Remove Highlights');
						$('#ttMouseHighlight').hide();
						$('#ttMouseHighlightLabel').hide();
						
					}

					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('#ttoutHighlToolBtnShowHideHighlights.show').live('click',function(e){
							ttoutHighlToolBtnShowHideHighlightsShowClick(e,$(this));
						});

					
					}else{
						$(document).on('click','#ttoutHighlToolBtnShowHideHighlights.show',function(e){
							ttoutHighlToolBtnShowHideHighlightsShowClick(e,$(this));
						});					
					}
					//common code to be reused
					function ttoutHighlToolBtnShowHideHighlightsRemoveClick(ev,$thisPar){
						ev.preventDefault();
						$('.ttHighLMboxLabel, .ttHighLOfferLabel, .ttHighLOfferRestoreDefCont, .ttHighLOfferEditInPlace').hide();
						$('.ttHighLLabelWrapDef').removeAttr('style').css('visibility','visible');
						$('.ttHighLLabelWrap').removeAttr('style').css('visibility','visible');
						$('.ttHighlMbox').removeAttr('style').css('visibility','visible');
						$thisPar.removeClass('remove').addClass('show').attr('title','Highlight Mboxes with outlines and provide information and tools for each').html('Highlight All Mboxes');
						$('#ttMouseHighlight').show();
						$('#ttMouseHighlightLabel').show();
						
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('#ttoutHighlToolBtnShowHideHighlights.remove').live('click',function(e){
							ttoutHighlToolBtnShowHideHighlightsRemoveClick(e,$(this));
						});	
					
					}else{
						$(document).on('click','#ttoutHighlToolBtnShowHideHighlights.remove',function(e){
							ttoutHighlToolBtnShowHideHighlightsRemoveClick(e,$(this));
						});
					}
					//common code to be reused
					function ttCustomMboxHTMLTitleCloseClick(ev,$thisPar){
						ev.preventDefault();
						ttCustomMboxHTMLOverlay();
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('#ttCustomMboxHTMLTitle .tt-title-close-btn').live('click',function(e){
							ttCustomMboxHTMLTitleCloseClick(e,$(this));
						});
					}else{
						$(document).on('click','#ttCustomMboxHTMLTitle .tt-title-close-btn',function(e){
							ttCustomMboxHTMLTitleCloseClick(e,$(this));
						});
					}

					document.onkeydown = function(evt) {
						evt = evt || window.event;
						if (evt.keyCode == 27) { //Esc key
							if ($("#ttHighlDialOverlay").is(':visible')){
								evt.preventDefault();
								fnTTHighlDialOverlay();
							}
							if ($("#ttCustomMboxHTMLOverlay").is(':visible')){
								evt.preventDefault();
								ttCustomMboxHTMLOverlay();
							}
						}
					};
					
					//Additional binds

					//restore default for certain mbox
					$('.ttHighLOfferRestoreDefCont').css({cursor: 'pointer', textDecoration: 'underline', color: '#ffff00'});	
					
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('.ttHighLOfferRestoreDefCont').live('click',function(e){
							fnTTMboxLoadDef($(this).attr('data-mbName'));
						});
					}else{
						$(document).on('click','.ttHighLOfferRestoreDefCont',function(e){
							fnTTMboxLoadDef($(this).attr('data-mbName'));
						});
					}				
					
					
					//edit in place
					$('.ttHighLOfferEditInPlace').css({cursor: 'pointer', textDecoration: 'underline', color: '#ffff00'});
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('.ttHighLOfferEditInPlace').live('click',function(e){
							fnTTMboxLoadCustom($(this).attr('data-mbName'));
						});					
					}else{
						$(document).on('click','.ttHighLOfferEditInPlace',function(e){
							fnTTMboxLoadCustom($(this).attr('data-mbName'));
						});
					}
										
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('#ttCustomMboxHTMLContent #ttCustomMboxHTMLClearBtn').live('click',function(e){
							$('#ttCustomMboxHTMLContent textarea').val(''); //clear
						});					
					}else{
						$(document).on('click','#ttCustomMboxHTMLContent #ttCustomMboxHTMLClearBtn',function(e){
							$('#ttCustomMboxHTMLContent textarea').val(''); //clear
						});					
					}
					//common code to be reused
					function ttCustomMboxHTMLApplyBtnClick(ev,$thisPar){						
						//Edit HTML for particular mbox on match
						var preserveWrapDefHTML = '', preserveWrapNonDefHTML = '';
						mboxFactoryDefault.getMboxes().each(function(i,e) { 
							if (i.getName()==$('#ttCustomMboxHTMLContent').data('mbxName')) {
								preserveWrapDefHTML = $(i.getDiv()).find('.ttHighLLabelWrapDef').clone().wrap('<p>').parent().html();
								if (typeof preserveWrapDefHTML==="undefined" || preserveWrapDefHTML == null) {
									preserveWrapDefHTML = '';
								}
								preserveWrapNonDefHTML = $(i.getDiv()).find('.ttHighLLabelWrap').clone().wrap('<p>').parent().html();
								if (typeof preserveWrapNonDefHTML==="undefined" || preserveWrapNonDefHTML == null) {
									preserveWrapNonDefHTML = '';
								}
								$(i.getDiv()).html(preserveWrapDefHTML + preserveWrapNonDefHTML + $('#ttCustomMboxHTMLContent textarea').val());
							}
						});
						ttCustomMboxHTMLOverlay();
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('#ttCustomMboxHTMLContent #ttCustomMboxHTMLApplyBtn').live('click',function(e){
							ttCustomMboxHTMLApplyBtnClick(e,$(this));
						});
					
					}else{
						$(document).on('click','#ttCustomMboxHTMLContent #ttCustomMboxHTMLApplyBtn',function(e){
							ttCustomMboxHTMLApplyBtnClick(e,$(this));
						});					
					}
					//common code to be reused
					function ttHighlMboxMouseEnter(ev,$thisPar){
						if ($('#ttoutHighlToolBtnShowHideHighlights.show').length==1 && $('#ttMouseHighlight').is(':checked')){ //only when highlights are not on, already
							$thisPar.find('.ttHighLMboxLabel, .ttHighLOfferLabel, .ttHighLOfferRestoreDefCont, .ttHighLOfferEditInPlace').show();
							$thisPar.find(".ttHighLLabelWrapDef").css({backgroundColor: '#00aeef', color: '#fff', padding: '5px',fontSize: '11px'});
							$thisPar.find(".ttHighLLabelWrap").css({backgroundColor: '#00aeef', color: '#fff', padding: '5px', fontSize: '11px'});
							$thisPar.css({border: '3px outset red', clear: 'both', width: '101%'});
							$thisPar.height(ttHightBasedOnHighestChild($thisPar)+30+'px');
						}
						
					}
					//common code to be reused
					function ttHighlMboxMouseLeave(ev,$thisPar){
						if ($('#ttoutHighlToolBtnShowHideHighlights.show').length==1 && $('#ttMouseHighlight').is(':checked')){ //only when highlights are not on, already
							$thisPar.find('.ttHighLMboxLabel, .ttHighLOfferLabel, .ttHighLOfferRestoreDefCont, .ttHighLOfferEditInPlace').hide();
							$thisPar.find('.ttHighLLabelWrapDef').removeAttr('style').css('visibility','visible');
							$thisPar.find('.ttHighLLabelWrap').removeAttr('style').css('visibility','visible');						
							$thisPar.removeAttr('style').css('visibility','visible');
						}						
					}
					if (typeof $(document).on == "undefined") { //fallback for older jquery
						$('.ttHighlMbox').live('mouseenter', function(e){
							ttHighlMboxMouseEnter(e,$(this));
							
						}).live('mouseleave',function(e){
							ttHighlMboxMouseLeave(e,$(this));
						});					
					}else{
						$(document).on('mouseenter','.ttHighlMbox', function(e){
							ttHighlMboxMouseEnter(e,$(this));							
						}).on('mouseleave','.ttHighlMbox',function(e){
							ttHighlMboxMouseLeave(e,$(this));
						});					
					}
					
					
					//Reposition buttons when layout requires so
					if ($(window).width() < 1260  || location.host == "barclays.mobi") {
						ttPositionBtnsTop();
					}
					
					$(window).resize(function() {
						if ($(window).width() < 1260 || location.host == "barclays.mobi") {
							ttPositionBtnsTop();
						}else{
							ttPositionBtnsLeft();
						}					
					});
					
					if (location.search.indexOf('?mboxDisable=1')>-1 || location.search.indexOf('&mboxDisable=1')>-1 || location.search.indexOf('?amp;mboxDisable=1')>-1){
						$('#ttoutHighlToolBtnForceDefault, #ttHighlToolBtnForceDefault').text('Remove F.D.').addClass('removeForceDef').css({backgroundColor: '#ff00ff'}).attr('title','Remove ?mboxDisable=1 from the URL, and reload - allows T&T campaigns back in');
					}
					
					if (location.host.indexOf('bank.barclays.co.uk')>-1 && $('#anonBarcDataTimerSet').length==0 && $('#anonBarcDataTimerClear').length==0){
						function anonBarcData(){
							$('.users-table .surname').html('XXX XXX XXX');
							$('.users-table .reference-number').html('XXX XXX XXX');
							$('span.account-name').html('XXX XXX XXX');
							$('span.account-detail').html('XXX XXX XXX');
							$('span.lozenge-small span.mid').html('XXX XXX XXX');
							$('#ctc .module-content').html('XXX XXX XXX');
							$('.last-login').html('XXX XXX XXX');
							$('#user-controls .info .customer-name').html('XXX XXX XXX');
							$('#user-controls .info .contact-details').html('XXX XXX XXX');
							$('.handle .title').html('XXX XXX XXX');
							$('.handle .list-account-detail').html('XXX XXX XXX');
							$('.handle .title').html('XXX XXX XXX');
							$('.handle .list-account-detail').html('XXX XXX XXX');
							$('#takeover div.header p.the-account-number').html('XX-XX-XX XXXXXXXX');
							$('p.account-balance span.mid').html('&pound;X,XXX');
							$('#acc-details-ctr .details-list dd').html('&pound;X,XXX');
							$('#acc-details-ctr .overdraft .lozenge-small span.mid').html('-&pound;X,XXX');
							$('#takeover div.header form h2 a').html('XXX XXX XXX');
							$('#filterable.transactions tbody td.date').html('XX/XX/XXXX');
							$('#filterable.transactions tbody td.description').html('XXX XXX XXX');
							$('#filterable.transactions tbody td.mi').html('&pound;X,XXX');
							$('#filterable.transactions tbody td.mo').html('-&pound;X,XXX');
							$('#filterable.transactions tbody td.balance').html('&pound;X,XXX');
							$('#filterable.transactions .transaction-data p.spend').html('-&pound;X,XXX');
							$('#filterable.transactions .transaction-data .merchant p').html('XXX XXX XXX');
						
							//Mobi selectors - BETA (very generic HTML is in use so it's very hard to identify uniquely elements)
							 $('.mobiPage table.BalanceOverview a.account').html('XXX XXX XXX');
							 $('.mobiPage #selectedProductId option').html('XXX XXX XXX');
							 $('.mobiPage #productIdentifier option').html('XXX XXX XXX');
							 $('.mobiPage #fromAccountIndex option').html('XXX XXX XXX');
							 $('.mobiPage #fromAccountId option').html('XXX XXX XXX');
							 $('.mobiPage #toAccountId option').html('XXX XXX XXX');
							 $('.mobiPage #mobiAccount option').html('XXX XXX XXX');
							 $('.mobiPage .mobLink_2 b').html('&pound;X,XXX');
							 $('.mobiPage .debit-text').html('&pound;X,XXX');
							 $('.mobiPage .credit-text').html('&pound;X,XXX');
							 $(".mobiPage form .rowOdd, .mobiPage form .rowEven").contents().filter(function() { return this.nodeType == 3; }).replaceWith("<span class='rowItemHideContent'>XXX</span>");
							 //remove all but first
							 $(".mobiPage form .rowOdd, .mobiPage form .rowEven").find("span.rowItemHideContent:not(:first)").remove();
							 //Date's current 'pattern'
							 $(".mobiPage form > b").html('XX/XX/XXXX');
							 $('.mobiPage .mobi-account-summary-details').html('XXX XXX XXX');
						}
						
						//execute as soon as
						//anonBarcData();
						
						$(function(){
							var anonBarcDataTimerInterval;
							//On load set repeating call every second
							/*
							$('body').live("click",function(){
								anonBarcData();
							});
							*/
							if ($('#anonBarcDataTimerSet').length==0){
								$('p.logo').append('<a class="setint" id="anonBarcDataTimerSet" style="background: #00aeef; border-radius: 7px; color: #FFFFFF; cursor: pointer; display: block; font-weight:bold; height: 20px; left: 300px; padding: 5px 10px 2px; position:absolute; top: 22px;  width: auto; z-index: 99999;">Anonymize Every 0.5 sec</a>');
							}
							if ($('#anonBarcDataTimerClear').length==0){
								$('p.logo').append('<a class="clearint" id="anonBarcDataTimerClear" style="background: #00aeef; border-radius:7px; color: #FFFFFF; cursor: pointer; display: block; font-weight:bold; height: 20px; left: 300px; padding: 5px 10px 2px; position:absolute; top: 22px;  width: auto; z-index: 99999; display: none;">STOP Anonymizing Every 0.5 sec</a>');
							}
							if (typeof $(document).on == "undefined") { //fallback for older jquery
								$('#anonBarcDataTimerSet').live('click',function(e){
									$('#anonBarcDataTimerSet').hide();
									$('#anonBarcDataTimerClear').show();
									anonBarcDataTimerInterval=setInterval(function(){anonBarcData()},500);
								});
							}else{
								$(document).on('click','#anonBarcDataTimerSet',function(e){
									$('#anonBarcDataTimerSet').hide();
									$('#anonBarcDataTimerClear').show();
									anonBarcDataTimerInterval=setInterval(function(){anonBarcData()},500);
								});
							}
							
							if (typeof $(document).on == "undefined") { //fallback for older jquery
								$('#anonBarcDataTimerClear').live('click',function(e){
									$('#anonBarcDataTimerClear').hide();
									$('#anonBarcDataTimerSet').show();
									window.clearInterval(anonBarcDataTimerInterval);
								});
							}else{
								$(document).on('click','#anonBarcDataTimerClear',function(e){
									$('#anonBarcDataTimerClear').hide();
									$('#anonBarcDataTimerSet').show();
									window.clearInterval(anonBarcDataTimerInterval);
								});
							}
						
						});
						
					}
					
		},800);
	}