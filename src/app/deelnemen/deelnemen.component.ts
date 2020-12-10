import { Component, OnInit, HostBinding } from '@angular/core';
import { AfterViewInit,  OnDestroy,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {debounceTime, delay, tap, filter, map, takeUntil} from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import {FormGroupDirective, NgForm} from '@angular/forms';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import {Subscription} from 'rxjs'
import {FormBuilder,FormGroup,FormControl,Validators} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import {QuillModule} from 'ngx-quill'

import { CountriesService } from './../countries.service';
import { NieuweDeelnemerOpsturenService } from './nieuwe-deelnemer-opsturen.service';
import { Bank, BANKS, Counrtys } from './../Database/visitors/demo-data-visitor';

import { c_nieuweDeelnemerItem, nieuweDeelnemerItem} from './../Database/DatabaseItem';

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
  markdownForm: FormGroup;
  richTextForm: FormGroup;
  OpenVisitorViewEditText;  
  SaveVisitorViewEditText;
  SaveNewVisitorEditText= new c_nieuweDeelnemerItem;

  postUrl = 'http://localhost:3000/upload'
  //postUrl = '/upload'
  
  uploadPercent;
  files;
  filesEmpty;
  myFormData:FormData
  httpEvent:HttpEvent<{}>

  picker; 
  Country: String; 
  afbeeldingDeelnemerScr: String=""; 

  basisGevensDeelnemer: FormGroup;
  bezoekGegevensDeelnemer: FormGroup;
  landDeelnemer: FormGroup;
  afbeeldingDeelnemer: FormGroup;
  doneDeelnemer: FormGroup;
  isEditable = true;
  bFoutInFormulier: boolean= false; 
  sFoutInFormulier: string= ";"
  done: boolean= false;

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

   /** control for the selected bank for server side filtering */
   public CountrysServerSideCtrl: FormControl = new FormControl();

   /** control for filter for server side. */
   public CountrysServerSideFilteringCtrl: FormControl = new FormControl();

  /** indicate search operation is in progress */
  public searching = false;

  /** list of banks filtered after simulating server side search */
  public  filteredServerSideCounrtys: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private __route: ActivatedRoute,
    private __Router: Router,
    private __CountriesService: CountriesService,
    public __HttpClient:HttpClient,
    public __NieuweDeelnemerOpsturenService: NieuweDeelnemerOpsturenService,
    private _formBuilder: FormBuilder,
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


    this.countrys= this.__CountriesService.getCountryAllTranslation();
    
    // listen for search field value changes
    this.CountrysServerSideFilteringCtrl.valueChanges
    .pipe(
      filter(search => !!search),
      tap(() => this.searching = true),
      takeUntil(this._onDestroy),
      debounceTime(200),
      map(search => {
        if (!this.countrys) {
          return [];
        }

        // simulate server fetching and filtering data
        return this.countrys.filter(country => country.toLowerCase().indexOf(search) > -1);
      }),
      delay(500),
      takeUntil(this._onDestroy)
    )
    .subscribe(filteredBanks => {
      this.searching = false;
      this.filteredServerSideCounrtys.next(filteredBanks);
    },
      error => {
        // no errors in our simulated example
        this.searching = false;
        // handle error...
      });

      this.markdownForm = this._fb.group({
        name: ["", Validators.required], 
        imgScr: ["", Validators.required], 
        email: ["", Validators.required], 
        date: [new Date()],
        distance: [0, Validators.required], 
        opmerking: ["", Validators.required], 
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

  opsturen():void{
    this.bFoutInFormulier= false;
    this.done= false; 
    this.sFoutInFormulier= "";
    //check data
    if(!this.basisGevensDeelnemer.value.name || ""){
      this.bFoutInFormulier= true;
      this.sFoutInFormulier= "Vul uw naam in! ";
      console.log("Vul uw naam in!");
      return;
    }

    if(!this.basisGevensDeelnemer.value.email || ""){
      this.bFoutInFormulier= true;
      this.sFoutInFormulier=this.sFoutInFormulier + "Vul uw emailadres in ";
      console.log("Vul uw emailadres in!");
      return;
    }

    if(!this.CountrysServerSideCtrl.value || ""){
      this.bFoutInFormulier= true;
      this.sFoutInFormulier=this.sFoutInFormulier + "Kies een land! ";
      console.log("Kies een land!");
      return;
    }

    if(!this.bezoekGegevensDeelnemer.value.date || ""){
      this.bFoutInFormulier= true;
      this.sFoutInFormulier=this.sFoutInFormulier + "Kies een datum ";
      console.log("Kies een datum");
      return;
    }

    if(!this.afbeeldingDeelnemerScr || ""){
      this.bFoutInFormulier= true;
      this.sFoutInFormulier=this.sFoutInFormulier + "geen afbeelding gevonden ";
      console.log("geen afbeelding gevonden");
      return;
    }

    this.done= true; 

    //Basis gegevens
    this.SaveNewVisitorEditText.name= this.basisGevensDeelnemer.value.name;
    this.SaveNewVisitorEditText.email= this.basisGevensDeelnemer.value.email;

     //Land
     this.SaveNewVisitorEditText.countryTanslation= this.CountrysServerSideCtrl.value;
     let country= this.__CountriesService.convertTranslateCountryToCountry(this.SaveNewVisitorEditText.countryTanslation);
     this.SaveNewVisitorEditText.country= String(country); 


     //bezoekers gegevens 
     this.SaveNewVisitorEditText.date= this.bezoekGegevensDeelnemer.value.date;
     this.SaveNewVisitorEditText.distance= this.bezoekGegevensDeelnemer.value.distance;
     let year= new Date(this.bezoekGegevensDeelnemer.value.date).getFullYear()
     this.SaveNewVisitorEditText.year= String(year);

     //Foto
     this.SaveNewVisitorEditText.imgScr= this.afbeeldingDeelnemer.value.imgScr; 

     //opmerking
     this.SaveNewVisitorEditText.opmerking= this.doneDeelnemer.value.opmerking;
   
    this.__NieuweDeelnemerOpsturenService.saveDataToServer(this.SaveNewVisitorEditText); 
  }

  uploadFiles(files:File) : Subscription {
    this.richTextForm.value.imgScr= 	"/upload/" + files[0].name;
    this.afbeeldingDeelnemer.value.imgScr= 	"/upload/" + files[0].name;
    this.afbeeldingDeelnemerScr= "/upload/" + files[0].name;
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })
  
    return this.__HttpClient.request( config )
    .subscribe(event=>{
      this.httpEvent = event
      this.files= this.filesEmpty;
  
      if (event instanceof HttpResponse) {
        //alert('upload complete, old school alert used')
      }
    },
    error=>{
      //alert('!failure beyond compare cause:' + error.toString())
    })
  }

}
