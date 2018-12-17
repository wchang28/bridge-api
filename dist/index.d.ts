export declare class BridgeAPI {
    baseUrl: string;
    accessToken: string;
    constructor(baseUrl: string, accessToken: string);
    get<T>(path: string, query?: any): Promise<T>;
    bundleGet<B>(path: string, query?: any): Promise<B>;
}
