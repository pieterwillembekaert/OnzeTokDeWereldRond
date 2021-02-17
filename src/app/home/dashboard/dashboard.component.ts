import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { VisitorsService } from '../../visitors.service';
import { CountriesService } from '../../countries.service';
import { TotalDistService } from '../../total-dist.service';
import { GeneralService } from '../../general.service';

import { cDashbordVars, DashboardVars } from './DashboardVars';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  data = new cDashbordVars;
  dataVisitors;
  LoadData: boolean;

  SelectYear = ["alles"];
  bShowSelection: boolean = false;
  selectedYear = this.__GeneralService.getFullYear();

  constructor(
    private __VisitorsService: VisitorsService,
    private __CountriesService: CountriesService,
    private __TotalDistService: TotalDistService,
    private __GeneralService: GeneralService,
  ) { }



  ngOnInit(): void {
    this.LoadData = false;
    let currentYear = this.__GeneralService.getFullYear();
    //debug

    //Get data
    this.__TotalDistService.getDataFromHttp(currentYear).then(
      (response) => {
        this.data = response;
        this.LoadData = true;
        //console.log(response)

      },
      (error) => {
        this.LoadData = false;
        console.log("error: ", error)
      }
    )

    this.__VisitorsService.getDataFromHttp().then(
      response => {
        //console.log(response)

        this.dataVisitors = response;
        this.searchYearInDataFromDb();
      },
      error => {
        console.log("error: ", error)
      }
    )
  }

  searchYearInDataFromDb(): void {

    var lijstMetJaartallen: String[] = [""];
    var lijstMetJaartallenUniq;

    let uniq = a => { return [...new Set(a)] }

    for (let i = 0; i < this.dataVisitors.members.length; i++) {
      lijstMetJaartallen[i] = this.dataVisitors.members[i].year;
    }

    lijstMetJaartallenUniq = uniq(lijstMetJaartallen);

    for (let i = 0; i < lijstMetJaartallenUniq.length; i++) {
      this.SelectYear[i + 1] = lijstMetJaartallenUniq[i];
    }

    this.bShowSelection = true;
  }

  changeData(): void {
    this.LoadData = false;

    //Get data
    this.__TotalDistService.getDataFromHttp(this.selectedYear).then(
      (response) => {
        this.data = response;
        this.LoadData = true;
        //console.log(response)

      },
      (error) => {
        this.LoadData = false;
        console.log("error: ", error)
      }
    )
  }



  selectYear(event: Event) {

    this.selectedYear = Number((event.target as HTMLSelectElement).value);
    this.changeData();
  }

}
