import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { c_visitorsItem } from './DatabaseItem';
import { visitorsItem } from './DatabaseItem';
import { CLocationDatabase } from "../clocationDatabase";


@Injectable({
  providedIn: 'root'
})

export class EditVisitorsDataService {
  editVisitors
  OpenVisitorEdit: visitorsItem;

  bDataHaseChangdWithoutSave: boolean= false; 
  bNewImageUploaded: boolean= false; 

  Url = new CLocationDatabase;
  UrlServer: string = this.Url.getUrl() + "api/saveToDB/";

  postUrl = this.Url.getUrl() + "upload/";

  httpEvent: HttpEvent<{}>

  constructor(
    private http: HttpClient
  ) { }


  getEditVisitors() {
    return this.editVisitors;
  }

  setEditVisitors(newData) {
    this.editVisitors = newData;
  }

  getNewImageUploaded(): boolean {
    return this.bNewImageUploaded;
  }

  setNewImageUploaded(newData: boolean) {
    this.bNewImageUploaded = newData;
  }

  getOpenVisitorEdit() {
    return this.OpenVisitorEdit;
  }

  setOpenVisitorEdit(newData) {
    this.OpenVisitorEdit = newData;
  }

  getDataHaseChangdWithoutSave(): boolean {
    return this.bDataHaseChangdWithoutSave;
  }

  setDataHaseChangdWithoutSave(newData: boolean) {
    this.bDataHaseChangdWithoutSave = newData;
  }

  saveData(SaveData: visitorsItem) {
    for (let i = 0; i < this.editVisitors.length; i++) {
      if (SaveData.id == this.editVisitors.id) {
        this.editVisitors[i] = SaveData;
        break;
      }
    }
  }


  saveDataToServer()  {
    console.log("Save data to server")
    return new Promise((resole, reject) => {
      var sendData= {data: this.editVisitors, newImageUploaded: this.bNewImageUploaded}
      this.http.post<any>(this.UrlServer, sendData).subscribe(
        data => {
          console.log("POST Request is successful ", data);
          this.bDataHaseChangdWithoutSave= false; 
          this.bNewImageUploaded= false;
          resole(data.status);
        },
        error => {
          if (error.status == 200) {
            console.log("Ok", error.status);
            this.bDataHaseChangdWithoutSave= false; 
            resole(error.status);
          } else {
            console.log("Error", error);
            reject(error);
          }
        });
    })
  }

  uploadFiles(files: File, FormData: FormData): Subscription {
    
    const config = new HttpRequest('POST', this.postUrl, FormData, {
      reportProgress: true
    })

    return this.http.request(config)
      .subscribe(event => {
        this.httpEvent = event

        if (event instanceof HttpResponse) {

          alert('upload complete, old school alert used')
        }
      },
        error => {
          alert('!failure beyond compare cause:' + error.toString())
        })
  }




}
