import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  isLoggedIn = false;
  UserAdim={
    name: 'KSA',
    password: 'nzg'
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  loginUser(User): Observable<boolean> {

    if(this.UserAdim.name==User.name && this.UserAdim.password==User.password){
      return of(true).pipe(
        delay(1000),
        tap(val => this.isLoggedIn = true)
      );
    }else{
      return of(true).pipe(
        delay(1000),
        tap(val => this.isLoggedIn = false)
      );

    }
    
    
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
