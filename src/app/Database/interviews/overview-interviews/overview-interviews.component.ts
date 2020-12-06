import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import {InterviewsService} from '../../.././interviews.service';
import {EditInterviewsDatabaseService} from '../edit-interviews-database.service';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';

import { interviewItem } from '../../DatabaseItem';
import { c_interviewItem } from '../../DatabaseItem';

@Component({
  selector: 'app-overview-interviews',
  templateUrl: './overview-interviews.component.html',
  styleUrls: ['./overview-interviews.component.css']
})
export class OverviewInterviewsComponent implements OnInit {
  dataInterviews: any;  
  LoadData: boolean; 
  displayedColumns: string[] = ['bewerken', 'id', 'titel', 'subtitel','datum', 'afbeelding'];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private __InterviewsService : InterviewsService,
    private __EditInterviewsDatabaseService: EditInterviewsDatabaseService,
    private __changeDetectorRef: ChangeDetectorRef,
    private __Router: Router,
    
  ) { }

  ngOnInit(): void {
    var $this = this;
    if(!this.__EditInterviewsDatabaseService.getEditInterviews()){
    this.__InterviewsService.getDataFromHttp().then(
      function (response) {
        $this.dataInterviews= response.members;
        $this.__EditInterviewsDatabaseService.setEditInterviews(response.members);
        $this.LoadData= true;
        //console.log(response)
        
      },
      function (error) {
        $this.LoadData= false;
        console.log("error: ", error)
      }
    )
  }else{
    this.dataInterviews= this.__EditInterviewsDatabaseService.getEditInterviews();

  }

  }

  newInterview():void{
    var newData= new c_interviewItem(); 
    
    //nieuwe index
    newData.id= this.dataInterviews.length; 
    //add data
    this.dataInterviews.push(newData); 
    this.__EditInterviewsDatabaseService.setEditInterviews(this.dataInterviews);
    this.table.renderRows();
  }


  saveInterviews():void{
    
    this.__EditInterviewsDatabaseService.saveDataToServer();
  }

  downloadInterviews():void{
    console.log("download interviews")
  }

  edit(row: any): void {
    //console.log(row);
    this.__EditInterviewsDatabaseService.setOpenInterViewEditText(row)
    this.__Router.navigate(['/Database/EditInterview']);
  }

  delete(row: any): void {
    const index = this.dataInterviews.indexOf(row, 0);
    if (index > -1) {
      this.dataInterviews.splice(index, 1);
    }
    this.__EditInterviewsDatabaseService.setEditInterviews(this.dataInterviews)
    this.table.renderRows();
  }
  
  sort():void{
    for (let i = 0; i < this.dataInterviews.length; i++) {
      this.dataInterviews[i].date= new Date(this.dataInterviews[i].date);
      
    } 
    this.dataInterviews = this.dataInterviews.slice().sort((a:any, b:any) => b.date - a.date)
    this.__EditInterviewsDatabaseService.setEditInterviews(this.dataInterviews);
    this.table.renderRows();
  }


}
