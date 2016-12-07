import { NgModule,
         ModuleWithProviders } from '@angular/core';
import { HttpModule }          from '@angular/http';
import { HttpService }         from './http.service';

@NgModule({
    imports: [ HttpModule ],
    providers: [ HttpService ]
})
export class RestResourceModule { }