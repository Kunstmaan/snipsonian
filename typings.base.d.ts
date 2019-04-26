type TGaParam = string | number | object;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
declare interface Window {
    ga: (action: string, ...params: TGaParam[]) => void;
    dataLayer: object[];
}
