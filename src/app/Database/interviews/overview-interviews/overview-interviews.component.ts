import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { InterviewsService } from '../../.././interviews.service';
import { EditInterviewsDatabaseService } from '../edit-interviews-database.service';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


/*Service*/
import {NotificationService}from './../../../Notification.service'

/*interface and class */
import { c_interviewItem, interviewItem } from '../../DatabaseItem';


@Component({
  selector: 'app-overview-interviews',
  templateUrl: './overview-interviews.component.html',
  styleUrls: ['./overview-interviews.component.css']
})
export class OverviewInterviewsComponent implements OnInit {
  dataInterviews: any;
  LoadData: boolean;
  goToEditPage: boolean = false;
  displayedColumns: string[] = ['bewerken', 'id', 'titel', 'subtitel', 'datum', 'afbeelding'];

  @ViewChild(MatTable) table: MatTable<any>;

  bDataHaseChange: boolean= false;
  colorSave: string= "black"

  constructor(
    private __InterviewsService: InterviewsService,
    private __EditInterviewsDatabaseService: EditInterviewsDatabaseService,
    private __changeDetectorRef: ChangeDetectorRef,
    private __Router: Router,
    private __NotificationService: NotificationService,
  ) { }

  ngOnInit(): void {

    this.bDataHaseChange= this.__EditInterviewsDatabaseService.getDataHaseChangdWithoutSave(); 
    if(this.bDataHaseChange) this.colorSave= 'warn'

    if (!this.__EditInterviewsDatabaseService.getEditInterviews()) {
      this.__InterviewsService.getDataFromHttp().then(
        (response) => {
          this.dataInterviews = response.members;
          this.__EditInterviewsDatabaseService.setEditInterviews(response.members);
          this.LoadData = true;
          //console.log(response)

        },
        (error) => {
          this.LoadData = false;
          console.log("error: ", error)
        }
      )
    } else {
      this.dataInterviews = this.__EditInterviewsDatabaseService.getEditInterviews();
    }

  }

  ngOnDestroy() {
    if (!this.goToEditPage && this.bDataHaseChange) {
      var r = confirm("Opgelet! Wijzigen gaan verloren zonder opslaan! Druk op ok om de aanpassingen op te slaan!");
      if (r == true) {
        this.saveInterviews();
      }
    }
  }

  newInterview(): void {
    var newData = new c_interviewItem();

    //nieuwe index
    newData.id = this.dataInterviews.length;

    //add data
    this.dataInterviews.push(newData);
    this.__EditInterviewsDatabaseService.setEditInterviews(this.dataInterviews);

    this.table.renderRows();

    this.edit(newData);

    this.__EditInterviewsDatabaseService.setDataHaseChangdWithoutSave(true); 
  }


  saveInterviews(): void {
    this.sort(); 

    this.__EditInterviewsDatabaseService.saveDataToServer().then(
      msg => {
        console.log("done", msg);
        this.bDataHaseChange= false;
        this.colorSave= 'black'
        this.__NotificationService.showNotification('success', 'Opgeslaan!');
      },
      error => {
        console.log("error", error);
        this.__NotificationService.showNotification('error', 'Mislukt :-/');
      })
  }

  downloadInterviews(): void {
    console.log("download interviews")
  }

  edit(row: any): void {
    //console.log(row);
    this.__EditInterviewsDatabaseService.setOpenInterViewEditText(row); 
    this.goToEditPage= true; 
    this.__Router.navigate(['/Database/EditInterview']);
  }

  delete(row: any): void {
    const index = this.dataInterviews.indexOf(row, 0);
    if (index > -1) {
      this.dataInterviews.splice(index, 1);
    }

    //nieuwe id
    for (let i = 0; i < this.dataInterviews.length; i++) {
      this.dataInterviews[i].id = i
    }

    this.__NotificationService.showNotification('warning', 'Deelnemer gewist!');

    this.__EditInterviewsDatabaseService.setEditInterviews(this.dataInterviews)
    this.table.renderRows();

    
    this.bDataHaseChange= true;
    this.colorSave= 'warn'
  }

  sort(): void {
    for (let i = 0; i < this.dataInterviews.length; i++) {
      this.dataInterviews[i].date = new Date(this.dataInterviews[i].date);

    }
    this.dataInterviews = this.dataInterviews.slice().sort((a: any, b: any) => b.date - a.date)
    this.__EditInterviewsDatabaseService.setEditInterviews(this.dataInterviews);

    //nieuwe id
    for (let i = 0; i < this.dataInterviews.length; i++) {
      this.dataInterviews[i].id = i
    }

    this.__NotificationService.showNotification('info', 'Deelnemer gesorteerd!'); 

    this.bDataHaseChange= true;
    this.colorSave= 'warn'

    this.table.renderRows();
  }


}
