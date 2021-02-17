/*Bonden */
export interface iBond {
  code: number; 
  bond:string;  
}

export class cBond implements iBond {
  code: number= 0; 
  bond:string= "KSA";  
}

/*interviews */
export interface interviewItem {
  id: number,
  name: string,
  bond: iBond, 
  country: string,
  countryTanslation: string,
  date: Date,
  dateConvert: string,
  distance: number; 
  imgScr: string,
  year: string,
  title: string,
  subTitle: string,
  text: string 
}

export class c_interviewItem implements interviewItem {
  id: number=0;
  name: string="";
  bond: iBond= new cBond();
  country: string="";
  countryTanslation: string="";
  date: Date;
  dateConvert: string="";
  distance: number=0; 
  imgScr: string="";
  year: string="";
  title: string="";
  subTitle: string="";
  text: string="";
}


/*visitors */
export interface visitorsItem {
  id: number,
  name: string,
  bond: iBond, 
  country: string,
  countryTanslation: string,
  date: Date,
  dateConvert: string,
  distance: number; 
  imgScr: string,
  year: string,
}

export class c_visitorsItem implements visitorsItem {
  id: number=0;
  name: string="Nieuwe deelnemer";
  bond: iBond= new cBond();
  country: string="belgium";
  countryTanslation: string="België";
  date: Date= new Date();
  dateConvert: string="";
  distance: number=0; 
  imgScr: string="/upload/default.jpg";
  year: string="2021";
}

/*Nieuwe deelnemers */
export interface nieuweDeelnemerItem {
  id: number,
  name: string,
  bond: iBond, 
  email: string,
  opmerking: string,
  country: string,
  countryTanslation: string,
  date: Date,
  dateConvert: string,
  distance: number; 
  imgScr: string,
  year: string,
}

export class c_nieuweDeelnemerItem implements nieuweDeelnemerItem {
  id: number=0;
  name: string="";
  bond: iBond= new cBond();
  email: string;
  opmerking: string; 
  country: string="";
  countryTanslation: string="";
  date: Date;
  dateConvert: string="";
  distance: number=0; 
  imgScr: string="";
  year: string="";
}


