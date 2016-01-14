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
<<<<<<< HEAD
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
		ret.accel = 0.08;
		ret.frame = function() {
			this.speed[1] += this.accel;
			this.y += this.speed[1];
			this.x += this.speed[0];
		}
		return ret;
=======
	this.red = this.square;
	this.red.prototype = new this.square();
	this.red.prototype.color = "red";
	this.red.prototype.accel = 0.03;
	this.red.prototype.frame = function() {
		this.speed[1] += this.accel;
		this.y += this.speed[1];
		this.x += this.speed[0];
>>>>>>> 1394d52197f2ff875998405c44465bb52c79bfbf
	}
	
	this.frame = function() {
		if (randomGen) {
			if (Math.random() < 0.01 + this.chanceModifier) {
<<<<<<< HEAD
				var args = [Math.floor((Math.random() - (80 / canvas.width)) * (canvas.width + 80)), -80];
				var a;
				if (Math.random() > 0.2)
					a = new this.red(...args);
				else 
					a = new this.blue(...args);
				//var a = new this.red(...args);//(Math.random() < 0.2 ? new this.red(...args) : new this.blue(...args));
=======
				var a = new this.red(Math.floor((Math.random() - (80 / canvas.width)) * (canvas.width + 80)), -80);
>>>>>>> 1394d52197f2ff875998405c44465bb52c79bfbf
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
<<<<<<< HEAD
				this.squares.splice(i, 1);
=======
				this.squares.splice(0, 1);
>>>>>>> 1394d52197f2ff875998405c44465bb52c79bfbf
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