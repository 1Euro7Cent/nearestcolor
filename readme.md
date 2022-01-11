## Info

this gets the nearest color from a given color palette

## Installation

```
npm install nearest-rgba
```

## Usage

```js
const NearestColor = require("nearest-rgba");

var nc = new NearestColor();
nc.fromHEX([
  // you can addd them like this with hex strings
  "#ff0000", // red
  "#ff00ff", // purple
  "#0f0", // green
  "#00ffff", // cyan
  "#0000ff", // blue
  "#0000ff50", // blue with less alpha
  "#000000", // black
]);
nc.fromRGBA([
  // or you can add them like this with rgba objects
  { r: 255, g: 255, b: 0 }, // yellow
  { r: 255, g: 255, b: 255, a: 123 }, // white
]);
console.log(nc.nearest("#00000000")); // { r: 0, g: 0, b: 0, a: 255 }
console.log(nc.nearest({ r: 0, g: 255, b: 0, a: 123 })); // { r: 0, g: 255, b: 0, a: 255 }
console.log(nc.nearest("#ff00aa", true)); // #ff00ff
console.log(nc.nearest("#0000ff40", true)); // #0000ff50
```
