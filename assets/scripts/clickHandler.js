// We create the HTTP Object in the function 'getHTTPObject' below	
var myHTTPrequest = getHTTPObject();
var xmlDoc = handleHttpResponse();
var dateForm = document.getElementById("dateform");
createNextOptions("skill-class", [ "commando", "siren", "gunzerker", "assassin" ]);

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
	
	var rowDiv;
	// If row div doesn't exist, create it, set attributes and add to DOM
	// Otherwise set it to via getElementById
	// This is used to make a wrapper div with class "row" 
	// for the Skeleton CSS grid framework
	if(document.getElementById("form-row") == null){
		
		rowDiv = document.createElement("div");
		rowDiv.id = "form-row";
		rowDiv.setAttribute("class", "row");

		dateForm.appendChild(rowDiv);
	} else{
		rowDiv = document.getElementById("form-row");
	}

	// Creates new div based on function parameters
	var newDiv 	  = document.createElement("div");
	// Sets attributes of div
	newDiv.id = thisCategory;
	newDiv.setAttribute("class", "select-wrapper three columns");

	// Creates new label based on function parameters
	var newLabel  = document.createElement("label");
	// Sets attributes of label
	newLabel.setAttribute("for", "select_" + thisCategory);
	newLabel.innerText = toTitleCase(thisCategory);

	// Creates new select based on function parameters
	var newSelect = document.createElement("select");
	// Sets attributes of select
	newSelect.id = thisCategory;

	// For options parameters length, loop through and create a new option element
	// Add that option element to the select
	for (i = 0; i < options.length; i++){
		var newOption = document.createElement("option");
		newOption.value = options[i];
		newOption.innerText = toTitleCase(options[i]);
		newSelect.appendChild(newOption);
	}

	// Create new input based on function parameters
	var newInput = document.createElement("input");
	// Sets attributes of input
	newInput.type = "button";
	newInput.value = "Choose " + toTitleCase(thisCategory);
	newInput.setAttribute("class", "button-primary");

	// Creates new image dom element
	var newImgDiv = document.createElement("div");
	var newImg = document.createElement("img");
	// Sets attributes of image element
	newImg.setAttribute("src", "assets/images/" + newSelect.options[newSelect.selectedIndex].value + ".png");
	
	// Grab existing images div element
	var imgDiv = document.getElementById("images");


	// Adds newly created elements to appropriate place in DOM
	newDiv.appendChild(newLabel);
	newDiv.appendChild(newSelect);
	newDiv.appendChild(newInput);
	rowDiv.appendChild(newDiv);
	newImgDiv.appendChild(newImg);
	imgDiv.appendChild(newImgDiv);

	// Change event listener for select element
	newSelect.addEventListener('change', function(){
		// Reload image based on the selected option
		newImg.setAttribute("src", "assets/images/" + newSelect.options[newSelect.selectedIndex].value + ".png");
	}, false);


	// On click listener for input element
	newInput.addEventListener('click', function(){

		// localStorage set
		localStorage.setItem(thisCategory, newSelect.options[newSelect.selectedIndex].value );
		myStorage_handler();

		// Sets attributes of the select and input button to disabled so they cannot be changed
		newInput.setAttribute("disabled", true);
		newSelect.setAttribute("disabled", true);

		// Grab XML object
		thisXMLObj = xmlDoc.getElementById(thisCategory);
		
		var selection = newSelect.options[newSelect.selectedIndex].value;
		var thisXMLObjLength = thisXMLObj.children.length;
		var nextXMLObj;
		var nextCategory;
		var cont = true;
		
		// Loop through the found XML object and 
		for(var i = 0; i < thisXMLObjLength; i++ ){
			// Look for the matching select element that matches the user selection
			if(thisXMLObj.children[i].getAttribute("text") == selection){
				
				// If found, check if it's last elements
				// If so set nextXMLObj variable and nextCategory variable
				if(thisXMLObj.children[i].children.length > 0){
					nextXMLObj = thisXMLObj.children[i].children[0];
					nextCategory = nextXMLObj.getAttribute("id");
				}
				// Else set continue boolean to false and break loop
				else{
					cont = false;
					break;
				}
			}
		}

		// If continue, set nextOptions array to be pushed as parameter
		// and run createNextOptions function again
		if(cont){
			var nextOptions = [];
			for (i = 0; i < nextXMLObj.children.length; i++){
				nextOptions.push(nextXMLObj.children[i].getAttribute("text"));
			}

			createNextOptions(nextCategory, nextOptions, selection);			
		}
		// Else, there are no more options to be created and thus
		// We should show the user the submit button
		else{

			// Create end div and set attributes
			var endDiv = document.createElement("div");
			endDiv.setAttribute("class", "twelve columns");
			
			// Create submit input element and set attributes
			var endInput = document.createElement("input");
			endInput.type = "submit";
			endInput.id = "submit"
			endInput.setAttribute("class", "button-primary");

			// Append newly created elements to their appropriate place in the DOM
			endDiv.appendChild(endInput);
			dateForm.appendChild(endDiv); 
		}
	}, false); 


	newImg.addEventListener('mouseover', function(){
		console.log("You are now hovering!");
		newImgDiv.classList.toggle("hover");
	}, false);
}

// On successful window load, run function
window.onload = function(){

	// Grab images holder div from id
	var imagesHolder = document.getElementById("images");

	// Set height of images holder div to the height of its first child, which will be the tallest
	imagesHolder.style.height = imagesHolder.children[0].children[0].height + "px";


	var resetButton = document.getElementById("reset");
	resetButton.addEventListener('click', function(){
		console.log("Clicked");
		// console.log(dateForm.children[1].children);
		for(i = dateForm.children[1].children.length - 1; i > 0; i--){
			console.log(dateForm.children[1].children[i]);
		    dateForm.children[1].removeChild(dateForm.children[1].children[i]);
		}

		var submitButton = document.getElementById("submit");
		if(submitButton != null){
			console.log(submitButton.parentNode);
			submitButton.parentNode.parentNode.removeChild(submitButton.parentNode);			
		}

		var classDiv = document.getElementById("skill-class");
		classDiv.children[1].removeAttribute("disabled");
		classDiv.children[2].removeAttribute("disabled");
		var firstOption = classDiv.children[1].children[0].value;
		classDiv.children[1].value = firstOption;

		var imgDiv = document.getElementById("images");
		console.log(imgDiv.children);
		for(i = imgDiv.children.length - 1; i > 0; i--){
			imgDiv.removeChild(imgDiv.children[i]);
		}
		console.log(imgDiv.children);
		imgDiv.children[0].children[0].setAttribute("src", "assets/images/" + firstOption + ".png");
	}, false);


	// window.addEventListener('storage', myStorage_handler, false);
}

window.onresize = function(){

	// Grab images holder div from id
	var imagesHolder = document.getElementById("images");

	// Set height of images holder div to the height of its first child, which will be the tallest
	imagesHolder.style.height = imagesHolder.children[0].children[0].height + "px";
}


function myStorage_handler(){

	console.log(localStorage);
}