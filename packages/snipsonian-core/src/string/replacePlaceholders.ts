export default function replacePlaceholders({ msg, placeholders = {} }: { msg: string, placeholders?: object }) {
    const placeholderNames = Object.getOwnPropertyNames(placeholders);

    return placeholderNames.reduce(
        (prevMsgResult, placeholderName) => {
            const placeholderValue = placeholders[placeholderName];

            const regex = new RegExp(`{${placeholderName}}`, 'g');

            return prevMsgResult.replace(regex, placeholderValue);
        },
        msg,
    );
}
