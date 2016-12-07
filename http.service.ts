import { Injectable }      from '@angular/core';
import { Http, 
         Response, 
         RequestOptions }  from '@angular/http';
import { Observable }      from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }

    get(endpoint: string, parameters?: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.get(url, options);
    }

    delete(endpoint: string, parameters?: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.delete(url, options);
    }

    head(endpoint: string, parameters?: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.head(url, options);
    }

    options(endpoint: string, parameters?: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.options(url, options);
    }

    post(endpoint: string, parameters: any, body: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.post(url, body, options);
    }

    put(endpoint: string, parameters: any, body: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.put(url, body, options);
    }

    patch(endpoint: string, parameters: any, body: any, options?: RequestOptions): Observable<Response> {
        let url = this.constructUrl(endpoint, parameters);
        return this.http.patch(url, body, options);
    }

    private constructUrl(endpoint: string, parameters?: any): string {
        let formatted = endpoint;
        let tokens = parameters;
        let query = {};
        for (let propName in tokens) {
            let propValue = tokens[propName];
            let temp = formatted.replace(':'+propName, propValue);
            if(temp === formatted) {
                query[propName] = propValue;
            }
            formatted = temp;
        }

        let querystring = this.toQueryString(query);
        if(formatted && querystring) {
            if(formatted.indexOf('?') !== -1) {
                formatted = formatted + querystring;
            } else {
                formatted = `${formatted}?${querystring}`;
            }
        }

        return formatted;
    }

    private toQueryString(keyValuePair: any): string {
        let queryString = '';
        for (let key in keyValuePair) {
            if (keyValuePair.hasOwnProperty(key)) {
                let value = keyValuePair[key];
                if(queryString) {
                    queryString += '&';
                }
                queryString += `${key}=${value}`;
            }
        }
        return queryString;
    }
}
