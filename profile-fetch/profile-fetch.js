var ttTypeWatch = (function(){ /* function to execute a callback, after the user has stopped typing for a specified amount of time */
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	}
})();

function cookieRead(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]}

var transforms = {
	'object':{'tag':'div','class':'package ${show} ${type}','children':[
		{'tag':'div','class':'header','children':[
			{'tag':'div','class':function(obj){
				if( getValue(obj.value) !== undefined ) return('arrow hide');
				else return('arrow');
			}},
			{'tag':'span','class':'name','html':'${name}'},
			{'tag':'span','class':'value','html':function(obj) {
				var value = getValue(obj.value);
				if( value !== undefined ) return(" : " + value);
				else return('');
			}},
			{'tag':'span','class':'type','html':'${type}'}
		]},
		{'tag':'div','class':'children','children':function(obj){return(children(obj.value));}}
	]}
};

function visualize(json) {

	$('#ttPF_ConvertTAOutput').html('');

	$('#ttPF_ConvertTAOutput').json2html(convert('json',json,'open'),transforms.object);

	$('#ttPF_ConvertTAOutput, #ttPF_JSON_Filter').show();
	$('#ttPF_ConvertTA').hide();

	regEvents();

	$('#ttPF_ConvertTAOutput>div>div>div.package:last').removeClass('closed');
	$('#ttPF_ConvertTAOutput>div.package').css({marginLeft: '0'});
}

function getValue(obj) {
	var type = $.type(obj);

	//Determine if this object has children
	switch(type) {
		case 'array':
		case 'object':
			return(undefined);
			break;

		case 'function':
			//none
			return('function');
			break;

		case 'string':
			return("'" + obj + "'");
			break;

		default:
			return(obj);
			break;
	}
}

//Transform the children
function children(obj){
	var type = $.type(obj);

	//Determine if this object has children
	switch(type) {
		case 'array':
		case 'object':
			return(json2html.transform(obj,transforms.object));
			break;

		default:
			//This must be a litteral
			break;
	}
}

function convert(name,obj,show) {

	var type = $.type(obj);

	if(show === undefined) show = 'closed';

	var children = [];

	//Determine the type of this object
	switch(type) {
		case 'array':
			//Transform array
			//Itterrate through the array and add it to the elements array
			var len=obj.length;
			for(var j=0;j<len;++j){
				//Concat the return elements from this objects tranformation
				children[j] = convert(j,obj[j]);
			}
			break;

		case 'object':
			//Transform Object
			var j = 0;
			for(var prop in obj) {
				children[j] = convert(prop,obj[prop]);
				j++;
			}
			break;

		default:
			//This must be a litteral (or function)
			children = obj;
			break;
	}

	return( {'name':name,'value':children,'type':type,'show':show} );

}

function regEvents() {

	$('.header').click(function(){
		var parent = $(this).parent();

		if(parent.hasClass('closed')) {
			parent.removeClass('closed');
			parent.addClass('open');
		} else {
			parent.removeClass('open');
			parent.addClass('closed');
		}
	});
}


function ttProfileFetch(){

	$.getScript('https://ttdev204.googlecode.com/svn/common/jquery.json2html.js');
	$.getScript('https://ttdev204.googlecode.com/svn/common/json2html.js');

	$('html').empty();

	if (location.host=="barclaysbankplc.tt.omtrdc.net"){
		$('html').html('<form style="padding: 30px;border: 1px solid rgb(20, 111, 158);width: 90%;margin: 20px; position: relative;" id="ttPF_form">' +
			'<label for="ttPF_MembID">Please provide Membership ID for Profile to be fetched</label>' +
			'<input type="text" id="ttPF_MembID" name="ttPF_MembID" style="display:block; margin-top: 10px; width: 350px;" />' +
			'<input type="submit" value="Profile Fetch" id="ttPF_CTA" style="display: inline-block; margin-top: 10px; float: left;" /> ' +
			'<div id="ttFetchLoaderIco" style="display: none;width: 20px;height: 20px;float: left;margin-left: 10px;margin-top: 8px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" style="width: 100%; height: 100%;"></div>' +
			'<p id="ttPF_RAWText" style="display: none; margin-top: 20px; clear: both; float: left;">RAW Profile</p>' +
			'<div id="ttPF_RAW" style="display: none; width: 100%; height: 150px; border: 1px solid rgb(20, 111, 158); margin-top: 0; overflow: auto;"></div>' +
			'<p id="ttPF_ConvertTAText" style="display: none; margin-top: 20px;clear: both; float: left;">Visualized JSON:</p>' +
			'<textarea name="ttPF_ConvertTA" id="ttPF_ConvertTA" style="display: none; width: 100%; height: 300px;clear: both; float: left;"></textarea>' +
			'<div id="ttPF_ConvertTAOutput" style="display: none; margin-top: 10px; width: 100%; max-height: 300px; overflow: auto;"></div>' +
			'<input type="text" placeholder="type here for filter, remove all for no filter" value="" id="ttPF_JSON_Filter" style="display: none; margin-top: 10px;margin-top: 10px;float: right;width: 50%;text-align: right;padding: 2px 10px;" /> ' +
			'<div style="clear:both;"></div>' +
			'</form>');

	}else{

		$('html').html('<form style="padding: 30px;border: 1px solid rgb(20, 111, 158);width: 90%;margin: 20px; position: relative;" id="ttPF_form">' +
			'<label for="ttPF_MembID">Please provide Membership ID for Profile to be fetched</label>' +
			'<input type="text" id="ttPF_MembID" name="ttPF_MembID" style="display:block; margin-top: 10px; width: 350px;" />' +
			'<input type="submit" value="Profile Fetch" id="ttPF_CTA" style="display: inline-block; margin-top: 10px; float: left;" /> ' +
			'<div id="ttFetchLoaderIco" style="display: none;width: 20px;height: 20px;float: left;margin-left: 10px;margin-top: 8px;"><img src="https://ttdev204.googlecode.com/svn/common/img/bs_ajax_loader.gif" style="width: 100%; height: 100%;"></div>' +
			'<p id="ttPF_RAWText" style="display: none; margin-top: 20px;clear: both; float: left;">RAW Profile (select all, and copy from here)</p>' +
			'<iframe id="ttPF_Iframe" src="about:blank" style="display: none; width: 100%; height: 150px; border: 1px solid rgb(20, 111, 158); margin-top: 0;"></iframe>' +
			'<p id="ttPF_ConvertTAText" style="display: none; margin-top: 20px;">Paste here and press [JSON Visualize]</p>' +
			'<textarea name="ttPF_ConvertTA" id="ttPF_ConvertTA" style="display: none; width: 100%; height: 300px;"></textarea>' +
			'<div id="ttPF_ConvertTAOutput" style="display: none; margin-top: 10px; width: 100%; max-height: 300px; overflow: auto;"></div>' +
			'<input type="button" value="JSON Visualize" id="ttPF_JSONCTA" style="display: none; margin-top: 10px;" /> ' +
			'<input type="text" placeholder="type here for filter, remove all for no filter" value="" id="ttPF_JSON_Filter" style="display: none; margin-top: 10px;margin-top: 10px;float: right;width: 50%;text-align: right;padding: 2px 10px;" /> ' +
			'<div style="clear:both;"></div>' +
			'</form>');
	}



	//jQuery Case Insensitive contains
	$.extend($.expr[':'], {
		'containsi': function(elem, i, match, array)
		{
			return (elem.textContent || elem.innerText || '').toLowerCase()
				.indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});

	if (typeof cookieRead('membershipID')!="undefined"){
		$('#ttPF_MembID').val(cookieRead('membershipID'));
	}

	var ttinshead = document.getElementsByTagName('head')[0];
	var ttinscss = document.createElement("style");
	ttinscss.type = "text/css";
	ttinscss.innerHTML = "body {font-size: 12px; font-family: Verdana;}" +
		".package {margin-left:10px;padding:3px;border-radius:2px;margin-top:2px;}" +
		"	.header {cursor:pointer;}" +
		".name {color:gray;}" +
		".array {background-color:#FFD8BB;border:thin solid #FFB780;}" +
		".object {background-color:#E7F1FE;border:thin solid #7DA2CE;}" +
		".string {color:red;}" +
		".number {color:blue;}" +
		".function {color:green;}" +
		".open .children {display:block;}" +
		".closed .children {display:none;}" +
		".arrow {background-image:url(data:image/png;base64,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);" +
		" background-repeat:no-repeat; background-color:transparent; height:15px; width:15px; display:inline-block;}" +
		".open .arrow {background-position:-20px 0;}" +
		".closed .arrow {background-position:0 0;}" +
		".type {color:gray;font-size:8pt;float:right;}" +
		".hide {display:none;}";
	ttinshead.appendChild(ttinscss);

	$('#ttPF_form').submit(function(){
		if (location.host=="barclaysbankplc.tt.omtrdc.net"){

			$.ajax({
				url: 'https://barclaysbankplc.tt.omtrdc.net/rest/v1/profiles/thirdPartyId/'+$('#ttPF_MembID').val()+'?client=barclaysbankplc',
				cache: false,
				timeout: 18000,
				dataType: 'text',
				xhrFields: {
					withCredentials: true
				}, beforeSend: function () {
					$('#ttPF_RAW').html('');
					$('#ttPF_RAW, #ttPF_RAWText').hide();
					$('#ttFetchLoaderIco').show();
					$('#ttPF_JSON_Filter').val('');
				}, success: function (data) {
					$('#ttFetchLoaderIco').hide();
					$('#ttPF_RAW').html(data).show();
					$('#ttPF_RAWText').show();
					//Get the value from the input field
					var json_string = data;

					//Parse the json string
					try
					{
						//eval
						eval("var json=" + json_string);
						visualize(json);
					}
					catch (e)
					{
						alert("Sorry error in json string, please correct and try again: " + e.message);
					}
				}, error: function (data) {
					$('#ttFetchLoaderIco').hide();
					$('#ttPF_RAW').html(data.responseText).show();
					$('#ttPF_RAWText').show();
					//Get the value from the input field
					var json_string = data.responseText;

					//Parse the json string
					try
					{
						//eval
						eval("var json=" + json_string);
						visualize(json);
					}
					catch (e)
					{
						alert("Sorry error in json string, please correct and try again: " + e.message);
					}
				}
			});


		}else{
			$('#ttFetchLoaderIco').show();
			$('#ttPF_Iframe').attr('src','https://barclaysbankplc.tt.omtrdc.net/rest/v1/profiles/thirdPartyId/'+$('#ttPF_MembID').val()+'?client=barclaysbankplc').show();
			$('#ttPF_RAWText, #ttPF_ConvertTAText, #ttPF_JSONCTA, #ttPF_ConvertTA').show();
		}
		$('#ttPF_ConvertTA, #ttPF_RAWText, #ttPF_ConvertTAText, #ttPF_ConvertTAOutput').val('');
		$('#ttPF_ConvertTAOutput, #ttPF_JSON_Filter').hide();

		return false;
	});

	$("#ttPF_JSON_Filter").keyup(function(e) {

		// executed only 100 ms after the last keyup event.
		ttTypeWatch(function () {
			var inpVal = $("#ttPF_JSON_Filter").val();
			if (inpVal!=''){
				$('#ttPF_ConvertTAOutput>div>div>div.package.object>.children>.package').show();
				$('#ttPF_ConvertTAOutput>div>div>div.package.object>.children>.package:not(:containsi("'+inpVal+'"))').hide();
			}else{
				$('#ttPF_ConvertTAOutput>div>div>div.package.object>.children>.package').show();
			}
		}, 100);
	});



	$('#ttPF_JSONCTA').click(function(){

		//Get the value from the input field
		var json_string = $('#ttPF_ConvertTA').val();

		//Parse the json string
		try
		{
			//eval
			eval("var json=" + json_string);


			visualize(json);
		}
		catch (e)
		{
			alert("Sorry error in json string, please correct and try again: " + e.message);
		}


	});

	$('#ttPF_Iframe').load(function() {
		$('#ttFetchLoaderIco').hide();
	});


}

// Only do anything if jQuery isn't defined
if (typeof jQuery == 'undefined') {

	if (typeof $ == 'function') {
		// warning, global var
		thisPageUsingOtherJSLibrary = true;
	}

	function getScript(url, success) {

		var script     = document.createElement('script');
		script.src = url;

		var head = document.getElementsByTagName('head')[0],
			done = false;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function() {

			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {

				done = true;

				// callback function provided as param
				success();

				script.onload = script.onreadystatechange = null;
				head.removeChild(script);

			}

		};

		head.appendChild(script);

	}

	getScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js', function() {

		if (typeof jQuery=='undefined') {

			// Super failsafe - still somehow failed...

		} else {

			ttProfileFetch();

		}

	});

} else { // jQuery was already loaded

	// Run your jQuery Code
	ttProfileFetch();

}