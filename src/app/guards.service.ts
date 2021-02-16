import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';


import {HttpClient} from "@angular/common/http";
import {CLocationDatabase} from "./clocationDatabase";
import {iUserDatabase, cUserDatabase} from "./UserDatabase";


@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  //server
  Url= new CLocationDatabase;
  UrlServerLogin: string= this.Url.getUrl()+"api/users/login";  

  isLoggedIn : boolean = true;

  constructor(
    private http: HttpClient,
    
  ) { }


  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  loginUser(User): void {
    this.isLoggedIn = false; 



    var logInFromPage= new cUserDatabase(); 
    logInFromPage.name= User.name;
    logInFromPage.password= User.password;

    this.checkLoginFromServer(logInFromPage).then(
      (msg)=>{
        console.log(msg)
        return
        
      }, 
      (error)=>{
        console.log(error)
        
       
      }, 
    )  
  }

  loginUserCheck(result: boolean): Observable<boolean> {

    if(result){
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

  getIsLoggedIn() :boolean{
    return this.isLoggedIn; 

  }

  checkLoginFromServer(sendToServer: iUserDatabase){
    return new Promise((resole, reject) => {
      this.http.post<any>(this.UrlServerLogin, sendToServer).subscribe(
        data => {
          console.log("POST Request is successful ", data);
          resole(data.status);
        },
        error => {
          if (error.status == 200) {
            console.log("Ok", error);
            this.isLoggedIn= true;
            resole(true);
          }else if(error.status == 201){
            this.isLoggedIn= false;
            resole(false);

          }else {
            //console.log("Error", error);
            this.isLoggedIn= false;
            reject(error);
          }
        });
    })

  }
}
