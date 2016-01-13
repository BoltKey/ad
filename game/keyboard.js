var keysDown = [];
var lastkd = [];
$(document).keydown(function(ev) { 
	if (keysDown.indexOf(ev.keyCode) === -1) {
		keysDown.push(ev.keyCode); 
		console.log("keys: " + keysDown);
	}
	if ([8, 37, 38, 39, 40].indexOf(ev.keyCode) !== -1) {
		ev.preventDefault();
	}
});
$(document).keyup(function(ev) { keysDown.splice(keysDown.indexOf(ev.keyCode), 1) } );

function checkkeys() {
	for (k of keysDown) {
		if (lastkd.indexOf(k) > -1) {
			keyHold(k);
		}
		else {
			keyPress(k);
		}
	}
}

function keyPress(k, sim) {
	if (!inReplay || sim) {
		if (!inReplay)
			replay.currentReplay.keys.push({k: k, time: timer});

		switch(k) {
			case 37:
			case 39: 
				player.direction(k === 39);
				break;
			case 32:
				player.stop();
				break;
		}
	}
	switch(k) {
		case 82: 
			restart();
			break;
		case 49:
			startReplay(0);
			break;
		case 66:
			startReplay("best");
			break;
	}
}
function keyHold(k) {
	
}