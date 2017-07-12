document.addEventListener("keydown", function(event){
	if(event.keyCode == 9){
		var div = $("#page-desc");

		if(!(div.hasClass("fade-in") || div.hasClass("fade-out"))){ // make sure there is no animation in progress
			if(div.hasClass("hidden")){
				div.addClass("fade-in");
				div.removeClass("hidden");
			}else{
				div.addClass("fade-out");
			}
		}

		event.preventDefault();
	}
});

window.addEventListener("load", function(event){
	var descDiv = document.createElement("div");

	descDiv.id = "page-desc";
	$(descDiv).addClass("well");
	$(descDiv).addClass("hidden");

	descDiv.addEventListener("animationend", function(event){
		var target = $(event.target);
		if(target.hasClass("fade-in")){
			target.removeClass("fade-in");
		}else{
			target.removeClass("fade-out");
			target.addClass("hidden");
		}
	});

	var desc = "This is the homepage of my project/portfolio page.";
	var ghLink = "https://github.com/wesserboy/wesserboy.github.io";

	var template = '<h3>Description</h3><p>DESC</p><a href="LINK" target="_blank"><i class="fa fa-github"></i> View source on GitHub</a>';

	descDiv.innerHTML = template.replace("DESC", desc).replace("LINK", ghLink);

	document.body.appendChild(descDiv);
});