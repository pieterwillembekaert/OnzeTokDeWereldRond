import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {ngfModule, ngf} from "angular-file"
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip'; 

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

/*Routes*/
import { DatabaseRoutingModule } from '../Database/database-routing.module';

/*Components*/
import { EditInterviewComponent } from './interviews/edit-interview/edit-interview.component';
import { OverviewInterviewsComponent } from './interviews/overview-interviews/overview-interviews.component';
import { EditVisitorsComponent } from './visitors/edit-visitors/edit-visitors.component';
import { EditVisitorComponent } from './visitors/edit-visitor/edit-visitor.component';
import { HomeDatabaseComponent } from './home-database/home-database.component';
import { DatabaseLoginComponent } from './database-login/database-login.component';
import { NieuweDeelnemerComponent } from './visitors/nieuwe-deelnemer/nieuwe-deelnemer.component';
import { ManageUploadFolderComponent } from './manage-upload-folder/manage-upload-folder.component';
import { DatabaseBeheerdersComponent } from './DatabaseBeheerders/DatabaseBeheerders.component';
import { MarkdownEditorModule } from "./TextEditors/markdown-editor/markdown-editor.module";
import { RichTextEditorModule } from "./TextEditors/rich-text-editor/rich-text-editor.module";

/*Services */


@NgModule({
  imports: [
    CommonModule,
    MatBadgeModule,
    MatTooltipModule,
    MDBBootstrapModule,
    MarkdownEditorModule, 
    RichTextEditorModule,
    MatProgressBarModule,
    FormsModule,
    DatabaseRoutingModule,
    MatCarouselModule,
    ReactiveFormsModule,
    MatSliderModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatGridListModule,
    LayoutModule,
    DragDropModule,
    MatTreeModule,
    MatListModule,
    RouterModule,
    NgxMatSelectSearchModule,
    MatNativeDateModule,
    ngfModule,
  ],
  declarations: [
    EditInterviewComponent,
    OverviewInterviewsComponent,
    EditVisitorsComponent,
    EditVisitorComponent, 
    HomeDatabaseComponent,
    DatabaseLoginComponent,
    NieuweDeelnemerComponent,
    ManageUploadFolderComponent,
    DatabaseBeheerdersComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class DatabaseModule {}