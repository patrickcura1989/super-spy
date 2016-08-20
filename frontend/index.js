$(function(){
	$(".title").on("click", function(){
		(".title").hide();
	})

	//get the text out of the box
	var text = //get text out of the box
	var url = "http://localhost:3000/?item=" + text;
	$.getJSON(url).then(function (data) {
		// body...
		console.log(data);
		alert(data);
	})
}
