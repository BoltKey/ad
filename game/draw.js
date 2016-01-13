function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillRect(player.x, player.y, player.w, player.w);
	player.draw();
	enemies.draw();
	ctx.font = "12px Arial";
	ctx.fillStyle = "green";
	ctx.fillText(score, 20, 20);
	ctx.fillText(Math.floor(currfps * 10) / 10, canvas.width - 30, 20);
}