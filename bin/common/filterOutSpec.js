module.exports = function filterOutSpec(data) {
    return new Promise((resolve) => {
        console.log(' 🔍\tFiltering out the spec files...');
        resolve(data.filter((d) => !d.includes('.spec.')));
    });
};