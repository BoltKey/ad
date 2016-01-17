var offset;
var divPos;
var lastDivPos;
var lastmd;
var mouseDown;
var inplay = false;
var score;
var money = 0;
var timer;
var randomGen = true;
var inReplay = false;
var selectedStage = 0;
var sounds = {};
sounds.music = new Audio("sounds/music.mp3");
sounds.music.volume = 0.1;
sounds.music.loop = true;

function main() {
	sounds.music.play();
	
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
	canvas.onclick = escBack;
	buttons();
	upgrades = new UpgradeManager();
	player = new Player();
	navigateMenu(0);
	restart(false);
	mainloop();
	restart(false);  // don't ask....
}

function restart(play) {
	player.init();
	enemies = new Enemies();
	enemies.setStage(selectedStage);
	inReplay = false;
	randomGen = true;
	inplay = play;
	replay.wipe();
}

function startReplay(id) {
	replay.loadReplay(id);
	randomGen = false;
	inReplay = true;
	player.init();
	enemies = new Enemies();
}

function escBack() {
	if (inplay)
		navigateMenu(2);
	else
		navigateMenu(0);
}

function victory() {
	
}

function mute() {
	sounds.music.volume = Math.abs(sounds.music.volume - 0.1);
}