// We create the HTTP Object in the function 'getHTTPObject' below	
var myHTTPrequest = getHTTPObject();
var xmlDoc = handleHttpResponse();
var dateForm = document.getElementById("dateform");

///////// Create and get an http object (ajax)
function getHTTPObject() {
	var xmlhttp;
	// Check to see if you can use native XMLHttpRequest object or ActiveX
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
  	}
	//  ... for IE/Windows ActiveX version
	else if (window.ActiveXObject){
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}		/// you're using a browser that doesn't allow http object
	else{	// return false to the variable on line 10
		return false;
	}
  	/// return the object to the variable on line 10
	return xmlhttp;	
}

//*****************************************************************
// Create a way to look into the object  
// In this program, there is a button that calls this function
// See the button named 'pets' in the <body> section           
function handleHttpResponse() {
	
	// first check if the http request is there
	if (myHTTPrequest) {
    	// good, myHTTPrequest has something (not = false)
		myHTTPrequest.open("GET", "assets/data.xml", false);
		myHTTPrequest.setRequestHeader("content-type", "text/xml");
    	myHTTPrequest.send(null);
	}

  	// Now see if the request got something from the server 
  	if (myHTTPrequest.readyState == 4) {
    // is the server response a good one?
    	if (myHTTPrequest.status==200) {
      		// Use the XML DOM to unpack the XML data 
      		xmlDoc = myHTTPrequest.responseXML; 
	 	}
  	}

  	return xmlDoc;
}

function toTitleCase(str){

    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// category, categoryTitle, options
function createNextOptions(thisCategory){

	// Get div of this category and find selected value
	divObj = document.getElementById(thisCategory);
	selectObj = divObj.children[1];
	inputObj = divObj.children[2];
	inputObj.setAttribute("disabled", true);

	thisSelection = selectObj.options[selectObj.selectedIndex].value;

	// Loop through xml object and find matching category
	var selectLength = xmlDoc.getElementsByTagName("select").length;
	var thisXMLObj;
	for(var i = 0; i < selectLength; i++){
		if(xmlDoc.getElementsByTagName("select")[i].getAttribute("text") == thisCategory){
			thisXMLObj = xmlDoc.getElementsByTagName("select")[i];
		}
	}

	// Loop through the found XML object and look for the matching select element
	// That matches the user selection
	var thisXMLObjLength = thisXMLObj.children.length;
	var nextXMLObj;
	var cont = true;
	for(var i = 0; i < thisXMLObjLength; i++ ){
		// console.log(thisXMLObj.children[i].getAttribute("text"));
		if(thisXMLObj.children[i].getAttribute("text") == thisSelection){
			if(thisXMLObj.children[i].children.length > 0){
				nextXMLObj = thisXMLObj.children[i].children[0];
				console.log(nextXMLObj)
				nextCategory = nextXMLObj.getAttribute("text");
			}
			else{ 
				cont = false;
				break;
			}
		}
	}

	if(cont){
		// Create new elements
		var newDiv 	  = document.createElement("div");
		newDiv.setAttribute("id", nextCategory);

		var newLabel  = document.createElement("label");
		newLabel.setAttribute("for", "select_" + nextCategory);
		newLabel.innerText = toTitleCase(nextCategory);

		var newSelect = document.createElement("select");
		newSelect.id = nextCategory;

		for (i = 0; i < nextXMLObj.children.length; i++){
			var newOption = document.createElement("option");
			newOption.value = nextXMLObj.children[i].getAttribute("text");
			newOption.innerText = toTitleCase(nextXMLObj.children[i].getAttribute("text"));
			newSelect.appendChild(newOption);
		}

		var newInput = document.createElement("input");
		newInput.type = "button";
		newInput.value = "Choose " + nextCategory;
		newInput.setAttribute("onClick", "createNextOptions(this.parentNode.id)");

		// Add elements to DOM
		newDiv.appendChild(newLabel);
		newDiv.appendChild(newSelect);
		newDiv.appendChild(newInput);
		dateForm.appendChild(newDiv);
	}
}