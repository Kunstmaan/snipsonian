import { TVirtualPageConfig, TVirtualPageConfigPart } from '../route/types';

const VIRTUAL_PAGE_CONFIG = {
    PARTS_DELIMITER: '_',
    EMPTY_STATE_SELECTOR_PLACEHOLDER: '-',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function parseVirtualPage(state: any, virtualPageConfig: TVirtualPageConfig): string {
    if (Array.isArray(virtualPageConfig)) {
        return joinVirtualPagePartsAndSelectStateVarParts(state, virtualPageConfig);
    }

    return virtualPageConfig;
}

function joinVirtualPagePartsAndSelectStateVarParts(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any,
    virtualPageConfigParts: TVirtualPageConfigPart[],
): string {
    return virtualPageConfigParts
        .map((virtualPageConfigPart) => {
            if (typeof virtualPageConfigPart === 'function') {
                const part = (virtualPageConfigPart(state)
                    || VIRTUAL_PAGE_CONFIG.EMPTY_STATE_SELECTOR_PLACEHOLDER);
                return `${part}`.toLowerCase();
            }
            return virtualPageConfigPart;
        })
        .join(VIRTUAL_PAGE_CONFIG.PARTS_DELIMITER);
}
