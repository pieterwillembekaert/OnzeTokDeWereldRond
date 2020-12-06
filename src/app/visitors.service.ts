import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  Visitors;
  //UrlServer: string= "http://localhost:3000/data/"
  UrlServer: string= "/data/"

  constructor(
    private http: HttpClient
  ) { }

  
  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServer)
      .subscribe(data => {
        //console.log(data);
        this.Visitors=data;
        resolve(data);
        //return data; 
      });
    });
  }

  async getDataFromHttp() {
    const data = <any>await this.getDataAsyn();
    //debug
    //console.log(data)
    return data
  }

  getData() {
    //console.log(this.Visitors);
    return  this.Visitors;
  }

}

