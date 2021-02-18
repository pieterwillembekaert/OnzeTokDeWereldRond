import { Component, OnInit, HostBinding } from '@angular/core';
import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, delay, tap, filter, map, takeUntil } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { QuillModule } from 'ngx-quill'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

/*Service*/
import { CountriesService } from './../../../countries.service';
import { EditInterviewsDatabaseService } from '../edit-interviews-database.service';
import { BondenService } from '../../../Bonden.service';
import { NotificationService } from './../../../Notification.service';
import { ManageUploadFolderService } from './../../manage-upload-folder.service';

/*interface and class */
import { Bank, BANKS, Counrtys } from '../demo-data';
import { CLocationDatabase } from "../../../clocationDatabase";
import { interviewItem, c_interviewItem } from '../../DatabaseItem';


@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.css']
})
export class EditInterviewComponent implements OnInit {
  markdownForm: FormGroup;
  richTextForm: FormGroup;
  OpenInterViewEditText: interviewItem;
  SaveInterViewEditText: interviewItem;
  bBackToHome: boolean = false;

  //upload post
  Url = new CLocationDatabase;
  postUrl = this.Url.getUrl() + 'upload';
  imagePath: string = "/upload/default.jpg";
  bSucceedUploadImage: boolean = false;

  //select image
  folderContent: string[] = [];
  LoadData: boolean;
  displayedImageColumns: string[] = ['Bewerken', 'Bestand', 'Afbeelding'];
  bOpenSelectImage: boolean = false;

  uploadPercent;
  files;
  filesEmpty;
  myFormData: FormData//populated by ngfFormData directive
  httpEvent: HttpEvent<{}>

  picker;
  Country: String;
  Bond: String;

  bDataHaseChange: boolean = false;
  colorSave: string = "black"

  /** list of countrys */
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
  public filteredServerSideBonden: ReplaySubject<String[]> = new ReplaySubject<String[]>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private __Router: Router,
    private __ManageUploadFolderService: ManageUploadFolderService,
    private __CountriesService: CountriesService,
    private __EditInterviewsDatabaseService: EditInterviewsDatabaseService,
    private __BondenService: BondenService,
    public __HttpClient: HttpClient,
    private __NotificationService: NotificationService,
  ) { }


  ngOnInit() {
    this.countrys = this.__CountriesService.getCountryAllTranslation();
    this.bonden = this.__BondenService.getBonden();

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

          //data hase change
          this.bDataHaseChange = true;
          this.colorSave = "warn";

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
        });
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
              //data hase change
              this.bDataHaseChange = true;
              this.colorSave = "warn";

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

    /**/
    this.OpenInterViewEditText = this.__EditInterviewsDatabaseService.getOpenInterViewEditText();
    if (!this.OpenInterViewEditText) {
      this.__Router.navigate(['/Database/OverviewInterviews']);

    }
    this.markdownForm = this._fb.group({
      name: ["", Validators.required],
      imgScr: ["", Validators.required],
      date: [new Date()],
      distance: [0, Validators.required],
      title: ["title", Validators.required],
      subtitle: ["subtitle", Validators.required],
      description: ["Text"]
    });

    this.Country = this.OpenInterViewEditText.countryTanslation;
    this.richTextForm = this._fb.group({
      name: [this.OpenInterViewEditText.name, Validators.required],
      imgScr: [this.OpenInterViewEditText.imgScr, Validators.required],
      date: [this.OpenInterViewEditText.date, Validators.required],
      title: [this.OpenInterViewEditText.title, Validators.required],
      distance: [this.OpenInterViewEditText.distance, Validators.required],
      subtitle: [this.OpenInterViewEditText.subTitle, Validators.required],
      description: [this.OpenInterViewEditText.text]
    });
  }


  ngOnDestroy(): void {
    if (!this.bBackToHome) {
      var r = confirm("Opgelet! Vergeet niet eerst op te slaan! ");
      if (r == true) {
        this.saveInterviews();

      }
    }

    this._onDestroy.next();
    this._onDestroy.complete();
  }


  saveInterviews(): void {

    this.bDataHaseChange = false;
    this.colorSave = "black"

    if (this.CountrysServerSideCtrl.value) {
      this.OpenInterViewEditText.countryTanslation = this.CountrysServerSideCtrl.value;
      let country = this.__CountriesService.convertTranslateCountryToCountry(this.OpenInterViewEditText.countryTanslation);
      this.OpenInterViewEditText.country = String(country);
    }

    if (this.BondenServerSideCtrl.value) {
      this.OpenInterViewEditText.bond = this.BondenServerSideCtrl.value;
    }

    this.OpenInterViewEditText.date = this.richTextForm.value.date;
    let year = new Date(this.richTextForm.value.date).getFullYear()
    this.OpenInterViewEditText.year = String(year);
    this.OpenInterViewEditText.imgScr = this.richTextForm.value.imgScr;
    this.OpenInterViewEditText.distance = this.richTextForm.value.distance;
    this.OpenInterViewEditText.title = this.richTextForm.value.title;
    this.OpenInterViewEditText.subTitle = this.richTextForm.value.subtitle;
    this.OpenInterViewEditText.text = this.richTextForm.value.description;


    this.__EditInterviewsDatabaseService.setOpenInterViewEditText(this.OpenInterViewEditText)
    this.__EditInterviewsDatabaseService.saveData(this.OpenInterViewEditText);
  }

  backToOverview(): void {
    this.bBackToHome = true;

    if (this.bDataHaseChange) {
      var r = confirm("Wenst u de aanpassing op te slaan? Druk op ok om de gegevens op te slaan.");
      if (r == true) {
        this.saveInterviews();
        this.__EditInterviewsDatabaseService.setDataHaseChangdWithoutSave(true);

        this.__Router.navigate(['/Database/OverviewInterviews']);
      } else {
        this.__Router.navigate(['/Database/OverviewInterviews']);
      }

    } else {
      console.log("back")
      this.__Router.navigate(['/Database/OverviewInterviews']);
    }

  }

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
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

  formDataHaseChange(event: Event) {
    console.log("data change")
    this.bDataHaseChange = true;
    this.colorSave = "warn"

  }

  uploadFiles(files: File): Subscription {
    this.richTextForm.value.imgScr = "/upload/" + files[0].name;
    this.imagePath = "/upload/" + files[0].name;

    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })

    return this.__HttpClient.request(config)
      .subscribe(event => {
        this.httpEvent = event
        this.files = this.filesEmpty;
        this.uploadPercent = 0;

        if (event instanceof HttpResponse) {
          //alert('upload complete, old school alert used')
        }
      },
        error => {
          console.log(error)
          if (error.status == 200) {
            this.bSucceedUploadImage = true;
            this.__NotificationService.showNotification('success', 'Gelukt!');
          } else {
            this.bSucceedUploadImage = false;
            this.__NotificationService.showNotification('error', 'Mislukt!');
          }
        })
  }

  get descriptionRawControl() {
    return this.markdownForm.controls.description as FormControl;
  }

  get descriptionRichControl() {
    return this.richTextForm.controls.description as FormControl;
  }

}


