import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  Visitors;

  constructor(
    private http: HttpClient
  ) { }

  //http://localhost:3000
  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get("http://localhost:3000/data/")
      .subscribe(data => {
        console.log(data);
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
    console.log(this.Visitors);
    return  this.Visitors;
  }

  


  getDatabaseInfo() {
    var aTest = [{
      
        Tables_in_pomp: "2020"
      }
    ]
    return aTest
    //return this.http.get("http://localhost:3000/pomp/2020");
  }


}

