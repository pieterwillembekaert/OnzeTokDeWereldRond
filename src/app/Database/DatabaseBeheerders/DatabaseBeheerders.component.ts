import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { MatTable } from '@angular/material/table';


import {DatabaseBeheerdersService} from '../../DatabaseBeheerders.service';

export class cBeheerder  {
  id: number=0; 
  name: String=""; 
  WW: String=""; 
  email: String=""; 
}

@Component({
  selector: 'app-DatabaseBeheerders',
  templateUrl: './DatabaseBeheerders.component.html',
  styleUrls: ['./DatabaseBeheerders.component.css']
})
export class DatabaseBeheerdersComponent implements OnInit {

  dataBeheerders: Array<cBeheerder>; 
  displayedColumns: string[] = ['Bewerken', 'Naam', 'WW','Email'];

  dataToChange;
  bOpenDataEditor: boolean=false; 
  editId;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private __DatabaseBeheerdersService : DatabaseBeheerdersService,
  ) { }

  ngOnInit(): void {
 
    this.__DatabaseBeheerdersService.getDataFromHttp().then(
       (response)=> {
        //console.log(response)
        this.dataBeheerders= response;

      },
      (error)=> {
        console.log("error: ", error)
      }
    )
  }

  download(){
    //console.log("download")

  }

  saveToServer(){
    this.__DatabaseBeheerdersService.saveDataToServer(this.dataBeheerders).then(
      msg => {
        //console.log("done",msg);
        alert("Opslaan gelukt!");
        
      },
      error => {
        console.log("error",error);
        alert("Opslaan mislukt!");
      }) 
  }


  newBeheerder(){
    let newBeheerder= new cBeheerder(); 
    newBeheerder.id= this.dataBeheerders.length; 

    this.dataBeheerders.push(newBeheerder); 

    this.dataToChange = newBeheerder;
    this.bOpenDataEditor = true;

    this.table.renderRows();
  }


  save(){
    for (let i = 0; i < this.dataBeheerders.length; i++) {
      if(this.dataBeheerders[i].id==  this.dataToChange.id ){
        this.dataBeheerders[i]=this.dataToChange; 
        this.table.renderRows();
        return;
      }
    } 
  }


  closeEditor(){
    this.bOpenDataEditor = false;

  }


  editBeheerder(row: any) :void{
    //Add To data visitors
    console.log(row);
    this.dataToChange = row;
    this.bOpenDataEditor = true;
  }


  delete(row: any): void {
    const index = this.dataBeheerders.indexOf(row, 0);
    if (index > -1) {
      this.dataBeheerders.splice(index, 1);
    }

    for (let i = 0; i < this.dataBeheerders.length; i++) {
      this.dataBeheerders[i].id= i;
    }
    
    this.table.renderRows();
  }





}
