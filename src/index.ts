import * as request from "superagent";
import * as types from "bridge-api-types";

export class BridgeAPI {
    constructor(public baseUrl: string, public accessToken: string) {
    }
    get<T>(path: string, query?: any) {
        return new Promise<T>((resolve: (value: T) => void, reject: (err: any) => void) => {
            let p = request.get(`${this.baseUrl}${path}`).query({access_token: this.accessToken})
            if (query) p = p.query(query);
            p.then((response: request.Response) => {
                resolve(JSON.parse(response.text ? response.text : '{}') as T);
            }).catch((err: {status: number, response: request.Response} | NodeJS.ErrnoException) => {
                let e: any = err;
                if (e.status && e.response) {   // got a HTTP response
                    let response: request.Response = e.response;
                    reject(JSON.parse(response.text) as types.ErrorResponse);
                } else {
                    reject(err);
                }
            });
        });
    }
    async bundleGet<B>(path: string, query?: any) {
        return (await this.get<types.BundleResponse<B>>(path, query)).bundle;
    }
}