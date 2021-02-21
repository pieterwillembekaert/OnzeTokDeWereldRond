import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, delay, tap, filter, map, takeUntil } from 'rxjs/operators';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs'
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { QuillModule } from 'ngx-quill';
import { MatSelect } from '@angular/material/select';
import { take } from 'rxjs/operators';

/*Service*/
import { VisitorsService } from '../../visitors.service';
import { CountriesService } from '../../countries.service';
import { TotalDistService } from '../../total-dist.service';
import { GeneralService } from '../../general.service';
import { BondenService } from '../../Bonden.service';

/*interface and class */
import { cDashbordVars, DashboardVars } from './DashboardVars';
import { c_nieuweDeelnemerItem, nieuweDeelnemerItem, iBond, cBond } from '../../Database/DatabaseItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  data = new cDashbordVars;
  dataVisitors;
  LoadData: boolean = false;

  SelectYear = ["alles"];
  bShowSelection: boolean = false;
  selectedYear = this.__GeneralService.getFullYear();

  /**picker*/
  Country: String;
  Bond: String;

  /** list of elements */
  protected bonden: iBond[];

  /** control for the selected bank for server side filtering */
  public BondenServerSideCtrl: FormControl = new FormControl();

  /** control for filter for server side. */
  public BondenServerSideFilteringCtrl: FormControl = new FormControl();

  /** indicate search operation is in progress */
  public searchingBonden = false;

  /** list of data filtered after simulating server side search */
  public filteredServerSideBonden: ReplaySubject<iBond[]> = new ReplaySubject<iBond[]>(1);


  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private __BondenService: BondenService,
    private __VisitorsService: VisitorsService,
    private __CountriesService: CountriesService,
    private __TotalDistService: TotalDistService,
    private __GeneralService: GeneralService,
  ) { }



  ngOnInit(): void {

    let currentYear = this.__GeneralService.getFullYear();
    this.bonden = this.__BondenService.getBonden();


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

    /*Searche bond */
    this.BondenServerSideCtrl.setValue(this.bonden[0]);

    // load the initial bonden list
    this.filteredServerSideBonden.next(this.bonden.slice());

    //listen for search field value changes
    this.BondenServerSideFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searchingBonden = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => {
          if (!this.bonden) {
            return [];
          }

          // simulate server fetching and filtering data
          return this.bonden.filter(
            (bond: any) => {
              //number in string? 
              var regex = /\d+/g;
              var matches = search.match(regex);  // creates array from matches

              if (!matches) {
                return bond.bond.toLowerCase().indexOf(search.toLowerCase()) > -1
              } else {

                let toStringBondCode = String(bond.code);
                return toStringBondCode.toLowerCase().indexOf(search.toLowerCase()) > -1

              }
            });
        }),
        delay(500),
        takeUntil(this._onDestroy)
      )
      .subscribe(filtered => {
        this.searchingBonden = false;
        this.filteredServerSideBonden.next(filtered);
      },
        error => {
          // no errors in our simulated example
          this.searchingBonden = false;
        });

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
