import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NieuweDeelnemerOpsturenService {

  //UrlServer: string= "http://localhost:3000/saveToNieweDeelnemers/"
  UrlServer: string= "/saveToNieweDeelnemers/"

  constructor(
    private http: HttpClient
  ) { }

  saveDataToServer(Nieuwedeelnemer){
    //console.log("Save data to server")
    //console.log(Nieuwedeelnemer)

    this.http.post<any>(this.UrlServer, Nieuwedeelnemer).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }
}
