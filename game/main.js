var offset;
var divPos;
var lastDivPos;
var lastmd;
var mouseDown;
var inplay = true;
var score;
var randomGen = true;
var replay = false;

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
	
	player = new Player();
	enemies = new Enemies();
	
	mainloop();
}