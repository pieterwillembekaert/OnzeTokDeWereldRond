import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';

import{ ManageUploadFolderService } from '../manage-upload-folder.service';

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
        console.log("error: ", error)
      }
    )

 }
  delete(row: any): void {
    let removeFile= String(row);
    console.log(removeFile)
    this.__ManageUploadFolderService.deletFile(removeFile);
    this.getFolderContent();
    this.table.renderRows();
  }

}
