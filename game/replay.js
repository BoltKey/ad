function ReplayManager() {
	this.wipe = function() {
		this.currentReplay = {squares: [], keys: []};
	}
	this.loadReplay = function(id) {
		this.currentReplay = JSON.parse(localStorage.getItem("replayData" + id));
		this.record = false;
	}
	this.saveReplay = function(id) {
		localStorage.setItem("replayData" + id, JSON.stringify(this.currentReplay));
	}
	this.getSquare = function() {
		if (this.currentReplay.squares.length > 0) {
			if (this.currentReplay.squares[0].time === timer) {
				var a = JSON.parse(JSON.stringify(this.currentReplay.squares[0]));
				this.currentReplay.squares.splice(0, 1);
				return a;
			}
		}
		return false;
	}
	this.getKey = function() {
		if (this.currentReplay.keys.length > 0) {
			if (this.currentReplay.keys[0].time === timer) {
				var a = this.currentReplay.keys[0].k;
				this.currentReplay.keys.splice(0, 1);
				return a;
			}
		}
		return false;
	}
	this.wipe();
}