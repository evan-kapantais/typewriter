function createPre() {
	const pre = document.createElement('pre');
	pre.style.fontFamily = 'inherit';

	return pre;
}

class Typewriter {
	constructor() {
		this.handleIntersect = this.handleIntersect.bind(this);
		this.interval = 50;
		this.delay = 0;
		this.intersect = false;
	}

	init(options) {
		const items = document.querySelectorAll('[data-type]');
		this.items = items;

		this.interval = options.interval || this.interval;
		this.delay = options.delay || this.delay;
		this.intersect = options.intersect || this.intersect;

		this.attemptType();
	}

	attemptType() {
		this.intersect ? this.typeWhenIntersecting() : this.typeImmediately();
	}

	handleIntersect(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				this.typeText(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}

	typeWhenIntersecting() {
		const options = {
			root: null,
			threshold: 1.0,
			margin: '0px',
		};

		this.observer = new IntersectionObserver(this.handleIntersect, options);
		this.items.forEach((item) => this.observer.observe(item));
	}

	typeImmediately() {
		this.items.forEach((item) => this.typeText(item));
	}

	typeText(item) {
		const { typeText, typeInterval, typeDelay } = item.dataset;

		let interval = null;
		let index = 0;

		const pre = createPre();
		item.appendChild(pre);

		setTimeout(() => {
			interval = setInterval(() => {
				if (index < typeText.length) {
					pre.innerText += typeText[index];
					index++;
				} else {
					clearInterval(interval);
				}
			}, typeInterval || this.interval);
		}, typeDelay || this.delay);
	}
}
