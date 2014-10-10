$(function() {


	//Show/hide links

	$("a.showAllCTA:contains('show')").live("click",function(e){
		e.preventDefault();
		$(this).closest("table").find("tbody tr").show();
		$(this).html("here to hide 10+ rows");
		return false;
	});
	$("a.showAllCTA:contains('hide')").live("click",function(e){
		e.preventDefault();
		$(this).closest("table").find("tbody tr:nth-child(n+10)").hide();
		$(this).html("here to show all rows");
		return false;
	});

	//Check whether Tables have more than 10 rows in the tbody, remove the show/hide links for those
	$('table tbody').each(function(){
		if ($(this).find('tr').length <=10){
			$(this).closest('table').find('div.showAllWrap').remove();
		}
	});

	//Change all Campaign IDs  / titles to clickable links
	$('h1 .campaignID').each(function(){
		$(this).html('<a href="https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp?campaignId='+$(this).text()+'" target="_blank">'+$(this).text()+'</a>')
	});

	//1.8.1 fix for contains to be case insensitive
	$.expr[":"].contains = $.expr.createPseudo(function(arg) {
		return function( elem ) {
			return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});

	setTimeout(function(){

		//Add filter logic
		$('<div id="filterWrap">' +
			'<label for="inpCampaignIDNameFilter" class="filterLabel">Filter by Campaign ID/Name:</label><input type="text" id="inpCampaignIDNameFilter" name="inpCampaignIDNameFilter" placeholder="Type in part of a campaign name or id, filter would apply on every keystroke. Clear to see all." />\r\n ' +
			'<div></div>' +
			'<label for="inpCampaignLogFilter" class="filterLabel">Filter by Change Log keyword:</label><input type="text" id="inpCampaignLogFilter" name="inpCampaignLogFilter" placeholder="Type in part of a change log (this could be name, offer, etc), filter would apply on every keystroke. Clear to see all." />\r\n ' +
			'</div>').insertBefore('h1.campaignNameHead:eq(0)');

		//Attach events
		$( "#inpCampaignIDNameFilter" ).live("keyup", function(e) {
			var inpVal = $(this).val(),
				selectHide="h1.campaignNameHead:not(:contains('"+inpVal+"'))", selectShow="h1.campaignNameHead:contains('"+inpVal+"')";
			if (inpVal!=''){
				$(selectHide).hide();
				$(selectHide).next('table').hide();
				$(selectShow).show();
				$(selectShow).next('table').show();
			}else{
				$('h1.campaignNameHead').show().next('table').show();
			}
		});

		$( "#inpCampaignLogFilter" ).live("keyup", function(e) {
			var inpVal2 = $(this).val(),
				selectHide="table tbody:not(:contains('"+inpVal2+"'))", selectShow="table tbody:contains('"+inpVal2+"')";
			if (inpVal2!=''){
				$(selectHide).closest('table').hide();
				$(selectHide).closest('table').prev('h1.campaignNameHead').hide();
				$(selectShow).closest('table').show();
				$(selectShow).closest('table').prev('h1.campaignNameHead').show();
			}else{
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
			}
		});

	}, 1000);


});