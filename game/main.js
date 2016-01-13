var offset;
var divPos;
var lastDivPos;
var lastmd;
var mouseDown;
var inplay = true;
var score;
var timer;
var randomGen = true;
var inReplay = false;

function main() {
	offset = $("#game").offset();
	$(document).mousemove(function(e){
		divPos = {
			x: e.pageX - offset.top,
			y: e.pageY - offset.left
			}
		})
		lastDivPos = {x: 0, y: 0};
		lastmd = 0;
		mouseDown = 0;
		document.body.onmousedown = function() { 
			++mouseDown; 
			if (mouseDown === -1 || mouseDown === 2) mouseDown = 1; 
		}
		document.body.onmouseup = function() { 
			--mouseDown;
	}
	replay = new ReplayManager();
	restart();
	mainloop();
}

function restart() {
	player = new Player();
	enemies = new Enemies();
	inReplay = false;
	randomGen = true;
	replay.wipe();
}

function startReplay(id) {
	replay.loadReplay(id);
	randomGen = false;
	inReplay = true;
	player = new Player();
	enemies = new Enemies();
}