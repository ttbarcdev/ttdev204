/*var jquijsfileref=document.createElement('script');
jquijsfileref.setAttribute("type","text/javascript");
jquijsfileref.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js");
document.getElementsByTagName("head")[0].appendChild(jquijsfileref);
*/
var ttOffersSearchStopAjaxLoop = false;

if($j('#searchOffersQuery').length == 0) {
	if (window.location.href.indexOf("campaign_edit_forward.jsp")!==-1){
		alert("You need to be on the offers list page OR within a campaign with a Change Offer dialog open in T&T Admin, for this tool to work. If you click, OK, please load the tool again after you've opened a Change Offer dialog.");
	}else{
		var ttCListConfOffJSP = confirm("You need to be on the offers list page OR within a campaign with a Change Offer dialog open in T&T Admin, for this tool to work. Do you want to go to the offers list page? If you click, OK, please load the tool again after you're at the correct page.");
	   if (ttCListConfOffJSP){
		   window.location.href=location.protocol+"//"+location.host+"/admin/offers/offers.jsp";
	   }			
	}
	

}else{
	$j( "<style>.ttUIAutoComplete .ui-autocomplete {max-height: 200px;	max-width: 550px;	overflow-y: auto;	overflow-x: hidden;	} .ttUIAutoComplete .ui-state-hover {background-color: #ccc;	} #jqUIDialAPIOfferListGenResetLoaderIco {display: block; width: 48px; height: 48px; position: absolute; top: 95px; right: 35px;} #jqUIDialAPIOfferListGen {width: 560px !important;}  #jqUIDialAPIOfferListGenResetUP {outline: none;} #jqUIDialAPIOfferSearchAllForm {width: 620px; float: left; clear: left;} #jqUIDialAPIOfferSearchAllForm input {margin-right: 10px;} #jqUIDialAPIOfferSearchAllForm label {display: block; float: left; padding-top: 10px; };}</style>" ).appendTo("head");

	function ttCleanArray(actual){
	  var newArray = new Array();
	  for(var i = 0; i<actual.length; i++){
		  if (actual[i]){
			newArray.push(actual[i]);
		}
	  }
	  return newArray;
	}

	/* ****** NOTE: Assume that the tampermonkey/greasemonkey plugin has loaded jszip.js, jStorage.js and FileSaver.js - without these the below code won't work ****** */

function ttSelectText(element) {
    var doc = document;
    var text = doc.getElementById(element);    

    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();            
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}	

	var ttHelperOffersListStrToArr = $j.jStorage.get("ttHelperOffersList");
	if ($j("#ttOfferList").length==0){
		$j('body').append("<div id='jqUIDialOfferList' title='Select Offers from the list. Type any part of the offer name. Case insensitive!'><input type='text' title='Campaing List' id='ttOfferList' style='width: 550px' /></div>");
	}

	$j("#jqUIDialOfferList").dialog({
	  autoOpen: false,
	  modal: true,
	  width: 'auto',
	  buttons: {
		 "Global Search": function() {
			if (ttHelperOffersListStrToArr.length>0){
				$j("#jqUIDialAPIOfferSearchAll").dialog("open");
				$j('button:contains("Cancel search")').hide();
				$j("#ttOfferList").dialog("close");   
			}else{
				alert("Please get an updated Offer List, by pressing the 'Update Offer list' button");
				return false;
			}
		},
		 "Go To Offer": function() {
			if ($j('#ttOfferList').val()!=""){
				ttCurSelOffName = $j('#ttOfferList').val();
				
				/*
				$j('#searchOffers').css({position: 'relative'});
				$j('#searchOffers').prepend('<div id="searchOffersPressEnterTooltip" style="position: absolute; top: -40px; z-index: 10000;display: none; background: #fff; outline: 2px outset red;padding: 5px 10px;left: 28px;} ">Now just press Enter</div>')
				$j('#searchOffersPressEnterTooltip').show(0).delay(6000).hide(0);
				$j(window).scrollTop($j('#searchOffersPressEnterTooltip').offset().top-30);
				$j('#searchOffersQuery').val(ttCurSelOffName).focus();
				*/
				$j("#jqUIDialOfferList").dialog("close");
				$j('#searchOffersQuery').focus();
				
				window.location.href=location.protocol+"//"+location.host+"/admin/offers/offers.jsp?prefix=" + ttCurSelOffName;
			}else{
				alert("Please select an offer");
			}
			
		},
		"Update Offer list": function() {
			$j.jStorage.set("ttHelperOffersList","");				
			$j("#jqUIDialAPIOfferListGen").dialog("open");
			$j("#jqUIDialOfferList").dialog("close");          		
		},
		"Backup": function() {
			//$j.jStorage.set("ttHelperOffersList","");
			$j("#jqUIDialAPIOffersBackup").dialog("open");
			$j("#jqUIDialOfferList").dialog("close");
		},
		"Close": function() {
			$j("#jqUIDialOfferList").dialog("close");
		}
	  },
	  open: function(event, ui) {
		$j('#ttOfferList').val("");
	  }
	});
	
	if ($j("#jqUIDialAPIOfferSearchAll").length==0){
	$j('body').append(
	'<div id="jqUIDialAPIOfferSearchAll" title="Search Through Offer Data (using Adobe\'s API)">'
		+'<div style="margin-top: 10px;">'
			+'<p style="margin-top: 10px;">Specify different filters for the search and then press the "Search offers" for API calls to be made to Adobe <br />for each offer in the (pre-saved locally) offers list. It\'s a good idea to <a href="#update" id="jqUIDialAPIOfferSearchAllUpdate" style="outline: none;">update</a> offer list first.</p>'
			
			+'<form id="jqUIDialAPIOfferSearchAllForm" onSubmit="return false;">'
				+'<div style="clear: both; float: left; font-weight: bold; margin-top: 10px;">Simple search (offer name):</div>'
				+'<label for="jqUIDialAPIOfferSearchAllForm_OfferName" class="o" style="clear: both; float: left; font-weight: bold;">Offer Name: <input type="text" id="jqUIDialAPIOfferSearchAllForm_OfferName" name="jqUIDialAPIOfferSearchAllForm_OfferName" placeholder="" autocomplete="off"/></label>'				
				+'<div style="clear: both; float: left; font-weight: bold; margin-top: 10px;">'
					+'<p style="margin-bottom: 10px;"><b>OR</b></p>'
					+'Advanced search (any part of the offer HTML code single or multi-line, but case Sensitive!):'
				+'</div>'
				+'<label for="jqUIDialAPIOfferSearchAllForm_OfferCode" class="o" style="clear: both; float: left; color: #8F00FF; font-weight: bold;">* Offer HTML Code: <textarea id="jqUIDialAPIOfferSearchAllForm_OfferCode" name="jqUIDialAPIOfferSearchAllForm_OfferCode" placeholder="eg: s.tl" style="margin-left: 17px; width: 463px; height: 150px;"></textarea></label>'				
				+'<div style="height: 1px;float: left;clear: both;width: 100%;margin-top: 5px;"></div>'				
			+'</form>'
			
			+'<div id="jqUIDialAPIOfferSearchAllLoaderIco" style="display: none; float: right; position: absolute; top: 342px; left: 582px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" /></div>'
			+'<div id="jqUIDialAPIOfferSearchAllStatus" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
			+'<div id="jqUIDialAPIOfferSearchAllProgressBar" style="padding-top: 10px; display: none; float: none; clear: both; width: 620px; height: 20px;"></div>'			
			+'<div id="jqUIDialAPIOfferSearchAllResultHead" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Offers found (<span class="numb">0</span>) <a href="#" id="ttHidAllowEdit">:</a> </div>'			
			+'<div id="jqUIDialAPIOfferSearchAllResult" style="clear: both; display: none; overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'
			
		+'</div>'
	+'</div>'
	);
	
	$j('#ttHidAllowEdit').click(function(){
		$j('#jqUIDialAPIOfferSearchAllResult').attr('contenteditable','true');
	});

	$j('#jqUIDialAPIOfferSearchAllUpdate').click(function(){
		$j("#jqUIDialAPIOfferSearchAll").dialog("close");
		$j("#jqUIDialAPIOfferListGen").dialog("open");
	});
	
	$j('#jqUIDialAPIOfferSearchAllResult a').live('click',function(){
		/*ttOffersSearchStopAjaxLoop = true;
		$j("#jqUIDialAPIOfferSearchAll").dialog("close");
		$j("#jqUIDialOfferList").dialog("open");
		$j("#ttOfferList").val($j(this).attr('title'));
		$j("button:contains('Go To Offer')").click();
		*/
		window.open(location.protocol+"//"+location.host+"/admin/offers/offers.jsp?prefix=" + $j(this).attr('title'));
		return false;
	});
	
	$j("#jqUIDialAPIOfferSearchAllProgressBar").progressbar({
      value: false
    });
	}
	
	$j("#jqUIDialAPIOfferSearchAll").dialog({
	  autoOpen: false,
	  modal: true,
	  width: 'auto',
	  height:'auto',
	  position: 'center',
	  buttons: {
		"Cancel search": function(){
			ttOffersSearchStopAjaxLoop = true;
			$j('#jqUIDialAPIOfferSearchAllLoaderIco').hide();
			$j('#jqUIDialAPIOfferSearchAllStatus').hide();
			$j('#jqUIDialAPIOfferSearchAllProgressBar').hide();
			if (parseInt($j('#jqUIDialAPIOfferSearchAllResultHead .numb').text())==0){
				$j('#jqUIDialAPIOfferSearchAllResult').hide();
			}
		},			   
		"Search offers": function() {	
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
			$j('#jqUIDialAPIOfferSearchAllResultHead .numb').html(0);
			$j('button:contains("Cancel search")').show();
			
			if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass") && $j.jStorage.get("ttHelperOffersList")) {
				
				var ttHelperCampaignListArr=new Array(),
					ajaxArrIdx = 0, elmtchTitle="";
					
				ttHelperOffersListArr = $j.jStorage.get("ttHelperOffersList");

				//Loop through all offers
				$j('#jqUIDialAPIOfferSearchAllResult').html("");
				
				ttHelperOffersListArr.sort(); //alpha sort
				
				ttOffersSearchStopAjaxLoop = false;
				
				//Simple Search
				//loop through locally saved
				if ($j('#jqUIDialAPIOfferSearchAllForm_OfferName').val().toLowerCase()!=""){
					//match on offer name/id
					$j('#jqUIDialAPIOfferSearchAllStatus').show();
					
					ttHelperOffersListArr.each(function(el){						
						elmtchTitle=el;
		
						$j('#jqUIDialAPIOfferSearchAllResultHead').show();
						$j('#jqUIDialAPIOfferSearchAllResult').show();
						
						if ($j('#jqUIDialAPIOfferSearchAllForm_OfferName').val().toLowerCase()!=""){
							if ($j('#jqUIDialAPIOfferSearchAllForm_OfferName').val().toLowerCase()!="" && el.toLowerCase().indexOf($j('#jqUIDialAPIOfferSearchAllForm_OfferName').val().toLowerCase())!=-1){
								$j('#jqUIDialAPIOfferSearchAllResult').append("<a href=\"javascript:void();\" title=\"" + elmtchTitle + "\"  style=\"font-weight: bold; font-size: 11px;\">"+el+"</a>" + "<br />");
								$j('#jqUIDialAPIOfferSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPIOfferSearchAllResultHead .numb').text())+1);
									
								$j('#jqUIDialAPIOfferSearchAllResult a:last').focus();
							}
						}
					});
					$j('button:contains("Cancel search")').hide();
				}else{
					//Advanced Search
					//ajax get on all from the locally saved					
					function ttHelperOffersListArrSearch(){
						if (ajaxArrIdx < ttHelperOffersListArr.length){
						var ttCurOffer = ttHelperOffersListArr[ajaxArrIdx++],
							elmtchCID = "";
							elmtchTitle=ttCurOffer;
							$j('#jqUIDialAPIOfferSearchAllResultHead').show();
							$j('#jqUIDialAPIOfferSearchAllResult').show();
							
							$j.ajax({								
								url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=getHtmlOfferContent&offerName='+ttCurOffer+'&version=2',
								cache:false,
								//timeout:18000,
								xhrFields: {
									withCredentials: true
								},beforeSend: function(){
									if (ttOffersSearchStopAjaxLoop==true){return false;}
									$j('#jqUIDialAPIOfferSearchAllLoaderIco').show();
									$j('#jqUIDialAPIOfferSearchAllStatus').html('<b>Currently processing: ('+ajaxArrIdx+'/'+ ttHelperOffersListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + ttCurOffer + '</p>').show();
									//Set progress bar
									$j("#jqUIDialAPIOfferSearchAllProgressBar").progressbar( "option", {
									  value: ajaxArrIdx,
									  max: ttHelperOffersListArr.length
									});
									$j("#jqUIDialAPIOfferSearchAllProgressBar").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
									$j("#jqUIDialAPIOfferSearchAllProgressBar").show();
								},success:function(data){
									//handle response
									
									var xmlDoc = data,
									$xml = $j(xmlDoc),
									//$offerId = parseInt($xml.find("htmlOffer id:first").text()), //Offer ID
									$offerValue = $xml.find("htmlOffer value:first").text(); //Offer HTML Code Value

									//offer code match
									if ($j('#jqUIDialAPIOfferSearchAllForm_OfferCode').val()!="" && $offerValue.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,'').indexOf($j('#jqUIDialAPIOfferSearchAllForm_OfferCode').val().replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,''))!=-1){
										
										$j('#jqUIDialAPIOfferSearchAllResult').append("<a href=\"javascript:void();\" title=\"" + elmtchTitle + "\"  style=\"font-weight: bold; font-size: 11px;\">"+ttCurOffer+"</a>" + "<br />");
										$j('#jqUIDialAPIOfferSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPIOfferSearchAllResultHead .numb').text())+1);
											
										$j('#jqUIDialAPIOfferSearchAllResult a:last').focus();
										
									}
									
									//move to next iteration (offer) from the list
									ttHelperOffersListArrSearch();
								},
								error: function(XMLHttpRequest, textStatus, errorThrown) { 
									//console.log("Status: " + textStatus); 
									//when we have invalid XML jquery could fail, but we still want to search through the response
									//console.log("Error: " + errorThrown); 
									
									//$offerId = parseInt($xml.find("htmlOffer id:first").text()), //Offer ID

									$offerValue = XMLHttpRequest.responseText; //Offer HTML Code Value
									
									//offer code match
									if ($j('#jqUIDialAPIOfferSearchAllForm_OfferCode').val()!="" && $offerValue.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,'').indexOf($j('#jqUIDialAPIOfferSearchAllForm_OfferCode').val().replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,''))!=-1){
										
										$j('#jqUIDialAPIOfferSearchAllResult').append("<a href=\"javascript:void();\" title=\"" + elmtchTitle + "\"  style=\"font-weight: bold; font-size: 11px;\">"+ttCurOffer+"</a>" + "<br />");
										$j('#jqUIDialAPIOfferSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPIOfferSearchAllResultHead .numb').text())+1);
											
										$j('#jqUIDialAPIOfferSearchAllResult a:last').focus();
									}
									
									//move to next iteration (offer) from the list
									ttHelperOffersListArrSearch();

								} 
							});

						}else{ //last one
						$j('#jqUIDialAPIOfferSearchAllLoaderIco').hide();
						$j('#jqUIDialAPIOfferSearchAllStatus').hide();
						$j('#jqUIDialAPIOfferSearchAllProgressBar').hide();
						if (parseInt($j('#jqUIDialAPIOfferSearchAllResultHead .numb').text())==0){
							$j('#jqUIDialAPIOfferSearchAllResult').hide();
						}
						$j('button:contains("Cancel search")').hide();
					}
						
					};
					
					ttHelperOffersListArrSearch(); //First run

				}
					
				
			}
		},
		"Close": function(){
			ttOffersSearchStopAjaxLoop = true;
			$j('#jqUIDialAPIOfferSearchAllLoaderIco').hide();
			$j('#jqUIDialAPIOfferSearchAllStatus').hide();
			$j('#jqUIDialAPIOfferSearchAllProgressBar').hide();
			if (parseInt($j('#jqUIDialAPIOfferSearchAllResultHead .numb').text())==0){
				$j('#jqUIDialAPIOfferSearchAllResult').hide();
			}
			$j("#jqUIDialAPIOfferSearchAll").dialog("close");
			$j("#jqUIDialOfferList").dialog("open");
		}
	  }
	});
	
	
	if ($j("#jqUIDialAPIOffersBackup").length==0){
		$j('body').append('<div id="jqUIDialAPIOffersBackup" title="Get all Offers and Backup (using Adobe\'s API)">'
				+'<div style="margin-top: 10px;">'
					+'<p style="margin-top: 10px;">Press "Generate backup" for API call to be made to Adobe and the offers list to be pulled. <br /><br />Every 400 offers will be zipped together, and the zip downloaded.<br/>More than this could crash your browser, hence the split.</p>'
					+'<p style="margin-top: 10px; font-size: 10px;">If you have incorrect API user/pass saved, you can reset them using this link: <a href="#resetuserPass" id="jqUIDialAPIOffersBackupResetUP">Reset API user/pass</a>. <br /> Next time you use the "Get offers" button, you\'ll be prompted to confirm them again. <br />This would also happen if you haven\'t specified API user/pass yet.</p>'
					+'<div id="jqUIDialAPIOffersBackupLoaderIco" style="display: none;width: 48px; height: 48px; position: absolute; top: 95px; right: 35px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" /></div>'
					+'<div id="jqUIDialAPIOffersBackupProgressBar" style="padding-top: 10px; display: none; float: none; clear: both; width: 560px; height: 20px;"></div>'
					+'<div id="jqUIDialAPIOffersBackupStatus" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
				+'</div>'
			+'</div>');
		$j('#jqUIDialAPIOffersBackupResetUP').click(function(e){
			e.preventDefault();
			$j.jStorage.set("ttHelperCampaignsListAPIUser","");
			$j.jStorage.set("ttHelperCampaignsListAPIPass","");
			return false;
		});	
	}
	
	$j("#jqUIDialAPIOffersBackup").dialog({
	  autoOpen: false,
	  modal: true,
	  width: 'auto',
	  buttons: /*{
		  "Cancel backup": function(){
			ttOffersSearchStopAjaxLoop = true;
			$j('#jqUIDialAPIOffersBackupLoaderIco').hide();
			$j('#jqUIDialAPIOffersBackupProgressBar').hide();
		},*/{
		"Generate backup": function() {
				
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
			$j('#jqUIDialAPIOffersBackupResultHead .numb').html(0);
			$j('button:contains("Cancel backup")').show();
			
			//create zip object
			var ttOffersBackupZip = new JSZip();
			
			if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass") && $j.jStorage.get("ttHelperOffersList")) {
				
				var ttHelperCampaignListArr=new Array(),
					ajaxArrIdx = 0, elmtchTitle="", ajaxArrSplitPart = 1;
					
				ttHelperOffersListArr = $j.jStorage.get("ttHelperOffersList");

				//Loop through all offers
				ttHelperOffersListArr.sort(); //alpha sort
				
				ttOffersSearchStopAjaxLoop = false;
				
				//ajax get on all from the locally saved					
				function ttHelperOffersListArrBackup(){
					if (ajaxArrIdx < ttHelperOffersListArr.length){
					var ttCurOffer = ttHelperOffersListArr[ajaxArrIdx++],
						elmtchCID = "";
						elmtchTitle=ttCurOffer;
						$j('#jqUIDialAPIOffersBackupResultHead').show();
						$j.ajax({								
							url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=getHtmlOfferContent&offerName='+ttCurOffer+'&version=1',
							cache:false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							},beforeSend: function(){
                                /*
								if (ttOffersSearchStopAjaxLoop==true){
									$j('#jqUIDialAPIOffersBackupLoaderIco').hide();
									$j('#jqUIDialAPIOffersBackupStatus').hide();
									$j('#jqUIDialAPIOffersBackupProgressBar').hide();
									$j('button:contains("Cancel backup")').hide();


                                    //var ttOffersBackupZipContent = ttOffersBackupZip.generate({compression: "DEFLATE"});
									//location.href="data:application/zip;base64,"+ttOffersBackupZipContent;

                                    var zipDateSt="", zipDateStYY = new Date().getFullYear(), zipDateStMM = (new Date().getMonth()+1) , zipDateStDD=new Date().getDate();
                                    if (zipDateStMM<10){zipDateStMM="0"+zipDateStMM};
                                    if (zipDateStDD<10){zipDateStDD="0"+zipDateStDD};
                                    zipDateSt = zipDateStYY + zipDateStMM + zipDateStDD;

                                    var ttOffersBackupZipContent = ttOffersBackupZip.generate({compression: "DEFLATE", type: "blob"});
                                    saveAs(ttOffersBackupZipContent, zipDateSt + "_" + ttHelperOffersListArr.length + "_OffersBackup.zip");

                                    return false;
									}
									*/
								if (ajaxArrIdx%401==0){									
									//ttOffersBackupZipContent = ttOffersBackupZip.generate({compression: "DEFLATE"});
									//location.href="data:application/zip;base64,"+ttOffersBackupZipContent;

                                    var zipDateSt="", zipDateStYY = new Date().getFullYear(), zipDateStMM = (new Date().getMonth()+1) , zipDateStDD=new Date().getDate();
                                    if (zipDateStMM<10){zipDateStMM="0"+zipDateStMM};
                                    if (zipDateStDD<10){zipDateStDD="0"+zipDateStDD};
                                    //zipDateSt = zipDateStYY + zipDateStMM + zipDateStDD;
									var ttD = new Date();
									zipDateSt = (ttD.getFullYear()*100 + ttD.getMonth()+1)*100 + ttD.getDate();

                                    var ttOffersBackupZipContent = ttOffersBackupZip.generate({compression: "DEFLATE", type: "blob"});
                                    saveAs(ttOffersBackupZipContent, zipDateSt + "_" + ttHelperOffersListArr.length + "_OffersBackup_part_"+(ajaxArrSplitPart++)+".zip");

									//start a new Zip every 400 offers - prevents browser from crashing
									ttOffersBackupZip = new JSZip();
								}								
								$j('#jqUIDialAPIOffersBackupLoaderIco').show();
								$j('#jqUIDialAPIOffersBackupStatus').html('<b>Currently processing: ('+ajaxArrIdx+'/'+ ttHelperOffersListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + ttCurOffer + '</p>').show();
								//Set progress bar
								$j("#jqUIDialAPIOffersBackupProgressBar").progressbar( "option", {
								  value: ajaxArrIdx,
								  max: ttHelperOffersListArr.length
								});
								$j("#jqUIDialAPIOffersBackupProgressBar").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
								$j("#jqUIDialAPIOffersBackupProgressBar").show();
							},success:function(data){
								//handle response
								
								var xmlDoc = data,
								$xml = $j(xmlDoc),
								$offerValue = $xml.find("htmlOffer value:first").text(); //Offer HTML Code Value

								//offer code process
									
								$j('#jqUIDialAPIOffersBackupResultHead .numb').html(parseInt($j('#jqUIDialAPIOffersBackupResultHead .numb').text())+1);
								var ttBackupCleanOfferFileName = ttCurOffer.replace(/\s+/gi, '-').replace(/[^a-zA-Z0-9\-]/gi, ''); // Replace white space with dash & Strip any special character;
								
								ttOffersBackupZip.file(ttBackupCleanOfferFileName
									+".txt", "<!-- " 
									+ "Original offer name: " + ttCurOffer.replace('<?xml version="1.0" encoding="UTF-8"?>','').replace('<htmlOffer><value><![CDATA[','')
									+ " -->\r\n\r\n"
									+ "<!-- Date of offer code backup: " + new Date + " -->\r\n\r\n\r\n" 
									+$offerValue);
									
								
								
								//move to next iteration (offer) from the list
								ttHelperOffersListArrBackup();
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) { 
								//console.log("Status: " + textStatus); 
								//when we have invalid XML jquery could fail, but we still want to search through the response
								//console.log("Error: " + errorThrown); 
								
								$offerValue = XMLHttpRequest.responseText; //Offer HTML Code Value
							
								
								//offer code process
									
								$j('#jqUIDialAPIOffersBackupResultHead .numb').html(parseInt($j('#jqUIDialAPIOffersBackupResultHead .numb').text())+1);
								var ttBackupCleanOfferFileName = ttCurOffer.replace(/\s+/gi, '-').replace(/[^a-zA-Z0-9\-]/gi, ''); // Replace white space with dash & Strip any special character;
								$offerValue = $offerValue.replace('<?xml version="1.0" encoding="UTF-8"?>','');
								$offerValue = $offerValue.replace('<htmlOffer><value><![CDATA[','');
								$offerValue = $offerValue.replace(']]></value></htmlOffer>','');
								ttOffersBackupZip.file(ttBackupCleanOfferFileName
									+".txt", "<!-- " 
									+ "Original offer name: " + ttCurOffer
									+ "  -->\r\n\r\n"
									+ "<!-- Date of offer code backup: " + new Date + " -->\r\n\r\n\r\n" 
									+$offerValue);
								
								//move to next iteration (offer) from the list
								ttHelperOffersListArrBackup();

							} 
						});

					}else{ //last one
					$j('#jqUIDialAPIOffersBackupLoaderIco').hide();
					$j('#jqUIDialAPIOffersBackupStatus').hide();
					$j('#jqUIDialAPIOffersBackupProgressBar').hide();
					$j('button:contains("Cancel backup")').hide();

					//var ttOffersBackupZipContent = ttOffersBackupZip.generate({compression: "DEFLATE"});
					//location.href="data:application/zip;base64,"+ttOffersBackupZipContent;

                    var zipDateSt="", zipDateStYY = new Date().getFullYear(), zipDateStMM = (new Date().getMonth()+1) , zipDateStDD=new Date().getDate();
                    if (zipDateStMM<10){zipDateStMM="0"+zipDateStMM};
                    if (zipDateStDD<10){zipDateStDD="0"+zipDateStDD};
                    //zipDateSt = zipDateStYY + zipDateStMM + zipDateStDD;
					var ttD = new Date();
					zipDateSt = (ttD.getFullYear()*100 + ttD.getMonth()+1)*100 + ttD.getDate();

                    var ttOffersBackupZipContent = ttOffersBackupZip.generate({compression: "DEFLATE", type: "blob"});
                    saveAs(ttOffersBackupZipContent, zipDateSt + "_" + ttHelperOffersListArr.length + "_OffersBackup_part_"+(ajaxArrSplitPart)+".zip");
				}
					
				};
				
				ttHelperOffersListArrBackup(); //First run
			}
		
		},	
		"Close": function() {
		  $j("#jqUIDialAPIOffersBackup").dialog("close");
		  ttHelperOffersListStrToArr = $j.jStorage.get("ttHelperOffersList");
		  $j("#ttOfferList").autocomplete({
			source: ttHelperOffersListStrToArr
		  });
		  $j("#jqUIDialOfferList").dialog("open");
		}
	  }
	});
	
	


	if ($j("#jqUIDialAPIOfferListGen").length==0){
		$j('body').append('<div id="jqUIDialAPIOfferListGen" title="Getting Offer List (using Adobe\'s API)">'
				+'<div style="margin-top: 10px;">'
					+'<p style="margin-top: 10px;">Press "Get offers" for API call to be made to Adobe and the offers list to be pulled. <br /><br />Once that has been done, this dialog will close automatically, and you can use the updated <br />offer list.</p>'
					+'<p style="margin-top: 10px; font-size: 10px;">If you have incorrect API user/pass saved, you can reset them using this link: <a href="#resetuserPass" id="jqUIDialAPIOfferListGenResetUP">Reset API user/pass</a>. <br /> Next time you use the "Get offers" button, you\'ll be prompted to confirm them again. <br />This would also happen if you haven\'t specified API user/pass yet.</p>'
					+'<div id="jqUIDialAPIOfferListGenResetLoaderIco" style="display: none;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" /></div>'
/*					+'<div id="jqUIDialAPIOfferListProgressBarUpd" style="padding-top: 10px; display: none; float: none; clear: both; width: 560px; height: 20px;"></div>'*/
				+'</div>'
			+'</div>');
		$j('#jqUIDialAPIOfferListGenResetUP').click(function(e){
			e.preventDefault();
			$j.jStorage.set("ttHelperCampaignsListAPIUser","");
			$j.jStorage.set("ttHelperCampaignsListAPIPass","");
			return false;
		});	
	}

	$j("#jqUIDialAPIOfferListGen").dialog({
	  autoOpen: false,
	  modal: true,
	  width: 'auto',
	  buttons: {			   
		"Get offers": function() {	
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
			$j('#jqUIDialAPIOfferListGenResetLoaderIco').show();
				$j.get( 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=offerList&folderId=22&version=1', function( data ) {
					var ttHelperOffersList=new Array(),
						ttHelperOffersListValueToPush = {},
						xmlDoc = data,
						$xml = $j(xmlDoc),
						$offers = $xml.find("offer");
					$offers.each(function() {
						var i = $xml.find("offer").index(this);
						ttHelperOffersListValueToPush = $j(this).find("name").text();
					
						ttHelperOffersList.push(ttHelperOffersListValueToPush);
					});	
					$j.jStorage.set("ttHelperOffersList",ttHelperOffersList);
					
					//Get metadata from campaigns list, match all offers -> campaigns
					if ($j.jStorage.get("ttHelperCampaignsListExtData")){
						var tttCampaignsListArr = ttCleanArray($j.jStorage.get("ttHelperCampaignsListExtData")),
							tttHelperOffersListArr = ttHelperOffersList,
							ttHelperOffersListExtDataArr = new Object();
						
						$j.jStorage.set("ttHelperOffersListExtData","");
						
						tttHelperOffersListArr.sort();
						tttCampaignsListArr.sort();
						
						tttHelperOffersListArr.each(function(ee,ii){
							tttCampaignsListArr.each(function(e,i){
								if (e.cmpOfferNamesString.indexOf(ee)>-1){
									if (typeof ttHelperOffersListExtDataArr[ee] === "undefined"){
										ttHelperOffersListExtDataArr[ee] = new Array();
									}
									ttHelperOffersListExtDataArr[ee].push(e.cmpID);
								}
							});
						});
						
						$j.jStorage.set("ttHelperOffersListExtData",ttHelperOffersListExtDataArr);
					}
					//Meta saved now
					
					
					$j('#jqUIDialAPIOfferListGenResetLoaderIco').hide();
					$j("#jqUIDialAPIOfferListGen").dialog("close");
					ttHelperOffersListStrToArr = $j.jStorage.get("ttHelperOffersList");
					$j("#ttOfferList").autocomplete({
						source: ttHelperOffersListStrToArr
					});
					$j("#jqUIDialOfferList").dialog("open");
				});
			}
			
			
		},	
		"Close": function() {
		  $j("#jqUIDialAPIOfferListGen").dialog("close");
		}
	  }
	});

	if (ttHelperOffersListStrToArr) {
		ttHelperOffersListStrToArr.sort();
		
		$j("#jqUIDialOfferList").dialog("open");
		
	}else{
		var ttCListConf = confirm("No offer list has been stored locally. Do you want to generate local list now?");
		if (ttCListConf){
			$j("#jqUIDialAPIOfferListGen").dialog("open");		
		}else{
			//no action
		}
	}
}
//jQuery UI
$j(function() {
	if ($j("body").hasClass("ttUIAutoComplete")!=-1){
		$j("body").addClass("ttUIAutoComplete");
		$j("body").addClass("ttOffersListMark");
	}
	if ($j("#ttOfferList").length>0){
		$j("#ttOfferList").autocomplete({
			source: ttHelperOffersListStrToArr
		});	
	}
});