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
	this.red = function(x, y){
		ret = new enemies.square(x, y);;
		ret.color = "red";
		ret.accel = 0.03;
		ret.frame = function() {
			this.speed[1] += this.accel;
			this.y += this.speed[1];
			this.x += this.speed[0];
		}
		return ret;
	};
	this.blue = function(x, y) {
		ret = new enemies.square(x, y);
		ret.color = "blue";
		ret.accel = 0.03;
		ret.trackCoef = 0.0003;
		ret.frame = function() {
			this.speed[1] += this.accel;
			var c = (canvas.width + 80) / 2;
			this.speed[0] += ((player.x - this.x + 3 * c) % (c * 2) - c) * this.trackCoef;  // black magic
			this.y += this.speed[1];
			this.x += this.speed[0];
			if (this.x > canvas.width)
				this.x -= this.w + canvas.width;
			if (this.x < -this.w)
				this.x += canvas.width + this.w;
		}
		return ret;
	}
	
	this.frame = function() {
		if (randomGen) {
			if (Math.random() < 0.01 + this.chanceModifier) {
				var args = [Math.floor((Math.random() - (80 / canvas.width)) * (canvas.width + 80)), -80];
				var a;
				var t;
				if (Math.random() > 0.2) {
					a = new this.red(...args);
					t = "red"
				}
				else {
					a = new this.blue(...args);
					t = "blue";
				}
				//var a = new this.red(...args);//(Math.random() < 0.2 ? new this.red(...args) : new this.blue(...args));
				this.squares.push(a);
				replay.currentReplay.squares.push({x: a.x, time: timer, type: t});
				this.chanceModifier = 0;
			}
		}
		else {
			var a = replay.getSquare();
			if (a) {
				this.squares.push(new this[a.type](a.x, -80));
			}
		}
		for (i = 0; i < this.squares.length; ++i) {
			this.squares[i].frame();
			if (this.squares[i].y > canvas.height) {
				this.squares.splice(i, 1);
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