var currMenu = 0;
function buttons() { 
	menubuttons = [
		{x: canvas.width / 2 - 150, y: 250, w: 300, display: "Play", menu: [0], onClick: "navigateMenu(2); restart(true)", type: "primary"},
		
		{x: 10, y: 90, w: 180, display: "Upgrades", menu: [2], onClick: "navigateMenu(3); createTree()", type: "primary"},
		
		{x: canvas.width / 2 - 150, y: canvas.height - 100, w: 300, display: "Play again", menu: [5], onClick: "navigateMenu(2); start()"},
		
		{x: canvas.width / 2 - 150, y: canvas.height - 50, w: 300, display: "Back", menu: [3], onClick: "escBack()", type: "primary"},
		{x: canvas.width - 50, y: 30, w: 40, display: "Mute", menu: [0, 1, 2, 3], onClick: "mute()", type: "primary"},
	];}

function navigateMenu(id) {
	$("button").remove();
	$(".del").remove();
	currMenu = id;
	showResult = false;
	for (b of menubuttons) {
		if (b.menu.indexOf(id) > -1) {
			var a = $("<button type='button' class='button button-" + b.type + " button-medium button-box' onclick='" + b.onClick + "'>" + b.display + "</button>")
			a.css("position", "fixed");
			a.css("left", b.x);
			a.css("top", b.y);
			a.css("width", b.w);
			$("body").append(a);
		}
	}
}

function createTree() {
	$(".del").remove();
	var arr = Object.keys(upgrades.upgrades);
	for (var i = 0; i < arr.length; ++i) {
		var u = upgrades.upgrades[arr[i]];
		var a;
		var color;
		a = $("<div class='del'>" + 
				"<button id='upbut" + i + "' class='button button-medium button-box' onclick='upgrades.buy(\"" + arr[i] + "\")'>" + 
				u.name + " (" + u.bought + "/" + u.max + ")</button>" + 
				"<div>Cost: " + u.cost + "</div></div>");
		if (!upgrades.available(arr[i]))
			a.css("opacity", "0.3");
		a.css("position", "fixed");
		a.css("left", u.x);
		a.css("top", u.y);
		a.css("width", 300);
		$("body").append(a);
	}
	updateTree();
}
function updateTree() {
	var arr = Object.keys(upgrades.upgrades);
	for (var i = 0; i < arr.length; ++i) {
		var u = upgrades.upgrades[arr[i]];
		var a = $("#upbut" + i);
		if (upgrades.available(arr[i]))
			a.css("opacity", "1");
		else
			a.css("opacity", "0.3");
		a.removeClass("button-action button-royal button-caution");
		var color;
		if (u.bought === u.max)
			color = "action"
		else 
			if (u.cost > money)
				color = "caution";
			else 
				color = "highlight";
		a.addClass("button-" + color);
	}
}