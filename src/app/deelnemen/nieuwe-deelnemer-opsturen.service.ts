import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { CLocationDatabase } from "../clocationDatabase";


@Injectable({
  providedIn: 'root'
})
export class NieuweDeelnemerOpsturenService {

  Url = new CLocationDatabase;
  UrlServer: string = this.Url.getUrl() + "api/saveToNieweDeelnemers/";
  

  constructor(
    private http: HttpClient
  ) { }

  saveDataToServer(Nieuwedeelnemer) {
    //console.log("Save data to server")
    //console.log(Nieuwedeelnemer)
    return new Promise((resole, reject) => {

      this.http.post<any>(this.UrlServer, Nieuwedeelnemer).subscribe(
        data => {
          console.log("POST Request is successful ", data);
          resole(data.status);
        },
        error => {
          if (error.status == 200) {
            //console.log("Ok", error.status);
            resole(error.status);
          } else {
            //console.log("Error", error);
            reject(error);
          }
        });
      })
    }
}

