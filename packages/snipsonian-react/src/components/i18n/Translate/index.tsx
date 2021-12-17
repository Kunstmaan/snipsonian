import * as React from 'react';
import { ITranslatorPlaceholders } from '../translator/types';
import I18nContext from '../I18nContext';

const PLACEHOLDER_REGEX = /({.*?})/g;
const DEFAULT_HTML_TRANSFORMER = (input: string) => input;

interface IRenderedPlaceholders {
    [key: string]: string;
}

type THtmlTransformer = (input: string) => string;

export interface IPublicProps {
    msg: string;
    placeholders?: ITranslatorPlaceholders;
    /* Set to true if you want that html within the message is not just shown as regular text */
    raw?: boolean; // default false
    htmlTransformer?: THtmlTransformer; // can be used to sanitize the resulting html
}

export default function Translate({
    msg,
    placeholders = {},
    raw = false,
    htmlTransformer = DEFAULT_HTML_TRANSFORMER,
}: IPublicProps) {
    const renderedPlaceholders = renderBasicPlaceholders(placeholders);

    // Typings don't support yet returning a string from a stateless component
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return (
        <I18nContext.Consumer>
            {({ translator }) => (
                injectReactPlaceholders(
                    translator(
                        { msg, placeholders: renderedPlaceholders },
                    ),
                    placeholders,
                    raw,
                    htmlTransformer,
                ) as React.ReactElement<object>
            )}
        </I18nContext.Consumer>
    );
}

function renderBasicPlaceholders(placeholders: ITranslatorPlaceholders): IRenderedPlaceholders {
    const renderedPlaceholders: IRenderedPlaceholders = {};

    Object.keys(placeholders).forEach((key) => {
        const value = placeholders[key];
        if (typeof value === 'string') {
            renderedPlaceholders[key] = value;
        } else if (typeof value === 'number') {
            renderedPlaceholders[key] = value.toString();
        }
    });

    return renderedPlaceholders;
}

function injectReactPlaceholders(
    message: string,
    placeholders: ITranslatorPlaceholders,
    raw: boolean,
    htmlTransformer: THtmlTransformer,
) {
    if (!message) {
        return null;
    }

    const reactPlaceholders = Object.keys(placeholders)
        .filter((placeholder) => !React.isValidElement(placeholder));

    const messageSplitted = message.split(PLACEHOLDER_REGEX);

    if (reactPlaceholders.length > 0 && Array.isArray(messageSplitted)) {
        return (
            <>
                {messageSplitted.map((messagePart, index) => {
                    const placeholderReplacement = (PLACEHOLDER_REGEX.test(messagePart)) ?
                        getPlaceholderReplacement(messagePart, placeholders) :
                        null;
                    const keySuffix = placeholderReplacement ? placeholderReplacement.name : messagePart;

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <React.Fragment key={`translate-message-part-${index}-${keySuffix}`}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                placeholderReplacement
                                    ? placeholderReplacement.value
                                    : (
                                        raw
                                            ? (
                                                /* eslint-disable react/no-danger */
                                                <span dangerouslySetInnerHTML={{
                                                    __html: htmlTransformer(messagePart),
                                                }}
                                                />
                                                /* eslint-enable react/no-danger */
                                            )
                                            : messagePart
                                    )
                            }
                        </React.Fragment>
                    );
                })}
            </>
        );
    }

    return raw
        ? (
            /* eslint-disable react/no-danger */
            <span dangerouslySetInnerHTML={{
                __html: htmlTransformer(message),
            }}
            />
            /* eslint-enable react/no-danger */
        )
        : message;
}

function getPlaceholderReplacement(messagePart: string, placeholders: ITranslatorPlaceholders) {
    const placeholderName = messagePart.substring(1, messagePart.length - 1);
    return {
        name: placeholderName,
        value: placeholders[placeholderName],
    };
}
