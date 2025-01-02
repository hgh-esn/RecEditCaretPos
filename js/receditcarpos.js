/**
 *
 * @package	   Joomla.Site
 * @subpackage com_content
 * System 	   Plugin
 * @copyright  Hans-Guenter Heiserholt {@link http://www.web-hgh.de}
 * @author     Hans-Guenter Heiserholt / Created on 21-Sep-2014
 * @license    GNU/GPL Public License version 2 or later
 */
  
/* 
 * JavaScript behavior to allow remember/set the selected positionen in Joomla Listview
 */

    cname = 'ListviewRemPos_tmp_lastpos';
	
	// Versuch
	bname = 'ListviewRemPos_tmp_lastCurPosTxtarea';
        
	function getDocPos() {

	/* window.scrollto(0,400); */
	//    alert('listviewrempos: pageXOffset: ' + window.pageXOffset + ', pageYOffset: ' + window.pageYOffset);  
	   
	   var cvalue = window.pageYOffset;
	   var exdays = 1;
	   
	   delete_cookie(cname);
	   setCookie(cname, cvalue, exdays);
	}
	


	function setCookie(cname, cvalue, exdays) {
 
//  	alert('setCookie: ' + cname + ' ' + cvalue + ' ' + exdays);
 
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));   // exdays = 1 day
		var expires = 'expires='+d.toUTCString();
		document.cookie = cname + '=' + cvalue + '; ' + expires;
	}

	function getCookie(cname) {
		
		var name = cname + '=';
		var ca = document.cookie.split(';');
		alert('getCookie: ca= ' +ca);
		for (var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) {
	// 			alert('getCookie: ' + 'name-lenght= ' + name.length + ' c-lenght= ' + c.length);			   
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}
	
	function delete_cookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	function go2pos() {
			
		var a = getCookie(cname);  
	  
	//	alert('Qookie geladen: ' + a);   
	//	alert('Dokument geladen: jetzt wird gescrollt');
			
		window.scrollTo(0, a);
	//  delete_cookie(cname);   darf nicht gelöscht werden ! sonst wird nicht gescrollt. 
	}
	
// Aufruf
// var pos = getCaretPos(document.getElementById('myId')); // pure JS
// var pos = getCaretPos($('#myId')[0], 10);  // jQuery


// Definition   http://dailydevbook.de/2013/01/24/javascript-caret-position-setzen-und-auslesen/
function getCaretPos(domElem) {
	var pos;
	alert('Fkt: getCaretPos');
	if (document.selection) {
		 alert('getCaretPos: Selection');
		 domElem.focus();
		 var sel = document.selection.createRange();
		 sel.moveStart('character', - domElem.value.length);
		 pos = sel.text.length;
	}
	else {
		alert('getCaretPos: noSelection');
	//	if (domElem.selectionStart || domElem.selectionStart == '0') {
		if (domElem.selectionStart == '0' || domElem.selectionEnd == '0') {
			pos = domElem.selectionStart;
		}
		// pos =200;
	}
alert('Return getCaretPos: ' +pos);
return pos;
}
// Aufruf
// setCaretPos(document.getElementById('myId'), 10); // pure JS
// setCaretPos($('#myId')[0], 10);  // jQuery

// Definition   http://dailydevbook.de/2013/01/24/javascript-caret-position-setzen-und-auslesen/
function setCaretPos(domElem, pos) {
  if(domElem.setSelectionRange) {
    domElem.focus();
    domElem.setSelectionRange(pos, pos);
  }
  else if (domElem.createTextRange) {
    var range = domElem.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}


/* versuch-start*/

 function getCurPosTxtarea() {
	alert('Fkt: getCurPosTxtarea');
	   
	// var CurPosValue = window.pageYOffset;                    // funktioniert !	
	// alert('CurPosValue[...pageYOffset] geladen: ' +'A:' +CurPosValue); 
	// var CurPosValue = window.scrollY;

	var CurPosValue = getCaretPos(document.getElementById('jform_articletext')); // pure JS
	alert('CurPostxtarea:CurPosValue[...byId] geladen: ' +'A:' +CurPosValue); 
		 
	if (CurPosValue > 0)
	{
		alert('CurPostxtarea:getCurPosValue>0: ' +'B:' +CurPosValue);
	
		var exdays = 1;
		alert('Qookie Name: ' +bname);   
		delete_cookie(bname);
		setCookie(bname, CurPosValue, exdays);
	}
	else 
	{
		alert('bname= ' +bname);
		var posValue = getCookie(bname);  
	  
		alert('Qookie geladen: ' +posValue);   
			
		//window.scrollTo(0, posValue);
		setCaretPos('jform_articletext', posValue);
	};
 }
/* versuch-end*/

	/*
	function checkCookie() {

		var user = getCookie('username');
		if (user != '') {
			alert('Welcome again ' + user);
		} else {
			user = prompt('Please enter your name:', '');
			if (user != '' && user != null) {
				setCookie('username', user, 365);
			}
		}
	}
	*/