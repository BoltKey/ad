var then = Date.now();
var fps = 60;
var fpshistory = [];
var interval = 1000/fps;

function mainloop() {
	requestAnimationFrame(mainloop);
	now = Date.now();
	delta = now - then;
	if (delta > interval) {
		// fps calculation
		fpshistory.push(1000/delta);
		if (fpshistory.length > 20) {
			fpshistory.shift();
		}
		var tot = 0;
		for (f of fpshistory) {
			tot += f;
		}
		currfps = tot / fpshistory.length;
		then = now - (delta % interval);
		
		if (mouseDown && !lastmd) {
			cl = true;
			click();
		}
		else {
			cl = false;
		}
		checkkeys();
		if (inplay) {
			player.frame();
			enemies.frame();
		}
		lastmd = mouseDown;
		lastkd = JSON.parse(JSON.stringify(keysDown));
		draw();
	}
}