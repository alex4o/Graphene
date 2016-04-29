
function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) {
		return c/2*t*t + b
	}
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

function easeInCubic(t, b, c, d) {
	var tc = (t/=d)*t*t;
	return b+c*(tc);
};

function inOutQuintic(t, b, c, d) {
	var ts = (t/=d)*t,
	tc = ts*t;
	return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || ( callback => window.setTimeout(callback, 1000 / 60) )

export default function scrollTo(to, duration, callback) {

	var start = document.scrollingElement.scrollTop,
		change = to - start,
		currentTime = 0,
		increment = 20;

	duration = (typeof(duration) === 'undefined') ? 500 : duration;

	var animateScroll = function() {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out easing function
		var val = inOutQuintic(currentTime, start, change, duration);
		// move the document.body
		document.scrollingElement.scrollTop = val;
		// do the animation unless its over
		if (currentTime < duration) {
			requestAnimationFrame(animateScroll);
		} else {
			if (callback && typeof(callback) === 'function') {
				// the animation is done so lets callback
				callback();
			}
		}
	};
	animateScroll();
}