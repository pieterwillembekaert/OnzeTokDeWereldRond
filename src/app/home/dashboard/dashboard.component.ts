import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { VisitorsService } from '../../visitors.service';
import { CountriesService } from '../../countries.service';
import { TotalDistService } from '../../total-dist.service';
import { GeneralService } from '../../general.service';
import { DashboardVars } from './DashboardVars';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
  data :DashboardVars; 
  LoadData: boolean; 

  
  SelectYear = ["alles", 2020, 2019, 2018];
  selectedYear= this.__GeneralService.getFullYear();

  constructor(
    private __VisitorsService: VisitorsService,
    private __CountriesService: CountriesService,
    private __TotalDistService: TotalDistService,
    private __GeneralService: GeneralService,

  ) { }

 

  ngOnInit(): void {
    this.LoadData= false; 
    let currentYear = this.__GeneralService.getFullYear();
    //debug
    //console.log(currentYear)
    //Get data
    var $this = this;
    this.__TotalDistService.getDataFromHttp(currentYear).then(
      function (response) {
        $this.data= response;
        $this.LoadData= true;
        //console.log(response)
        
      },
      function (error) {
        $this.LoadData= false;
        console.log("error: ", error)
      }
    )
  }

  changeData(): void {
    this.LoadData= false; 
    console.log(this.selectedYear)
    //Get data
    var $this = this;
    this.__TotalDistService.getDataFromHttp(this.selectedYear).then(
      function (response) {
        $this.data= response;
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
