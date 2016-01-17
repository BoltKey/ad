function Player() {
	this.accel = 0.03;
	this.brakeAvail = false;
	
	this.maxBrakePow = 1000;
	this.brakeCost = 10;
	this.color = "black";
	this.maxSpeed = 2;
	this.init = function() {
		this.brakePow = 500;
		this.x = canvas.width / 2 - this.w / 2;
		this.y = canvas.height - 110;
		this.w = 80;
		this.speed = 0;
		this.right = true;
		this.brake = true;
		
		score = 0;
		timer = 0;
	}
	this.direction = function(right) {
		this.right = right;
		this.brake = false;
	}
	this.turbo = function(right) {
		this.speed += this.accel * 4 * right - this.accel * 2;
	}
	this.stop = function() {
		if (this.brakeAvail)
			this.brake = true;
		//this.speed = 0;
	}
	this.draw = function() {
		// square + symbols
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.w);
		ctx.beginPath();
		ctx.fillStyle = "green";
		if (this.brake) {
			ctx.fillRect(this.x + this.w * 0.3, this.y + this.w * 0.3, this.w * 0.15, this.w * 0.4);
			ctx.fillRect(this.x + this.w * 0.55, this.y + this.w * 0.3, this.w * 0.15, this.w * 0.4);
		}
		else {
			ctx.moveTo(this.x + this.w * (this.right ? 0.3 : 0.7), this.y + this.w * 0.25);
			ctx.lineTo(this.x + this.w * (this.right ? 0.8 : 0.2), this.y + this.w * 0.5);
			ctx.lineTo(this.x + this.w * (this.right ? 0.3 : 0.7), this.y + this.w * 0.75);
			ctx.fill();
		}
		
		// brake pow
		if (this.brakeAvail) {
			var x = 10;
			var y = 50;
			var w = 30;
			var h = 200;
			ctx.strokeStyle = "black";
			ctx.strokeRect(x, y, w, h);
			ctx.fillStyle = "cyan";
			ctx.fillRect(x, y + h, w, - (h * (this.brakePow / this.maxBrakePow)));
		}
	}
	this.frame = function(multi) {
		for (var i = 0; i < multi; ++i) {
			if (inReplay) {
				while (a = replay.getKey()) {
					keyPress(a, true);
				}
			}
			if (this.brake) {
				var change = Math.floor(Math.abs(this.speed) * this.brakeCost);
				if (this.brakePow > change) {
					this.brakePow -= change;
					this.speed *= 0.9;
				}
			}
			else {
				this.speed += this.right * (this.accel * 2) - this.accel;
				this.speed = Math.sign(this.speed) * Math.min(Math.abs(this.speed), this.maxSpeed);
			}
			++this.brakePow;
				this.brakePow = Math.min(this.brakePow, this.maxBrakePow);
			this.x += this.speed;
			if (this.x > canvas.width)
				this.x -= this.w + canvas.width;
			if (this.x < -this.w)
				this.x += canvas.width + this.w;
			//this.color = "black";
			this.checkcols();
			++timer;
		}
	}
	this.die = function() {
		/*this.color = "orange";
		score = 0;
		timer = 0;*/
		if (!inReplay) {
			replay.saveReplay(0);
			if (localStorage.getItem("best") < score) {
				localStorage.setItem("best", score);
				replay.saveReplay("best");
			}
			money = Math.floor(0.8 * money);
		}
		restart(inplay);
		updateTree();
		
	}
	this.checkcols = function() {
		for (var i = 0; i < enemies.squares.length; ++i) {
			var s = enemies.squares[i];
			if (s.x + s.w > this.x && s.x < this.x + this.w && s.y + s.w > this.y && s.y < this.y + this.w) {
				this.die();
			}
		}
	}
	this.init();
}