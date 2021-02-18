import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { VisitorsService } from './../../../visitors.service';
import { EditVisitorsDataService } from '../../edit-visitors-data.service';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {NotificationService}from './../../../Notification.service'

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
  goToEditPage: boolean = false;
  displayedColumns: string[] = ['Bewerken', 'id', 'Naam', 'Bond', 'Land', 'Afstand', 'Datum', 'Afbeelding'];
  @ViewChild(MatTable) table: MatTable<any>;

  NieuweDeelnemersTonen: boolean;

  bDataHaseChange: boolean= false;
  colorSave: string= "black"

  constructor(
    private __VisitorsService: VisitorsService,
    private __EditVisitorsDataService: EditVisitorsDataService,
    private __changeDetectorRef: ChangeDetectorRef,
    private __Router: Router,
    private __NotificationService: NotificationService,
  ) { }

  ngOnInit(): void {

    this.bDataHaseChange= this.__EditVisitorsDataService.getDataHaseChangdWithoutSave(); 
    if(this.bDataHaseChange) this.colorSave= 'warn'

    if (!this.__EditVisitorsDataService.getEditVisitors()) {
      this.__VisitorsService.getDataFromHttp().then(
        (response) => {
          this.dataVisitors = response.members;
          this.__EditVisitorsDataService.setEditVisitors(response.members);
        },
        (error) => {
          console.log("error: ", error)
        }
      )
    } else {
      this.dataVisitors = this.__EditVisitorsDataService.getEditVisitors();
    }
  }

  newVisitor(): void {
    var newData = new c_visitorsItem();

    //nieuwe index
    newData.id = this.dataVisitors.length;
    //add data
    this.dataVisitors.push(newData);
    this.__EditVisitorsDataService.setEditVisitors(this.dataVisitors);

    this.table.renderRows();

    this.edit(newData);

    this.__EditVisitorsDataService.setDataHaseChangdWithoutSave(true); 
  }


  saveVisitors(): void {
    this.sort(); 

    this.__EditVisitorsDataService.saveDataToServer().then(
      msg => {
        console.log("done", msg);
        this.bDataHaseChange= false;
        this.colorSave= 'black'
        this.__NotificationService.showNotification( 'success', 'Opgeslaan!')
      },
      error => {
        console.log("error", error);
        this.__NotificationService.showNotification( 'error', 'Mislukt :-/')
      })
  }

  downloadVisitors(): void {
    console.log("download interviews")
  }

  ngOnDestroy() {
    if (!this.goToEditPage && this.bDataHaseChange) {
      var r = confirm("Opgelet! Wijzigen gaan verloren zonder opslaan! Druk op ok om de aanpassingen op te slaan!");
      if (r == true) {
        this.saveVisitors();
      }
    }
  }


  delete(row: any): void {
    const index = this.dataVisitors.indexOf(row, 0);
    if (index > -1) {
      this.dataVisitors.splice(index, 1);
    }

    //nieuwe id
    for (let i = 0; i < this.dataVisitors.length; i++) {
      this.dataVisitors[i].id = i
    }

    this.__NotificationService.showNotification( 'warning', 'Deelnemer gewist!')

    this.__EditVisitorsDataService.setEditVisitors(this.dataVisitors); 
    this.table.renderRows();

    this.bDataHaseChange= true;
    this.colorSave= 'warn'
  }

  edit(row: any): void {
    //console.log(row);
    this.__EditVisitorsDataService.setOpenVisitorEdit(row);
    this.goToEditPage = true;
    this.__Router.navigate(['/Database/EditVisitor']);
  }

  sort(): void {
    for (let i = 0; i < this.dataVisitors.length; i++) {
      this.dataVisitors[i].date = new Date(this.dataVisitors[i].date);
    }

    this.dataVisitors = this.dataVisitors.slice().sort((a: any, b: any) => b.date - a.date)
    this.__EditVisitorsDataService.setEditVisitors(this.dataVisitors);

    //nieuwe id
    for (let i = 0; i < this.dataVisitors.length; i++) {
      this.dataVisitors[i].id = i
    }

    this.__NotificationService.showNotification( 'info', 'Deelnemer gesorteerd!'); 

    this.bDataHaseChange= true;
    this.colorSave= 'warn'

    this.table.renderRows();
  }

  toggleNieuweDeelnemers(): void {
    if (this.NieuweDeelnemersTonen) {
      this.NieuweDeelnemersTonen = false;
    } else {
      this.NieuweDeelnemersTonen = true;
    }
  }

}
