/**
 *
 * @package	Joomla.Site
 * @subpackage 	com_content
 * System 	Plugin
 * @copyright  	Hans-Guenter Heiserholt {@link http://www.moba-hgh.de}
 * @author     	Hans-Guenter Heiserholt / Created on 01-Jan-2025
 * @license    GNU/GPL Public License version 2 or later
 */
  
/* 
 * JavaScript behavior to allow remember/set the last position in edit-window
 */
// Set variables
// bname = name of qookie 
//    cname = 'ListviewRemPos_tmp_lastpos';
	
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

function setCookie(name, value, exdays) {
 
//  	alert('setCookie: ' + name + ' ' + value + ' ' + exdays);
 
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));   // exdays = 1 day
	var expires = 'expires='+d.toUTCString();
	document.cookie = name + '=' + value + '; ' + expires;
}

function getCookie(name) {
		
	var name = name + '=';
	var ca = document.cookie.split(';');
	alert('getCookie: ca= ' +ca);
	for (var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) {
		// 	alert('getCookie: ' + 'name-lenght= ' + name.length + ' c-lenght= ' + c.length);			   
			return c.substring(name.length, c.length);
		}
	}
		return '';
}
	
	function delete_cookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
/*
	function go2pos() {
			
		var a = getCookie(cname);  
	  
	//	alert('Qookie geladen: ' + a);   
	//	alert('Dokument geladen: jetzt wird gescrollt');
			
		window.scrollTo(0, a);
	//  delete_cookie(cname);   darf nicht gelöscht werden ! sonst wird nicht gescrollt. 
	}
*/	
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
	//	if (domElem.selectionStart || domElem.selectionStart == '0') {  // chg by HGH
		if (domElem.selectionStart == '0' || domElem.selectionEnd == '0') {
			pos = domElem.selectionStart;
		}
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

 function getCarPosTxtarea() {
	alert('Fkt: getCarPosTxtarea');
	   
	// var CarPosValue = window.pageYOffset;                    // funktioniert !	
	// alert('CarPosValue[...pageYOffset] geladen: ' +'A:' +CarPosValue); 
	// var CarPosValue = window.scrollY;

	var CarPosValue = getCaretPos(document.getElementById('jform_articletext')); // pure JS
	alert('CarPostxtarea:CarPosValue[...byId] geladen: ' +'A:' +CarPosValue); 
		 
	if (CarPosValue > 0)
	{
		alert('CarPostxtarea:getCarPosValue>0: ' +'B:' +CarPosValue);
	
		var exdays = 1;
		alert('Qookie Name: ' +bname);   
		delete_cookie(bname);
		setCookie(bname, CarPosValue, exdays);
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
