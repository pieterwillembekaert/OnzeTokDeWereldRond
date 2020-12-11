import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { c_visitorsItem } from './DatabaseItem';
import { visitorsItem } from './DatabaseItem';
import { CLocationDatabase } from "../clocationDatabase";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class EditVisitorsDataService {
  editVisitors
  OpenVisitorEdit: visitorsItem;

  Url = new CLocationDatabase;
  UrlServer: string = this.Url.getUrl() + "saveToDB/";

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

  getOpenVisitorEdit() {
    return this.OpenVisitorEdit;
  }

  setOpenVisitorEdit(newData) {
    this.OpenVisitorEdit = newData;
  }

  saveData(SaveData: visitorsItem) {
    for (let i = 0; i < this.editVisitors.length; i++) {
      if (SaveData.id == this.editVisitors.id) {
        this.editVisitors[i] = SaveData;
        break;
      }
    }
  }


  saveDataToServer() {
    //console.log("Save data to server")

    this.http.post<String>(this.UrlServer,this.editVisitors).subscribe({
      error: error => {
        console.log('There was an error!', error);
      },
      complete: () => console.log('Observer got a complete notification'),

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
