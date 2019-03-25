type TGaParam = string | number | object;

declare interface Window {
    ga: (action: string, ...params: TGaParam[]) => void;
    dataLayer: object[];
}
