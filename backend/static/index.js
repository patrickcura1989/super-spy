$(function(){
	$("#searchButton").on("click", function(){
		//alert("Banana");
		//(".title").hide();
		var text = $("#text").val();

		//alert(text);
		//get the text out of the box

		var url = "http://localhost:3000/search?item=" + text;
		$.getJSON(url).then(function (data) {
			// body...
			console.log(data);
			//alert(data);
		});
	});
});
