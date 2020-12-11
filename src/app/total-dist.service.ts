import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CLocationDatabase} from "./clocationDatabase";

@Injectable({
  providedIn: 'root'
})
export class TotalDistService {

  dataYear;
  Url= new CLocationDatabase; 
  UrlServer: string= this.Url.getUrl()+"api/TotalDist/"; 

  constructor(
    private http: HttpClient
  ) { }

 
  getDataAsyn(urlYear) {
    return new Promise(resolve => {
      this.http.get(this.UrlServer+urlYear)
      .subscribe(data => {
        //console.log(data);
        this.dataYear=data;
        resolve(data);
        //return data; 
      });
    });
  }

  async getDataFromHttp(urlYear) {
    if(urlYear=="alles"){
      urlYear= 0; 
    }
    const data = <any>await this.getDataAsyn(urlYear);
    //debug
    //console.log(data)
    return data
  }

  getData() {
    //console.log(this.dataYear);
    return  this.dataYear;
  }

}
