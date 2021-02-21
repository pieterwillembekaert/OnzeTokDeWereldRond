import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

/*interface and class */
import { CLocationDatabase } from "./clocationDatabase";
import { cDashbordVars, DashboardVars } from './home/dashboard/DashboardVars';
import { c_nieuweDeelnemerItem, nieuweDeelnemerItem, iBond, cBond } from './Database/DatabaseItem';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  Visitors;
  Url = new CLocationDatabase;
  UrlServer: string = this.Url.getUrl() + "api/visitors/";

  constructor(
    private http: HttpClient,

  ) { }


  getDataAsyn() {
    return new Promise(resolve => {
      this.http.get(this.UrlServer)
        .subscribe(data => {
          this.Visitors = data;
          resolve(data);
        });
    });
  }

  async getDataFromHttp() {
    const data = <any>await this.getDataAsyn();

    console.log(this.Url.getUrl())
    return data
  }

  getData() {
    return this.Visitors;
  }

  computedTotalDistYear(inputYear: number, calcTot: boolean, filterBonden: boolean, inputBond: iBond): DashboardVars {

    var totaal = 0;
    var out: DashboardVars = new cDashbordVars();

    if (calcTot && !filterBonden) {
      for (let i = 0; i < this.Visitors.members.length; i++) {
        totaal = totaal + Number(this.Visitors.members[i].distance);
      }

    } else if (!calcTot && !filterBonden) {
      for (let i = 0; i < this.Visitors.members.length; i++) {
        if (this.Visitors.members[i].year == inputYear) {
          totaal = totaal + Number(this.Visitors.members[i].distance);
        }
      }

    } else if (!calcTot && filterBonden) {

      for (let i = 0; i < this.Visitors.members.length; i++) {
        if (this.Visitors.members[i].year == inputYear && this.Visitors.members[i].bond.code == inputBond.code) {
          totaal = totaal + Number(this.Visitors.members[i].distance);
        }
      }

    } else if (calcTot && filterBonden) {

      for (let i = 0; i < this.Visitors.members.length; i++) {
        if (this.Visitors.members[i].bond.code == inputBond.code) {
          totaal = totaal + Number(this.Visitors.members[i].distance);
        }
      }

    }


    var x = totaal;
    out.z = Math.round(x % 10);
    out.z1 = Math.round((x % 100) / 10 - (out.z / 10));
    out.z2 = Math.round(((x % 1000) / 100) - (out.z1 / 10));
    out.z3 = Math.round(((x % 10000) / 1000) - (out.z2 / 10 + (out.z1 / 100)));
    out.z4 = Math.round(((x % 100000) / 10000) - (out.z3 / 10 + out.z2 / 100 + out.z1 / 1000));
    out.z5 = Math.round(((x % 1000000) / 100000) - (out.z4 / 10 + out.z3 / 100 + out.z2 / 1000 + out.z1 / 10000));
    out.z6 = Math.round(((x % 10000000) / 1000000) - (out.z5 / 10 + out.z4 / 100 + out.z3 / 1000 + out.z2 / 10000 + out.z1 / 100000));
    out.z7 = Math.round(((x % 100000000) / 10000000) - (out.z6 / 10 + out.z5 / 100 + out.z4 / 1000 + out.z3 / 10000 + out.z2 / 100000 + out.z1 / 1000000));
    out.z8 = Math.round(((x % 1000000000) / 100000000) - (out.z7 / 10 + out.z6 / 100 + out.z5 / 1000 + out.z4 / 10000 + out.z3 / 100000 + out.z2 / 1000000 + out.z1 / 10000000));
    out.z9 = Math.round(((x % 100000000000) / 1000000000) - (out.z8 / 10 + out.z7 / 100 + out.z6 / 1000 + out.z5 / 10000 + out.z4 / 100000 + out.z3 / 1000000 + out.z2 / 10000000 + out.z1 / 100000000));
    out.z10 = Math.round(((x % 1000000000000) / 100000000000) - (out.z9 / 10 + out.z8 / 100 + out.z7 / 1000 + out.z6 / 10000 + out.z5 / 100000 + out.z4 / 1000000 + out.z3 / 10000000 + out.z2 / 100000000 + out.z1 / 1000000000));

    return out;
  }

}

