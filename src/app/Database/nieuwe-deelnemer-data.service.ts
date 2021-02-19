import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import {CLocationDatabase} from "../clocationDatabase";


@Injectable({
  providedIn: 'root'
})
export class NieuweDeelnemerDataService {
  NieuweDeelnemers
  OpenVisitorEdit; 
  
  Url= new CLocationDatabase;
  UrlServer: string= this.Url.getUrl()+"api/nieuwedeelnemerdata/";  
  UrlServerSave: string= this.Url.getUrl()+"api/saveToNieweDeelnemersDatabase/"; 


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
      });
    });
  }

  async getDataFromHttp() {
    const data = <any>await this.getDataAsyn();
    return data
  }

  saveDataToServer(){
    console.log("Save data nieuwe deelnemers to server")
    this.http.post<any>(this.UrlServerSave, this.NieuweDeelnemers).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  
}
