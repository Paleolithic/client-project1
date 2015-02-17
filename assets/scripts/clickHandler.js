document.getElementById("selectSexButton").addEventListener("click", function(){
	nextOptionLogic(document.getElementById("selectSex"));
});

function nextOptionLogic(selectObj){
	options = ["", "men", "women", "hair", "nohair", "blonde", "brunetee", "dark", "light", "big", "small", "tall", "short", "brown", "blue"];
	value = selectObj.options[selectObj.selectedIndex].value
	childOne = options[options.indexOf(value)*2 + 1];
	childTwo = options[options.indexOf(value)*2 + 2];
	console.log(selectObj.options[selectObj.selectedIndex].value);
	console.log("Children: " + childOne + ", " + childTwo);

	
}

