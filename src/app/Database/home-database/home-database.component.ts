import { Component, OnInit } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';

import {NieuweDeelnemerDataService} from '../nieuwe-deelnemer-data.service';
import { GuardsService } from '../../guards.service';


@Component({
  selector: 'app-home-database',
  templateUrl: './home-database.component.html',
  styleUrls: ['./home-database.component.css']
})
export class HomeDatabaseComponent implements OnInit {
  AantalNieuweDeelnemers:Number=0; 
  refreshDataIntervar; 

  constructor(
    private __NieuweDeelnemerDataService: NieuweDeelnemerDataService,
    private __GuardsService: GuardsService,
    private __Router: Router,
  ) { }

  ngOnInit(): void {
    var $this = this;
    this.__NieuweDeelnemerDataService.getDataFromHttp().then(
      function (response) {
        $this.AantalNieuweDeelnemers= response.members.length;
        //console.log(response)
        
      },
      function (error) {
        console.log("error: ", error)
      }
    )
  }

  ngAfterViewInit(){
    this.refreshData(); 
  }

  openBezoekers(): void{
    this.__Router.navigate(['/Database/EditVisitors']);
  }

  openInterviews(): void{
    this.__Router.navigate(['/Database/OverviewInterviews']);
  }

  openNieuweDeelnemers() : void{
    this.__Router.navigate(['/Database/NieuweDeelnemers']);
  }

  openUploadFolder() : void{
    this.__Router.navigate(['/Database/ManageUploadFolder']);
  }

  logout() {
    console.log("logout")
    this.__GuardsService.logout();
    this.__Router.navigate(['/Login']);
  }

  updateData(){

    //Get data
    var $this = this;
    this.__NieuweDeelnemerDataService.getDataFromHttp().then(
      function (response) {
        $this.AantalNieuweDeelnemers= response.members.length;
        //console.log(response)
        
      },
      function (error) {
        console.log("error: ", error)
      }
    )
  }

  ngOnDestroy(){
    this.stopRefreshData();
  }

  
  refreshData(){
    var $this= this; 
    this.refreshDataIntervar = setInterval(function(){ $this.updateData() }, 3000);
    
  }

  stopRefreshData(){
    clearInterval(this.refreshDataIntervar)
   
  }
  

}
