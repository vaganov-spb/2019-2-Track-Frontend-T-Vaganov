export function scrollTop() {
	const windowSize = document.getElementById('result');
	windowSize.scrollTop = windowSize.scrollHeight - 400;
}

export function preventDefaults(e){
	e.preventDefault();
	e.stopPropagation();
}

export function setTime() {
	const time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	if (Number(time.getMinutes()) < 10) {
		minutes = `0${String(time.getMinutes())}`;
	}
	if (time.getHours() < 10) {
		hours = `0${time.getHours()}`;
	}
	return `${hours}:${minutes}`;
}
