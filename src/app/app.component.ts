import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {VisitorsService} from './visitors.service';
import {CountriesService} from './countries.service';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Onze Tok De Wereld Rond';

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

private _mobileQueryListener: () => void;

constructor(
  changeDetectorRef: ChangeDetectorRef, 
  media: MediaMatcher,
  private elementRef: ElementRef,
  private __VisitorsService : VisitorsService, 
  private __CountriesService : CountriesService,
  
  ) {
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);

}

getAnimationData(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
}


ngOnDestroy():void{
  this.mobileQuery.removeListener(this._mobileQueryListener);
}

}
