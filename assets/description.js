// For desktop machines, pressing the tab key will trigger the description box
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

// For mobile devices, sliding from/to the left will trigger the description box

var orgX; // original x pos of the touch
var orgY; // original y pos of the touch


document.addEventListener("touchstart", function(event){
	if(event.touches.length == 1){
		orgX = event.touches[0].pageX;
		orgY = event.touches[0].pageY;
	}else{ // if there are multiple touches, cancel the drag
		orgX = null;
		orgY = null;
	}
});

document.addEventListener("touchmove", function(event){
	if(event.touches.length == 1 && (orgX || orgX == 0) && (orgY || orgY == 0)){
		if(orgX <= window.innerWidth / 4){
			event.preventDefault();
		}
	}
}, {"passive": false});

document.addEventListener("touchend", function(event){
	if(event.touches.length == 0 && (orgX || orgX == 0) && (orgY || orgY == 0)){ // validate the situation
		if(orgX <= window.innerWidth / 4){ // make sure the touch started on the left 1/4 of the screen
			var div = $("#page-desc");
			var touch = event.changedTouches[0];

			if(!(div.hasClass("fade-in") || div.hasClass("fade-out"))){ // make sure there is no animation in progress
				if(div.hasClass("hidden") && touch.pageX - orgX > 0){
					div.addClass("fade-in");
					div.removeClass("hidden");
				}else if(!div.hasClass("hidden") && touch.pageX - orgX < 0){
					div.addClass("fade-out");
				}
			}
		}
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