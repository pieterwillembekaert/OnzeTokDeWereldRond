import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NieuweDeelnemerDataService {
  NieuweDeelnemers
  OpenVisitorEdit; 
  //UrlServer: string= "http://localhost:3000/nieuwedeelnemerdata/"
  UrlServer: string= "/nieuwedeelnemerdata/"

  //UrlServerSave: string= "http://localhost:3000/saveToNieweDeelnemersDatabase/"
  UrlServerSave: string= "/saveToNieweDeelnemersDatabase/"

  constructor(
    private http: HttpClient
  ) { }

  getNieuweDeelnemersData(){
    return this.NieuweDeelnemers; 
  }

  setNieuweDeelnemersData(NieuweDeelnemersData){
    this.NieuweDeelnemers= NieuweDeelnemersData; 
  }

  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServer)
      .subscribe(data => {
        //console.log(data);
        this.NieuweDeelnemers=data;
        resolve(data);
        //return data; 
      });
    });
  }

  async getDataFromHttp() {
    const data = <any>await this.getDataAsyn();
    //console.log(data)
    return data
  }

  saveDataToServer(){
    //console.log("Save data to server")

    this.http.post<any>(this.UrlServerSave, this.NieuweDeelnemers).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  
}
