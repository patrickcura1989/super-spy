$(function(){
	$("#returnButton").on("click", function(data){
		$(".section1").show();
		$(".section2").hide();
	});

	$("#searchButton").on("click", function(data){
		var text = $("#text").val();
		$(".section1").hide();
		$("#logo").hide();
		$(".loadingState").show();
		
		var url = "http://localhost:3000/search?item=" + text;
		$.getJSON(url).then(function (data) {
			// body...
			console.log(data);
			//alert(data);
			
	
			//{"countdown":{"price":643},"new_world":{"price":743},"pak_n_save":{"price":543}

			var cdPrice = data["countdown"]["price"];
			if(cdPrice == null){
				cd = "Unavailable";
			}
			else{
				cdPrice = (cdPrice/100).toFixed(2);
			}
			var cd = ["countdown",cdPrice];

			var nwPrice = data["new_world"]["price"];
			if(nwPrice == null){
				nw = "Unavailable";
			}
			else{
				nwPrice = (nwPrice/100).toFixed(2);
			}
			var nw = ["New World",nwPrice];

			var pkPrice = data["pak_n_save"]["price"];
			if(pkPrice == null){
				pk = "Unavailable";
			}
			else{
				pkPrice = (pkPrice/100).toFixed(2);
			}
			var pk = ["PakNSave", pkPrice];

			var best = cd;
			var second = nw;
			var third = pk;

			if(third[1] < second[1]){
				var temp= second;
				second = third;
				third = temp;				
			}

			if(second[1] < best[1]){
				var temp= best;
				best = second;
				second = temp;
			} 

			if(third[1]< second[1]){
				var temp = second;
				second = third;
				third = temp;				
			}

			$("#colLeftHeader").text("$" + second[1]);
			$("#colLeftP").text(second[0]);

			$("#colMiddleHeader").text("$" + best[1]);
			$("#colMiddleP").text(best[0]);

			$("#colRightHeader").text("$" + third[1]);
			$("#colRightP").text(third[0]);

			
			//alert(best[0] + "!: " + best[1] + "\n" + second[0] + "!: " + second[1] + "\n" + third[0] + "!: " + third[1]);
			$(".loadingState").hide();
			$(".section2").show();
			$("#logo").show();
		});
	});

});

//$(function() {
//	$("#returnButton").on("click", function(data)){
//		$(".section1").show();
//		$(".section2").hide();
//	});
//});
