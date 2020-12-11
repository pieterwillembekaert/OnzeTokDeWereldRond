import { Component, OnInit } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-over-ons',
  templateUrl: './over-ons.component.html',
  styleUrls: ['./over-ons.component.css']
})
export class OverOnsComponent implements OnInit {

  constructor(
    private __Router: Router,
  ) { }

  ngOnInit(): void {
  }

  deelnemen(){
    this.__Router.navigate(['/Deelnemen']);

  }

}
