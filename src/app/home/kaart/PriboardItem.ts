/*Bonden */
export interface iBond {
  code: number; 
  bond:string;  
}

export class cBond implements iBond {
  code: number= 0; 
  bond:string= "KSA";  
}

export interface PrikboardItem {
  name: string;
  imgScr: string;
  date: Date; 
  bond: iBond; 
}


export class cPrikboardItem implements PrikboardItem {
  name: string="";
  imgScr: string="";
  date: Date;
  bond: iBond= new cBond();
}
