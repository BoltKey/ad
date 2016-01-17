var then = Date.now();
var fps = 60;
var fpshistory = [];
var interval = 1000/fps;

function mainloop() {
	//while (Date.now() - then < interval) {};  // because FUCK YOUR CPU
	requestAnimationFrame(mainloop);
	now = Date.now();
	delta = now - then;
	then = Date.now();
	
	//if (delta > interval) {
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
			player.frame(1);
			enemies.frame(1);
		}
		lastmd = mouseDown;
		lastkd = JSON.parse(JSON.stringify(keysDown));
		draw();
	//}
}