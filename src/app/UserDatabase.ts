export interface iUserDatabase {
    "id": number;
    "name": string;
    "password": string;
    "email": string;
}

export class cUserDatabase implements iUserDatabase {
    "id": number= 0;
    "name": string=""; 
    "password": string=""; 
    "email": string=""; 
}
