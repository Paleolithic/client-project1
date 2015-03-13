// We create the HTTP Object in the function 'getHTTPObject' below	
var myHTTPrequest = getHTTPObject();
var xmlDoc = handleHttpResponse();
var dateForm = document.getElementById("dateform");
createNextOptions("class", [ "commando", "siren", "gunzerker", "assassin" ]);

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
	str = str.replace(/-/g, ' ');
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// category, categoryTitle, options
function createNextOptions(thisCategory, options, selection){
	
	//Creates new elements based on function parameters
	var newDiv 	  = document.createElement("div");
	newDiv.setAttribute("id", thisCategory);
	newDiv.setAttribute("class", "select-wrapper three columns");

	// if(selection != null){	newImg.setAttribute("src", "assets/images/" + selection + ".png"); }

	var newLabel  = document.createElement("label");
	newLabel.setAttribute("for", "select_" + thisCategory);
	newLabel.innerText = toTitleCase(thisCategory);

	var newSelect = document.createElement("select");
	newSelect.id = thisCategory;

	for (i = 0; i < options.length; i++){
		var newOption = document.createElement("option");
		newOption.value = options[i];
		newOption.innerText = toTitleCase(options[i]);
		newSelect.appendChild(newOption);
	}

	var newInput = document.createElement("input");
	newInput.type = "button";
	newInput.value = "Choose " + toTitleCase(thisCategory);
	newInput.setAttribute("class", "button-primary");


	// Add elements to DOM
	// newDiv.appendChild(newImg);
	newDiv.appendChild(newLabel);
	newDiv.appendChild(newSelect);
	newDiv.appendChild(newInput);
	dateForm.appendChild(newDiv);

	var newImg = document.createElement("img");
	newImg.setAttribute("src", "assets/images/" + newSelect.options[newSelect.selectedIndex].value + ".png");
	imgDiv = document.getElementById("images");
	imgDiv.appendChild(newImg);

	newSelect.addEventListener('change', function(){
		newImg.setAttribute("src", "assets/images/" + newSelect.options[newSelect.selectedIndex].value + ".png");
	}, false);

	//Input on click listener
	newInput.addEventListener('click', function(){
		newInput.setAttribute("disabled", true);
		newSelect.setAttribute("disabled", true);

		thisXMLObj = xmlDoc.getElementById(thisCategory);
		
		// Loop through the found XML object and look for the matching select element
		// That matches the user selection
		var selection = newSelect.options[newSelect.selectedIndex].value;
		var thisXMLObjLength = thisXMLObj.children.length;
		var nextXMLObj;
		var nextCategory;
		var cont = true;
		for(var i = 0; i < thisXMLObjLength; i++ ){
			if(thisXMLObj.children[i].getAttribute("text") == selection){
				if(thisXMLObj.children[i].children.length > 0){
					console.log("Inside if");
					nextXMLObj = thisXMLObj.children[i].children[0];
					nextCategory = nextXMLObj.getAttribute("id");
					// console.log(nextXMLObj)
				}
				else{
					cont = false;
					break;
				}
			}
		}

		if(cont){
			var nextOptions = [];
			for (i = 0; i < nextXMLObj.children.length; i++){
				nextOptions.push(nextXMLObj.children[i].getAttribute("text"));
			}

			createNextOptions(nextCategory, nextOptions, selection);			
		}
	}, false); 
}

window.onload = function(){
	var imagesHolder = document.getElementById("images");
	imagesHolder.style.height = imagesHolder.children[0].height + "px";
}

window.onresize = function(){
	var imagesHolder = document.getElementById("images");
	imagesHolder.style.height = imagesHolder.children[0].height + "px";
}