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
        //  or alternatively:  return this.request('GET', 'https://your.domain.here/hero', { name: name });
        //  all unreferenced parameters will be appended as a query string

        //  request signature:  this.request(operation, url, [params], [data], [headers], [successHandler], [errorHandler]);
        //  possible operations:  'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'
        //  data argument is used by 'POST', 'PUT', and 'PATCH' operations; other operations ignore it's value
    }

    //  (optional) defining a custom endpoint function to override the default create, get, update, or delete function
    update(id: string, data: any): Observable<any> {
       return this.request('PATCH', 'https://your.domain.here/hero/:id', {id: id}, data);
    }
}
```

## Adding the resource service to your application
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

import { Component }     from '@angular/core';
import { HeroResource }  from './hero-resource.service';

@Component({
    // your component meta data here...
})
export class ExampleComponent {
    constructor(public heroResource: HeroResource) { }

    ngOnInit() {
        let hero: any = { 
            id: null,
            name: 'Super Guy',
            powers: 'Extreme Speed'
        };

        //  create, get, update, and delete functions are automatically available
        this.heroResource.create(hero).subscribe((hero_) => {
            hero.id = hero_.id;
        });

        this.heroResource.get(hero.id).subscribe((hero_) => {
            hero = hero_;
        });

        //  example using the custom endpoint function we defined earlier
        this.heroResource.getByName('Super Guy').subscribe((hero_) => {
            hero = hero_;
        });

        //  default update function uses the PUT operation.
        //  you may change it's behavior through a custom endpoint function (see above hero-resource.service.ts)
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