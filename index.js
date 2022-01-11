/**
 * this converts hex to rgba
 * @param {string} hex 
 * @returns {object} rgba
 * @example
 * hexToRGBA('#ff0000') // {r: 255, g: 0, b: 0, a: 255}
 * hexToRGBA('ff0000') // {r: 255, g: 0, b: 0, a: 255}
 * hexToRGBA('#ff0000ff') // {r: 255, g: 0, b: 0, a: 255}
 * hexToRGBA('#ff0000ae') // {r: 255, g: 0, b: 0, a: 174}
 * hexToRGBA('#ff00ffae') // {r: 255, g: 0, b: 255, a: 174}
 * hexToRGBA('#f0f') //  {r: 255, g: 0, b: 255, a: 255 }
 * hexToRGBA('asdasdasd') // null
 */
function hexToRGBA(hex, defaultAlpha = 255) {
    if (!hex) return null;
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);
    var a = parseInt(hex.slice(6, 8), 16) || defaultAlpha;
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null;
    return { r, g, b, a };
}
/**
 * this converts rgba to hex
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @param {number} a
 * @returns {string} hex
 * @example
 * rgbaToHEX(255, 0, 0) // '#ff0000'
 * rgbaToHEX(255, 0, 0, 123) // '#ff0000ae'
 * rgbaToHEX(255, 0, 0, 0) // '#ff000000'
 * rgbaToHEX(0, 255, 0) // '#00ff00'
 * rgbaToHEX() // null
 */
function rgbaToHEX(r, g, b, a) {
    // if () return null;
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = a.toString(16);
    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;
    if (a.length === 1) a = '0' + a;
    return '#' + r + g + b + a;
}

class NearestColor {
    constructor(defaultAlpha = 255) {
        this.pallette = [];
        this.defaultAlpha = defaultAlpha;
    }
    /**
     * this sets the pallette from an object array
     * @param {object[]} rgba 
     * @returns {NearestColor} this
     * @example
     * .fromRGBA([
     * { r: 255, g: 0, b: 255, a: 255 }, // purple
     * { r: 255, g: 255, b: 255, },// white
     * ]).pallette // > { r: 255, g: 0, b: 255, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }
     */
    fromRGBA(rgba) {
        // if a is not defined, set it to defaultAlpha
        for (let i in rgba) {
            rgba[i].a = rgba[i].a || this.defaultAlpha;
        }
        this.pallette.push(...rgba);
        return this;
    }
    /**
     * this adds to the pallette from a hex string array
     * @param {string[]} hex 
     * @returns {NearestColor} this
     * @example
     * .fromHex([
     * '#ff0000',
     * '#ff00ffa3',
     * '#f0f'
     * ]).pallette // > { r: 255, g: 0, b: 255, a: 255 }, { r: 255, g: 0, b: 255, a: 163 }, { r: 255, g: 0, b: 255, a: 255 }
     */
    fromHEX(hex) {
        for (let i in hex) {
            let rgba = hexToRGBA(hex[i], this.defaultAlpha);
            if (rgba) this.pallette.push(rgba);
        }
        return this;
    }
    /**
    * this returns the nearest color that maches the given rgba
    * @param {object | string} rgba 
    * @param {boolean} ishex if true, it will return the hex string instead of rgba
    * @returns {object | string} rgba | hex
    */
    nearest(rgba, ishex = false) {
        if (typeof rgba === 'string') {
            rgba = hexToRGBA(rgba, this.defaultAlpha);
            if (!rgba) return null;
        }
        var lowestDistance = Infinity;
        var lowest
        for (let i in this.pallette) {
            var color = this.pallette[i];
            var distance = Math.sqrt(
                Math.pow(rgba.r - color.r, 2) +
                Math.pow(rgba.g - color.g, 2) +
                Math.pow(rgba.b - color.b, 2) +
                Math.pow(rgba.a - color.a, 2)
            );
            if (distance < lowestDistance) {
                lowestDistance = distance;
                lowest = i;
            }
        }
        var res = this.pallette[lowest];
        if (!ishex) return res;
        var hex = rgbaToHEX(res.r, res.g, res.b, res.a);
        // if the alpha is 255, return the hex without the alpha
        if (res.a !== 255) return hex;
        return hex.slice(0, hex.length - 2);
    }
}

module.exports = NearestColor;