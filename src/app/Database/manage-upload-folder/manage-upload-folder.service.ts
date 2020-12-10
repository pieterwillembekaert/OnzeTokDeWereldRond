import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpRequest,
  HttpResponse,
  HttpEvent
} from "@angular/common/http"
import {
  Subscription
} from 'rxjs'
import {
  HttpHeaders
} from '@angular/common/http';

import {CLocationDatabase} from "../../clocationDatabase";


@Injectable({
  providedIn: 'root'
})
export class ManageUploadFolderService {
  contentFolder;

  Url= new CLocationDatabase;
  UrlServerContenctServer: string= this.Url.getUrl()+"ContentFolderUpload/"; 
  UrlServerContenctDeletServer: string= this.Url.getUrl()+"DeletContentFolderUpload/"; 
  //UrlServerContenctServer: string= "http://localhost:3000/ContentFolderUpload/"
  //UrlServerContenctServer: string = "/ContentFolderUpload/"

  //UrlServerContenctDeletServer: string= "http://localhost:3000/DeletContentFolderUpload/"
  //UrlServerContenctDeletServer: string = "/DeletContentFolderUpload/"

  constructor(
    private http: HttpClient
  ) {}

  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServerContenctServer)
      .subscribe(data => {
        //console.log(data);
        this.contentFolder=data;
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

  deletFile(file: String) {
    console.log(file)
    
    this.http.get(this.UrlServerContenctDeletServer+ "/" + file)
      .subscribe(data => {

        console.log(data);
        //this.contentFolder=data;
        
        //return data; 
      });
  }


}
