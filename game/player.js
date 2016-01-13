function Player() {
	this.init = function() {
		this.x = 100;
		this.y = canvas.height - 100;
		this.w = 80;
		this.speed = 0;
		this.accel = 0.03;
		this.right = true;
		this.brake = false;
		this.color = "black";
		score = 0;
		timer = 0;
	}
	this.direction = function(right) {
		this.right = right;
		this.brake = false;
	}
	this.stop = function() {
		this.brake = true;
		//this.speed = 0;
	}
	this.draw = function() {
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
	}
	this.frame = function() {
		if (inReplay) {
			var a = replay.getKey();
			if (a) {
				keyPress(a, true);
			}
		}
		if (this.brake) { 
			this.speed *= 0.9;
		}
		else {
			this.speed += this.right * (this.accel * 2) - this.accel;
		}
		this.x += this.speed;
		if (this.x > canvas.width)
			this.x -= this.w + canvas.width;
        if (this.x < -this.w)
			this.x += canvas.width + this.w;
		this.color = "black";
		this.checkcols();
		++score;
		++timer;
		
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
		}
		restart();
		
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