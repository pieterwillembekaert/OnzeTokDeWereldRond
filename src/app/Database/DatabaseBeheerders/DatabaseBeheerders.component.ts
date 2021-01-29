import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot, } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatTable } from '@angular/material/table';


import {DatabaseBeheerdersService} from '../../DatabaseBeheerders.service';
import { CaesarCipherService } from './../../caesarCipher.service';

export class cBeheerder  {
  id: number=0; 
  name: String=""; 
  password: String=""; 
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
  hide = true;
  bOpenDataEditor: boolean=false; 
  bEditorPW: boolean=false; 
  newPassword: string;
  newPasswordRepeat:  string; 
  bnewPasswordNotEq: boolean=false; 
  editId;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private __DatabaseBeheerdersService : DatabaseBeheerdersService,
    private __CaesarCipherService: CaesarCipherService, 
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

    //open editor
    this.bOpenDataEditor = true;
    this.bEditorPW= true; 

    this.table.renderRows();
  }


  save(){
    
    for (let i = 0; i < this.dataBeheerders.length; i++) {
      if(this.dataBeheerders[i].id==  this.dataToChange.id ){
        this.dataBeheerders[i]=this.dataToChange; 
        this.table.renderRows();
        alert("Opgeslaan")
        return;
      }
    } 

   
  }


  closeEditor(){
    this.bOpenDataEditor = false;
    this.bEditorPW= false; 

  }


  editBeheerder(row: any) :void{
    //Add To data visitors
    //console.log(row);
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

  editorPW(){
    this.bEditorPW= true; 
  }

  closeEditorPW(){
    this.bEditorPW= false; 
  }

  sendNewPW(){
    
    if(this.newPassword === this.newPasswordRepeat){
      
      this.bnewPasswordNotEq=false; 
      var convertPw= this.__CaesarCipherService.caesarCipher(this.newPassword, 20)
      let newBeheerder= new cBeheerder(); 
      newBeheerder.password= convertPw; 

      this.__DatabaseBeheerdersService.saveNewPassword(newBeheerder).then(
        msg => {
          //console.log("done",msg);
          alert("wachtwoord aangepast!");
          this.dataToChange.password= msg; 
          
        },
        error => {
          console.log("error",error);
          alert("wachtwoord aanpassen mislukt!");
        }) 
    }else{
      this.bnewPasswordNotEq=true; 
    }

  }





}
