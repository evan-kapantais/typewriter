# Typewriter

### 🗂 Installation

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

### ✏️ Usage

**Initialising The Typewriter**

First, create an instance and initialise the typewriter.

```javascript
const typewriter = new Typewriter();

typewriter.init();
```

**Initialising Without Arguments**

The newly created `Typewriter` instance is initialised with a set of default values listed below (before callling `init`).

| Property     | Value | Type   | Description                                                                                                                                                                          |
| ------------ | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Interval     | 60    | number | The time (in milliseconds) between each typed letter                                                                                                                                 |
| Delay        | 0     | number | The delay (in milliseconds) before the typewriter starts typing                                                                                                                      |
| Intersection | null  | object | An object that, when non-null, initialises the type animation only when the target element is intersection with a defined parent element (or the viewport if no parent is specified) |

> _IMPORTANT_: If an empty object is passed as the value to the `intersection` property, intersection _will be applied_ using the default values of `root: null`, `threshold: 1.0` and `margin: '0px'`.

**Initialising With Arguments**

You can customise your global typewriter values that will be applied to all DOM element that do not specify their own parameters. Initialisation with arguments could look something like this.

```javascript
const typewriter = new Typewriter();

const options = {
	interval: 100,
	delay: 500,
	intersection: {
		root: document.querySelector('#section'),
		threshold: 1.0,
		margin: '50px',
	},
};

typewriter.init(options);
```

**Applying to DOM Elements**

To apply the typewriter effect to DOM elements, you simply need to add to them the attributes `data-type` and `data-type-text`. These are the only two attributes that are required. `data-type` should have no corresponding value, while `data-type-text`'s value should be the string text to type out. If `data-type-text` is present with no value an exception with be thrown.

```html
<h1 data-type data-type-text="Hello World"></h1>
```

**Optional Attributes**

To pass in specific values for each affected DOM element, you just need to add the property attribute (as listed in the default values) prefixed with `data-type`. All options specified below are optional.

```html
<h1
	data-type
	data-type-text="Hello World"
	data-type-interval="100"
	data-type-delay="230"
	data-type-intersection-parent="#container"
	data-type-intersection-threshold="0.8"
	data-type-intersection-margin="10px"
></h1>
```
