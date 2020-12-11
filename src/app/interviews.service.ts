import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CLocationDatabase} from "./clocationDatabase";

@Injectable({
  providedIn: 'root'
})
export class InterviewsService {

  Interviews;
  Url= new CLocationDatabase; 
  UrlServer: string= this.Url.getUrl()+"api/interviewsdata/"; 

  constructor(
    private http: HttpClient
  ) { }

 
  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServer)
      .subscribe(data => {
        //console.log(data);
        this.Interviews=data;
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
    //console.log(this.Interviews);
    return  this.Interviews;
  }
}
