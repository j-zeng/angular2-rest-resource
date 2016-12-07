"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var http_1 = require('@angular/http');
var http_service_1 = require('./http.service');
var Resource = (function () {
    function Resource(httpService) {
        this.httpService = httpService;
    }
    Resource.prototype.create = function (data) {
        return this.request('POST', this.url, null, data);
    };
    Resource.prototype.get = function (id) {
        return this.request('GET', this.addSlash(this.url) + "/:id", { id: id });
    };
    Resource.prototype.update = function (id, data) {
        return this.request('PUT', this.addSlash(this.url) + "/:id", { id: id }, data);
    };
    Resource.prototype.delete = function (id) {
        return this.request('DELETE', this.addSlash(this.url) + "/:id", { id: id });
    };
    Resource.prototype.request = function (method, url, parameters, data, headers, responseHandler, errorHandler) {
        var body = JSON.stringify(data);
        var headers_ = new http_1.Headers(headers);
        var options = new http_1.RequestOptions({ headers: headers_ });
        if (method === 'POST') {
            return this.addHandlers(this.httpService.post(url, parameters, body, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
        if (method === 'PUT') {
            return this.addHandlers(this.httpService.put(url, parameters, body, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
        if (method === 'PATCH') {
            return this.addHandlers(this.httpService.patch(url, parameters, body, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
        if (method === 'DELETE') {
            return this.addHandlers(this.httpService.delete(url, parameters, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
        if (method === 'HEAD') {
            return this.addHandlers(this.httpService.head(url, parameters, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
        if (method === 'OPTIONS') {
            return this.addHandlers(this.httpService.options(url, parameters, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
        else {
            return this.addHandlers(this.httpService.get(url, parameters, options), responseHandler, errorHandler)
                .map(function (response) { return response.text() ? response.json() : response.text(); });
        }
    };
    Resource.prototype.addHandlers = function (observable, responseHandler, errorHandler) {
        return observable.catch(function (error, source) {
            var error_ = error.text() ? error.json() : error.text();
            if (errorHandler) {
                errorHandler(error_, error);
            }
            return Rx_1.Observable.throw(error_);
        }).map(function (response) {
            if (responseHandler) {
                responseHandler(response);
            }
            return response;
        });
    };
    Resource.prototype.addSlash = function (url) {
        return url && url.indexOf('/') === url.length - 1 ? url + "/" : url;
    };
    Resource = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], Resource);
    return Resource;
}());
exports.Resource = Resource;
//# sourceMappingURL=resource.service.js.map