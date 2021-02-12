import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

/*Components*/
import { PrikbordComponent } from './prikbord/prikbord.component';
import { OverOnsComponent } from './over-ons/over-ons.component';
import { TekenOnzeTokComponent } from './teken-onze-tok/teken-onze-tok.component';
import { VolgOnsComponent } from './volg-ons/volg-ons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { DeelnemenComponent } from './deelnemen/deelnemen.component';
import { DatabaseLoginComponent } from './Database/database-login/database-login.component';
import { GrafiekAfstandComponent } from './GrafiekAfstand/GrafiekAfstand.component';

/*Guards*/
import { GuardsGuard } from './guards.guard';

const appRoutes: Routes = [

  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { preload: false }
  },
  {
    path: 'Database',
    loadChildren: () => import('./Database/database.module').then(m => m.DatabaseModule),
    data: { preload: false },
    canActivate: [GuardsGuard]

  },

  { path: 'OverOns', component: OverOnsComponent },
  { path: 'Prikbord', component: PrikbordComponent },
  { path: 'TekenOnzeTok', component: TekenOnzeTokComponent },
  { path: 'VolgOns', component: VolgOnsComponent },
  { path: 'Interviews', component: InterviewsComponent },
  { path: 'Deelnemen', component: DeelnemenComponent },
  { path: 'Login', component: DatabaseLoginComponent },
  { path: 'Grafiek', component: GrafiekAfstandComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        relativeLinkResolution: 'legacy'
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
