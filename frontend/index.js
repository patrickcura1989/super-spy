$(function(){
	$("#searchButton").on("click", function(){
		alert("Banana");
		//(".title").hide();
		var text = getElementByID("text").value;
		alert(text);
	})

	//get the text out of the box

	// var url = "http://localhost:3000/?item=" + text;
	// $.getJSON(url).then(function (data) {
	// 	// body...
	// 	console.log(data);
	// 	alert(data);
	// })
})
