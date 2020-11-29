import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  getFullYear() {
    let full = new Date();
    var FullYear = full.getFullYear();
    //console.log(FullYear)
    return FullYear;
  }

  myBrowser() { 

    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {

        return 'Opera';

    }else if(navigator.userAgent.indexOf("Chrome") != -1 ){

        return 'Chrome';

    }else if(navigator.userAgent.indexOf("Safari") != -1){

        return 'Safari';

    }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {

         return 'Firefox';

   // }else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){

     // return 'IE'; 

    } else {

       return 'unknown';

    }

}
}
