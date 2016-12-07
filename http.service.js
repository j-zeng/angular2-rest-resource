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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.get = function (endpoint, parameters, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.get(url, options);
    };
    HttpService.prototype.delete = function (endpoint, parameters, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.delete(url, options);
    };
    HttpService.prototype.head = function (endpoint, parameters, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.head(url, options);
    };
    HttpService.prototype.options = function (endpoint, parameters, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.options(url, options);
    };
    HttpService.prototype.post = function (endpoint, parameters, body, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.post(url, body, options);
    };
    HttpService.prototype.put = function (endpoint, parameters, body, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.put(url, body, options);
    };
    HttpService.prototype.patch = function (endpoint, parameters, body, options) {
        var url = this.constructUrl(endpoint, parameters);
        return this.http.patch(url, body, options);
    };
    HttpService.prototype.constructUrl = function (endpoint, parameters) {
        var formatted = endpoint;
        var tokens = parameters;
        var query = {};
        for (var propName in tokens) {
            var propValue = tokens[propName];
            var temp = formatted.replace(':' + propName, propValue);
            if (temp === formatted) {
                query[propName] = propValue;
            }
            formatted = temp;
        }
        var querystring = this.toQueryString(query);
        if (formatted && querystring) {
            if (formatted.indexOf('?') !== -1) {
                formatted = formatted + querystring;
            }
            else {
                formatted = formatted + "?" + querystring;
            }
        }
        return formatted;
    };
    HttpService.prototype.toQueryString = function (keyValuePair) {
        var queryString = '';
        for (var key in keyValuePair) {
            if (keyValuePair.hasOwnProperty(key)) {
                var value = keyValuePair[key];
                if (queryString) {
                    queryString += '&';
                }
                queryString += key + "=" + value;
            }
        }
        return queryString;
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map