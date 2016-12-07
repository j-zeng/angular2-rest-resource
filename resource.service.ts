import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Response,
         Headers,
         RequestOptions }         from '@angular/http';
import { HttpService }            from './http.service';

@Injectable()
export class Resource {
    public url: string;

    constructor(protected httpService: HttpService) { }

    create(data: any): Observable<any> {
       return this.request('POST', this.url, null, data);
    }

    get(id: string): Observable<any> {
       return this.request('GET', `${this.addSlash(this.url)}/:id`, {id});
    }

    update(id: string, data: any): Observable<any> {
       return this.request('PUT', `${this.addSlash(this.url)}/:id`, {id}, data);
    }

    delete(id: string): Observable<any> {
       return this.request('DELETE', `${this.addSlash(this.url)}/:id`, {id});
    }

    protected request(method: string,
                      url: string,
                      parameters?: any,
                      data?: any,
                      headers?: any,
                      responseHandler?: (response: any) => void,
                      errorHandler?: (error: any, response?: any) => void): Observable<any> {
        let body = JSON.stringify(data);
        let headers_ = new Headers(headers);
        let options = new RequestOptions({ headers: headers_ });
        if(method === 'POST') {
            return this.addHandlers(this.httpService.post(url, parameters, body, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        } if(method === 'PUT') {
            return this.addHandlers(this.httpService.put(url, parameters, body, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        } if(method === 'PATCH') {
            return this.addHandlers(this.httpService.patch(url, parameters, body, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        } if(method === 'DELETE') {
            return this.addHandlers(this.httpService.delete(url, parameters, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        } if(method === 'HEAD') {
            return this.addHandlers(this.httpService.head(url, parameters, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        } if(method === 'OPTIONS') {
            return this.addHandlers(this.httpService.options(url, parameters, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        } else { // method === 'GET'
            return this.addHandlers(this.httpService.get(url, parameters, options), responseHandler, errorHandler)
                .map((response: Response) => response.text() ? response.json() : response.text() );
        }
    }

    protected addHandlers(observable: Observable<Response>,
                     responseHandler?: (response: any) => void,
                     errorHandler?: (error: any, response?: any) => void): Observable<Response> {
        return observable.catch((error, source) => {
            let error_ = error.text() ? error.json() : error.text();
            if(errorHandler) {
                errorHandler(error_, error);
                // return Observable.empty();
            }
            return Observable.throw(error_);
        }).map((response: Response) => {
            if(responseHandler) {
                responseHandler(response);
            }
            return response;
        });
    }

    protected addSlash(url: string): string {
        return url && url.indexOf('/') === url.length - 1 ? `${url}/` : url;
    }
}