import { Component, OnInit, HostBinding } from '@angular/core';
import { AfterViewInit,  OnDestroy,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {debounceTime, delay, tap, filter, map, takeUntil} from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import { Subscription } from 'rxjs'


import { CountriesService } from './../../../countries.service';
import {EditVisitorsDataService} from './../../edit-visitors-data.service';
import { Bank, BANKS, Counrtys } from '../demo-data-visitor';

import {FormBuilder,FormGroup,FormControl,Validators} from "@angular/forms";

import {QuillModule} from 'ngx-quill'

import { c_visitorsItem } from './../../DatabaseItem';
import { visitorsItem } from './../../DatabaseItem';


@Component({
  selector: 'app-edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.css']
})
export class EditVisitorComponent implements OnInit {
  markdownForm: FormGroup;
  richTextForm: FormGroup;
  OpenVisitorViewEditText: visitorsItem; 
  SaveVisitorViewEditText: visitorsItem; 

  postUrl = 'http://localhost:3000/upload'
  //postUrl = '/upload'
  
  uploadPercent;
  files;
  filesEmpty;
  myFormData:FormData//populated by ngfFormData directive
  httpEvent:HttpEvent<{}>

  picker; 
  Country: String; 

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
    private __EditVisitorsDataService: EditVisitorsDataService,
    public __HttpClient:HttpClient,
  ) { }

  ngOnInit(): void {
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

   /*Open data from the server*/
   this.OpenVisitorViewEditText=this.__EditVisitorsDataService.getOpenVisitorEdit();
   if(!this.OpenVisitorViewEditText){
     //Terug wanneer de data niet beschikbaar is. 
     this.__Router.navigate(['/Database/EditVisitors']);

   }
   this.markdownForm = this._fb.group({
     name: ["", Validators.required], 
     imgScr: ["", Validators.required], 
     date: [new Date()],
     distance: [0, Validators.required], 
   
   });

   

   this.Country= this.OpenVisitorViewEditText.countryTanslation; 
   this.richTextForm = this._fb.group({
     name: [this.OpenVisitorViewEditText.name, Validators.required], 
     imgScr: [this.OpenVisitorViewEditText.imgScr, Validators.required], 
     date: [this.OpenVisitorViewEditText.date, Validators.required],
     distance: [this.OpenVisitorViewEditText.distance, Validators.required], 
   });
   console.log(this.richTextForm)
 }

 ngOnDestroy() : void {
  this._onDestroy.next();
  this._onDestroy.complete();
}
saveInterviews():void{

  if(this.CountrysServerSideCtrl.value){
    this.OpenVisitorViewEditText.countryTanslation= this.CountrysServerSideCtrl.value;
    let country= this.__CountriesService.convertTranslateCountryToCountry(this.OpenVisitorViewEditText.countryTanslation);
    this.OpenVisitorViewEditText.country= String(country);
  }

  let year= new Date(this.richTextForm.value.date).getFullYear()
  this.OpenVisitorViewEditText.year= String(year);
  this.OpenVisitorViewEditText.name=this.richTextForm.value.name; 
  this.OpenVisitorViewEditText.imgScr=this.richTextForm.value.imgScr;
  this.OpenVisitorViewEditText.date= this.richTextForm.value.date; 
  this.OpenVisitorViewEditText.distance= this.richTextForm.value.distance; 
}

backToOverview():void{
  this.__Router.navigate(['/Database/EditVisitors']);
}

onFileComplete(data: any) {
  console.log(data); // We just print out data bubbled up from event emitter.
}

uploadFiles(files:File) : Subscription {
  this.richTextForm.value.imgScr= 	"/upload/" + files[0].name;
  const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
    reportProgress: true
  })

  return this.__HttpClient.request( config )
  .subscribe(event=>{
    this.httpEvent = event
    this.files= this.filesEmpty;

    if (event instanceof HttpResponse) {
      alert('upload complete, old school alert used')
    }
  },
  error=>{
    alert('!failure beyond compare cause:' + error.toString())
  })
}


}
