// ==UserScript==
// @name       Load EditArea
// @namespace  //
// @description  Load EditArea
// @include     https://admin7.testandtarget.omniture.com/admin/campaign/campaign_edit_forward.jsp*
// @include     https://admin7.testandtarget.omniture.com/admin/offers/offers.jsp*
// @version     1.2
// @grant       GM_log
// ==/UserScript==

var ttinshead = document.getElementsByTagName('head')[0];
var ttinsscript = document.createElement('script');
ttinsscript.type = 'text/javascript';
ttinsscript.src = 'https://ttdev204.googlecode.com/svn/ttadminextend/CodeHighlightEditArea/editArea/edit_area_full.js';
ttinshead.appendChild(ttinsscript);

var ttinscss = document.createElement("style");
ttinscss.type = "text/css";
ttinscss.innerHTML = "#frame_html_editor, #html_editor {" +
	"width: 100% !important;" +
	"height: 360px !important;" +
	"}";
ttinshead.appendChild(ttinscss);

var tteditAreaLoader = function(){
	if($j('#edit_area_toggle_checkbox_html_editor').length==0){
		editAreaLoader.init({
			id: "html_editor"	// id of the textarea to transform
			,start_highlight: true
			,allow_toggle: true
			,language: "en"
			,syntax: "html"
			,toolbar: "new_document, offertemplates_but,|, offertemplates_select,|, search, fullscreen, go_to_line, |, undo, redo, |, select_font, |, syntax_selection, |, highlight, reset_highlight, |, help"
			,syntax_selection_allow: "css,html,js,php,python,vb,xml,c,cpp,sql,basic,pas,brainfuck"
			,is_multi_files: false
			,is_editable: true
			,plugins: "offertemplates"
			,show_line_colors: true
		});
	}
};

document.addEventListener('DOMContentLoaded', function(){

	$j(document).on("click", '#html_editor', function(event) { //Once the offer editor exists
		tteditAreaLoader();
	});

	$j(document).on("mousedown", '#offerEditDialogSaveButton', function(event) { //toggle before save
		eAL.toggle("html_editor");
	})

});
