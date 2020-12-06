import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import { Subscription } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { c_visitorsItem } from './DatabaseItem';
import { visitorsItem } from './DatabaseItem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EditVisitorsDataService {
  editVisitors
  OpenVisitorEdit:visitorsItem; 
  //UrlServer: string= "http://localhost:3000/saveToDB/"
  UrlServer: string= "/saveToDB/"

  //postUrl = 'http://localhost:3000/upload'
  postUrl = '/upload'
  httpEvent:HttpEvent<{}>

  constructor(
    private http: HttpClient
  ) { }


  getEditInterviews(){
    return this.editVisitors; 
  }

  setEditInterviews(interviewData){
    this.editVisitors= interviewData; 
  }

  getOpenVisitorEdit(){
    return this.OpenVisitorEdit; 
  }

  setOpenVisitorEdit(interviewData){
    this.OpenVisitorEdit= interviewData; 
  }

  saveData(SaveData:visitorsItem){
    for (let i = 0; i < this.editVisitors.length; i++) {
      if(SaveData.id== this.editVisitors.id){
        this.editVisitors[i]= SaveData;
        break;
      }
    } 
  }


  saveDataToServer(){
    //console.log("Save data to server")

    this.http.post<any>(this.UrlServer, this.editVisitors).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  uploadFiles(files:File, FormData:FormData) : Subscription {
    const config = new HttpRequest('POST', this.postUrl, FormData, {
      reportProgress: true
    })
 
    return this.http.request( config )
    .subscribe(event=>{
      this.httpEvent = event
 
      if (event instanceof HttpResponse) {
         
        alert('upload complete, old school alert used')
      }
    },
    error=>{
      alert('!failure beyond compare cause:' + error.toString())
    })
  }




}
