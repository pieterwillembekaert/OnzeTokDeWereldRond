import { Component, OnInit } from '@angular/core';
import {InterviewsService} from '../interviews.service';


@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
  dataInterviews; 
  LoadData: boolean; 

  constructor(
    private __InterviewsService : InterviewsService,

  ) { }

  ngOnInit(): void {
    var $this = this;
    this.__InterviewsService.getDataFromHttp().then(
      function (response) {
        $this.dataInterviews= response.members;
        $this.LoadData= true;
        //console.log(response)
        
      },
      function (error) {
        $this.LoadData= false;
        console.log("error: ", error)
      }
    )

  }

}
