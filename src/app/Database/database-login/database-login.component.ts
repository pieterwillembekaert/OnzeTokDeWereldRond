import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {FormBuilder,FormGroup,FormControl,Validators} from "@angular/forms";

import { GuardsService } from '../../guards.service';

@Component({
  selector: 'app-database-login',
  templateUrl: './database-login.component.html',
  styleUrls: ['./database-login.component.css']
})
export class DatabaseLoginComponent implements OnInit {

  message: string;
  hide = true;

  loginForm: FormGroup;

  constructor(
    public __GuardsService: GuardsService, 
    public __router: Router,
    private _fb: FormBuilder,) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.__GuardsService.isLoggedIn ? 'in' : 'out');
  }

  ngOnInit() :void{
    this.loginForm = this._fb.group({
      name: ["", Validators.required], 
      password: ["", Validators.required], 
    });
 

  }

  login() {
    this.message = 'Bezig met inloggen...';
    //console.log(this.loginForm.value)

    this.__GuardsService.loginUser(this.loginForm.value).subscribe(() => {
      this.setMessage();
      if (this.__GuardsService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/Database';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.__router.navigate([redirectUrl], navigationExtras);
      }
    });
  }

  logout() {
    this.__GuardsService.logout();
    this.setMessage();
  }
}
