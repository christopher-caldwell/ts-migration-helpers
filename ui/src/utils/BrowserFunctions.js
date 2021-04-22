// use custom browser height for the table based on the resolution
function getBrowserHeight() {
    if (typeof window.innerHeight === 'number') {
    // Non-IE
        return window.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
    // IE 6+ in 'standards compliant mode'
        return document.documentElement.clientHeight;
    }
    if (document.body && document.body.clientHeight) {
    // IE 4 compatible
        return document.body.clientHeight;
    }

    return 0;
}

export default getBrowserHeight;
