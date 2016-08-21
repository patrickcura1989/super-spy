$(function(){
	$("#returnButton").on("click", function(data){
		$(".section1").show();
		$(".section2").hide();
		$(".titleSecondPage").text("The cheapest results are coming!");
	});

	$("#searchButton").on("click", function(data){
		var text = $("#text").val();
		$(".section1").hide();
		$(".loadingState").show();

		var textConverted = text.replace(" ","%20");

		var url = "http://localhost:3000/search?item=" + textConverted;
		$.getJSON(url).then(function (data) {
			// body...
			console.log(data);
			//alert(data);


			//{"countdown":{"price":643},"new_world":{"price":743},"pak_n_save":{"price":543}

			var cdPrice = data["countdown"]["price"];
			var cd_val = data["countdown"]["price"];

			if(cdPrice== undefined || cdPrice == null){
				console.log(cdPrice);
				cdPrice = "Unavailable";
				console.log(cd);
				cd_val = 0;
			}
			else{
				cdPrice = "$"+(cdPrice/100).toFixed(2);
			}
			var cd = ["countdown",cdPrice, cd_val];

			var nwPrice = data["new_world"]["price"];
			var nw_val = data["new_world"]["price"];

			if(nwPrice == null){
				nwPrice = "Unavailable";
				nw_val = 0;
			}
			else{
				nwPrice = "$"+(nwPrice/100).toFixed(2);
			}
			var nw = ["New World",nwPrice, nw_val];

			var pkPrice = data["pak_n_save"]["price"];
			var pk_val = data["pak_n_save"]["price"];

			if(pkPrice == null){
				pkPrice = "Unavailable";
				pk_val = 0;
			}
			else{
				pkPrice = "$"+(pkPrice/100).toFixed(2);
			}
			var pk = ["PakNSave", pkPrice, pk_val];

			var best = cd;
			var second = nw;
			var third = pk;

			if(third[2] < second[2]){
				var temp= second;
				second = third;
				third = temp;
			}

			if(second[2] < best[2]){
				var temp= best;
				best = second;
				second = temp;
			}

			if(third[2]< second[2]){
				var temp = second;
				second = third;
				third = temp;
			}

			$("#colLeftHeader").text(second[1]);
			//$("#colLeftP").text(second[0]);
			$("#colLeftLogo").attr("src",second[0] + ".png");

			$("#colMiddleHeader").text(best[1]);
			$("#colMiddleLogo").attr("src",best[0] + ".png");
			//$("#colMiddleP").text(best[0]);

			$("#colRightHeader").text(third[1]);
			$("#colRightLogo").attr("src",third[0] + ".png");
			//$("#colRightP").text(third[0]);


			var text = $("#text").val();
			$(".titleSecondPage").text("Here are your results for "+ text)

			$(".section2").show();
			$(".loadingState").hide();
		});
	});

});
