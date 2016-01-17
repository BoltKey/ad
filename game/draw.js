var texts = [];
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillRect(player.x, player.y, player.w, player.w);
	
	enemies.draw();
	player.draw();
	ctx.font = "15px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(Math.floor(currfps),  canvas.width - 30, 20);
	ctx.font = "30px Arial";
	ctx.fillText("Score: " + score, 100, 40);
	ctx.fillText("Money: " + money, 100, 80);
	
	
	for (var i = 0; i < texts.length; ++i) {
		texts[i].draw();
	}
	if (texts.length > 20) {
		texts.splice(0, texts.length - 20);
	}
	if (currMenu === 3) {
		upgrades.drawReqs();
	}
}

function floatText(text, x, y, color) {
	this.time = 0;
	this.text = text;
	this.x = x;
	this.y = y;
	this.color = color;
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.globalAlpha = Math.max(0, 1 - this.time / 70);
		ctx.fillText(this.text, this.x, this.y);
		++this.time;
		this.y -= 0.5;
		ctx.globalAlpha = 1;
	}
}