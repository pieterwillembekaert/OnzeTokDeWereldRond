import { Component, OnInit } from '@angular/core';
import {VisitorsService} from '../visitors.service';



@Component({
  selector: 'app-prikbord',
  templateUrl: './prikbord.component.html',
  styleUrls: ['./prikbord.component.css']
})
export class PrikbordComponent implements OnInit {

data; 


  constructor(
    private __VisitorsService: VisitorsService
  ) { }

  ngOnInit(): void {
    //Get data
    var $this= this; 
     this.__VisitorsService.getDataFromHttp().then(
      function(response) { 
        //clear old data
       
        //Get data from server
        var DataHTTP = response; 

        if (DataHTTP == null || undefined) {
          console.log("Error")
         
         
        } else {
          //gelukt
          $this.data=DataHTTP.members; 
        }
    }, 
      function(error) { console.log("error: ",  error)}
    )
       
  }

    
  

}
