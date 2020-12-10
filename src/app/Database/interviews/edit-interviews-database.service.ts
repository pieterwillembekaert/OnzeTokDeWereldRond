import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { interviewItem } from '../DatabaseItem';
import { c_interviewItem } from '../DatabaseItem';
import {CLocationDatabase} from "../../clocationDatabase";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class EditInterviewsDatabaseService {
  editInterviews
  OpenInterViewEditText:interviewItem; 

  Url= new CLocationDatabase;
  UrlServer: string= this.Url.getUrl()+"saveToInterviews/";

  //UrlServer: string= "http://localhost:3000/saveToInterviews/"
  //UrlServer: string= "/saveToInterviews/"


  constructor(
    private http: HttpClient
  ) { }

  getOpenInterViewEditText(){
    return this.OpenInterViewEditText; 
  }

  setOpenInterViewEditText(interviewDataEdit){
    this.OpenInterViewEditText= interviewDataEdit; 
  }

  getEditInterviews(){
    return this.editInterviews; 
  }

  setEditInterviews(interviewData){
    this.editInterviews= interviewData; 
  }

  saveDataToServer(){
    //console.log("Save data to server")

    this.http.post<any>(this.UrlServer, this.editInterviews).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  saveData(SaveData:interviewItem){
    for (let i = 0; i < this.editInterviews.length; i++) {
      if(SaveData.id== this.editInterviews.id){
        this.editInterviews[i]= SaveData;
        break;
      }
    } 
  }
}
