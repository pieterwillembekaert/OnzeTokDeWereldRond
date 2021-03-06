import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { VisitorsService } from './../../../visitors.service';
import { EditVisitorsDataService } from '../../edit-visitors-data.service';
import { NieuweDeelnemerDataService } from '../../nieuwe-deelnemer-data.service';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { c_visitorsItem } from './../../DatabaseItem';
import { visitorsItem } from './../../DatabaseItem';

import {NotificationService}from './../../../Notification.service';

@Component({
  selector: 'app-nieuwe-deelnemer',
  templateUrl: './nieuwe-deelnemer.component.html',
  styleUrls: ['./nieuwe-deelnemer.component.css']
})
export class NieuweDeelnemerComponent implements OnInit {

  dataNewVisitors;
  dataVisitors;
  dataVisitor: visitorsItem;
  LoadData: boolean;
  displayedColumns: string[] = ['Bewerken', 'Naam', 'Land', 'Afstand', 'Datum', 'Afbeelding', "Email", "Opmerking"];
  @ViewChild(MatTable) table: MatTable<any>;

  bDataHaseChange: boolean= false;
  colorSave: string= "black";

  constructor(
    private __VisitorsService: VisitorsService,
    private __EditVisitorsDataService: EditVisitorsDataService,
    private __NieuweDeelnemerDataService: NieuweDeelnemerDataService,
    private __changeDetectorRef: ChangeDetectorRef,
    private __Router: Router,
    private __NotificationService: NotificationService,
  ) { }

  ngOnInit(): void {

    this.__NieuweDeelnemerDataService.getDataFromHttp().then(
      (response) => {
        this.dataNewVisitors = response.members;
        this.__NieuweDeelnemerDataService.setNieuweDeelnemersData(response.members);
        //console.log(response)

      },
      (error) => {
        console.log("error: ", error)
        this.__NotificationService.showNotification( 'error', 'Kan data niet ophalen :-/')
      }
    )

    this.__VisitorsService.getDataFromHttp().then(
      (response) => {
        this.dataVisitors = response.members;
        this.__EditVisitorsDataService.setEditVisitors(response.members);
        //console.log(response)

      },
      (error) => {
        console.log("error: ", error)
        this.__NotificationService.showNotification( 'error', 'Kan data niet ophalen :-/')
      }
    )
  }

  accept(row: any): void {
    //Add To data visitors
    this.dataVisitors.push(row);
    this.__EditVisitorsDataService.setEditVisitors(this.dataVisitors);
    this.__NotificationService.showNotification( 'success', 'Deelnemer toegevoegd');

    //delet row 
    this.delete(row);

  }

  saveNieuweDeelnemers(): void {
    //console.log("save Nieuwe Deelnemers")
    //console.log(this.dataNewVisitors); 
    this.__NieuweDeelnemerDataService.setNieuweDeelnemersData(this.dataNewVisitors)
    this.__NieuweDeelnemerDataService.saveDataToServer().then(
      msg => {
        console.log("done", msg);
        this.saveVisitors();

      },
      error => {
        console.log("error", error);
        this.__NotificationService.showNotification( 'error', 'Mislukt :-/')
      })
  }

  saveVisitors(): void {
    console.log("save visitor")
    this.__EditVisitorsDataService.saveDataToServer().then(
      msg => {
        console.log("done", msg);
        this.__NotificationService.showNotification( 'success', ' Opslaan gelukt!');

        this.bDataHaseChange= false;
        this.colorSave= 'black';

      },
      error => {
        console.log("error", error);
        this.__NotificationService.showNotification( 'error', 'Mislukt :-/')
      })
  }

  downloadVisitors(): void {
    console.log("download interviews")
  }


  delete(row: any): void {
    const index = this.dataNewVisitors.indexOf(row, 0);
    if (index > -1) {
      this.dataNewVisitors.splice(index, 1);
    }
    this.__NieuweDeelnemerDataService.setNieuweDeelnemersData(this.dataNewVisitors);

    this.__NotificationService.showNotification( 'warning', 'Deelnemer gewist');

    this.bDataHaseChange= true;
    this.colorSave= 'warn';

    this.table.renderRows();
  }


  sort(): void {
    for (let i = 0; i < this.dataNewVisitors.length; i++) {
      this.dataNewVisitors[i].date = new Date(this.dataNewVisitors[i].date);
    }
    this.dataNewVisitors = this.dataNewVisitors.slice().sort((a: any, b: any) => b.date - a.date);

    this.__NieuweDeelnemerDataService.setNieuweDeelnemersData(this.dataNewVisitors);

    this.__NotificationService.showNotification( 'info', 'Deelnemer gesorteerd');

    this.bDataHaseChange= true;
    this.colorSave= 'warn';

    this.table.renderRows();
  }
}
