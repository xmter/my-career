
const {getOptions} = require('loader-utils');
module.exports = function loader(SourceCode) {
    // console.log(111, SourceCode);
    const options = getOptions(this);
    console.log(111, 'a');
    console.log(111, options);
    return SourceCode
}