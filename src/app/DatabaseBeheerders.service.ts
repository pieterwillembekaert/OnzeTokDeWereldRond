import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CLocationDatabase } from "./clocationDatabase";


@Injectable({
  providedIn: 'root'
})
export class DatabaseBeheerdersService {
  Beheerders;

  /*Server location */
  Url = new CLocationDatabase;
  UrlServer: string = this.Url.getUrl() + "api/databaseBeheerders/";
  UrlServerPostData: string = this.Url.getUrl() + "api/updateBeheerders/";



  constructor(
    private http: HttpClient,
  ) { }
  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServer)
        .subscribe(data => {
          //console.log(data);
          this.Beheerders = data;
          resolve(data);
          //return data; 
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
    return this.Beheerders;
  }


  /*Save data to server*/
  saveDataToServer(dataToSave) {
    
    return new Promise((resole, reject) => {
      this.http.post<any>(this.UrlServerPostData, dataToSave).subscribe(
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
