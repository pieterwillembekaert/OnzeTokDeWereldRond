import { Injectable } from '@angular/core';

/*interface and class */
import { c_nieuweDeelnemerItem, nieuweDeelnemerItem, iBond, cBond } from './Database/DatabaseItem';

@Injectable({
    providedIn: 'root'
  })
export class BondenService {

    constructor() { }

    bonden: iBond[] =[
        { code: 0, bond: "KSA" },
        { code: 6000, bond: "KSA NOORDZEEGOUW" },
        { code: 6002, bond: "KSA AARSELE" },
        { code: 6029, bond: "KSA ADELAARS KORTRIJK" },
        { code: 6015, bond: "KSA ARBEID ADELT GULLEGEM" },
        { code: 6006, bond: "KSA BEBO ROESELARE BEVEREN" },
        { code: 6019, bond: "KSA BIJ TIJL EN LAMME ICHTEGEM" },
        { code: 6083, bond: "KSA BIKSCHOTE" },
        { code: 6023, bond: "KSA DE BIEKORF KLEMSKERKE" },
        { code: 6061, bond: "KSA DE BLAUWE TORRE VARSENARE" },
        { code: 6075, bond: "KSA DE BLAUWVOET KOOLKERKE" },
        { code: 6070, bond: "KSA DE BOLLAERT WATOU" },
        { code: 6200, bond: "KSA DE GRAAL GEWEST BRUGGE" },
        { code: 6081, bond: "KSA DE GRIETJES GULLEGEM" },
        { code: 6085, bond: "KSA DE MEISKES WEVELGEM" },
        { code: 6024, bond: "KSA DE TOKKE KNOKKE" },
        { code: 6066, bond: "KSA DE VLASBLOEM WEVELGEM" },
        { code: 6013, bond: "KSA FRASSATI BRUGGE" },
        { code: 6073, bond: "KSA GLOBETROTTERS WOESTEN" },
        { code: 6071, bond: "KSA GRENSVUUR WERVIK" },
        { code: 6039, bond: "KSA GRENSWAKE MENEN" },
        { code: 6078, bond: "KSA HALLEBAST DIKKEBUS" },
        { code: 6043, bond: "KSA HOCANA OEKENE" },
        { code: 6077, bond: "KSA KEIGNAERTRIET ZANDVOORDE" },
        { code: 6062, bond: "KSA KERELSTEDE VEURNE" },
        { code: 6032, bond: "KSA KRIKO BRUGGE" },
        { code: 6033, bond: "KSA LEIEZONEN KUURNE" },
        { code: 6036, bond: "KSA LO" },
        { code: 6022, bond: "KSA MALEGYS KEMMEL" },
        { code: 6038, bond: "KSA MARKE" },
        { code: 6040, bond: "KSA MARSUPILAMI'S MERKEM" },
        { code: 6041, bond: "KSA MOERKERKE vzw" },
        { code: 6052, bond: "KSA MUNCKZWALM RUDDERVOORDE" },
        { code: 6044, bond: "KSA OOSTENDE MEEUWENNEST JONGENS" },
        { code: 6068, bond: "KSA OOSTENDE MEEUWENNEST MEISJES" },
        { code: 6046, bond: "KSA OOSTROZEBEKE" },
        { code: 6016, bond: "KSA PETER BENOIT HARELBEKE" },
        { code: 6080, bond: "KSA PITTIGEM PITTEM" },
        { code: 6049, bond: "KSA POELKAPELLE" },
        { code: 6050, bond: "KSA POPERINGE" },
        { code: 6057, bond: "KSA ROOYGHEM VZW ST-KRUIS EN MALE BRUGGE" },
        { code: 6060, bond: "KSA 'S GRAVENWINKEL TORHOUT" },
        { code: 6008, bond: "KSA SCARPHOUTSTEDE BLANKENBERGE" },
        { code: 6074, bond: "KSA SCHUIFERSKAPELLE" },
        { code: 6012, bond: "KSA SINT-LENAERT DUDZELE" },
        { code: 6042, bond: "KSA SINT-MAARTEN MOORSLEDE" },
        { code: 6037, bond: "KSA SINT-PAULUS LOPPEM" },
        { code: 6003, bond: "KSA SINT-TRUDO" },
        { code: 6054, bond: "KSA SPERMALIE SIJSELE" },
        { code: 6056, bond: "KSA ST.-ELOOI SINT-ELOOIS-WINKEL" },
        { code: 6020, bond: "KSA STORMKLOKKE IEPER" },
        { code: 6069, bond: "KSA 't VLINDERKE ZWEVEGEM" },
        { code: 6058, bond: "KSA TEN BRIEL SINT-MICHIELS BRUGGE" },
        { code: 6045, bond: "KSA TEN RODE OOSTKAMP" },
        { code: 6055, bond: "KSA TER STRAETEN" },
        { code: 6063, bond: "KSA TER VICHTEN" },
        { code: 6059, bond: "KSA TIELT JONGENS" },
        { code: 6025, bond: "KSA TIELT MEISJES" },
        { code: 6009, bond: "KSA TIJLSBOND DEERLIJK" },
        { code: 6011, bond: "KSA TORENWACHT DIKSMUIDE" },
        { code: 6053, bond: "KSA TORREWACHTERS RUMBEKE" },
        { code: 6007, bond: "KSA VIKINGERS BISSEGEM" },
        { code: 6021, bond: "KSA VLAAMS & VROOM IZEGEM" },
        { code: 6064, bond: "KSA WAREGEM" },
        { code: 6072, bond: "KSA WESTOUTER" },
        { code: 6051, bond: "KSA WYTEWA ROESELARE" },
        { code: 6067, bond: "KSA ZWANEBURCHT ZANDVOORDE" },
    ]

    getBonden() {
        return this.bonden;
    }

}
