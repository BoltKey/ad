function Enemies() {
	this.effectDur = 50;
	this.fadeColor = "#eeeeee";
	this.effectTime = 0;
	this.stageTime = 0;
	this.squares = [];
	this.currentStage = 0;
	this.square = function(x, y) {
		this.x = x;
		this.y = y;
		this.w = 80;
		this.speed = [0, 0];
		this.accel = 0.03
	}
	this.baseChance = 0.001;
	this.chanceModifier = 0;
	this.chanceChange = 0.0005;
	this.green = function(x, y){
		ret = new enemies.square(x, y);;
		ret.color = "green";
		ret.reward = 8;
		ret.frame = function() {
			this.speed[1] += this.accel;
			this.y += this.speed[1];
			this.x += this.speed[0];
		}
		return ret;
	};
	this.red = function(x, y){
		ret = new enemies.square(x, y);;
		ret.color = "red";
		ret.reward = 15;
		ret.accel = 0.07;
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
		ret.reward = 20;
		//ret.accel = 0.03;
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
	};
	this.cyan = function(x, y) {
		ret = new enemies.square(x, y);
		ret.color = "cyan";
		ret.reward = 40;
		ret.trackCoef = 1;
		ret.frame = function() {
			this.speed[1] += this.accel;
			var c = (canvas.width + 80) / 2;
			this.x += Math.sign((player.x - this.x + 3 * c) % (c * 2) - c) * this.trackCoef;  // black magic
			this.y += this.speed[1];
			if (this.x > canvas.width)
				this.x -= this.w + canvas.width;
			if (this.x < -this.w)
				this.x += canvas.width + this.w;
		}
		return ret;
	};
	this.magenta = function(x, y) {
		ret = new enemies.square(x, y);
		ret.color = "magenta";
		ret.reward = 80;
		ret.w = 250;
		ret.accel = 0.008;
		ret.y = -ret.w;
		ret.frame = function() {
			this.speed[1] += this.accel;
			this.y += this.speed[1];
			if (this.x > canvas.width)
				this.x -= this.w + canvas.width;
			if (this.x < -this.w)
				this.x += canvas.width + this.w;
		}
		return ret;
	};
	this.probs = {};
	this.stages = [
	{chanceChange: 0.00007, baseChance: 0.0002, probs: {green: 1}, time: 1200, comment: "Welcome! Dodge the green squares!"},
	{chanceChange: 0.0005, baseChance: 0.001, probs: {green: 1}, time: 700, comment: "Don't worry, it gets harder"},
	{chanceChange: 0.0008, baseChance: 0.001, probs: {green: 1, red: 5}, time: 700, comment: "Red squares are faster. Watch out!"},
	{chanceChange: 0.001, baseChance: 0.005, probs: {green: 4, red: 2}, time: 700, comment: "Don't forget to buy upgrades!"},
	{chanceChange: 0.002, baseChance: 0.01, probs: {green: 1}, time: 1000, comment: "A lot of greens this time"},
	{chanceChange: 0.002, baseChance: 0.01, probs: {red: 1}, time: 1000, comment: "The same with red. Good luck."},
	
	{chanceChange: 0.0009, baseChance: 0.001, probs: {green: 5, blue: 2}, time: 1000, comment: "Blue squares try to follow you."},
	{chanceChange: 0.0005, baseChance: 0.001, probs: {green: 4, magenta: 1}, time: 2000, comment: "Watch out for new magenta squares!"},
	{chanceChange: 0.0005, baseChance: 0.001, probs: {green: 1, cyan: 2}, time: 500, comment: "A bit more methodical tracking incoming."},
	{chanceChange: 0.0025, baseChance: 0.005, probs: {cyan: 2}, time: 500, comment: "Brace yourself!"},
	{chanceChange: 0.0005, baseChance: 0.001, probs: {green: 1}, time: 500, comment: "They get faster, watch out."},
	];
	this.setStage = function(id) {
		if (this.stages.length <= id) {
			victory();
			return;
		}
		this.stageTime = 0;
		this.currentStage = id;
		selectedStage = id;
		this.probs = this.stages[id].probs;
		this.chanceChange = this.stages[id].chanceChange;
		this.baseChance = this.stages[id].baseChance;
		console.log("stage " + id);
	};
	this.frame = function(multi) {
		for (var i = 0; i < multi; ++i) {
			if (randomGen) {
				if (Math.random() < 0.01 + this.chanceModifier) {
					var args = [Math.floor((Math.random() - (80 / canvas.width)) * (canvas.width + 80)), -80];
					var a;
					var t;
					var rand = Math.random();
					var sum = 0;
					var arr = Object.keys(this.probs);
					for (var i = 0; i < arr.length; ++i) {
						sum += this.probs[arr[i]];
					}
					var i = 0;
					var border = this.probs[arr[i]] / sum;
					while (rand > border) {
						border += this.probs[arr[++i]] / sum;
						if (i + 2 === arr.length)
							throw(err);
					}
					a = new this[arr[i]](...args);
					t = arr[i];
					/*if (Math.random() > 0.2) {
						a = new this.green(...args);
						t = "green"
					}
					else {
						a = new this.blue(...args);
						t = "blue";
					}*/
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
				var s = this.squares[i];
				s.frame();
				if (s.y > canvas.height) {
					this.fadeColor = s.color;
					this.fadeTime = this.effectDur;
					texts.push(new floatText(s.reward, s.x + s.w / 2, canvas.height - 10, s.color));
					score += s.reward;
					money += s.reward;
					if (currMenu === 3)
						updateTree();
					this.squares.splice(i, 1);
					
				}
			}
			this.chanceModifier += this.chanceChange;
		}
		++this.stageTime;
		if (this.stages[this.currentStage].time <= this.stageTime)
			this.setStage(this.currentStage + 1);
	}
	this.draw = function() {
		ctx.fillStyle = this.fadeColor;
		if (this.fadeTime > 0) {
			ctx.globalAlpha = (this.fadeTime / this.effectDur) / 4;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			--this.fadeTime;
			ctx.globalAlpha = 1;
		}
		for (i = 0; i < this.squares.length; ++i) {
			var c = this.squares[i];
			ctx.fillStyle = c.color;
			ctx.fillRect(c.x, c.y, c.w, c.w);
		}
		ctx.fillStyle = "black";
		ctx.fillRect(0, canvas.height, (this.stageTime / this.stages[this.currentStage].time) * canvas.width, - 20);
		ctx.textAlign = "center";
		var fadeTime = 50;
		var sustTime = 100;
		ctx.globalAlpha = Math.max(0, - Math.abs(this.stageTime - sustTime) / fadeTime + sustTime / fadeTime);
		ctx.fillText(this.stages[this.currentStage].comment, canvas.width / 2, canvas.height / 2);
		ctx.fillText("Wave " + (this.currentStage + 1), canvas.width / 2, canvas.height / 2 - 33);
		ctx.globalAlpha = 1;
		
	}
}