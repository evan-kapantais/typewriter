# Typewriter

---

## 🗂 Installation

**npm**

```sh
npm i evan-kapantais@typewriter
```

**CDN**

```javascript
// Add this in the HTML head

<script src='cdn.delivery.evan-kapantais@typewriter.pkg'>
```

> It's important to add the package script tag _before_ any subsequent script that is going to be using it. Otherwise, initialisation won't happen before use.

## ✏️ Usage

### Initialising The Typewriter

First, create an instance and initialise the typewriter.

**JavaScript**

```javascript
document.addEventListener('DOMContentLoaded', () => {
	const typewriter = new Typewriter();
	typewriter.init();
});
```

**React**

```javascript
useEffect(() => {
	const typewriter = new Typewriter();
	typewriter.init();
}, []);
```

**Initialising Without Arguments**

The newly created `Typewriter` instance is initialised with a set of default values listed below (before callling `init`).

| Property     | Value | Type   | Description                                                                                                                                                                          |
| ------------ | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| interval     | 60    | number | The time (in milliseconds) between each typed letter                                                                                                                                 |
| delay        | 0     | number | The delay (in milliseconds) before the typewriter starts typing                                                                                                                      |
| intersection | null  | object | An object that, when non-null, initialises the type animation only when the target element is intersection with a defined parent element (or the viewport if no parent is specified) |

> _IMPORTANT_: If an empty object is passed as the value to the `intersection` property, intersection _will be applied_ using the default values of `root: null`, `threshold: 1.0` and `margin: '0px'`.

**Initialising With Arguments**

You can customise your global typewriter values that will be applied to all DOM element that do not specify their own parameters. Initialisation with arguments could look something like this.

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

If provided, the intersection functionality is applied globally to all elements with the `data-type` attribute. This means that the intersection options provided when initialising the typewriter will be the same for all DOM elements and cannot be overridden by individual elements.

The intersection behaviour depends on three values. Below we explore how these work.

**Parent**

The element against which intersection is calculated. In simple terms, this means that if the parent value is something other than `null` (which translates back to the `window`), the text will start being typed when the specified parent element comes into view and _not_ the element itself.

**Threshold**

A floating point number representing the percentage of the element that need to be in the viewport for the animation to start playing. `1.0` means that the animation will not start unting every pixel of the element is visible, `0.5` half and so on.

**Margin**

A string value in the form of `<number>px` that specifies the margin of the parent element after which the typewriter will start typing.

### Applying to DOM Elements

To apply the typewriter effect to DOM elements, you simply need to add to them the attributes `data-type` and `data-type-text`. These are the only two attributes that are required. `data-type` should have no corresponding value, while `data-type-text`'s value should be the string text to type out. If `data-type-text` is present with no value an exception with be thrown.

```html
<h1 data-type data-type-text="Hello World"></h1>
```

### Optional Attributes

To pass in specific values for each affected DOM element, you just need to add the attribute name (as listed in the default values) prefixed with `data-type`. All options specified below are optional.

```html
<h1
	data-type
	data-type-text="Hello World"
	data-type-interval="100"
	data-type-delay="230"
></h1>
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

By adding the `data-type` attribute to the outermost element will result in the enclosing `div` element to be discarded. It is recommended to add the `data-type` attribute only to the elements whose inner text you intend to animate, otherwise this could result in unexpected layout changes.
