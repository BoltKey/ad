function Enemies() {
	this.squares = [];
	this.square = function(x, y) {
		this.x = x;
		this.y = y;
		this.w = 80;
		this.speed = [0, 0];
	}
	this.baseChance = 0.001;
	this.chanceModifier = 0;
	this.chanceChange = function() {return Math.sqrt(score) * 0.00005};
	this.red = this.square;
	this.red.prototype = new this.square();
	this.red.prototype.color = "red";
	this.red.prototype.accel = 0.03;
	this.red.prototype.frame = function() {
		this.speed[1] += this.accel;
		this.y += this.speed[1];
		this.x += this.speed[0];
	}
	
	this.frame = function() {
		if (randomGen) {
			if (Math.random() < 0.01 + this.chanceModifier) {
				var a = new this.red(Math.floor((Math.random() - (80 / canvas.width)) * (canvas.width + 80)), -80);
				this.squares.push(a);
				replay.currentReplay.squares.push({x: a.x, time: timer, type: "red"});
				this.chanceModifier = 0;
			}
		}
		else {
			var a = replay.getSquare();
			if (a) {
				this.squares.push(new this.red(a.x, -80));
			}
		}
		for (i = 0; i < this.squares.length; ++i) {
			this.squares[i].frame();
			if (this.squares[i].y > canvas.height) {
				this.squares.splice(0, 1);
			}
		}
		this.chanceModifier += this.chanceChange();
	}
	this.draw = function() {
		for (i = 0; i < this.squares.length; ++i) {
			var c = this.squares[i];
			ctx.fillStyle = c.color;
			ctx.fillRect(c.x, c.y, c.w, c.w);
		}
	}
}