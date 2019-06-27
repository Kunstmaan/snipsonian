import React, { ReactElement, Fragment } from 'react';
import { ITranslatorPlaceholders } from '../translator/types';
import I18nContext from '../I18nContext';

const PLACEHOLDER_REGEX = /({.*?})/g;

interface IRenderedPlaceholders {
    [key: string]: string;
}

export interface IPublicProps {
    msg: string;
    placeholders?: ITranslatorPlaceholders;
    raw?: boolean;
}

export default function Translate({
    msg,
    placeholders = {},
    raw = false,
}: IPublicProps) {
    const renderedPlaceholders = renderPlaceholders(placeholders);
    // Typings don't support yet returning a string from a stateless component
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return (
        <I18nContext.Consumer>
            {({ translator }) => {
                if (raw) {
                    return (
                        // eslint-disable-next-line react/no-danger
                        <span dangerouslySetInnerHTML={{
                            __html: translator({ msg, placeholders: renderedPlaceholders }),
                        }}
                        />
                    );
                }
                return (
                    injectReactPlaceholders(
                        translator(
                            { msg, placeholders: renderedPlaceholders },
                        ),
                        placeholders,
                    ) as ReactElement<{}>
                );
            }}
        </I18nContext.Consumer>
    );
}

function renderPlaceholders(placeholders: ITranslatorPlaceholders): IRenderedPlaceholders {
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

function injectReactPlaceholders(message: string, placeholders: ITranslatorPlaceholders) {
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
                        <Fragment key={`translate-message-part-${index}-${keySuffix}`}>
                            {placeholderReplacement ? placeholderReplacement.value : messagePart}
                        </Fragment>
                    );
                })}
            </>
        );
    }
    return message;
}

function getPlaceholderReplacement(messagePart: string, placeholders: ITranslatorPlaceholders) {
    const placeholderName = messagePart.substring(1, messagePart.length - 1);
    return {
        name: placeholderName,
        value: placeholders[placeholderName],
    };
}
