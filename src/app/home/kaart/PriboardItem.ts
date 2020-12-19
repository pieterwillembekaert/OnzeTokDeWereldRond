export interface PrikboardItem {
  name: string;
  imgScr: string;
  date: Date; 
}


export class cPrikboardItem implements PrikboardItem {
  name: string="";
  imgScr: string="";
  date: Date;
  
}
