module.exports = function dedupeArray(arrArg) {
    return arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
}