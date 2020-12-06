import { Component, OnInit, HostBinding } from '@angular/core';
import { AfterViewInit,  OnDestroy,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {debounceTime, delay, tap, filter, map, takeUntil} from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import {HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http"
import { Subscription } from 'rxjs'

import { CountriesService } from './../../../countries.service';
import {EditInterviewsDatabaseService} from '../edit-interviews-database.service';
import { Bank, BANKS, Counrtys } from '../demo-data';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import {QuillModule} from 'ngx-quill'

import { interviewItem } from '../../DatabaseItem';
import { c_interviewItem } from '../../DatabaseItem';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';




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
    private __EditInterviewsDatabaseService: EditInterviewsDatabaseService,
    public __HttpClient:HttpClient,
    ) {}


  ngOnInit() {
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

    /**/
    this.OpenInterViewEditText=this.__EditInterviewsDatabaseService.getOpenInterViewEditText();
    if(!this.OpenInterViewEditText){
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

    this.Country= this.OpenInterViewEditText.countryTanslation; 
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
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  saveInterviews():void{
    console.log(this.richTextForm)

    if(this.CountrysServerSideCtrl.value){
      this.OpenInterViewEditText.countryTanslation= this.CountrysServerSideCtrl.value;
      let country= this.__CountriesService.convertTranslateCountryToCountry(this.OpenInterViewEditText.countryTanslation);
      this.OpenInterViewEditText.country= String(country);
    }
    
    this.OpenInterViewEditText.date= this.richTextForm.value.date; 
    let year= new Date(this.richTextForm.value.date).getFullYear()
    this.OpenInterViewEditText.year= String(year);
    this.OpenInterViewEditText.imgScr=this.richTextForm.value.imgScr;
    this.OpenInterViewEditText.distance= this.richTextForm.value.distance;
    this.OpenInterViewEditText.title= this.richTextForm.value.title;
    this.OpenInterViewEditText.subTitle= this.richTextForm.value.subtitle;
    this.OpenInterViewEditText.text= this.richTextForm.value.description;
    
    this.__EditInterviewsDatabaseService.setOpenInterViewEditText(this.OpenInterViewEditText)
    this.__EditInterviewsDatabaseService.saveData(this.OpenInterViewEditText); 
  }

 backToOverview():void{
    this.__Router.navigate(['/Database/OverviewInterviews']);
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
      this.uploadPercent=0; 
  
      if (event instanceof HttpResponse) {
        //alert('upload complete, old school alert used')
      }
    },
    error=>{
      alert('!failure beyond compare cause:' + error.toString())
    })
  }

  

  get descriptionRawControl() {
    return this.markdownForm.controls.description as FormControl;
  }

  get descriptionRichControl() {
    return this.richTextForm.controls.description as FormControl;
  }

}


