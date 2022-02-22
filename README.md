# Typewriter

![npm](https://img.shields.io/npm/v/ek-typewriter) ![npm bundle size](https://img.shields.io/bundlephobia/min/ek-typewriter)

---

## 🗂 Installation

**npm**

```sh
npm i ek-typewriter
```

**CDN**

```javascript
// Add this in the html head

<script src='https://unpkg.com/ek-typewriter@1.0.0/typewriter.js'></script>
```

> It's important to add the package script tag _before_ any subsequent script that is going to be using it. Otherwise, initialisation won't happen before use.

## ✏️ Usage

### Initialising The Typewriter

First, create an instance and initialise the typewriter.

**JavaScript**

Add it in your main `.js` file.

```javascript
document.addEventListener('DOMContentLoaded', () => {
	const typewriter = new Typewriter();
	typewriter.init();
});
```

Or in an HTML `script` tag before your closing `body` tag.

```html
<head>
	...
</head>
<body>
	...
	<script>
		const typewriter = new Typewriter();
		typewriter.init();
	</script>
</body>
```

**React**

```javascript
useEffect(() => {
	const typewriter = new Typewriter();
	typewriter.init();
}, []);
```

**Initialising Without Arguments**

The newly created `Typewriter` instance is initialised with a set of default values listed below (before callling its `init` method).

| Property     | Default Value                                 | Type   | Description                                                                                                                                                                           |
| ------------ | --------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| interval     | 50                                            | number | The time interval (in milliseconds) between each typed letter.                                                                                                                        |
| delay        | 0                                             | number | The delay (in milliseconds) before the typewriter starts typing.                                                                                                                      |
| intersection | null (intersection functionality not applied) | object | An object that, when non-null, initialises the type animation only when the target element is intersection with a defined parent element (or the viewport if no parent is specified). |

> _IMPORTANT_: If an empty object is passed as the value of the `intersection` property, intersection _will be applied_ using the default values of `root: null`, `threshold: 1.0` and `margin: '0px'`.

**Initialising With Arguments**

You can customise your global typewriter values that will be applied to all DOM elements that do not specify their own parameters. Initialisation with arguments could look something like this.

```javascript
const typewriter = new Typewriter();

const options = {
	interval: 100,
	delay: 500,
	intersection: {
		parent: '#section',
		threshold: 1.0,
		margin: '50px',
	},
};

typewriter.init(options);
```

### How Intersection Works

If provided, the intersection functionality is applied globally to all elements with the `data-type` attribute. The intersection options provided when initialising the typewriter will be the same for all DOM elements and cannot be overridden by individual elements.

The intersection behaviour depends on three values. Below we explore how these work.

**Parent**

The element against which intersection is calculated. In simple terms, this means that if the parent value is something other than `null` (which translates back to the `window`), the text will start being typed when the specified parent element comes into view and _not_ the element itself.

**Threshold**

A floating point number representing the percentage of the element that needs to be visible in the viewport (depending on the `parent` option) for the animation to start playing. `1.0` means that the animation will not start until every pixel of the element is visible, `0.5` half of the element and so on.

**Margin**

A string value in the form of `<number>px` that specifies the margin of the parent element after which the typewriter will start typing.

### Applying to DOM Elements

To apply the typewriter effect to a DOM element, you simply need to add the `data-type` attribute (with no value) to it. The typewriter will animate the element's inner text. If no text is present an exception with be thrown.

```html
<h1 data-type>Hello World</h1>
```

### Optional Attributes

To pass in specific values for each affected DOM element, you just need to add the attribute name (as listed in the default values) prefixed with `data-type`. All options specified below are optional.

```html
<h1 data-type data-type-interval="100" data-type-delay="230"></h1>
```

### Nesting

Consider the following scenario.

```html
<h1 data-type>
	<div>
		<p>this is some example paragraph text</p>
	</div>
</h1>
```

Adding the `data-type` attribute to the outermost element will result in the enclosing `div` element to be discarded. To prevent any unexpected layout changes, adding the `data-type` attribute only to those elements whose inner text you intend to animate is strongly encouraged.
