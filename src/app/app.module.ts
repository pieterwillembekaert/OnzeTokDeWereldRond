import {BrowserModule} from '@angular/platform-browser';
import {NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ngfModule, ngf } from "angular-file"

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import {MatSliderModule} from '@angular/material/slider';

import {FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import {QuillModule} from 'ngx-quill'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatStepperModule} from '@angular/material/stepper'; 

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import { MatProgressBarModule} from '@angular/material/progress-bar'; 

import { PrikbordComponent } from './prikbord/prikbord.component';
import { OverOnsComponent } from './over-ons/over-ons.component';
import { TekenOnzeTokComponent } from './teken-onze-tok/teken-onze-tok.component';
import { VolgOnsComponent } from './volg-ons/volg-ons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HomeRoutingModule } from './home/home-routing.module';
import { DatabaseRoutingModule } from './Database/database-routing.module';
import { InterviewsComponent } from './interviews/interviews.component';
import { DeelnemenComponent } from './deelnemen/deelnemen.component';



@NgModule({
  declarations: [
    AppComponent,
    PrikbordComponent,
    OverOnsComponent,
    TekenOnzeTokComponent,
    VolgOnsComponent,
    PageNotFoundComponent,
    InterviewsComponent,
    DeelnemenComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    MatStepperModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CommonModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule, 
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,  
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot(),
    MatGridListModule,
    LayoutModule,
    DragDropModule,
    MatTreeModule,
    MatListModule,
    MatCarouselModule.forRoot(),
    HomeRoutingModule,
    DatabaseRoutingModule,
    QuillModule.forRoot(),
    NgxMatSelectSearchModule,
    ngfModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
