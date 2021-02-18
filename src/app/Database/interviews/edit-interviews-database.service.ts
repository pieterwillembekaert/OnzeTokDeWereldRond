import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { interviewItem } from '../DatabaseItem';
import { c_interviewItem } from '../DatabaseItem';
import { CLocationDatabase } from "../../clocationDatabase";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class EditInterviewsDatabaseService {
  editInterviews
  OpenInterViewEditText: interviewItem;

  Url = new CLocationDatabase;
  UrlServer: string = this.Url.getUrl() + "saveToInterviews/";

  bDataHaseChangdWithoutSave: boolean = false;


  constructor(
    private http: HttpClient
  ) { }

  getOpenInterViewEditText() {
    return this.OpenInterViewEditText;
  }

  setOpenInterViewEditText(interviewDataEdit) {
    this.OpenInterViewEditText = interviewDataEdit;
  }

  getEditInterviews() {
    return this.editInterviews;
  }

  setEditInterviews(interviewData) {
    this.editInterviews = interviewData;
  }

  getDataHaseChangdWithoutSave(): boolean {
    return this.bDataHaseChangdWithoutSave;
  }

  setDataHaseChangdWithoutSave(newData: boolean) {
    this.bDataHaseChangdWithoutSave = newData;
  }

  saveDataToServer() {
    console.log("Save data to server")
    return new Promise((resole, reject) => {
      this.http.post<any>(this.UrlServer, this.editInterviews).subscribe(
        data => {
          console.log("POST Request is successful ", data);
          this.bDataHaseChangdWithoutSave = false;
          resole(data.status);
        },
        error => {
          if (error.status == 200) {
            console.log("Ok", error.status);
            this.bDataHaseChangdWithoutSave = false;
            resole(error.status);
          } else {
            console.log("Error", error);
            reject(error);
          }
        });
    })
  }



  saveData(SaveData: interviewItem) {
    for (let i = 0; i < this.editInterviews.length; i++) {
      if (SaveData.id == this.editInterviews.id) {
        this.editInterviews[i] = SaveData;
        break;
      }
    }
  }
}
