import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, delay, tap, filter, map, takeUntil } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { QuillModule } from 'ngx-quill'
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";


//https://stackblitz.com/edit/ngx-mat-select-search?file=src%2Fapp%2Fexamples%2F01-single-selection-example%2Fsingle-selection-example.component.ts


/*Service */
import { CountriesService } from './../../../countries.service';
import { BondenService } from '../../../Bonden.service';
import { EditVisitorsDataService } from './../../edit-visitors-data.service';
import { ManageUploadFolderService } from './../../manage-upload-folder.service';

/*interface and class */
import { CLocationDatabase } from "../../../clocationDatabase";
import { visitorsItem, c_visitorsItem, iBond, cBond } from './../../DatabaseItem';



@Component({
  selector: 'app-edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.css']
})
export class EditVisitorComponent implements OnInit {
  markdownForm: FormGroup;
  richTextForm: FormGroup;
  OpenVisitorViewEditText: visitorsItem;
  checkIfDataChangesVisitorViewEditText: visitorsItem;
  bBackToHome: boolean = false;

  //upload post
  Url = new CLocationDatabase;
  postUrl = this.Url.getUrl() + 'upload';
  bSucceedUploadImage: boolean = false;

  uploadPercent;
  files;
  filesEmpty;
  myFormData: FormData//populated by ngfFormData directive
  httpEvent: HttpEvent<{}>
  imagePath: string = "/upload/default.jpg";

  //select image
  folderContent: string[] = []; 
  LoadData: boolean;
  displayedImageColumns: string[] = ['Bewerken', 'Bestand', 'Afbeelding'];
  bOpenSelectImage: boolean = false;

  picker;
  Country: String;
  Bond: String;

  /** list of .. */
  protected countrys: any;
  protected bonden: any;

  /** control for the selected bank for server side filtering */
  public CountrysServerSideCtrl: FormControl = new FormControl();
  public BondenServerSideCtrl: FormControl = new FormControl();

  /** control for filter for server side. */
  public CountrysServerSideFilteringCtrl: FormControl = new FormControl();
  public BondenServerSideFilteringCtrl: FormControl = new FormControl();

  /** indicate search operation is in progress */
  public searchingCountrys = false;
  public searchingBonden = false;

  /** list of data filtered after simulating server side search */
  public filteredServerSideCounrtys: ReplaySubject<String[]> = new ReplaySubject<String[]>(1);
  public filteredServerSideBonden: ReplaySubject<iBond[]> = new ReplaySubject<iBond[]>(1);


  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private __route: ActivatedRoute,
    private __Router: Router,
    private __ManageUploadFolderService: ManageUploadFolderService,
    private __CountriesService: CountriesService,
    private __EditVisitorsDataService: EditVisitorsDataService,
    public __HttpClient: HttpClient,
    private __BondenService: BondenService,
    private __changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.countrys = this.__CountriesService.getCountryAllTranslation();
    this.bonden = this.__BondenService.getBonden();

    // set initial selection


    // listen for search field value changes
    this.CountrysServerSideFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searchingCountrys = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => {
          if (!this.countrys) {
            return [];
          }

          // simulate server fetching and filtering data
          return this.countrys.filter(country => country.toLowerCase().indexOf(search.toLowerCase()) > -1);
        }),
        delay(500),
        takeUntil(this._onDestroy)
      )
      .subscribe(filtered => {
        this.searchingCountrys = false;
        this.filteredServerSideCounrtys.next(filtered);
      },
        error => {
          // no errors in our simulated example
          this.searchingCountrys = false;
          // handle error...
        })


    /*Searche bond */
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
          // handle error...
        });

    /*Open data from the server*/
    this.OpenVisitorViewEditText = this.__EditVisitorsDataService.getOpenVisitorEdit();
    this.checkIfDataChangesVisitorViewEditText = this.__EditVisitorsDataService.getOpenVisitorEdit();
    if (!this.OpenVisitorViewEditText) {
      //Terug wanneer de data niet beschikbaar is. 
      this.__Router.navigate(['/Database/EditVisitors']);
    }


    this.Country = this.OpenVisitorViewEditText.countryTanslation;
    if (this.OpenVisitorViewEditText.imgScr) {
      this.imagePath = this.OpenVisitorViewEditText.imgScr;
    }

    this.richTextForm = this._fb.group({
      name: [this.OpenVisitorViewEditText.name, Validators.required],
      imgScr: [this.OpenVisitorViewEditText.imgScr, Validators.required],
      date: [this.OpenVisitorViewEditText.date, Validators.required],
      distance: [this.OpenVisitorViewEditText.distance, Validators.required],
    });

  }

  ngOnDestroy(): void {
    if (!this.bBackToHome) {
      var r = confirm("Opgelet! Vergeet niet eerst op te slaan! ");
      if (r == true) {
        this.saveVisitor();
        this.__EditVisitorsDataService.saveDataToServer();
        alert("Opslaan gelukt! ");

      }
    }

    this._onDestroy.next();
    this._onDestroy.complete();
  }

  saveVisitor(): void {

    if (this.CountrysServerSideCtrl.value) {
      this.OpenVisitorViewEditText.countryTanslation = this.CountrysServerSideCtrl.value;
      let country = this.__CountriesService.convertTranslateCountryToCountry(this.OpenVisitorViewEditText.countryTanslation);
      this.OpenVisitorViewEditText.country = String(country);
    }

    if (this.BondenServerSideCtrl.value) {
      this.OpenVisitorViewEditText.bond = this.BondenServerSideCtrl.value;
    }

    if (!this.richTextForm.value.imgScr) {
      this.OpenVisitorViewEditText.imgScr = this.imagePath;
    } else {
      this.OpenVisitorViewEditText.imgScr = this.richTextForm.value.imgScr;
    }

    let year = new Date(this.richTextForm.value.date).getFullYear()
    this.OpenVisitorViewEditText.year = String(year);
    this.OpenVisitorViewEditText.name = this.richTextForm.value.name;
    this.OpenVisitorViewEditText.date = this.richTextForm.value.date;
    this.OpenVisitorViewEditText.distance = this.richTextForm.value.distance;

  }

  backToOverview(): void {

    var r = confirm("Opgelet! Vergeet niet eerst op te slaan! Wil je terug gaan naar het overzicht?");
    if (r == true) {
      this.bBackToHome= true;
      var rr = confirm("Wenst u de gegevens permanent op te slaan naar de server?");
      if (rr == true) {
        this.bBackToHome= true; 
        this.__EditVisitorsDataService.saveDataToServer();
        alert("Opslaan gelukt! ");
        this.__Router.navigate(['/Database/EditVisitors']);
      } else {
        this.__Router.navigate(['/Database/EditVisitors']);

      }
    }
  }

  onFileComplete(data: any) {
    console.log(data);
  }

  openSelectImage() {
    this.bOpenSelectImage = true;

    this.__ManageUploadFolderService.getDataFromHttp().then(
      (response) => {
        console.log(response)
        this.folderContent = response;
        //console.log(response)

      },
      (error) => {
        console.log("error: ", error)
      }
    )

  }

  closeSelectImage() {
    this.bOpenSelectImage = false;

  }


  selectImage(row) {
    console.log(row)
    this.richTextForm.value.imgScr = "/upload/" + row;
    this.imagePath = "/upload/" + row;
  }
  uploadFiles(files: File): Subscription {
    this.richTextForm.value.imgScr = "/upload/" + files[0].name;
    this.imagePath = "/upload/" + files[0].name;

    this.__changeDetectorRef.detectChanges();
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })

    return this.__HttpClient.request(config)
      .subscribe(event => {
        this.httpEvent = event
        this.files = this.filesEmpty;

        if (event instanceof HttpResponse) {
          console.log('upload complete')
        }
      },
        error => {
          console.log(error)
          if (error.status == 200) {
            this.bSucceedUploadImage = true;
            alert('Gelukt');
          } else {
            this.bSucceedUploadImage = false;
            alert('Upload foto mislukt');
          }
        })
  }

}
