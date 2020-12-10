import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EditInterviewComponent } from './interviews/edit-interview/edit-interview.component';
import { OverviewInterviewsComponent } from './interviews/overview-interviews/overview-interviews.component';
import { EditVisitorsComponent } from './visitors/edit-visitors/edit-visitors.component';
import { EditVisitorComponent } from './visitors/edit-visitor/edit-visitor.component';
import { HomeDatabaseComponent } from './home-database/home-database.component';
import { DatabaseLoginComponent } from './database-login/database-login.component';
import { NieuweDeelnemerComponent } from './visitors/nieuwe-deelnemer/nieuwe-deelnemer.component';
import { ManageUploadFolderComponent } from './manage-upload-folder/manage-upload-folder.component';

const DatabaseRoutes: Routes = [
  {
    path: '',
    component: HomeDatabaseComponent,
        children: [
          { path: 'EditInterview', component: EditInterviewComponent },
          { path: 'OverviewInterviews', component: OverviewInterviewsComponent },
          { path: 'EditVisitors', component: EditVisitorsComponent },
          { path: 'EditVisitor', component: EditVisitorComponent },
          { path: 'NieuweDeelnemers', component: NieuweDeelnemerComponent },
          { path: 'DatabaseLogin', component: DatabaseLoginComponent },
          { path: 'ManageUploadFolder', component: ManageUploadFolderComponent },
        ]
  }
  
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DatabaseRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DatabaseRoutingModule { }
