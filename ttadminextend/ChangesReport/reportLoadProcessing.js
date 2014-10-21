var ttTypeWatch = (function(){ /* function to execute a callback, after the user has stopped typing for a specified amount of time */
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	}
})();

//Load jQuery UI
$('<link/>', {
	rel: 'stylesheet',
	type: 'text/css',
	href: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/start/jquery-ui.css'
}).appendTo('head');

//CSS inline (as googlecode hosted css didn't link properly in some browsers
$('<style>' +
	'h1 {margin-bottom: 20px;}' +
	'.showAllWrap {font-size: 14px; display: inline; margin-left: 30px;}' +
	'table {border: 2px outset #007EB6; padding: 0 10px; width: 98%; margin-left: 5px; border-collapse: separate; border-spacing: 5px;}' +
	'table th {text-align: left;padding: 10px 0 10px 10px; font-size: 25px;}' +
	'table td {padding: 10px;}' +
	'table tr:nth-child(even) {background: #D6DEE2;}' +
	'table tr:nth-child(odd) {background: #FFF;}' +
	'table tbody tr:nth-child(n+10) {display: none;} /* hide 10+ rows */' +
	'#inpCampaignIDNameFilter, #inpCampaignLogFilter, #inpCampaignLogDateFilter {width: 680px;padding: 4px 5px;margin-left: 10px; margin-right: 3px;}' +
	'#inpCampaignLogNameFilter {width: auto;padding: 4px 5px;margin-left: 10px; margin-right: 3px;}' +
	'#filterWrap {position: relative;}' +
	'.filterLabel {font-weight: bold;font-family: verdana;font-size: 11px;width: 200px;display: inline-block; margin-top: 15px;}' +
	'.ui-datepicker th {font-size: 15px;}' +
	'span.filterClear {display: inline-block; width: 12px; height: 12px; background-image: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/start/images/ui-icons_0078ae_256x240.png); background-position: -34px -194px; padding: 0; margin: 0; cursor: pointer;}' +
	'#filterDisclaimer {font-size: 11px;font-weight: bold;font-family: Verdana;margin-bottom: 5px;}' +
	'</style>').appendTo('head');

$.getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js', function( data, textStatus, jqxhr ) {
	//Add filter logic
	$('<div id="filterWrap">' +
		'<div id="filterDisclaimer">Please use only one filter at a time. Changing the value of one would clear the others.</div>' +
		'<label for="inpCampaignIDNameFilter" class="filterLabel">Filter by Campaign ID/Name:</label><input type="text" id="inpCampaignIDNameFilter" name="inpCampaignIDNameFilter" placeholder="Type in part of a campaign name or id, filter would apply on every keystroke. Clear to see all." /> <span class="filterClear" title="Click to clear filter"></span>\r\n ' +
		'<div></div>' +
		'<label for="inpCampaignLogFilter" class="filterLabel">Filter by Change Log keyword:</label><input type="text" id="inpCampaignLogFilter" name="inpCampaignLogFilter" placeholder="Type in part of a change log (this could be name, offer, etc), filter would apply on every keystroke. Clear to see all." /> <span class="filterClear" title="Click to clear filter"></span> \r\n ' +
		'<div></div>' +
		'<label for="inpCampaignLogDateFilter" class="filterLabel">Filter by Change Log Date:</label><input type="text" id="inpCampaignLogDateFilter" name="inpCampaignLogDateFilter" placeholder="Date filter. Clear to see all." /> <span class="filterClear" title="Click to clear filter"></span> \r\n ' +
		'<div></div>' +
		'<label for="inpCampaignLogNameFilter" class="filterLabel" style="display: none;">Filter by Change Log Name:</label> \r\n ' +
		'<select id="inpCampaignLogNameFilter" name="inpCampaignLogNameFilter" style="display: none;"> \r\n ' +
		'<option value="noSelectionMade">Select a name (or select this for no filter) </option>' +
		'</select> <span class="filterClear" title="Click to clear filter" style="display: none;"></span>' +
		'</div>').insertBefore('h1.campaignNameHead:eq(0)');
	$("#inpCampaignLogDateFilter").datepicker({ dateFormat: 'DD, MM d, yy' });

});

var ttAllNamesListArr = [];

$(function() {

	//Fix CSS3 selectors for IE7/8
	if (!jQuery.support.leadingWhitespace) {
		$('table tr:nth-child(even)').css({background: '#D6DEE2'});
		$('table tr:nth-child(odd)').css({background: '#FFF'});
		$('table tbody tr:nth-child(n+10)').css({display: 'none'});
		/* hide 10+ rows */
	}

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

	//Clear filter icons
	$('span.filterClear').live("click",function(){
		if ($(this).prev().prop("tagName").toLowerCase()=="select"){ //name filter
			$('#inpCampaignLogNameFilter option[value="noSelectionMade"]').attr("selected", "selected");
			var inpVal4 = $("#inpCampaignLogNameFilter option:selected").val(), selectTDNoHighlight4="table tbody td:not(:contains('"+inpVal4+"'))", selectTDHighlight4="table tbody td:contains('"+inpVal4+"')";
			$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
			$(selectTDHighlight4).css({border: "none"});
			$(selectTDNoHighlight4).css({border: "none"});
			$('#inpCampaignLogFilter').keyup(); //if there is something, reapply
			$('#inpCampaignLogDateFilter').change(); //if there is something, reapply
		}else{ //any of the other filters
			$(this).prev().val('');
			if ($(this).prev().attr('id')=="inpCampaignIDNameFilter"){
				var inpVal1 = $("#inpCampaignIDNameFilter").val(),	selectHide2="h1.campaignNameHead:not(:contains('"+inpVal1+"'))", selectShow2="h1.campaignNameHead:contains('"+inpVal1+"')";
				$('h1.campaignNameHead').show().next('table').show();
				$(selectShow2).css({border: "none"});
				$(selectHide2).css({border: "none"});
			}else if ($(this).prev().attr('id')=="inpCampaignLogFilter"){
				var inpVal2 = $("#inpCampaignLogFilter").val(),	selectTDNoHighlight2="table tbody td:not(:contains('"+inpVal2+"'))", selectTDHighlight2="table tbody td:contains('"+inpVal2+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
				$(selectTDHighlight2).css({border: "none"});
				$(selectTDNoHighlight2).css({border: "none"});
				$('#inpCampaignLogDateFilter').change(); //if there is something, reapply
				$('#inpCampaignLogNameFilter').change(); //if there is something, reapply
			}else if ($(this).prev().attr('id')=="inpCampaignLogDateFilter"){
				var inpVal3 = $("#inpCampaignLogDateFilter").val(), selectTDNoHighlight3="table tbody td:not(:contains('"+inpVal3+"'))", selectTDHighlight3="table tbody td:contains('"+inpVal3+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
				$(selectTDHighlight3).css({border: "none"});
				$(selectTDNoHighlight3).css({border: "none"});
				$('#inpCampaignLogFilter').keyup(); //if there is something, reapply
				$('#inpCampaignLogNameFilter').change(); //if there is something, reapply
			}
		}
	});

	setTimeout(function(){

		//Attach events
		$("#inpCampaignIDNameFilter").live("keyup", function(e) {

			// executed only 700 ms after the last keyup event.
			ttTypeWatch(function () {

				//Clear other filters
				$('#inpCampaignLogFilter').val('');
				var inpVal2 = $("#inpCampaignLogFilter").val(),	selectTDNoHighlight2="table tbody td:not(:contains('"+inpVal2+"'))", selectTDHighlight2="table tbody td:contains('"+inpVal2+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
				$(selectTDHighlight2).css({border: "none"});
				$(selectTDNoHighlight2).css({border: "none"});

				$('#inpCampaignLogDateFilter').val('');
				var inpVal3 = $("#inpCampaignLogDateFilter").val(), selectTDNoHighlight3="table tbody td:not(:contains('"+inpVal3+"'))", selectTDHighlight3="table tbody td:contains('"+inpVal3+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
				$(selectTDHighlight3).css({border: "none"});
				$(selectTDNoHighlight3).css({border: "none"});

				$('#inpCampaignLogNameFilter option[value="noSelectionMade"]').attr("selected", "selected");
				var inpVal4 = $("#inpCampaignLogNameFilter option:selected").val(), selectTDNoHighlight4="table tbody td:not(:contains('"+inpVal4+"'))", selectTDHighlight4="table tbody td:contains('"+inpVal4+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
				$(selectTDHighlight4).css({border: "none"});
				$(selectTDNoHighlight4).css({border: "none"});


				var inpVal = $("#inpCampaignIDNameFilter").val(),
					selectHide="h1.campaignNameHead:not(:contains('"+inpVal+"'))", selectShow="h1.campaignNameHead:contains('"+inpVal+"')";
				if (inpVal!=''){
					$(selectHide).hide();
					$(selectHide).next('table').hide();
					$(selectShow).show();
					$(selectShow).css({border: "1px solid red"});
					$(selectHide).css({border: "none"});
					$(selectShow).next('table').show();
				}else{
					$('h1.campaignNameHead').show().next('table').show();
					$(selectShow).css({border: "none"});
					$(selectHide).css({border: "none"});
				}
			}, 700);
		});

		$("#inpCampaignLogFilter").live("keyup", function(e) {

			// executed only 700 ms after the last keyup event.
			ttTypeWatch(function () {

				//Clear other filters
				$('#inpCampaignIDNameFilter').val('');
				var inpVal2 = $("#inpCampaignIDNameFilter").val(),	selectHide2="h1.campaignNameHead:not(:contains('"+inpVal2+"'))", selectShow2="h1.campaignNameHead:contains('"+inpVal2+"')";
				$('h1.campaignNameHead').show().next('table').show();
				$(selectShow2).css({border: "none"});
				$(selectHide2).css({border: "none"});

				$('#inpCampaignLogDateFilter').val('');
				var inpVal3 = $("#inpCampaignLogDateFilter").val(), selectTDNoHighlight3="table tbody td:not(:contains('"+inpVal3+"'))", selectTDHighlight3="table tbody td:contains('"+inpVal3+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
				$(selectTDHighlight3).css({border: "none"});
				$(selectTDNoHighlight3).css({border: "none"});

				$('#inpCampaignLogNameFilter option[value="noSelectionMade"]').attr("selected", "selected");
				var inpVal4 = $("#inpCampaignLogNameFilter option:selected").val(), selectTDNoHighlight4="table tbody td:not(:contains('"+inpVal4+"'))", selectTDHighlight4="table tbody td:contains('"+inpVal4+"')";
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
				$(selectTDHighlight4).css({border: "none"});
				$(selectTDNoHighlight4).css({border: "none"});


				var inpVal2 = $("#inpCampaignLogFilter").val(),
					selectHide="table tbody:not(:contains('"+inpVal2+"'))", selectTDNoHighlight="table tbody td:not(:contains('"+inpVal2+"'))", selectShow="table tbody:contains('"+inpVal2+"')", selectTDHighlight="table tbody td:contains('"+inpVal2+"')";
				if (inpVal2!=''){
					$(selectHide).closest('table').hide();
					$(selectHide).closest('table').prev('h1.campaignNameHead').hide();
					$(selectShow).closest('table').show();
					$(selectTDHighlight).css({border: "1px solid red"});
					$(selectTDNoHighlight).css({border: "none"});
					$(selectShow).closest('table').prev('h1.campaignNameHead').show();
				}else{
					$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
					$(selectTDHighlight).css({border: "none"});
					$(selectTDNoHighlight).css({border: "none"});
				}

			}, 700);



		});

		$("#inpCampaignLogDateFilter").live("change", function(e) {

			//Clear other filters
			$('#inpCampaignIDNameFilter').val('');
			var inpVal2 = $("#inpCampaignIDNameFilter").val(),	selectHide2="h1.campaignNameHead:not(:contains('"+inpVal2+"'))", selectShow2="h1.campaignNameHead:contains('"+inpVal2+"')";
			$('h1.campaignNameHead').show().next('table').show();
			$(selectShow2).css({border: "none"});
			$(selectHide2).css({border: "none"});

			$('#inpCampaignLogFilter').val('');
			var inpVal3 = $("#inpCampaignLogFilter").val(),	selectTDNoHighlight3="table tbody td:not(:contains('"+inpVal3+"'))", selectTDHighlight3="table tbody td:contains('"+inpVal3+"')";
			$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
			$(selectTDHighlight3).css({border: "none"});
			$(selectTDNoHighlight3).css({border: "none"});

			$('#inpCampaignLogNameFilter option[value="noSelectionMade"]').attr("selected", "selected");
			var inpVal4 = $("#inpCampaignLogNameFilter option:selected").val(), selectTDNoHighlight4="table tbody td:not(:contains('"+inpVal4+"'))", selectTDHighlight4="table tbody td:contains('"+inpVal4+"')";
			$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
			$(selectTDHighlight4).css({border: "none"});
			$(selectTDNoHighlight4).css({border: "none"});


			var inpVal2 = $("#inpCampaignLogDateFilter").val(),
				selectHide="table tbody:not(:contains('"+inpVal2+"'))", selectTDNoHighlight="table tbody td:not(:contains('"+inpVal2+"'))", selectShow="table tbody:contains('"+inpVal2+"')", selectTDHighlight="table tbody td:contains('"+inpVal2+"')";
			if (inpVal2!=''){
				$(selectHide).closest('table').hide();
				$(selectHide).closest('table').prev('h1.campaignNameHead').hide();
				$(selectShow).closest('table').show();
				$(selectTDHighlight).css({border: "1px solid red"});
				$(selectTDNoHighlight).css({border: "none"});
				$(selectShow).closest('table').prev('h1.campaignNameHead').show();
			}else{
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
				$(selectTDHighlight).css({border: "none"});
				$(selectTDNoHighlight).css({border: "none"});
			}

		});

	}, 1000);

});

setTimeout(function(){

	//Run through all names in the report and generate a list of non-repeatable names
	$('table tbody td a[href^="mailto:"]').each(function(){
		var curName = $.trim($(this).text());
		if ($.inArray(curName, ttAllNamesListArr)==-1){
			ttAllNamesListArr.push(curName);
		}
	});

	//Sort alphabetically
	ttAllNamesListArr.sort();

	//Populate the list of names to the Select
	$.each(ttAllNamesListArr, function(key, value) {
		$('#inpCampaignLogNameFilter')
			.append($("<option></option>")
				.attr("value",value)
				.text(value));
	});

	$("#inpCampaignLogNameFilter").live("change", function(e) {

		//Clear other filters
		$('#inpCampaignIDNameFilter').val('');
		var inpVal1 = $("#inpCampaignIDNameFilter").val(),	selectHide2="h1.campaignNameHead:not(:contains('"+inpVal1+"'))", selectShow2="h1.campaignNameHead:contains('"+inpVal1+"')";
		$('h1.campaignNameHead').show().next('table').show();
		$(selectShow2).css({border: "none"});
		$(selectHide2).css({border: "none"});

		$('#inpCampaignLogFilter').val('');
		var inpVal2 = $("#inpCampaignLogFilter").val(),	selectTDNoHighlight2="table tbody td:not(:contains('"+inpVal2+"'))", selectTDHighlight2="table tbody td:contains('"+inpVal2+"')";
		$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
		$(selectTDHighlight2).css({border: "none"});
		$(selectTDNoHighlight2).css({border: "none"});

		$('#inpCampaignLogDateFilter').val('');
		var inpVal3 = $("#inpCampaignLogDateFilter").val(), selectTDNoHighlight3="table tbody td:not(:contains('"+inpVal3+"'))", selectTDHighlight3="table tbody td:contains('"+inpVal3+"')";
		$('table tbody').closest('table').show().prev('h1.campaignNameHead').show();
		$(selectTDHighlight3).css({border: "none"});
		$(selectTDNoHighlight3).css({border: "none"});


		var inpVal4 = $("#inpCampaignLogNameFilter option:selected").val(),
			selectHide="table tbody:not(:contains('"+inpVal4+"'))", selectTDNoHighlight="table tbody td:not(:contains('"+inpVal4+"'))", selectShow="table tbody:contains('"+inpVal4+"')", selectTDHighlight="table tbody td:contains('"+inpVal4+"')";

		if ($("#inpCampaignLogNameFilter option:selected").val()=="noSelectionMade"){
			//Clear filter

			$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
			$(selectTDHighlight).css({border: "none"});
			$(selectTDNoHighlight).css({border: "none"});
		}else{
			//Apply filter


			if (inpVal4!=''){
				$(selectHide).closest('table').hide();
				$(selectHide).closest('table').prev('h1.campaignNameHead').hide();
				$(selectShow).closest('table').show();
				$(selectTDHighlight).css({border: "1px solid red"});
				$(selectTDNoHighlight).css({border: "none"});
				$(selectShow).closest('table').prev('h1.campaignNameHead').show();
			}else{
				$('table tbody').closest('table').show().prev('h1.campaignNameHead').show(); //$('table tbody').closest('table') differentiates between the tables I need and any other tables
				$(selectTDHighlight).css({border: "none"});
				$(selectTDNoHighlight).css({border: "none"});
			}

		}
	});

	//Show Name filter
	$('#inpCampaignLogNameFilter').show();
	$('#inpCampaignLogNameFilter').prev().show();
	$('#inpCampaignLogNameFilter').next().css({display: 'inline-block', position: 'relative', top: '2px'}).show();

},3000);