import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSliderModule } from '@angular/material/slider';

import { FlexLayoutModule } from '@angular/flex-layout';
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
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';



import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';

import { PrikbordComponent } from './prikbord/prikbord.component';
import { OverOnsComponent } from './over-ons/over-ons.component';
import { TekenOnzeTokComponent } from './teken-onze-tok/teken-onze-tok.component';
import { VolgOnsComponent } from './volg-ons/volg-ons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { HomeRoutingModule } from './home/home-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    PrikbordComponent,
    OverOnsComponent,
    TekenOnzeTokComponent,
    VolgOnsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
