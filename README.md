# angular2-rest-resource
Library to support rest resource for Angular 2

## Setting up the resource service
```
// hero-resource.service.ts

import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs/Rx';

import { Resource }    from 'angular2-rest-resource';

@Injectable()
export class HeroResource extends Resource {

    //  create, get, update, and delete functions are automatically available after setting url
    url = 'https://your.domain.here/hero';

    // (optional) defining a custom endpoint function
    getByName(name: string): Observable<any> {
        return this.request('GET', 'https://your.domain.here/hero?name=:name', { name: name });
        //  or simply as:  return this.request('GET', 'https://your.domain.here/hero', { name: name });
        //  all unreferenced parameters will be appended as a query string

        //  signature:  this.request(operation, url, [params], [data], [headers], [successHandler], [errorHandler]);
        //  valid operation values:  'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'
        //  the data argument is used by 'POST', 'PUT', and 'PATCH' operations; other operations will ignore this argument's value
    }

    //  (optional) defining a custom endpoint function to override the default create, get, update, or delete function
    update(id: string, data: any): Observable<any> {
       return this.request('PATCH', 'https://your.domain.here/hero/:id', {id: id}, data);
    }
}
```

## Adding the resource service to the application
```
// app.module.ts

import { NgModule }            from '@angular/core';
import { RestResourceModule }  from 'angular2-rest-resource';
import { HeroResource }        from './hero-resource.service';

@NgModule({
    imports: [ RestResourceModule, ... your other modules ],
    ... your other meta data
    providers: [ HeroResource ]
})
export class AppModule { }
```

## Using the resource service in a component
```
// example.component.ts
import { HeroResource }  from './hero-resource.service';

export class ExampleComponent {
    constructor(public heroResource: HeroResource) { }

    onInit() {
        let hero: any = { 
            id: null,
            name: 'Super Guy',
            powers: 'Extreme Speed'
        };

        //  create, get, update, and delete functions are automatically available (simply set the url property on the resource service.)
        this.heroResource.create(hero).subscribe((hero_) => {
            hero.id = hero_.id;
        });

        this.heroResource.get(hero.id).subscribe((hero_) => {
            hero = hero_;
        });

        this.heroResource.getByName('Super Guy').subscribe((hero_) => {
            hero = hero_;
        });

        //  default update function assumes the PUT operation.
        //  if this doesn't suit your use case, you may define a custom endpoint function (see above hero-resource.service.ts)
        hero.name = 'Wonder Guy';
        this.heroResource.update(hero.id, hero).subscribe((hero_) => {
            hero = hero_;
        });

        this.heroResource.delete(hero.id).subscribe((hero_) => {
            hero = null;
        });
    }
}
```