function UpgradeManager() {
	this.upgrades = {
		"one": {name: "Hello world", cost: 20, onClick: function() {}, x: 350, y: 30, reqs: [], max: 1},
		"max": {name: "Max speed", cost: 150, onClick: function() {player.maxSpeed += 1}, x: 600, y: 70, reqs: [], max: 8},
		"acc": {name: "Acceleration speed", cost: 200, onClick: function() {player.accel += 0.005}, x: 300, y: 180, reqs: [["max", 2], ["one", 1]], max: 10}
	}
	for (u in this.upgrades) 
		this.upgrades[u].bought = 0;
	this.buy = function(key) {
		var u = this.upgrades[key];
		if (money >= u.cost && u.bought < u.max && this.available(key)) {
			money -= u.cost;
			++u.bought;
			u.onClick();
			createTree();
		}
	}
	this.available = function(key) {
		var u = this.upgrades[key];
		for (var i = 0; i < u.reqs.length; ++i) {
			var r = u.reqs[i];
			if (this.upgrades[r[0]].bought < r[1])
				return false;
		}
		return true;
	}
	this.drawReqs = function() {
		var arr = Object.keys(upgrades.upgrades);
		for (var i = 0; i < arr.length; ++i) {
			var u1 = this.upgrades[arr[i]];
			for (var j = 0; j < u1.reqs.length; ++j) {
				u2 = this.upgrades[u1.reqs[j][0]];
				start = [u1.x + 100, u1.y + 20];
				end = [u2.x + 100, u2.y + 20];
				ctx.beginPath();
				ctx.moveTo(...start);
				ctx.lineTo(...end);
				ctx.strokeStyle = '#cccccc';
				ctx.stroke();
				ctx.fillStyle = "black";
				ctx.fillText(u1.reqs[j][1], (start[0] + end[0]) / 2, (start[1] + end[1]) / 2);
			}
		}
	}
}