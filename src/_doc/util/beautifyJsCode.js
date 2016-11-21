import jsBeautify from 'js-beautify';

const BEAUTIFY_OPTIONS = {
    indent_size: 4
};

const REGEX_WRAPPING_ARROW_FUNC_BEGIN = new RegExp('^\\(\\) => {');
const REGEX_WRAPPING_ARROW_FUNC_END = new RegExp('}$');

const beautifyJsCode = (jsCode) => {
    const stripped = jsCode.toString().trim();
    const withoutWrap = removeWrappingArrowFunction(stripped);
    return jsBeautify(withoutWrap, BEAUTIFY_OPTIONS);
};

export default beautifyJsCode;

function removeWrappingArrowFunction(jsCode) {
    if (jsCode.match(REGEX_WRAPPING_ARROW_FUNC_BEGIN) !== null) {
        return jsCode
            .replace(REGEX_WRAPPING_ARROW_FUNC_BEGIN, '')
            .replace(REGEX_WRAPPING_ARROW_FUNC_END, '')
            .trim();
    }

    return jsCode;
}