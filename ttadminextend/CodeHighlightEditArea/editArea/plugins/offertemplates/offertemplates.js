/**
 * Plugin designed for offertemplates prupose. It add a button (that manage an alert) and a select (that allow to insert tags) in the toolbar.
 */

var EditArea_offertemplates= {
	/**
	 * Get called once this file is loaded (editArea still not initialized)
	 *
	 * @return nothing	 
	 */	 	 	
	init: function(){	
		//	alert("offertemplates init: "+ this._someInternalFunction(2, 3));
		editArea.load_css(this.baseURL+"css/offertemplates.css");
	}
	/**
	 * Returns the HTML code for a specific control string or false if this plugin doesn't have that control.
	 * A control can be a button, select list or any other HTML item to present in the EditArea user interface.
	 * Language variables such as {$lang_somekey} will also be replaced with contents from
	 * the language packs.
	 * 
	 * @param {string} ctrl_name: the name of the control to add	  
	 * @return HTML code for a specific control or false.
	 * @type string	or boolean
	 */	
	,get_control_html: function(ctrl_name){
		switch(ctrl_name){
			case "offertemplates_but":
				// Control id, button img, command
				return parent.editAreaLoader.get_button_html('offertemplates_but', 'offertemplates.gif', 'offertemplates_cmd', false, this.baseURL);
			case "offertemplates_select":
				html= "<select id='offertemplates_select' onchange='javascript:editArea.execCommand(\"offertemplates_select_change\")' fileSpecific='no'>"
					+"			<option value='-1'>Select Tag</option>"
					+"			<option value='h1'>h1</option>"
					+"			<option value='h2'>h2</option>"
					+"			<option value='h3'>h3</option>"
					+"			<option value='h4'>h4</option>"
					+"			<option value='h5'>h5</option>"
					+"			<option value='h6'>h6</option>"
					+"			<option value='p'>p</option>"
					+"			<option value='strong'>strong (for Bold)</option>"
					+"			<option value='em'>em (for Italic)</option>"
					+"			<option value='script'>script</option>"
					+"			<option value='style'>style</option>"
					+"			<option value='sup'>sup (for Superscript)</option>"
					+"			<option value='sub'>sub (for Subscript)</option>"
					+"		</select>";
				return html;
		}
		return false;
	}
	/**
	 * Get called once EditArea is fully loaded and initialised
	 *	 
	 * @return nothing
	 */	 	 	
	,onload: function(){ 
		//alert("offertemplates load");
	}
	
	/**
	 * Is called each time the user touch a keyboard key.
	 *	 
	 * @param (event) e: the keydown event
	 * @return true - pass to next handler in chain, false - stop chain execution
	 * @type boolean	 
	 */
	,onkeydown: function(e){

		/*
		var str= String.fromCharCode(e.keyCode);

		// desactivate the "f" character
		if(str.toLowerCase()=="f"){
			return true;
		}
		return true;
		*/
	}
	
	/**
	 * Executes a specific command, this function handles plugin commands.
	 *
	 * @param {string} cmd: the name of the command being executed
	 * @param {unknown} param: the parameter of the command	 
	 * @return true - pass to next handler in chain, false - stop chain execution
	 * @type boolean	
	 */
	,execCommand: function(cmd, param){
		// Handle commands
		switch(cmd){
			case "offertemplates_select_change":
				var val= document.getElementById("offertemplates_select").value;
				if(val!=-1)
					parent.editAreaLoader.insertTags(editArea.id, "<"+val+">", "</"+val+">");
				document.getElementById("offertemplates_select").options[0].selected=true; 
				return false;
			case "offertemplates_cmd":
				if ($('#ttInnerFormOfferPattern').length==0) {

					var css = document.createElement("style");
					css.type = "text/css";
					css.innerHTML = "#ttInnerFormOfferPattern fieldset {" +
						"border: 0;" +
						"}" +
						"#ttInnerFormOfferPattern label {" +
						"margin: 15px 15px 0 0;" +
						"width: auto;" +
						"font-family: sans-serif;" +
						"font-size: 11px;" +
						"font-weight: bold;" +
						"color: darkslateblue;" +
						"}" +
						"#ttInnerFormOfferPattern select {" +
						"width: auto;" +
						"font-size: 12px;" +
						"}" +
						"#ttInnerFormOfferPattern .overflow {" +
						"height: 200px;" +
						"}" +
						"#ttInnerFormOfferPattern .ttCopyFromExample {" +
						"text-decoration: none;" +
						"color: grey;" +
						"font-size: 13px;" +
						"padding: 0 5px;" +
						"margin-right: 15px;" +
						"float: left;" +
						"}" +
						"#ttInnerFormOfferPattern .ttOfferPatternInputs, .ttOfferPatternOutput {" +
						"display: none;" +
						"}" +
						"#ttInnerFormOfferPattern .ttOfferPatternInputs label," +
						"#ttInnerFormOfferPattern .ttOfferPatternOutput label{" +
						//"clear: both;" +
						"float: left;" +
						"margin: 5px 5px 0 0;" +
						"text-align: left;" +
						"}" +
						"#ttInnerFormOfferPattern .ttOfferPatternInputs label.ttclr {" +
						"clear: both;" +
						"}" +
						"#ttInnerFormOfferPattern .ttOfferPatternInputs input{" +
						"float: left;" +
						//"width: 95%;" +
						"padding: 5px 2px;" +
						"margin-top: 5px;" +
						"font-size: 10px;" +
						"}" +
						"#ttInnerFormOfferPattern .ttOfferPatternInputs .btn {" +
						"clear: both;" +
						"margin-top: 20px;" +
						"font-size: 14px;" +
						"width: auto;" +
						"color: darkred;" +
						"}"
					;
					document.body.appendChild(css);



					$('<form action="#" id="ttInnerFormOfferPattern" style="position: fixed;top: 0;	left: 0;background: #fff;z-index: 1000; width: 100%; height: 100%; overflow: scroll;}">' +
						'<fieldset>' +
						'<label for="ttOfferPatternSelect">Select an offer pattern</label>' +
						'<select name="ttOfferPatternSelect" id="ttOfferPatternSelect">' +
						'<option value="_select_" selected="selected">Please select</option>' +
						'<option value="preftbSurlLogoutPersonalPremier">Logout Banner (Personal &amp; Premier)</option>' +
						'<option value="preftbSurlLogoutBusiness">Logout Banner (Business)</option>' +
						'<option value="ftbProductPromoCarouselNoRHS">FTB ProductPromoCarousel (no RHS info)</option>' +
						'<option value="ftbProductPromoCarouselNoRHSTitleTooltip">FTB ProductPromoCarousel (no RHS info, Legal Tooltip on Title)</option>' +
						'<option value="ftbProductPromoCarouselNoRHSInlineLegal">FTB ProductPromoCarousel (no RHS info, Legal Copy under Main copy)</option>' +
						'<option value="ftbProductPromoCarouselWithRHS">FTB ProductPromoCarousel (with RHS info)</option>' +
						'<option value="ftbGhostAccount">FTB GhostAccount</option>' +
						'<option value="ftbGhostAccountTooltip">FTB GhostAccount (with Legal Tooltip)</option>' +
						'<option value="ftbGhostAccountInlineLegal">FTB GhostAccount (with Legal Copy under Main copy)</option>' +
						'<option value="ftbGhostAccountSmartSpend">FTB GhostAccount-SmartSpend</option>' +
						'<option value="ftbProductPromo4Large">FTB ProductPromo4 Large</option>' +
						//'<option value="ftbProductPromo4LargeTooltip">FTB ProductPromo4 Large (with Legal Tooltip)</option>' +
						'<option value="ftbProductPromo4LargeInlineLegal">FTB ProductPromo4 Large (with Legal Copy at the bottom)</option>' +
						'<option value="ftbServicesPromoCarousel">FTB ServicesPromoCarousel</option>' +
						'</select>' +
						'</fieldset>' +

						/* Template Begin */

						'<fieldset class="preftbSurlLogoutPersonalPremierFS ttOfferPatternInputs">' +

						'<label for="preftbSurlLogoutPersonalPremierFSSURL" style="width: 55px;">S URL</label>' +
						'<input type="text" value="" id="preftbSurlLogoutPersonalPremierFSSURL" placeholder="example: /S1242678012329" style="width: 85%;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="preftbSurlLogoutPersonalPremierFSProp74" style="width: 55px;" class="ttclr">Prop74 value</label>' +
						'<input type="text" value="" id="preftbSurlLogoutPersonalPremierFSProp74" placeholder="example: LifeInsuranceTestB" style="width: 85%;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */

						'<fieldset class="preftbSurlLogoutBusinessFS ttOfferPatternInputs">' +

						'<label for="preftbSurlLogoutBusinessFSSURL" style="width: 55px;">S URL</label>' +
						'<input type="text" value="" id="preftbSurlLogoutBusinessFSSURL" placeholder="example: /S1242678012329" style="width: 85%;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="preftbSurlLogoutBusinessFSProp74" style="width: 55px;" class="ttclr">Prop74 value</label>' +
						'<input type="text" value="" id="preftbSurlLogoutBusinessFSProp74" placeholder="example: LifeInsuranceTestB" style="width: 85%;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */



						/* Template Begin */


						'<fieldset class="ftbProductPromoCarouselNoRHSFS ttOfferPatternInputs">' +

						'<label for="ftbProductPromoCarouselNoRHSFS_Image_URL" style="width: 55px;">Image URL</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSFS_Image_URL" placeholder="example: /OLB/A/Content/Images/1242645340532-globe-icon.png" style="width: 440px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSFS_Image_ALT" style="width: 40px;">Image ALT</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSFS_Image_ALT" placeholder="example: Global promo" style="width: 190px;"  />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSFS_Title" class="ttclr" style="width: 55px;">Title</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSFS_Title" placeholder="example: Personalise your debit card" style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSFS_MainCopy" style="width: 45px;margin-right: 15px;">Main copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSFS_MainCopy" placeholder=\'example: Upload your favourite photo or choose from our extensive gallery.\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSFS_MainCTACopy" class="ttclr" style="width:55px;">Main CTA Copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSFS_MainCTACopy" placeholder=\'example: Get card\' style="width:240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSFS_MainCTAURL" style="width:55px;">Main CTA URL</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSFS_MainCTAURL" placeholder=\'example: /olb/balances/PersonalFinancialSummary.action\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSFS_MainCTATarget" style="width: 55px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSFS_MainCTATarget" placeholder=\'example: _blank\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 12px;margin-left: 5px;font-size: 10px;">(Leave empty or type in _blank for new window)</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */


						'<fieldset class="ftbProductPromoCarouselNoRHSTitleTooltipFS ttOfferPatternInputs">' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_URL" style="width: 55px;">Image URL</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_URL" placeholder="example: /OLB/A/Content/Images/1242645340532-globe-icon.png" style="width: 440px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_ALT" style="width: 40px;">Image ALT</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_ALT" placeholder="example: Global promo" style="width: 190px;"  />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_Title" class="ttclr" style="width: 55px;">Title</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_Title" placeholder="example: Personalise your debit card" style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_TooltipCopy" style="width: 65px;margin-right: 15px;">Title Tooltip copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_TooltipCopy" placeholder=\'example: Terms and Conditions apply.\' style="width: 355px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopy" style="width: 45px;margin-right: 15px;" class="ttclr">Main copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopy" placeholder=\'example: Upload your favourite photo or choose from our extensive gallery.\' style="width: 715px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTACopy" class="ttclr" style="width:55px;">Main CTA Copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTACopy" placeholder=\'example: Get card\' style="width:240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTAURL" style="width:55px;">Main CTA URL</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTAURL" placeholder=\'example: /olb/balances/PersonalFinancialSummary.action\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget" style="width: 55px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget" placeholder=\'example: _blank\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 12px;margin-left: 5px;font-size: 10px;">(Leave empty or type in _blank for new window)</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */


						'<fieldset class="ftbProductPromoCarouselNoRHSInlineLegalFS ttOfferPatternInputs">' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_Image_URL" style="width: 55px;">Image URL</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSInlineLegalFS_Image_URL" placeholder="example: /OLB/A/Content/Images/1242645340532-globe-icon.png" style="width: 440px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_Image_ALT" style="width: 40px;">Image ALT</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSInlineLegalFS_Image_ALT" placeholder="example: Global promo" style="width: 190px;"  />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_Title" class="ttclr" style="width: 55px;">Title</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselNoRHSInlineLegalFS_Title" placeholder="example: Personalise your debit card" style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +


						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopy" style="width: 45px;margin-right: 15px;">Main copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopy" placeholder=\'example: Upload your favourite photo or choose from our extensive gallery.\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTACopy" class="ttclr" style="width:55px;">Main CTA Copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTACopy" placeholder=\'example: Get card\' style="width:240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTAURL" style="width:55px;">Main CTA URL</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTAURL" placeholder=\'example: /olb/balances/PersonalFinancialSummary.action\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_LegalCopy" style="width:55px;" class="ttclr">Legal Copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSInlineLegalFS_LegalCopy" placeholder=\'example: Terms and conditions apply.\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget" style="width: 55px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget" placeholder=\'example: _blank\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 0;margin-left: 5px;font-size: 10px; width: 110px;">(Leave empty or type in _blank for new window)</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */


						/* Template Begin */

						'<fieldset class="ftbProductPromoCarouselWithRHSFS ttOfferPatternInputs">' +

						'<label for="ftbProductPromoCarouselWithRHSFS_Image_URL" style="width: 55px;">Image URL</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselWithRHSFS_Image_URL" placeholder="example: /OLB/A/Content/Images/1242645340532-globe-icon.png" style="width: 440px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_Image_ALT" style="width: 40px;">Image ALT</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselWithRHSFS_Image_ALT" placeholder="example: Global promo" style="width: 190px;"  />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_Title" class="ttclr" style="width: 55px;">Title</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselWithRHSFS_Title" placeholder="example: Personalise your debit card" style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_RHSLine1" style="width: 70px">RHS Line 1 (bigger size)</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselWithRHSFS_RHSLine1" placeholder="example: &pound;10" style="width:84px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_RHSLine2" style="width: 80px">RHS Line 2 (smaller size)</label>' +
						'<input type="text" value="" id="ftbProductPromoCarouselWithRHSFS_RHSLine2" placeholder="example: per month" style="width:150px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +


						'<label for="ftbProductPromoCarouselWithRHSFS_MainCopy" class="ttclr" style="width: 45px;margin-right: 15px;">Main copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselWithRHSFS_MainCopy" placeholder=\'example: Upload your favourite photo or choose from our extensive gallery.\' style="width: 365px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_MainCTACopy" style="width:55px;">Main CTA Copy</label>' +
						'<input type="text" id="ftbProductPromoCarouselWithRHSFS_MainCTACopy" placeholder=\'example: Get card\' style="width:250px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_MainCTAURL" class="ttclr" style="width:55px;">Main CTA URL</label>' +
						'<input type="text" id="ftbProductPromoCarouselWithRHSFS_MainCTAURL" placeholder=\'example: /olb/balances/PersonalFinancialSummary.action\' style="width: 365px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromoCarouselWithRHSFS_MainCTATarget" style="width: 55px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbProductPromoCarouselWithRHSFS_MainCTATarget" placeholder=\'example: _blank\' style="width: 150px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;	float: left; margin-top: 2px; font-size: 10px;	width: 85px;line-height: 10px;">Leave empty or type in _blank for new window</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */

						'<fieldset class="ftbGhostAccountFS ttOfferPatternInputs">' +

						'<label for="ftbGhostAccountFSMainHeadline" style="width: 85px;">Main Headline Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSMainHeadline" placeholder="example: Start saving for the future" style="width: 190px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSMainHeadlineURL" style="width: 85px;">Main Headline URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSMainHeadlineURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 350px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSMainHeadlineURLTarget" style="width: 85px; font-style: italic;" class="ttclr">Main Headline URL Target</label>' +
						'<input type="text" id="ftbGhostAccountFSMainHeadlineURLTarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 6px;margin-left: 2px;font-size: 10px; width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<label for="ftbGhostAccountFSMainCopy" style="width: 85px; margin-top: 12px;" class="ttclr">Main Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSMainCopy" placeholder="example: Open a savings account in just a few clicks and save regularly." style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSMainCTACopy" style="width: 65px;">Main CTA Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSMainCTACopy" placeholder="example: Apply now" style="width: 200px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSMainCTAURL" style="width: 85px; margin-top: 12px;" class="ttclr">Main CTA URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSMainCTAURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSMainCTATarget" style="width: 65px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbGhostAccountFSMainCTATarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 8px;margin-left: 1px;font-size: 9px;width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<div style="padding-top: 10px;	float: left;clear: both; margin-top: 15px;border-top: 1px dotted #ccc;">'+

						'<label for="ftbGhostAccountFSSideBul1Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (1)</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSSideBul1Headline" placeholder="example: We have a choice of accounts" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSSideBul1Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (1)</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSSideBul1Supline" placeholder="example: ISAs, Instant access, bonds" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSSideBul2Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (2)</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSSideBul2Headline" placeholder="example: Access your cash how you want" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSSideBul2Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (2)</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSSideBul2Supline" placeholder="example: Withdraw it easily or lock it away" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSSideBul3Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (3)</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSSideBul3Headline" placeholder="example: Competitive interest rates" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountFSSideBul3Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (3)</label>' +
						'<input type="text" value="" id="ftbGhostAccountFSSideBul3Supline" placeholder="example: Get your best rate of return" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'</div>'+


						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */

						'<fieldset class="ftbGhostAccountTooltipFS ttOfferPatternInputs">' +

						'<label for="ftbGhostAccountTooltipFSMainHeadline" style="width: 85px;">Main Headline Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSMainHeadline" placeholder="example: Start saving for the future" style="width: 190px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSMainHeadlineURL" style="width: 85px;">Main Headline URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSMainHeadlineURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 350px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSMainHeadlineURLTarget" style="width: 85px; font-style: italic;" class="ttclr">Main Headline URL Target</label>' +
						'<input type="text" id="ftbGhostAccountTooltipFSMainHeadlineURLTarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 6px;margin-left: 2px;font-size: 10px; width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<label for="ftbGhostAccountTooltipFSMainHeadlineTooltip" style="width: 85px; margin-left: 10px; margin-top: 5px;">Main Headline Tooltip</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSMainHeadlineTooltip" placeholder="example: Terms, conditions and exclusions apply." style="width: 328px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSMainCopy" style="width: 85px; margin-top: 12px;" class="ttclr">Main Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSMainCopy" placeholder="example: Open a savings account in just a few clicks and save regularly." style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSMainCTACopy" style="width: 65px;">Main CTA Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSMainCTACopy" placeholder="example: Apply now" style="width: 200px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSMainCTAURL" style="width: 85px; margin-top: 12px;" class="ttclr">Main CTA URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSMainCTAURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSMainCTATarget" style="width: 65px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbGhostAccountTooltipFSMainCTATarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 8px;margin-left: 1px;font-size: 9px;width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<div style="padding-top: 10px;	float: left;clear: both; margin-top: 15px;border-top: 1px dotted #ccc;">'+

						'<label for="ftbGhostAccountTooltipFSSideBul1Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (1)</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSSideBul1Headline" placeholder="example: We have a choice of accounts" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSSideBul1Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (1)</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSSideBul1Supline" placeholder="example: ISAs, Instant access, bonds" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSSideBul2Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (2)</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSSideBul2Headline" placeholder="example: Access your cash how you want" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSSideBul2Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (2)</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSSideBul2Supline" placeholder="example: Withdraw it easily or lock it away" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSSideBul3Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (3)</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSSideBul3Headline" placeholder="example: Competitive interest rates" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountTooltipFSSideBul3Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (3)</label>' +
						'<input type="text" value="" id="ftbGhostAccountTooltipFSSideBul3Supline" placeholder="example: Get your best rate of return" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'</div>'+


						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */

						'<fieldset class="ftbGhostAccountInlineLegalFS ttOfferPatternInputs">' +

						'<label for="ftbGhostAccountInlineLegalFSMainHeadline" style="width: 85px;">Main Headline Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSMainHeadline" placeholder="example: Start saving for the future" style="width: 190px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSMainHeadlineURL" style="width: 85px;">Main Headline URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSMainHeadlineURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 350px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSMainHeadlineURLTarget" style="width: 85px; font-style: italic;" class="ttclr">Main Headline URL Target</label>' +
						'<input type="text" id="ftbGhostAccountInlineLegalFSMainHeadlineURLTarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 6px;margin-left: 2px;font-size: 10px; width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<label for="ftbGhostAccountInlineLegalFSMainCopy" style="width: 85px; margin-top: 12px;" class="ttclr">Main Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSMainCopy" placeholder="example: Open a savings account in just a few clicks and save regularly." style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSMainCTACopy" style="width: 65px;">Main CTA Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSMainCTACopy" placeholder="example: Apply now" style="width: 200px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSMainCTAURL" style="width: 85px; margin-top: 12px;" class="ttclr">Main CTA URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSMainCTAURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSMainCTATarget" style="width: 65px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbGhostAccountInlineLegalFSMainCTATarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 8px;margin-left: 1px;font-size: 9px;width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<label for="ftbGhostAccountInlineLegalFSLegalCopy" style="width: 85px; margin-top: 12px;" class="ttclr">Legal Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSLegalCopy" placeholder="example: Your home may be repossessed if you do not keep up repayments on your Mortgage." style="width: 670px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +


						'<div style="padding-top: 10px;	float: left;clear: both; margin-top: 15px;border-top: 1px dotted #ccc;">'+

						'<label for="ftbGhostAccountInlineLegalFSSideBul1Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (1)</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSSideBul1Headline" placeholder="example: We have a choice of accounts" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSSideBul1Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (1)</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSSideBul1Supline" placeholder="example: ISAs, Instant access, bonds" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSSideBul2Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (2)</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSSideBul2Headline" placeholder="example: Access your cash how you want" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSSideBul2Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (2)</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSSideBul2Supline" placeholder="example: Withdraw it easily or lock it away" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSSideBul3Headline" style="width: 85px;font-size: 10px;margin-top: 12px;" class="ttclr">Side Headline (3)</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSSideBul3Headline" placeholder="example: Competitive interest rates" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountInlineLegalFSSideBul3Supline" style="width: 85px;font-size: 10px;margin-top: 12px;">Side Sup Line (3)</label>' +
						'<input type="text" value="" id="ftbGhostAccountInlineLegalFSSideBul3Supline" placeholder="example: Get your best rate of return" style="width: 270px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'</div>'+


						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */

						'<fieldset class="ftbGhostAccountSmartSpendFS ttOfferPatternInputs">' +

						'<label for="ftbGhostAccountSmartSpendFSMainHeadline" style="width: 85px;">Main Headline Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSMainHeadline" placeholder="example: My rewards" style="width: 190px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSMainHeadlineURL" style="width: 85px;">Main Headline URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSMainHeadlineURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 350px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSMainHeadlineURLTarget" style="width: 85px; font-style: italic;" class="ttclr">Main Headline URL Target</label>' +
						'<input type="text" id="ftbGhostAccountSmartSpendFSMainHeadlineURLTarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 6px;margin-left: 2px;font-size: 10px; width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<label for="ftbGhostAccountSmartSpendFSMainCopy" style="width: 85px; margin-top: 12px;" class="ttclr">Main Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSMainCopy" placeholder="example: Explore our exclusive partnerships with select brands to earn cashback and save money." style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSMainCTACopy" style="width: 65px;">Main CTA Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSMainCTACopy" placeholder="example: Start earning rewards" style="width: 200px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSMainCTAURL" style="width: 85px; margin-top: 12px;" class="ttclr">Main CTA URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSMainCTAURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 360px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSMainCTATarget" style="width: 65px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbGhostAccountSmartSpendFSMainCTATarget" placeholder=\'example: _blank\' style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 8px;margin-left: 1px;font-size: 9px;width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<div style="padding-top: 10px;	float: left;clear: both; margin-top: 15px;border-top: 1px dotted #ccc;">'+


						'<label for="ftbGhostAccountSmartSpendFSSidePartnerImageURL" style="width: 115px;font-size: 10px;margin-top: 6px;" class="ttclr">SmartSpend RHS Partner Image URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSSidePartnerImageURL" placeholder="example: /img/logos/barclays-premier.png" style="width: 330px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSSidePartnerImageALT" style="width: 115px;font-size: 10px;margin-top: 6px;">SmartSpend RHS Partner Image ALT</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSSidePartnerImageALT" placeholder="example: ClicThat" style="width: 150px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSSidePartnerCopy" style="width: 115px;font-size: 10px;margin-top: 6px;" class="ttclr">SmartSpend RHS Partner Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSSidePartnerCopy" placeholder="example: Beat high street prices on lots of quality brands." style="width: 330px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSSidePartnerCTACopy" style="width: 115px;font-size: 10px;margin-top: 6px;" >SmartSpend RHS Partner CTA Copy</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSSidePartnerCTACopy" placeholder="example: Shop" style="width: 150px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSSidePartnerCTAURL" style="width: 115px;font-size: 10px;margin-top: 6px;" class="ttclr">SmartSpend RHS Partner CTA URL</label>' +
						'<input type="text" value="" id="ftbGhostAccountSmartSpendFSSidePartnerCTAURL" placeholder="example: /olb/balances/PersonalFinancialSummary.action" style="width: 330px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget" style="width: 115px;font-style: italic;font-size: 9px;margin-top: 7px;">SmartSpend RHS Partner CTA URL Target</label>' +
						'<input type="text" id="ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget" placeholder="example: _blank" style="width: 90px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 2px;margin-left: 2px;font-size: 8px;width: 75px;">(Leave empty or type in _blank for new window)</span>'+


						'</div>'+


						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */


						'<fieldset class="ftbProductPromo4LargeFS ttOfferPatternInputs">' +

						'<label for="ftbProductPromo4LargeFS_Image_URL" style="width: 55px;">Image URL</label>' +
						'<input type="text" value="" id="ftbProductPromo4LargeFS_Image_URL" placeholder="example: /OLB/A/Content/Images/1321077922916-prod_pers_bloan_large.jpg" style="width: 440px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeFS_Image_ALT" style="width: 40px;">Image ALT</label>' +
						'<input type="text" value="" id="ftbProductPromo4LargeFS_Image_ALT" placeholder="example: Barclayloan" style="width: 190px;"  />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeFS_Title" class="ttclr" style="width: 55px;">Title</label>' +
						'<input type="text" value="" id="ftbProductPromo4LargeFS_Title" placeholder="example: We could lend you £15000" style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +


						'<label for="ftbProductPromo4LargeFS_MainCopy" style="width: 45px;margin-right: 15px;">Main copy</label>' +
						'<input type="text" id="ftbProductPromo4LargeFS_MainCopy" placeholder=\'example: A Barclayloan can help you buy a new car.\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeFS_MainCTACopy" class="ttclr" style="width:55px;">Main CTA Copy</label>' +
						'<input type="text" id="ftbProductPromo4LargeFS_MainCTACopy" placeholder=\'example: Get a quote\' style="width:240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeFS_MainCTAURL" style="width:55px;">Main CTA URL</label>' +
						'<input type="text" id="ftbProductPromo4LargeFS_MainCTAURL" placeholder=\'example: /olb/products/LoanOverviewLink.action\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeFS_MainCTATarget" class="ttclr" style="width: 55px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbProductPromo4LargeFS_MainCTATarget" placeholder=\'example: _blank\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 10px;margin-left: 5px;font-size: 10px; width: 300px;">(Leave empty or type in _blank for new window)</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */


						'<fieldset class="ftbProductPromo4LargeInlineLegalFS ttOfferPatternInputs">' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_Image_URL" style="width: 55px;">Image URL</label>' +
						'<input type="text" value="" id="ftbProductPromo4LargeInlineLegalFS_Image_URL" placeholder="example: /OLB/A/Content/Images/1321077922916-prod_pers_bloan_large.jpg" style="width: 440px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_Image_ALT" style="width: 40px;">Image ALT</label>' +
						'<input type="text" value="" id="ftbProductPromo4LargeInlineLegalFS_Image_ALT" placeholder="example: Barclayloan" style="width: 190px;"  />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_Title" class="ttclr" style="width: 55px;">Title</label>' +
						'<input type="text" value="" id="ftbProductPromo4LargeInlineLegalFS_Title" placeholder="example: We could lend you £15000" style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +


						'<label for="ftbProductPromo4LargeInlineLegalFS_MainCopy" style="width: 45px;margin-right: 15px;">Main copy</label>' +
						'<input type="text" id="ftbProductPromo4LargeInlineLegalFS_MainCopy" placeholder=\'example: A Barclayloan can help you buy a new car.\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_MainCTACopy" class="ttclr" style="width:55px;">Main CTA Copy</label>' +
						'<input type="text" id="ftbProductPromo4LargeInlineLegalFS_MainCTACopy" placeholder=\'example: Get a quote\' style="width:240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_MainCTAURL" style="width:55px;">Main CTA URL</label>' +
						'<input type="text" id="ftbProductPromo4LargeInlineLegalFS_MainCTAURL" placeholder=\'example: /olb/products/LoanOverviewLink.action\' style="width: 375px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_LegalCopy" style="width:55px;" class="ttclr">Legal Copy</label>' +
						'<input type="text" id="ftbProductPromo4LargeInlineLegalFS_LegalCopy" placeholder=\'example: Subject to status, T&Cs apply.\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbProductPromo4LargeInlineLegalFS_MainCTATarget" style="width: 55px; font-style: italic;">Main CTA Target</label>' +
						'<input type="text" id="ftbProductPromo4LargeInlineLegalFS_MainCTATarget" placeholder=\'example: _blank\' style="width: 240px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example" style="margin-right:0;">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 0;margin-left: 5px;font-size: 10px; width: 110px;">(Leave empty or type in _blank for new window)</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */

						/* Template Begin */

						'<fieldset class="ftbServicesPromoCarouselFS ttOfferPatternInputs">' +

						'<label for="ftbServicesPromoCarouselFSImgURL" style="width: 55px;">Image<br />URL</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSImgURL" placeholder="example: /OLB/A/Content/Images/1242645341192-serv-promo.png" style="width: 400px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbServicesPromoCarouselFSImgALT" style="width: 55px;">Image<br />ALT</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSImgALT" placeholder="example: Barclays Mobile Banking" style="width: 200px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbServicesPromoCarouselFSH3" style="width: 55px;" class="ttclr">Main<br />Title</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSH3" placeholder="example: Barclays Mobile Banking" style="width: 701px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbServicesPromoCarouselFSMainCopy" style="width: 55px;" class="ttclr">Main<br />Copy</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSMainCopy" placeholder="example: Free to download, easy to use &mdash; access your accounts using a 5-digit passcode of your choice." style="width: 701px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbServicesPromoCarouselFSMainCTACopy" style="width: 55px;" class="ttclr">Main CTA<br />Copy</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSMainCTACopy" placeholder="example: Get the app" style="width: 130px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbServicesPromoCarouselFSMainCTAURL" style="width: 55px;">Main CTA<br />URL</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSMainCTAURL" placeholder="example: http://www.personal.barclays.co.uk/goto/pfs_mobilehub" style="width: 470px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +

						'<label for="ftbServicesPromoCarouselFSMainCTAURLTarget" style="width: 55px;font-style: italic;font-size: 9px;margin-top: 7px;" class="ttclr">Main CTA<br />URL Target</label>' +
						'<input type="text" value="" id="ftbServicesPromoCarouselFSMainCTAURLTarget" placeholder="example: _blank" style="width: 130px;" />' +
						'<a href="#" class="ttCopyFromExample" title="Copy from example">*</a>' +
						'<span style="font-family: verdana;float: left;margin-top: 6px;margin-left: 2px;font-size: 8px;width: 125px;">(Leave empty or type in _blank for new window)</span>'+

						'<input type="button" value="Generate HTML" class="btn" />' +

						'</fieldset>' +

						/* Template End */


						'</form>').insertAfter('#editor');


					//Script
					$(document).on('change','#ttOfferPatternSelect',function(){

							$('.ttOfferPatternInputs').hide();
							$('.ttOfferPatternOutput').hide();
							$('#ttOfferPatternOutputHTML').html('');
							$('#ttOfferPatternOutputHTML').attr('class','html');


							if (this.value!="_select_"){
								$('.' + this.value + 'FS.ttOfferPatternInputs').show();
							}

					});

					$("form")[0].reset();

					$('.ttOfferPatternInputs .ttCopyFromExample').click(function(e){
						e.preventDefault();
						var ttPlaceholderVal = $(this).prev('[placeholder]').attr('placeholder').replace('example: ','');
						$(this).prev('[placeholder]').val(ttPlaceholderVal);
						return false;
					});

					$('.ttOfferPatternInputs .btn').click(function(e){
						var ttPatternSelected = $(this).closest('.ttOfferPatternInputs').attr('class').replace('FS ttOfferPatternInputs','');
						var ttOutputHTML = '', ftbProductPromoCarouselNoRHSFS_MainCopyCombined='', ftbProductPromoCarouselWithRHSFS_MainCopyCombined='';

						switch (ttPatternSelected) {

							/* Template Begin */

							case 'preftbSurlLogoutPersonalPremier':


								var preftbSurlLogoutPersonalPremierFSSURL = $('#preftbSurlLogoutPersonalPremierFSSURL').val().replace('/',''),
									preftbSurlLogoutPersonalPremierFSProp74 = $('#preftbSurlLogoutPersonalPremierFSProp74').val();

								if (
									preftbSurlLogoutPersonalPremierFSSURL=='' ||
									preftbSurlLogoutPersonalPremierFSProp74 == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									ttOutputHTML="\x3Cscript type=\"text\x2Fjavascript\"\x3E" +
										"\n\t$(document).ready(function(){" +
										"\n\t\t$(\'.section:eq(2)\').load(\'\x2F"+preftbSurlLogoutPersonalPremierFSSURL+"\');" +
										"\n\t\t$(\'.section:eq(2)\').mousedown(function(){" +
										"\n\t\t\tmboxTrack(\'clickfrom_personal_logout_new_olb\');" +
										"\n\t\t\ts.linkTrackVars=\'prop17,prop74,eVar44,events\';" +
										"\n\t\t\ts.linkTrackEvents=\'event5\';" +
										"\n\t\t\ts.prop17=s.pageName;" +
										"\n\t\t\ts.prop74=\'"+preftbSurlLogoutPersonalPremierFSProp74+"\';" +
										"\n\t\t\ts.eVar44=\'${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\';" +
										"\n\t\t\ts.events=\'event5\';" +
										"\n\t\t\ts.tl(true, \'o\', \'TNT Clickthrough\');" +
										"\n\t\t});" +
										"\n\t});" +
										"\n\x3C\x2Fscript\x3E" +
										"\n\x3Cstyle\x3E" +
										"\n\t#box2 {" +
										"\n\t\tvisibility:hidden;" +
										"\n\t}" +
										"\n\x3C\x2Fstyle\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;


							/* Template End */

							/* Template Begin */

							case 'preftbSurlLogoutBusiness':


								var preftbSurlLogoutBusinessFSSURL = $('#preftbSurlLogoutBusinessFSSURL').val().replace('/',''),
									preftbSurlLogoutBusinessFSProp74 = $('#preftbSurlLogoutBusinessFSProp74').val();

								if (
									preftbSurlLogoutBusinessFSSURL=='' ||
									preftbSurlLogoutBusinessFSProp74 == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									ttOutputHTML="\x3Cscript type=\"text\x2Fjavascript\"\x3E" +
										"\n\t$(document).ready(function(){" +
										"\n\t\t$(\'.section:eq(0)\').load(\'\x2F"+preftbSurlLogoutBusinessFSSURL+"\');" +
										"\n\t\t$(\'.section:eq(0)\').mousedown(function(){" +
										"\n\t\t\tmboxTrack(\'clickfrom_business_logout_new_olb\');" +
										"\n\t\t\ts.linkTrackVars=\'prop17,prop74,eVar44,events\';" +
										"\n\t\t\ts.linkTrackEvents=\'event5\';" +
										"\n\t\t\ts.prop17=s.pageName;" +
										"\n\t\t\ts.prop74=\'"+preftbSurlLogoutBusinessFSProp74+"\';" +
										"\n\t\t\ts.eVar44=\'${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\';" +
										"\n\t\t\ts.events=\'event5\';" +
										"\n\t\t\ts.tl(true, \'o\', \'TNT Clickthrough\');" +
										"\n\t\t});" +
										"\n\t});" +
										"\n\x3C\x2Fscript\x3E" +
										"\n\x3Cstyle\x3E" +
										"\n\t#box2 {" +
										"\n\t\tvisibility:hidden;" +
										"\n\t}" +
										"\n\x3C\x2Fstyle\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;


							/* Template End */

							/* Template Begin */
							case 'ftbProductPromoCarouselNoRHS':

								var ftbProductPromoCarouselNoRHSFS_Image_URL = $('#ftbProductPromoCarouselNoRHSFS_Image_URL').val(),
									ftbProductPromoCarouselNoRHSFS_Image_ALT = $('#ftbProductPromoCarouselNoRHSFS_Image_ALT').val(),
									ftbProductPromoCarouselNoRHSFS_Title = $('#ftbProductPromoCarouselNoRHSFS_Title').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSFS_MainCopy = $('#ftbProductPromoCarouselNoRHSFS_MainCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSFS_MainCTACopy = $('#ftbProductPromoCarouselNoRHSFS_MainCTACopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSFS_MainCTAURL = $('#ftbProductPromoCarouselNoRHSFS_MainCTAURL').val(),
									ftbProductPromoCarouselNoRHSFS_MainCTATarget = $('#ftbProductPromoCarouselNoRHSFS_MainCTATarget').val();

								if (
									ftbProductPromoCarouselNoRHSFS_Image_URL=='' ||
									ftbProductPromoCarouselNoRHSFS_Image_ALT=='' ||
									ftbProductPromoCarouselNoRHSFS_Title=='' ||
									ftbProductPromoCarouselNoRHSFS_MainCopy=='' ||
									ftbProductPromoCarouselNoRHSFS_MainCTACopy=='' ||
									ftbProductPromoCarouselNoRHSFS_MainCTAURL == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbProductPromoCarouselNoRHSFS_MainCTATarget!=''){
										ftbProductPromoCarouselNoRHSFS_MainCTATarget=" target=\""+ftbProductPromoCarouselNoRHSFS_MainCTATarget+"\"";
									}

									ftbProductPromoCarouselNoRHSFS_MainCopyCombined="<p>"+ftbProductPromoCarouselNoRHSFS_MainCopy+" <a href=\""+ftbProductPromoCarouselNoRHSFS_MainCTAURL+"\""+ftbProductPromoCarouselNoRHSFS_MainCTATarget+" class=\"ttMainCTA\">"+ftbProductPromoCarouselNoRHSFS_MainCTACopy+"</a></p>";

									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecProdPromoCarousel\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cimg src=\""+ftbProductPromoCarouselNoRHSFS_Image_URL+"\" alt=\""+ftbProductPromoCarouselNoRHSFS_Image_ALT+"\" height=\"34\" width=\"34\"\x3E" +
										"\n\t\t\x3Ch3\x3E"+ftbProductPromoCarouselNoRHSFS_Title+"\x3C\x2Fh3\x3E" +
										"\n\t\t" +ftbProductPromoCarouselNoRHSFS_MainCopyCombined+
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;
							/* Template End */

							/* Template Begin */
							case 'ftbProductPromoCarouselNoRHSTitleTooltip':

								var ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_URL = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_URL').val(),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_ALT = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_ALT').val(),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_Title = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_Title').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_TooltipCopy = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_TooltipCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopy = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTACopy = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTACopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTAURL = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTAURL').val(),
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget = $('#ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget').val();

								if (
									ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_URL=='' ||
									ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_ALT=='' ||
									ftbProductPromoCarouselNoRHSTitleTooltipFS_Title=='' ||
									ftbProductPromoCarouselNoRHSTitleTooltipFS_TooltipCopy=='' ||
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopy=='' ||
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTACopy=='' ||
									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTAURL == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget!=''){
										ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget=" target=\""+ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget+"\"";
									}

									ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopyCombined="<p>"+ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopy+" <a href=\""+ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTAURL+"\""+ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTATarget+" class=\"ttMainCTA\">"+ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCTACopy+"</a></p>";

									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecProdPromoCarousel\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cimg src=\""+ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_URL+"\" alt=\""+ftbProductPromoCarouselNoRHSTitleTooltipFS_Image_ALT+"\" height=\"34\" width=\"34\"\x3E" +
										"\n\t\t\x3Ch3\x3E"+ftbProductPromoCarouselNoRHSTitleTooltipFS_Title+" \x3C!-- Tooltip - START --\x3E\x3Cdiv class=\"tooltip ttTooltipLayout\"\x3E\x3Cdiv class=\"icon-tooltip-legal\"\x3E\x3C\x2Fdiv\x3E\x3Cspan\x3E\x3Cb\x3E\x3C\x2Fb\x3E\x3Cdiv class=\"content\"\x3E\x3Cp\x3E"+ftbProductPromoCarouselNoRHSTitleTooltipFS_TooltipCopy+"\x3C\x2Fp\x3E\x3C\x2Fdiv\x3E\x3C\x2Fspan\x3E\x3C\x2Fdiv\x3E\x3C!-- Tooltip - END --\x3E"+"\x3C\x2Fh3\x3E" +
										"\n\t\t" +ftbProductPromoCarouselNoRHSTitleTooltipFS_MainCopyCombined+
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;
							/* Template End */

							/* Template Begin */
							case 'ftbProductPromoCarouselNoRHSInlineLegal':

								var ftbProductPromoCarouselNoRHSInlineLegalFS_Image_URL = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_Image_URL').val(),
									ftbProductPromoCarouselNoRHSInlineLegalFS_Image_ALT = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_Image_ALT').val(),
									ftbProductPromoCarouselNoRHSInlineLegalFS_Title = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_Title').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopy = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTACopy = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTACopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTAURL = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTAURL').val(),
									ftbProductPromoCarouselNoRHSInlineLegalFS_LegalCopy = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_LegalCopy').val().replace(/£/g,'&pound;').replace(/&/g,'&amp;'),
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget = $('#ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget').val();

								if (
									ftbProductPromoCarouselNoRHSInlineLegalFS_Image_URL=='' ||
									ftbProductPromoCarouselNoRHSInlineLegalFS_Image_ALT=='' ||
									ftbProductPromoCarouselNoRHSInlineLegalFS_Title=='' ||
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopy=='' ||
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTACopy=='' ||
									ftbProductPromoCarouselNoRHSInlineLegalFS_LegalCopy=='' ||
									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTAURL == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget!=''){
										ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget=" target=\""+ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget+"\"";
									}

									ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopyCombined="<p>"+ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopy+" <a href=\""+ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTAURL+"\""+ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTATarget+" class=\"ttMainCTA\">"+ftbProductPromoCarouselNoRHSInlineLegalFS_MainCTACopy+"</a></p>";

									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecProdPromoCarousel\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cimg src=\""+ftbProductPromoCarouselNoRHSInlineLegalFS_Image_URL+"\" alt=\""+ftbProductPromoCarouselNoRHSInlineLegalFS_Image_ALT+"\" height=\"34\" width=\"34\"\x3E" +
										"\n\t\t\x3Ch3\x3E"+ftbProductPromoCarouselNoRHSInlineLegalFS_Title+"\x3C\x2Fh3\x3E" +
										"\n\t\t" +ftbProductPromoCarouselNoRHSInlineLegalFS_MainCopyCombined+
										"\n\t\t\x3Cp class=\"ttInlineTC\"\x3E"+ftbProductPromoCarouselNoRHSInlineLegalFS_LegalCopy+"\x3C\x2Fp\x3E"+
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;
							/* Template End */

							/* Template Begin */

							case 'ftbProductPromoCarouselWithRHS':

								var ftbProductPromoCarouselWithRHSFS_Image_URL = $('#ftbProductPromoCarouselWithRHSFS_Image_URL').val(),
									ftbProductPromoCarouselWithRHSFS_Image_ALT = $('#ftbProductPromoCarouselWithRHSFS_Image_ALT').val(),
									ftbProductPromoCarouselWithRHSFS_Title = $('#ftbProductPromoCarouselWithRHSFS_Title').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselWithRHSFS_RHSLine1 = $('#ftbProductPromoCarouselWithRHSFS_RHSLine1').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselWithRHSFS_RHSLine2 = $('#ftbProductPromoCarouselWithRHSFS_RHSLine2').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselWithRHSFS_MainCopy = $('#ftbProductPromoCarouselWithRHSFS_MainCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselWithRHSFS_MainCTACopy = $('#ftbProductPromoCarouselWithRHSFS_MainCTACopy').val().replace(/£/g,'&pound;'),
									ftbProductPromoCarouselWithRHSFS_MainCTAURL = $('#ftbProductPromoCarouselWithRHSFS_MainCTAURL').val(),
									ftbProductPromoCarouselWithRHSFS_MainCTATarget = $('#ftbProductPromoCarouselWithRHSFS_MainCTATarget').val();

								if (
									ftbProductPromoCarouselWithRHSFS_Image_URL=='' ||
									ftbProductPromoCarouselWithRHSFS_Image_ALT=='' ||
									ftbProductPromoCarouselWithRHSFS_Title=='' ||
									ftbProductPromoCarouselWithRHSFS_RHSLine1=='' ||
									ftbProductPromoCarouselWithRHSFS_RHSLine2=='' ||
									ftbProductPromoCarouselWithRHSFS_MainCopy=='' ||
									ftbProductPromoCarouselWithRHSFS_MainCTACopy=='' ||
									ftbProductPromoCarouselWithRHSFS_MainCTAURL == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbProductPromoCarouselWithRHSFS_MainCTATarget!=''){
										ftbProductPromoCarouselWithRHSFS_MainCTATarget=" target=\""+ftbProductPromoCarouselWithRHSFS_MainCTATarget+"\"";
									}

									ftbProductPromoCarouselWithRHSFS_MainCopyCombined="<p>"+ftbProductPromoCarouselWithRHSFS_MainCopy+" <a href=\""+ftbProductPromoCarouselWithRHSFS_MainCTAURL+"\""+ftbProductPromoCarouselWithRHSFS_MainCTATarget+" class=\"ttMainCTA\">"+ftbProductPromoCarouselWithRHSFS_MainCTACopy+"</a></p>";

									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecProdPromoCarouselWithRHS\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cimg src=\""+ftbProductPromoCarouselWithRHSFS_Image_URL+"\" alt=\""+ftbProductPromoCarouselWithRHSFS_Image_ALT+"\" height=\"34\" width=\"34\"\x3E" +
										"\n\t\t\x3Ch3\x3E"+ftbProductPromoCarouselWithRHSFS_Title+"\x3C\x2Fh3\x3E" +
										"\n\t\t\x3Cdiv class=\"ttProductPromoCarouselRHS\"\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttProductPromoCarouselRHS_Line1\"\x3E" + ftbProductPromoCarouselWithRHSFS_RHSLine1 + "\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttProductPromoCarouselRHS_Line2\"\x3E" + ftbProductPromoCarouselWithRHSFS_RHSLine2 + "\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t" +ftbProductPromoCarouselWithRHSFS_MainCopyCombined+
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}

								break;

							/* Template End */

							/* Template Begin */

							case 'ftbGhostAccount':

								var ftbGhostAccountFSMainHeadline = $('#ftbGhostAccountFSMainHeadline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSMainHeadlineURL = $('#ftbGhostAccountFSMainHeadlineURL').val(),
									ftbGhostAccountFSMainHeadlineURLTarget = $('#ftbGhostAccountFSMainHeadlineURLTarget').val(),
									ftbGhostAccountFSMainCopy = $('#ftbGhostAccountFSMainCopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSMainCTACopy = $('#ftbGhostAccountFSMainCTACopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSMainCTAURL = $('#ftbGhostAccountFSMainCTAURL').val(),
									ftbGhostAccountFSMainCTATarget = $('#ftbGhostAccountFSMainCTATarget').val(),
									ftbGhostAccountFSSideBul1Headline = $('#ftbGhostAccountFSSideBul1Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSSideBul1Supline = $('#ftbGhostAccountFSSideBul1Supline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSSideBul2Headline = $('#ftbGhostAccountFSSideBul2Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSSideBul2Supline = $('#ftbGhostAccountFSSideBul2Supline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSSideBul3Headline = $('#ftbGhostAccountFSSideBul3Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountFSSideBul3Supline = $('#ftbGhostAccountFSSideBul3Supline').val().replace(/£/g,'&pound;');

								if (
									ftbGhostAccountFSMainHeadline=='' ||
										ftbGhostAccountFSMainHeadlineURL=='' ||
										ftbGhostAccountFSMainCopy=='' ||
										ftbGhostAccountFSMainCTACopy=='' ||
										ftbGhostAccountFSMainCTAURL=='' ||
										ftbGhostAccountFSSideBul1Headline=='' ||
										ftbGhostAccountFSSideBul1Supline=='' ||
										ftbGhostAccountFSSideBul2Headline=='' ||
										ftbGhostAccountFSSideBul2Supline=='' ||
										ftbGhostAccountFSSideBul3Headline=='' ||
										ftbGhostAccountFSSideBul3Supline==''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbGhostAccountFSMainHeadlineURLTarget!=''){
										ftbGhostAccountFSMainHeadlineURLTarget=" target=\""+ftbGhostAccountFSMainHeadlineURLTarget+"\"";
									}

									if (ftbGhostAccountFSMainCTATarget!=''){
										ftbGhostAccountFSMainCTATarget=" target=\""+ftbGhostAccountFSMainCTATarget+"\"";
									}


									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecGhostAccount\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cul class=\"ttGAWrap\"\x3E" +
										"\n\t\t\x3Cli class=\"ttGAMain\"\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainTitle\"\x3E" +
										"\n\t\t\t\t\x3Ca href=\""+ftbGhostAccountFSMainHeadlineURL+"\""+ftbGhostAccountFSMainHeadlineURLTarget+" class=\"ttGAMainTitleCTA\"\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGAIco\"\x3E\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cdiv class=\"ttGATitle\"\x3E"+ftbGhostAccountFSMainHeadline+"\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\t\x3C\x2Fa\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainCopy\"\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttGAMainCopyWrap\"\x3E" +
										"\n\t\t\t\t\t"+ftbGhostAccountFSMainCopy+" \x3Ca href=\""+ftbGhostAccountFSMainCTAURL+"\""+ftbGhostAccountFSMainCTATarget+" class=\"ttMainCopyCTA\"\x3E"+ftbGhostAccountFSMainCTACopy+"\x3Cspan class=\"ttGAMainCopyIco\"\x3E\x3C\x2Fspan\x3E\x3C\x2Fa\x3E" +
										"\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\x3Cli class=\"ttGASide\"\x3E" +
										"\n\t\t\t\x3Cul class=\"ttGASideList\"\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountFSSideBul1Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountFSSideBul1Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountFSSideBul2Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountFSSideBul2Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountFSSideBul3Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountFSSideBul3Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\x3C\x2Ful\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\x3C\x2Ful\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}

								break;

							/* Template End */

							/* Template Begin */

							case 'ftbGhostAccountTooltip':

								var ftbGhostAccountTooltipFSMainHeadline = $('#ftbGhostAccountTooltipFSMainHeadline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSMainHeadlineURL = $('#ftbGhostAccountTooltipFSMainHeadlineURL').val(),
									ftbGhostAccountTooltipFSMainHeadlineURLTarget = $('#ftbGhostAccountTooltipFSMainHeadlineURLTarget').val(),
									ftbGhostAccountTooltipFSMainHeadlineTooltip = $('#ftbGhostAccountTooltipFSMainHeadlineTooltip').val(),
									ftbGhostAccountTooltipFSMainCopy = $('#ftbGhostAccountTooltipFSMainCopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSMainCTACopy = $('#ftbGhostAccountTooltipFSMainCTACopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSMainCTAURL = $('#ftbGhostAccountTooltipFSMainCTAURL').val(),
									ftbGhostAccountTooltipFSMainCTATarget = $('#ftbGhostAccountTooltipFSMainCTATarget').val(),
									ftbGhostAccountTooltipFSSideBul1Headline = $('#ftbGhostAccountTooltipFSSideBul1Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSSideBul1Supline = $('#ftbGhostAccountTooltipFSSideBul1Supline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSSideBul2Headline = $('#ftbGhostAccountTooltipFSSideBul2Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSSideBul2Supline = $('#ftbGhostAccountTooltipFSSideBul2Supline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSSideBul3Headline = $('#ftbGhostAccountTooltipFSSideBul3Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountTooltipFSSideBul3Supline = $('#ftbGhostAccountTooltipFSSideBul3Supline').val().replace(/£/g,'&pound;');

								if (
									ftbGhostAccountTooltipFSMainHeadline=='' ||
									ftbGhostAccountTooltipFSMainHeadlineURL=='' ||
									ftbGhostAccountTooltipFSMainHeadlineTooltip=='' ||
									ftbGhostAccountTooltipFSMainCopy=='' ||
									ftbGhostAccountTooltipFSMainCTACopy=='' ||
									ftbGhostAccountTooltipFSMainCTAURL=='' ||
									ftbGhostAccountTooltipFSSideBul1Headline=='' ||
									ftbGhostAccountTooltipFSSideBul1Supline=='' ||
									ftbGhostAccountTooltipFSSideBul2Headline=='' ||
									ftbGhostAccountTooltipFSSideBul2Supline=='' ||
									ftbGhostAccountTooltipFSSideBul3Headline=='' ||
									ftbGhostAccountTooltipFSSideBul3Supline==''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbGhostAccountTooltipFSMainHeadlineURLTarget!=''){
										ftbGhostAccountTooltipFSMainHeadlineURLTarget=" target=\""+ftbGhostAccountTooltipFSMainHeadlineURLTarget+"\"";
									}

									if (ftbGhostAccountTooltipFSMainCTATarget!=''){
										ftbGhostAccountTooltipFSMainCTATarget=" target=\""+ftbGhostAccountTooltipFSMainCTATarget+"\"";
									}


									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecGhostAccount\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cul class=\"ttGAWrap\"\x3E" +
										"\n\t\t\x3Cli class=\"ttGAMain\"\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainTitle\"\x3E" +
										"\n\t\t\t\t\x3Ca href=\""+ftbGhostAccountTooltipFSMainHeadlineURL+"\""+ftbGhostAccountTooltipFSMainHeadlineURLTarget+" class=\"ttGAMainTitleCTA\"\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGAIco\"\x3E\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cdiv class=\"ttGATitle\"\x3E"+ftbGhostAccountTooltipFSMainHeadline+" \x3C!-- Tooltip - START --\x3E\x3Cdiv class=\"tooltip ttTooltipLayout\"\x3E\x3Cdiv class=\"icon-tooltip-legal\"\x3E\x3C\x2Fdiv\x3E\x3Cspan\x3E\x3Cb\x3E\x3C\x2Fb\x3E\x3Cdiv class=\"content\"\x3E\x3Cp\x3E"+ftbGhostAccountTooltipFSMainHeadlineTooltip+"\x3C\x2Fp\x3E\x3C\x2Fdiv\x3E\x3C\x2Fspan\x3E\x3C\x2Fdiv\x3E\x3C!-- Tooltip - END --\x3E"+"\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\t\x3C\x2Fa\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainCopy\"\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttGAMainCopyWrap\"\x3E" +
										"\n\t\t\t\t\t"+ftbGhostAccountTooltipFSMainCopy+" \x3Ca href=\""+ftbGhostAccountTooltipFSMainCTAURL+"\""+ftbGhostAccountTooltipFSMainCTATarget+" class=\"ttMainCopyCTA\"\x3E"+ftbGhostAccountTooltipFSMainCTACopy+"\x3Cspan class=\"ttGAMainCopyIco\"\x3E\x3C\x2Fspan\x3E\x3C\x2Fa\x3E" +
										"\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\x3Cli class=\"ttGASide\"\x3E" +
										"\n\t\t\t\x3Cul class=\"ttGASideList\"\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountTooltipFSSideBul1Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountTooltipFSSideBul1Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountTooltipFSSideBul2Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountTooltipFSSideBul2Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountTooltipFSSideBul3Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountTooltipFSSideBul3Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\x3C\x2Ful\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\x3C\x2Ful\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}

								break;

							/* Template End */

							/* Template Begin */

							case 'ftbGhostAccountInlineLegal':

								var ftbGhostAccountInlineLegalFSMainHeadline = $('#ftbGhostAccountInlineLegalFSMainHeadline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSMainHeadlineURL = $('#ftbGhostAccountInlineLegalFSMainHeadlineURL').val(),
									ftbGhostAccountInlineLegalFSMainHeadlineURLTarget = $('#ftbGhostAccountInlineLegalFSMainHeadlineURLTarget').val(),
									ftbGhostAccountInlineLegalFSMainCopy = $('#ftbGhostAccountInlineLegalFSMainCopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSMainCTACopy = $('#ftbGhostAccountInlineLegalFSMainCTACopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSMainCTAURL = $('#ftbGhostAccountInlineLegalFSMainCTAURL').val(),
									ftbGhostAccountInlineLegalFSMainCTATarget = $('#ftbGhostAccountInlineLegalFSMainCTATarget').val(),
									ftbGhostAccountInlineLegalFSLegalCopy = $('#ftbGhostAccountInlineLegalFSLegalCopy').val().replace(/£/g,'&pound;').replace(/&/g,'&amp;'),
									ftbGhostAccountInlineLegalFSSideBul1Headline = $('#ftbGhostAccountInlineLegalFSSideBul1Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSSideBul1Supline = $('#ftbGhostAccountInlineLegalFSSideBul1Supline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSSideBul2Headline = $('#ftbGhostAccountInlineLegalFSSideBul2Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSSideBul2Supline = $('#ftbGhostAccountInlineLegalFSSideBul2Supline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSSideBul3Headline = $('#ftbGhostAccountInlineLegalFSSideBul3Headline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountInlineLegalFSSideBul3Supline = $('#ftbGhostAccountInlineLegalFSSideBul3Supline').val().replace(/£/g,'&pound;');

								if (
									ftbGhostAccountInlineLegalFSMainHeadline=='' ||
									ftbGhostAccountInlineLegalFSMainHeadlineURL=='' ||
									ftbGhostAccountInlineLegalFSMainCopy=='' ||
									ftbGhostAccountInlineLegalFSMainCTACopy=='' ||
									ftbGhostAccountInlineLegalFSMainCTAURL=='' ||
									ftbGhostAccountInlineLegalFSLegalCopy=='' ||
									ftbGhostAccountInlineLegalFSSideBul1Headline=='' ||
									ftbGhostAccountInlineLegalFSSideBul1Supline=='' ||
									ftbGhostAccountInlineLegalFSSideBul2Headline=='' ||
									ftbGhostAccountInlineLegalFSSideBul2Supline=='' ||
									ftbGhostAccountInlineLegalFSSideBul3Headline=='' ||
									ftbGhostAccountInlineLegalFSSideBul3Supline==''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbGhostAccountInlineLegalFSMainHeadlineURLTarget!=''){
										ftbGhostAccountInlineLegalFSMainHeadlineURLTarget=" target=\""+ftbGhostAccountInlineLegalFSMainHeadlineURLTarget+"\"";
									}

									if (ftbGhostAccountInlineLegalFSMainCTATarget!=''){
										ftbGhostAccountInlineLegalFSMainCTATarget=" target=\""+ftbGhostAccountInlineLegalFSMainCTATarget+"\"";
									}


									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecGhostAccount\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cul class=\"ttGAWrap\"\x3E" +
										"\n\t\t\x3Cli class=\"ttGAMain\"\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainTitle\"\x3E" +
										"\n\t\t\t\t\x3Ca href=\""+ftbGhostAccountInlineLegalFSMainHeadlineURL+"\""+ftbGhostAccountInlineLegalFSMainHeadlineURLTarget+" class=\"ttGAMainTitleCTA\"\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGAIco\"\x3E\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cdiv class=\"ttGATitle\"\x3E"+ftbGhostAccountInlineLegalFSMainHeadline+ "\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\t\x3C\x2Fa\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainCopy\"\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttGAMainCopyWrap\"\x3E" +
										"\n\t\t\t\t\t"+ftbGhostAccountInlineLegalFSMainCopy+" \x3Ca href=\""+ftbGhostAccountInlineLegalFSMainCTAURL+"\""+ftbGhostAccountInlineLegalFSMainCTATarget+" class=\"ttMainCopyCTA\"\x3E"+ftbGhostAccountInlineLegalFSMainCTACopy+"\x3Cspan class=\"ttGAMainCopyIco\"\x3E\x3C\x2Fspan\x3E\x3C\x2Fa\x3E" +
										"\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttInlineTC\"\x3E"+ftbGhostAccountInlineLegalFSLegalCopy+"\x3C\x2Fdiv\x3E"+
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\x3Cli class=\"ttGASide\"\x3E" +
										"\n\t\t\t\x3Cul class=\"ttGASideList\"\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountInlineLegalFSSideBul1Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountInlineLegalFSSideBul1Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountInlineLegalFSSideBul2Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountInlineLegalFSSideBul2Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListHeadLine\"\x3E"+ftbGhostAccountInlineLegalFSSideBul3Headline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGASideListSupLine\"\x3E"+ftbGhostAccountInlineLegalFSSideBul3Supline+"\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\t\x3C\x2Ful\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\x3C\x2Ful\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}

								break;

							/* Template End */

							/* Template Begin */

							case 'ftbGhostAccountSmartSpend':

								var ftbGhostAccountSmartSpendFSMainHeadline = $('#ftbGhostAccountSmartSpendFSMainHeadline').val().replace(/£/g,'&pound;'),
									ftbGhostAccountSmartSpendFSMainHeadlineURL = $('#ftbGhostAccountSmartSpendFSMainHeadlineURL').val(),
									ftbGhostAccountSmartSpendFSMainHeadlineURLTarget = $('#ftbGhostAccountSmartSpendFSMainHeadlineURLTarget').val(),
									ftbGhostAccountSmartSpendFSMainCopy = $('#ftbGhostAccountSmartSpendFSMainCopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountSmartSpendFSMainCTACopy = $('#ftbGhostAccountSmartSpendFSMainCTACopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountSmartSpendFSMainCTAURL = $('#ftbGhostAccountSmartSpendFSMainCTAURL').val(),
									ftbGhostAccountSmartSpendFSMainCTATarget = $('#ftbGhostAccountSmartSpendFSMainCTATarget').val(),
									ftbGhostAccountSmartSpendFSSidePartnerImageURL = $('#ftbGhostAccountSmartSpendFSSidePartnerImageURL').val(),
									ftbGhostAccountSmartSpendFSSidePartnerImageALT = $('#ftbGhostAccountSmartSpendFSSidePartnerImageALT').val(),
									ftbGhostAccountSmartSpendFSSidePartnerCopy = $('#ftbGhostAccountSmartSpendFSSidePartnerCopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountSmartSpendFSSidePartnerCTACopy = $('#ftbGhostAccountSmartSpendFSSidePartnerCTACopy').val().replace(/£/g,'&pound;'),
									ftbGhostAccountSmartSpendFSSidePartnerCTAURL = $('#ftbGhostAccountSmartSpendFSSidePartnerCTAURL').val(),									
									ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget = $('#ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget').val();


								if (
									ftbGhostAccountSmartSpendFSMainHeadline=='' ||
									ftbGhostAccountSmartSpendFSMainHeadlineURL=='' ||
									ftbGhostAccountSmartSpendFSMainCopy=='' ||
									ftbGhostAccountSmartSpendFSMainCTACopy=='' ||
									ftbGhostAccountSmartSpendFSMainCTAURL=='' ||
									ftbGhostAccountSmartSpendFSSidePartnerImageURL=='' ||
									ftbGhostAccountSmartSpendFSSidePartnerImageALT=='' ||
									ftbGhostAccountSmartSpendFSSidePartnerCopy=='' ||
									ftbGhostAccountSmartSpendFSSidePartnerCTACopy=='' ||
									ftbGhostAccountSmartSpendFSSidePartnerCTAURL==''
	
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbGhostAccountSmartSpendFSMainHeadlineURLTarget!=''){
										ftbGhostAccountSmartSpendFSMainHeadlineURLTarget=" target=\""+ftbGhostAccountSmartSpendFSMainHeadlineURLTarget+"\"";
									}

									if (ftbGhostAccountSmartSpendFSMainCTATarget!=''){
										ftbGhostAccountSmartSpendFSMainCTATarget=" target=\""+ftbGhostAccountSmartSpendFSMainCTATarget+"\"";
									}

									if (ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget!=''){
										ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget=" target=\""+ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget+"\"";
									}


									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecGhostAccountSmartSpend\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cul class=\"ttGAWrap\"\x3E" +
										"\n\t\t\x3Cli class=\"ttGAMain\"\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainTitle\"\x3E" +
										"\n\t\t\t\t\x3Ca href=\""+ftbGhostAccountSmartSpendFSMainHeadlineURL+"\""+ftbGhostAccountSmartSpendFSMainHeadlineURLTarget+" class=\"ttGAMainTitleCTA\"\x3E" +
										"\n\t\t\t\t\t\x3Cspan class=\"ttGAIco\"\x3E\x3C\x2Fspan\x3E" +
										"\n\t\t\t\t\t\x3Cdiv class=\"ttGATitle\"\x3E"+ftbGhostAccountSmartSpendFSMainHeadline+"\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\t\x3C\x2Fa\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3Cdiv class=\"ttGAMainCopy\"\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttGAMainCopyWrap\"\x3E" +
										"\n\t\t\t\t\t"+ftbGhostAccountSmartSpendFSMainCopy+
										"\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttGAMainCopyWrap ttMainCopyCTAPar\"\x3E" +
										"\n\t\t\t\t\t\x3Ca href=\""+ftbGhostAccountSmartSpendFSMainCTAURL+"\""+ftbGhostAccountSmartSpendFSMainCTATarget+" class=\"ttMainCopyCTA\"\x3E"+ftbGhostAccountSmartSpendFSMainCTACopy+"\x3Cspan class=\"ttGAMainCopyIco\"\x3E\x3C\x2Fspan\x3E\x3C\x2Fa\x3E" +
										"\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\x3Cli class=\"ttGASide\"\x3E" +
										"\n\t\t\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\t\t\x3Cimg src=\""+ftbGhostAccountSmartSpendFSSidePartnerImageURL+"\" alt=\""+ftbGhostAccountSmartSpendFSSidePartnerImageALT+"\" \x2F\x3E" +
										"\n\t\t\t\t\x3Cp\x3E"+ftbGhostAccountSmartSpendFSSidePartnerCopy+" \x3Ca href=\""+ftbGhostAccountSmartSpendFSSidePartnerCTAURL+"\""+ftbGhostAccountSmartSpendFSSidePartnerCTAURLTarget+" class=\"ttMainCTA\"\x3E"+ftbGhostAccountSmartSpendFSSidePartnerCTACopy+"\x3C\x2Fa\x3E\x3C\x2Fp\x3E" +
										"\n\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3C\x2Fli\x3E" +
										"\n\t\x3C\x2Ful\x3E" +
										"\n\x3C\x2Fdiv\x3E";



									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}

								break;

							/* Template End */


							/* Template Begin */
							case 'ftbProductPromo4Large':

								var ftbProductPromo4LargeFS_Image_URL = $('#ftbProductPromo4LargeFS_Image_URL').val(),
									ftbProductPromo4LargeFS_Image_ALT = $('#ftbProductPromo4LargeFS_Image_ALT').val(),
									ftbProductPromo4LargeFS_Title = $('#ftbProductPromo4LargeFS_Title').val().replace(/£/g,'&pound;'),
									ftbProductPromo4LargeFS_MainCopy = $('#ftbProductPromo4LargeFS_MainCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromo4LargeFS_MainCTACopy = $('#ftbProductPromo4LargeFS_MainCTACopy').val().replace(/£/g,'&pound;'),
									ftbProductPromo4LargeFS_MainCTAURL = $('#ftbProductPromo4LargeFS_MainCTAURL').val(),
									ftbProductPromo4LargeFS_MainCTATarget = $('#ftbProductPromo4LargeFS_MainCTATarget').val();

								if (
									ftbProductPromo4LargeFS_Image_URL=='' ||
									ftbProductPromo4LargeFS_Image_ALT=='' ||
									ftbProductPromo4LargeFS_Title=='' ||
									ftbProductPromo4LargeFS_MainCopy=='' ||
									ftbProductPromo4LargeFS_MainCTACopy=='' ||
									ftbProductPromo4LargeFS_MainCTAURL == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbProductPromo4LargeFS_MainCTATarget!=''){
										ftbProductPromo4LargeFS_MainCTATarget=" target=\""+ftbProductPromo4LargeFS_MainCTATarget+"\"";
									}

									ftbProductPromo4LargeFS_MainCopyCombined="<p>"+ftbProductPromo4LargeFS_MainCopy+" </p>\n\n\t\t\t\t\t<a href=\""+ftbProductPromo4LargeFS_MainCTAURL+"\""+ftbProductPromo4LargeFS_MainCTATarget+" class=\"ttMainCTA\">"+ftbProductPromo4LargeFS_MainCTACopy+"</a>";


									ttOutputHTML = "\x3Cdiv class=\"clearfix ttSecProductPromoLargeContent\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cul class=\"col1\"\x3E" +
										"\n\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\x3Cimg src=\""+ftbProductPromo4LargeFS_Image_URL+"\" alt=\""+ftbProductPromo4LargeFS_Image_ALT+"\" height=\"333\" width=\"870\"\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttSPPLCContentWrapper\"\x3E" +
										"\n\t\t\t\t\t\x3Ch3\x3E"+ftbProductPromo4LargeFS_Title+"\x3C\x2Fh3\x3E" +
										"\n\n\t\t\t\t\t" +ftbProductPromo4LargeFS_MainCopyCombined+
										"\n\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\x3C\x2Ful\x3E" +
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;
							/* Template End */

							/* Template Begin */
							case 'ftbProductPromo4LargeInlineLegal':

								var ftbProductPromo4LargeInlineLegalFS_Image_URL = $('#ftbProductPromo4LargeInlineLegalFS_Image_URL').val(),
									ftbProductPromo4LargeInlineLegalFS_Image_ALT = $('#ftbProductPromo4LargeInlineLegalFS_Image_ALT').val(),
									ftbProductPromo4LargeInlineLegalFS_Title = $('#ftbProductPromo4LargeInlineLegalFS_Title').val().replace(/£/g,'&pound;'),
									ftbProductPromo4LargeInlineLegalFS_MainCopy = $('#ftbProductPromo4LargeInlineLegalFS_MainCopy').val().replace(/£/g,'&pound;'),
									ftbProductPromo4LargeInlineLegalFS_MainCTACopy = $('#ftbProductPromo4LargeInlineLegalFS_MainCTACopy').val().replace(/£/g,'&pound;'),
									ftbProductPromo4LargeInlineLegalFS_MainCTAURL = $('#ftbProductPromo4LargeInlineLegalFS_MainCTAURL').val(),
									ftbProductPromo4LargeInlineLegalFS_LegalCopy = $('#ftbProductPromo4LargeInlineLegalFS_LegalCopy').val().replace(/£/g,'&pound;').replace(/&/g,'&amp;'),
									ftbProductPromo4LargeInlineLegalFS_MainCTATarget = $('#ftbProductPromo4LargeInlineLegalFS_MainCTATarget').val();

								if (
									ftbProductPromo4LargeInlineLegalFS_Image_URL=='' ||
									ftbProductPromo4LargeInlineLegalFS_Image_ALT=='' ||
									ftbProductPromo4LargeInlineLegalFS_Title=='' ||
									ftbProductPromo4LargeInlineLegalFS_MainCopy=='' ||
									ftbProductPromo4LargeInlineLegalFS_MainCTACopy=='' ||
									ftbProductPromo4LargeInlineLegalFS_LegalCopy=='' ||
									ftbProductPromo4LargeInlineLegalFS_MainCTAURL == ''
									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbProductPromo4LargeInlineLegalFS_MainCTATarget!=''){
										ftbProductPromo4LargeInlineLegalFS_MainCTATarget=" target=\""+ftbProductPromo4LargeInlineLegalFS_MainCTATarget+"\"";
									}

									ftbProductPromo4LargeInlineLegalFS_MainCopyCombined="<p>"+ftbProductPromo4LargeInlineLegalFS_MainCopy+" </p>\n\n\t\t\t\t\t<a href=\""+ftbProductPromo4LargeInlineLegalFS_MainCTAURL+"\""+ftbProductPromo4LargeInlineLegalFS_MainCTATarget+" class=\"ttMainCTA\">"+ftbProductPromo4LargeInlineLegalFS_MainCTACopy+"</a>";


									ttOutputHTML = "\x3Cdiv class=\"clearfix ttSecProductPromoLargeContent\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cul class=\"col1\"\x3E" +
										"\n\t\t\t\x3Cli\x3E" +
										"\n\t\t\t\t\x3Cimg src=\""+ftbProductPromo4LargeInlineLegalFS_Image_URL+"\" alt=\""+ftbProductPromo4LargeInlineLegalFS_Image_ALT+"\" height=\"333\" width=\"870\"\x3E" +
										"\n\t\t\t\t\x3Cdiv class=\"ttSPPLCContentWrapper\"\x3E" +
										"\n\t\t\t\t\t\x3Ch3\x3E"+ftbProductPromo4LargeInlineLegalFS_Title+"\x3C\x2Fh3\x3E" +
										"\n\n\t\t\t\t\t" +ftbProductPromo4LargeInlineLegalFS_MainCopyCombined+
										"\n\n\t\t\t\t\t\x3Ctable class=\"ttInlineTC\"\x3E\x3Ctbody\x3E\x3Ctr\x3E\x3Ctd\x3E"+ftbProductPromo4LargeInlineLegalFS_LegalCopy+"\x3C\x2Ftd\x3E\x3C\x2Ftr\x3E\x3C\x2Ftbody\x3E\x3C\x2Ftable\x3E" +
										"\n\n\t\t\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\t\x3C\x2Fli\x3E" +
										"\n\t\t\x3C\x2Ful\x3E" +
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}
								break;
							/* Template End */

							/* Template Begin */

							case 'ftbServicesPromoCarousel':

								var ftbServicesPromoCarouselFSImgURL = $('#ftbServicesPromoCarouselFSImgURL').val(),
									ftbServicesPromoCarouselFSImgALT = $('#ftbServicesPromoCarouselFSImgALT').val().replace(/£/g,'&pound;'),
									ftbServicesPromoCarouselFSH3 = $('#ftbServicesPromoCarouselFSH3').val().replace(/£/g,'&pound;'),
									ftbServicesPromoCarouselFSMainCopy = $('#ftbServicesPromoCarouselFSMainCopy').val().replace(/£/g,'&pound;'),
									ftbServicesPromoCarouselFSMainCTACopy = $('#ftbServicesPromoCarouselFSMainCTACopy').val().replace(/£/g,'&pound;'),
									ftbServicesPromoCarouselFSMainCTAURL = $('#ftbServicesPromoCarouselFSMainCTAURL').val(),
									ftbServicesPromoCarouselFSMainCTAURLTarget = $('#ftbServicesPromoCarouselFSMainCTAURLTarget').val();


								if (
									ftbServicesPromoCarouselFSImgURL=='' ||
									ftbServicesPromoCarouselFSImgALT=='' ||
									ftbServicesPromoCarouselFSH3=='' ||
									ftbServicesPromoCarouselFSMainCopy=='' ||
									ftbServicesPromoCarouselFSMainCTACopy=='' ||
									ftbServicesPromoCarouselFSMainCTAURL==''

									){
									alert('Please provide information for all fields, unless they are optional (marked with italic label)!');
									break;
								}else{

									if (ftbServicesPromoCarouselFSMainCTAURLTarget!=''){
										ftbServicesPromoCarouselFSMainCTAURLTarget=" target=\""+ftbServicesPromoCarouselFSMainCTAURLTarget+"\"";
									}


									ttOutputHTML="\x3Cdiv class=\"clearfix ttSecServicesPromoCarousel\" data-ttmeta-crid=\"${campaign.id}:${campaign.recipe.id}:${campaign.recipe.trafficType}\"\x3E" +
										"\n\t\x3Cdiv class=\"snippet\"\x3E" +
										"\n\t\t\x3Cp class=\"ttSPCImageWrap\"\x3E" +
										"\n\t\t\t\x3Cimg src=\""+ftbServicesPromoCarouselFSImgURL+"\" alt=\""+ftbServicesPromoCarouselFSImgALT+"\" height=\"129\" width=\"270\"\x3E" +
										"\n\t\t\x3C\x2Fp\x3E" +
										"\n\t\t\x3Ch3\x3E"+ftbServicesPromoCarouselFSH3+"\x3C\x2Fh3\x3E" +
										"\n\t\t\x3Cdiv class=\"ttSPCMainContent\"\x3E" +
										"\n\t\t\t" + ftbServicesPromoCarouselFSMainCopy +
										"\n\t\t\x3C\x2Fdiv\x3E" +
										"\n\t\t\x3Cp class=\"ttSPCMainCTA\"\x3E" +
										"\n\t\t\t\x3Ca href=\""+ftbServicesPromoCarouselFSMainCTAURL+"\""+ftbServicesPromoCarouselFSMainCTAURLTarget+" class=\"ttMainCTA\" \x3E"+ftbServicesPromoCarouselFSMainCTACopy+"\x3C\x2Fa\x3E" +
										"\n\t\t\x3C\x2Fp\x3E" +
										"\n\t\x3C\x2Fdiv\x3E" +
										"\n\x3C\x2Fdiv\x3E";

									parent.editAreaLoader.setValue(editArea.id, ttOutputHTML);
									window.focus();

									$('#ttInnerFormOfferPattern').hide();
								}

								break;

							/* Template End */

							default:

								break;
						}


					});
				}else{
					$('#ttInnerFormOfferPattern').show();
				}

				return false;
		}
		// Pass to next handler in chain
		return true;
	}
	
	/**
	 * This is just an internal plugin method, prefix all internal methods with a _ character.
	 * The prefix is needed so they doesn't collide with future EditArea callback functions.
	 *
	 * @param {string} a Some arg1.
	 * @param {string} b Some arg2.
	 * @return Some return.
	 * @type unknown
	 */
	,_someInternalFunction : function(a, b) {
		return a+b;
	}
};

// Adds the plugin class to the list of available EditArea plugins
editArea.add_plugin("offertemplates", EditArea_offertemplates);
