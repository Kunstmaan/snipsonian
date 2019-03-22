module.exports = {
    NAME_ATTRIBUTE: /@name\('(.*)'\)/,
    SIGNATURE_ATTRIBUTE: /@signature\('(.*)'\)/,
    SIGNATURE_FUNCTION: (snippetName) => new RegExp(`function ${snippetName}((.*)) {`),
    SIGNATURE_CONST: (snippetName) => new RegExp(`const ${snippetName} = ((.*)) =>`)
};