document.getElementById("selectSexButton").addEventListener("click", function(){
	// nextOptionLogic(document.getElementById("selectSex"));
	selectObj = document.getElementById("selectSex");
	value = selectObj.options[selectObj.selectedIndex].value;
	console.log(value);
	if(value == "men"){
		createNextOptions("facialHair", "Facial Hair", ["hair", "no hair"]);
	} else if(value == "women"){
		createNextOptions("hairColor", "Hair Color", ["blonde", "brunette"]);
	}
});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function createNextOptions(category, categoryTitle, options){
	var dateForm = document.getElementById("dateform");

	var newLabel  = document.createElement("label");
	newLabel.setAttribute("for", category);
	newLabel.innerText = categoryTitle;

	var newSelect = document.createElement("select");
	newSelect.id = category;

	for (i = 0; i < options.length; i++){
		var newOption = document.createElement("option");
		newOption.value = options[i];
		newOption.innerText = toTitleCase(options[i]);
		newSelect.appendChild(newOption);
	}

	var newInput = document.createElement("input");
	newInput.type = "button";
	newInput.id = category + "Button"; 
	newInput.value = "Choose " + categoryTitle;

	// newInput.addEventListener("click", function(){
	// 	console.log(newSelect);
	// 	allOptions = ["", ["sex", "Sex", "men"] , ["sex", "Sex", "women"], 
	// 	["facialHair", "Facial Hair", "hair"], ["facialHair", "Facial Hair", "no hair"], ["hairColor", "Hair Color", "blonde"], ["hairColor", "Hair Color", "brunetee"], 
	// 	"dark", "light", "big", "small", "tall", "short", "brown", "blue"];
	// 	value = newSelect.options[newSelect.selectedIndex].value;
	// 	console.log(value);
	// 	childOne = allOptions[allOptions.indexOf(value)*2 + 1];
	// 	childTwo = allOptions[allOptions.indexOf(value)*2 + 2];
	// 	console.log("Children: " + childOne[2] + ", " + childTwo[2]);
	// });

	dateForm.appendChild(newLabel);
	dateForm.appendChild(newSelect);
	dateForm.appendChild(newInput);
}


// function nextOptionLogic(selectObj){
// 	options = ["", "men", "women", "hair", "no hair", "blonde", "brunetee", "dark", "light", "big", "small", "tall", "short", "brown", "blue"];
// 	value = selectObj.options[selectObj.selectedIndex].value
// 	childOne = options[options.indexOf(value)*2 + 1];
// 	childTwo = options[options.indexOf(value)*2 + 2];
// 	console.log(selectObj.options[selectObj.selectedIndex].value);
// 	console.log("Children: " + childOne + ", " + childTwo);
// }
