import { Injectable } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';

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
   
     this.__VisitorsService.getDataFromHttp().then(
      (response)=> {
     
      this.__Router.navigate(['/kaart']);

      },
      (error)=> {
        console.log("Resolver error: ", error)
      }
    ) 
  }
}
