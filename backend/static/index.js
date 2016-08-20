$(function(){
	$("#searchButton").on("click", function(data){
		//alert("Banana");
		//(".title").hide();
		var text = $("#text").val();

		var url = "http://localhost:3000/search?item=" + text;
		$.getJSON(url).then(function (data) {
			// body...
			console.log(data);
			//alert(data);
			
	
			//{"countdown":{"price":643},"new_world":{"price":743},"pak_n_save":{"price":543}

			var cdPrice = data["countdown"]["price"];
			cdPrice = (cdPrice/100).toFixed(2);
			var nwPrice = data["new_world"]["price"];
			nwPrice = (nwPrice/100).toFixed(2);
			var pkPrice = data["pak_n_save"]["price"];
			pkPrice = (pkPrice/100).toFixed(2);


			var results = "CountDown Price!:  " + cdPrice + "\n" + "New World Price!: " + nwPrice + "\n" + "Pak n Save Price!: "  + pkPrice; //so on and so forth
			alert(results);
		});
	});

});
