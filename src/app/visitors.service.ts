import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CLocationDatabase} from "./clocationDatabase";

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  Visitors;
  Url= new CLocationDatabase;
  UrlServer: string= this.Url.getUrl()+"api/visitors/";  
  
  constructor(
    private http: HttpClient,
    
  ) { }

  
  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServer)
      .subscribe(data => {
        this.Visitors=data;
        resolve(data);
      });
    });
  }

  async getDataFromHttp() {
    const data = <any>await this.getDataAsyn();
    //debug
    //console.log(data)
    console.log(this.Url.getUrl())
    return data
  }

  getData() {
    //console.log(this.Visitors);
    return  this.Visitors;
  }

}

