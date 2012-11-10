function createRequestObject()
{
	var returnObj = false;
	if(window.XMLHttpRequest) {
		returnObj = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			returnObj = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				returnObj = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {}
		}
	}
	return returnObj;
}

var http = createRequestObject();
var target_element;

// This is the function to call, give it the script file you want to run and
// the div you want it to output to.
function loadDiv(htmlFile, targetDiv)
{	
	target_element = targetDiv;
	try{
		http.open('get', htmlFile, true);
	}
	catch (e){
		document.getElementById(target_element).innerHTML = e;
		return;
	}
	http.onreadystatechange = handleResponse;
	http.send();	
}

function handleResponse()
{	
	if(http.readyState == 4) {	
		try{
			var response_txt = http.responseText;
			document.getElementById(target_element).innerHTML = response_txt;
		} catch (e){
			document.getElementById(target_element).innerHTML = e;
		}	
	}	
}