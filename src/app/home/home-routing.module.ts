import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KaartComponent} from './kaart/kaart.component';
import {PageLoadComponent} from './page-load/page-load.component';

import { KaartResolverService } from './kaart-resolver.service';

const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
        children: [
          {
            path: '', 
            component: DashboardComponent, 
            children:[
              {
                path: 'kaart',
                component: KaartComponent,
              },
              {
                path: '',
                component: PageLoadComponent,
                resolve: {
                  object: KaartResolverService
                }
              }
            ]
          }
         
      
        ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
