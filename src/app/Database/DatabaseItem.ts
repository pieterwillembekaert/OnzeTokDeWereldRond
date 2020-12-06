export interface interviewItem {
  id: number,
  name: string,
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

export interface visitorsItem {
  id: number,
  name: string,
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
  name: string="";
  country: string="";
  countryTanslation: string="";
  date: Date;
  dateConvert: string="";
  distance: number=0; 
  imgScr: string="";
  year: string="";
}

export interface nieuweDeelnemerItem {
  id: number,
  name: string,
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


