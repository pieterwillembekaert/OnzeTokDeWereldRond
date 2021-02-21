import { Component, OnInit, HostBinding } from '@angular/core';
import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, delay, tap, filter, map, takeUntil } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent } from "@angular/common/http"
import { Subscription } from 'rxjs'
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { QuillModule } from 'ngx-quill';



/*Service */
import { CountriesService } from './../countries.service';
import { NieuweDeelnemerOpsturenService } from './nieuwe-deelnemer-opsturen.service';
import { BondenService } from '../Bonden.service';
import {NotificationService}from '../Notification.service';


/*interface and class */
import { CLocationDatabase } from "../clocationDatabase";
import { c_nieuweDeelnemerItem, nieuweDeelnemerItem, iBond, cBond } from './../Database/DatabaseItem';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-deelnemen',
  templateUrl: './deelnemen.component.html',
  styleUrls: ['./deelnemen.component.css']
})
export class DeelnemenComponent implements OnInit {
  //markdownForm: FormGroup;
  richTextForm: FormGroup;

  SaveNewVisitorEditText = new c_nieuweDeelnemerItem;

  //upload post
  Url = new CLocationDatabase;
  postUrl = this.Url.getUrl() + 'upload';

  uploadPercent;
  files;
  filesEmpty;
  myFormData: FormData
  httpEvent: HttpEvent<{}>

  //picker;
  Country: String;
  Bond: String;

  afbeeldingDeelnemerScr: String = "";

  basisGevensDeelnemer: FormGroup;
  bezoekGegevensDeelnemer: FormGroup;
;
  afbeeldingDeelnemer: FormGroup;
  doneDeelnemer: FormGroup;
  isEditable = true;
  bFoutInFormulier: boolean = false;
  sFoutInFormulier: string = ";"
  done: boolean = false;
  bSucceedUploadImage: boolean = false;
  testImage: string; 

  endResultBond: iBond= new cBond(); 

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vul een waarde in!';
    }

    return this.email.hasError('email') ? 'Ongeldig emailadres' : '';
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

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
    private __BondenService: BondenService,
    private __CountriesService: CountriesService,
    public __HttpClient: HttpClient,
    public __NieuweDeelnemerOpsturenService: NieuweDeelnemerOpsturenService,
    private _formBuilder: FormBuilder,
    private __NotificationService: NotificationService,
  ) { }

  ngOnInit(): void {

    this.basisGevensDeelnemer = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.bezoekGegevensDeelnemer = this._formBuilder.group({
      distance: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.afbeeldingDeelnemer = this._formBuilder.group({
      imgScr: [''],
    });
    this.doneDeelnemer = this._formBuilder.group({
      opmerking: [''],
    });


    this.countrys = this.__CountriesService.getCountryAllTranslation();
    this.bonden= this.__BondenService.getBonden();

    // listen for search field value changes
    this.CountrysServerSideFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searchingCountrys = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => {
          if (!this.countrys) return [];

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

    this.richTextForm = this._fb.group({
      name: ["", Validators.required],
      imgScr: ["", Validators.required],
      date: [new Date()],
      email: ["", Validators.required],
      distance: [0, Validators.required],
      opmerking: ["", Validators.required],
    });
  }

  opsturen(): void {
    this.bFoutInFormulier = false;
    this.done = false;
    this.sFoutInFormulier = "";

    //check data
    if (!this.basisGevensDeelnemer.value.name || "") {
      this.bFoutInFormulier = true;
      this.sFoutInFormulier = "Vul uw naam in! ";
      this.__NotificationService.showNotification( 'error', 'Vul uw naam in!')
      console.log("Vul uw naam in!");
      return;
    }

    if (!this.BondenServerSideCtrl.value || "") {
      this.bFoutInFormulier = true;
      this.sFoutInFormulier = this.sFoutInFormulier + "Kies uw bond! ";
      this.__NotificationService.showNotification( 'error', 'Kies uw bond!')
      console.log("Kies uw bond!");
      return;
    }

    if (!this.basisGevensDeelnemer.value.email || "") {
      this.bFoutInFormulier = true;
      this.sFoutInFormulier = this.sFoutInFormulier + "Vul uw emailadres in ";
      this.__NotificationService.showNotification( 'error', 'Vul uw emailadres in!')
      console.log("Vul uw emailadres in!");
      return;
    }

    if (!this.CountrysServerSideCtrl.value || "") {
      this.bFoutInFormulier = true;
      this.sFoutInFormulier = this.sFoutInFormulier + "Kies een land! ";
      this.__NotificationService.showNotification( 'error', 'Kies een land!')
      console.log("Kies een land!");
      return;
    }

    if (!this.bezoekGegevensDeelnemer.value.date || "") {
      this.bFoutInFormulier = true;
      this.sFoutInFormulier = this.sFoutInFormulier + "Kies een datum ";
      this.__NotificationService.showNotification( 'error', 'Kies een datum')
      console.log("Kies een datum");
      return;
    }

    if (!this.afbeeldingDeelnemerScr || "") {
      this.bFoutInFormulier = true;
      this.sFoutInFormulier = this.sFoutInFormulier + "Geen afbeelding gevonden ";
      this.__NotificationService.showNotification( 'error', 'geen afbeelding gevonden')
      console.log("geen afbeelding gevonden");
      return;
    }

    this.done = true;

    //Basis gegevens
    this.SaveNewVisitorEditText.name = this.basisGevensDeelnemer.value.name;
    this.SaveNewVisitorEditText.email = this.basisGevensDeelnemer.value.email;
    this.SaveNewVisitorEditText.bond = this.BondenServerSideCtrl.value;

    //Land
    this.SaveNewVisitorEditText.countryTanslation = this.CountrysServerSideCtrl.value;
    let country = this.__CountriesService.convertTranslateCountryToCountry(this.SaveNewVisitorEditText.countryTanslation);
    this.SaveNewVisitorEditText.country = String(country);


    //bezoekers gegevens 
    this.SaveNewVisitorEditText.date = this.bezoekGegevensDeelnemer.value.date;
    this.SaveNewVisitorEditText.distance = this.bezoekGegevensDeelnemer.value.distance;
    let year = new Date(this.bezoekGegevensDeelnemer.value.date).getFullYear()
    this.SaveNewVisitorEditText.year = String(year);

    //Foto
    this.SaveNewVisitorEditText.imgScr = this.afbeeldingDeelnemer.value.imgScr;

    //opmerking
    this.SaveNewVisitorEditText.opmerking = this.doneDeelnemer.value.opmerking;

    this.__NieuweDeelnemerOpsturenService.saveDataToServer(this.SaveNewVisitorEditText).then(
      msg => {
        console.log("done", msg);
        this.__NotificationService.showNotification( 'success', 'Gelukt! Bedankt voor het deelnemen')
        
      },
      error => {
        console.log("error", error);
        this.__NotificationService.showNotification( 'error', 'Mislukt')
      })
  }

  reset(){
    //Reset formulier
    this.bSucceedUploadImage = false;
    this.done= false; 
  }

  updateBond(){
    console.log("bond");
    console.log(this.BondenServerSideCtrl.value)
    this.endResultBond= this.BondenServerSideCtrl.value;

  }

 
  uploadFiles(files: File): Subscription {
    this.richTextForm.value.imgScr = "/upload/" + files[0].name;
    this.afbeeldingDeelnemer.value.imgScr = "/upload/" + files[0].name;
    this.afbeeldingDeelnemerScr= "/upload/" + files[0].name;
    this.bSucceedUploadImage = false;
    
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })

    return this.__HttpClient.request(config)
      .subscribe(event => {
        this.httpEvent = event
        this.files = this.filesEmpty;

        if (event instanceof HttpResponse) {
          this.bSucceedUploadImage = true;
        }
      },
        error => {
          console.log(error)
          if (error.status == 200) {
            this.bSucceedUploadImage = true;          
            this.__NotificationService.showNotification( 'success', 'Gelukt!')
          } else {
            this.bSucceedUploadImage = false;
            this.__NotificationService.showNotification( 'error', 'Upload foto mislukt')
          }
        })
  }

}
