//TODO ensure typeText is not missing arguments, especially typeText
//TODO type check
//TODO support multiline
//TODO handle once

function createPre() {
	const pre = document.createElement('pre');
	pre.style.fontFamily = 'inherit';

	return pre;
}

function isNumber(value) {
	if (isNaN(Number(value))) {
		throw new Error(value + ' should be of type: number');
	} else {
		return true;
	}
}

class Typewriter {
	constructor() {
		this.interval = 50;
		this.delay = 0;
		this.intersection = null;

		this.handleIntersect = this.handleIntersect.bind(this);
	}

	init(options) {
		const items = document.querySelectorAll('[data-type]');

		items.forEach((item) => {
			try {
				if (item.innerText === '') {
					throw `No text provided at: ${item.parentElement.tagName.toLowerCase()} > ${item.tagName.toLowerCase()}`;
				}

				item.setAttribute('data-type-text', item.innerText);
				item.innerHTML = '';
			} catch (error) {
				console.error(error);
			}
		});

		this.items = items;

		if (options) {
			this.interval =
				options.interval && isNumber(options.interval)
					? Number(options.interval)
					: this.interval;

			this.delay =
				options.delay && isNumber(options.delay)
					? Number(options.delay)
					: this.delay;

			this.intersection = options.intersection
				? {
						root: options.intersection.parent
							? document.querySelector(options.intersection.parent)
							: null,
						threshold: options.intersection.threshold || 1.0,
						margin: `${
							options.intersection.margin ? options.intersection.margin : 0
						}px`,
				  }
				: null;
		}

		this.attemptType();
	}

	attemptType() {
		const hasIntersectionOption =
			this.intersection && Object.keys(this.intersection).length > 0;

		hasIntersectionOption
			? this.typeWhenIntersecting()
			: this.typeImmediately();
	}

	handleIntersect(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				try {
					this.typeText(entry.target);
					observer.unobserve(entry.target);
				} catch (error) {
					console.error(error);
				}
			}
		});
	}

	typeWhenIntersecting() {
		this.observer = new IntersectionObserver(
			this.handleIntersect,
			this.intersection
		);

		this.items.forEach((item) => this.observer.observe(item));
	}

	typeImmediately() {
		this.items.forEach((item) => {
			try {
				this.typeText(item);
			} catch (error) {
				console.error(error);
			}
		});
	}

	typeText(item) {
		const { typeText, typeInterval, typeDelay } = item.dataset;

		if (!typeText)
			throw `Typewriter text should be provided at: ${item.parentElement.tagName.toLowerCase()} > ${item.tagName.toLowerCase()}`;

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
