/* eslint-disable no-extend-native */

// Based on https://stackoverflow.com/a/27329618/1532882
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get() {
            const funcNameRegex = /function\s([^(]{1,})\(/;
            const results = funcNameRegex.exec(this.toString());
            return results && results.length > 1 ? results[1].trim() : '';
        },
        set() {},
    });
}
