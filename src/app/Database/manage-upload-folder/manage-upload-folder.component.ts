import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';

/*Service */
import{ ManageUploadFolderService } from '../manage-upload-folder.service';
import {NotificationService}from './../../Notification.service';

/*interface and class */

@Component({
  selector: 'app-manage-upload-folder',
  templateUrl: './manage-upload-folder.component.html',
  styleUrls: ['./manage-upload-folder.component.css']
})
export class ManageUploadFolderComponent implements OnInit {
  folderContent: string[] = []; 
 
  LoadData: boolean; 
  displayedColumns: string[] = ['Bewerken', 'Bestand', 'Afbeelding'];

  @ViewChild(MatTable) table: MatTable<any>;

  NieuweDeelnemersTonen: boolean; 

  constructor(
    private __ManageUploadFolderService : ManageUploadFolderService,
    private __Router: Router,
    private __NotificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getFolderContent();
  }

  getFolderContent(): void {
    
    this.__ManageUploadFolderService.getDataFromHttp().then(
      (response)=> {
        console.log(response)
        this.folderContent= response;
        //console.log(response)
      },
      (error)=> {
        console.log("error: ", error);
        this.__NotificationService.showNotification('error', 'Afbeeldingen niet gevonden');
      }
    )

 }
  delete(row: any): void {
    let removeFile= String(row);
    
    this.__ManageUploadFolderService.deletFile(removeFile);

    this.getFolderContent();

    this.table.renderRows();

    this.__NotificationService.showNotification('warning', 'Afbeelding gewist!');
  }

}
