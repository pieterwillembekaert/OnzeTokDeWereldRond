import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TotalDistService {

  dataYear;


  constructor(
    private http: HttpClient
  ) { }

  //http://localhost:3000/
  getDataAsyn(urlYear) {
    return new Promise(resolve => {
      this.http.get("http://localhost:3000/TotalDist/"+urlYear)
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
