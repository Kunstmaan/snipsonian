declare interface Window {
    ga: (action: string, ...params: any[]) => void;
    dataLayer: object[];
}
