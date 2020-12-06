import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import {VisitorsService} from './../../../visitors.service';
import {EditVisitorsDataService} from '../../edit-visitors-data.service';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { c_visitorsItem } from './../../DatabaseItem';
import { visitorsItem } from './../../DatabaseItem';

@Component({
  selector: 'app-edit-visitors',
  templateUrl: './edit-visitors.component.html',
  styleUrls: ['./edit-visitors.component.css']
})
export class EditVisitorsComponent implements OnInit {

  dataVisitors; 
  dataVisitor: visitorsItem; 
  LoadData: boolean; 
  displayedColumns: string[] = ['bewerken', 'id', 'Naam', 'Land','Afstand', 'Datum', 'Afbeelding'];
  @ViewChild(MatTable) table: MatTable<any>;

  NieuweDeelnemersTonen: boolean; 

  constructor(
    private __VisitorsService : VisitorsService,
    private __EditVisitorsDataService: EditVisitorsDataService,
    private __changeDetectorRef: ChangeDetectorRef,
    private __Router: Router,
  ) { }

  ngOnInit(): void {
    var $this = this;
    if(!this.__EditVisitorsDataService.getEditInterviews()){
    this.__VisitorsService.getDataFromHttp().then(
      function (response) {
        $this.dataVisitors= response.members;
        $this.__EditVisitorsDataService.setEditInterviews(response.members);
        //console.log(response)
        
      },
      function (error) {
        console.log("error: ", error)
      }
    )
  }else{
    this.dataVisitors= this.__EditVisitorsDataService.getEditInterviews();

  }
  }

  newVisitor():void{
    var newData= new c_visitorsItem(); 
    
    //nieuwe index
    newData.id= this.dataVisitors.length; 
    //add data
    this.dataVisitors.push(newData); 
    this.__EditVisitorsDataService.setEditInterviews(this.dataVisitors);
    this.table.renderRows();
  }


  saveVisitors():void{
    this.__EditVisitorsDataService.saveDataToServer();
  }

  downloadVisitors():void{
    console.log("download interviews")
  }


  delete(row: any): void {
    const index = this.dataVisitors.indexOf(row, 0);
    if (index > -1) {
      this.dataVisitors.splice(index, 1);
    }
    this.__EditVisitorsDataService.setEditInterviews(this.dataVisitors)
    this.table.renderRows();
  }

  edit(row: any): void {
    console.log(row);
    this.__EditVisitorsDataService.setOpenVisitorEdit(row)
    this.__Router.navigate(['/Database/EditVisitor']);
  }

  sort():void{
    for (let i = 0; i < this.dataVisitors.length; i++) {
      this.dataVisitors[i].date= new Date(this.dataVisitors[i].date);
      
    } 
    this.dataVisitors = this.dataVisitors.slice().sort((a:any, b:any) => b.date - a.date)
    this.__EditVisitorsDataService.setEditInterviews(this.dataVisitors);
    this.table.renderRows();
  }

  toggleNieuweDeelnemers() :void{
    if(this.NieuweDeelnemersTonen){
      this.NieuweDeelnemersTonen= false;
    }else{
      this.NieuweDeelnemersTonen= true;

    }
  }

}
