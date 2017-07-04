const replacePlaceholders = ({msg, placeholders = {}}) => {
    const placeholderNames = Object.getOwnPropertyNames(placeholders);

    return placeholderNames.reduce((prevMsgResult, placeholderName) => {
        const placeholderValue = placeholders[placeholderName];

        const regex = new RegExp(`{${placeholderName}}`, 'g');

        return prevMsgResult.replace(regex, placeholderValue);
    }, msg);
};

export default replacePlaceholders;