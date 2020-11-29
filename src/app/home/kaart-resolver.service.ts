import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { VisitorsService } from '.././visitors.service';
import { Visitor } from './visitor';




@Injectable({
  providedIn: 'root'
})
export class KaartResolverService implements Resolve<object> {



  constructor(
    private __VisitorsService : VisitorsService,
    private __Router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    var $this = this 
     this.__VisitorsService.getDataFromHttp().then(
      function (response) {
      console.log("Resolver, data get")
      $this.__Router.navigate(['/kaart']);

      },
      function (error) {
        console.log("Resolver error: ", error)
      }
    ) 
  }
}
