

function click() {
	
}

function isMouseIn(obj) {
	return (divPos.y > obj.y && 
	divPos.y < obj.y + ((typeof(obj.h) !== "undefined") ? obj.h : obj.w) &&
	divPos.x > obj.x &&
	divPos.x < obj.x + obj.w);
}