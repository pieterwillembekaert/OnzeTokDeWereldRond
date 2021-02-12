import {Injectable} from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  country = [
    "kalimantan",
    "latvia",
    "papua new guinea",
    "mexico",
    "estonia",
    "algeria",
    "morocco",
    "mauretania",
    "senegal",
    "gambia",
    "casamance",
    "bissau",
    "guinee",
    "sierra leone",
    "liberia",
    "ivoire",
    "mali",
    "burkina",
    "niger",
    "ghana",
    "togo",
    "benin",
    "nigeria",
    "tunisia",
    "libya",
    "egypt",
    "chad",
    "south_sudan",
    "sudan",
    "cameroon",
    "eritrea",
    "djibouti",
    "ethiopia",
    "somaliland",
    "soqotra",
    "somalia",
    "centrafrique",
    "sao tome",
    "principe",
    "bioko",
    "gabon",
    //"equatorial guinea",
    "congo",
    "cabinda",
    "drc",
    "rwanda",
    "burundi",
    "uganda",
    "kenya",
    "tanzania",
    "zambia",
    "angola",
    "malawi",
    "mozambique",
    "zimbabwe",
    "namibia",
    "botswana",
    "swaziland",
    "lesotho",
    "south africa",
    "greenland",
    "disko",
    "milne",
    "east antarctica",
    //"antarctic peninsula",
    //"thurston",
    //"alexander",
    //"smyley",
    //"robert",
    //"king george",
    // "james ross",
    //"elephant",
    "australia",
    "tasmania",
    "new zealand north island",
    "new zealand south island",
    "new caledonia",
    "sumatra",
    "east malaysia",
    //"brunei",
    "sulawesi",
    "maluku",
    "seram",
    "java",
    "bali",
    "lombok",
    "sumba",
    "flores",
    "timor",
    "new ireland",
    "new britain",
    "bougainville",
    "choiseul",
    "new georgia",
    "santa isabel",
    "malaita",
    "santa ana",
    "rennell",
    "espiritu santo",
    "malakula",
    "efate",
    "fiji",
    "palawan",
    "negros",
    "cebu",
    "samar",
    "luzon",
    "mindoro",
    "hainan",
    "taiwan",
    "kyushu",
    "shikoku",
    "japan",
    "hokkaido",
    "iturup",
    "urup",
    "paramushir",
    "onekotan",
    "sakhalin",
    "bering island",
    "medny",
    "attu",
    "amchitka",
    "adak",
    "umnak",
    "unalaska",
    "st. lawrence island",
    "st. lawrence island west",
    "alaska",
    "chukotka",
    "wrangel-w",
    "unalaska west",
    "umnak west",
    "another aleutian west",
    "adak west",
    "amchitka west",
    "attu west",
    "kerguelen",
    "mauritius",
    "reunion",
    "madagascar",
    "grande comore",
    "mayotte",
    "aldabra",
    "praslin",
    "mahe",
    "male",
    "maldive",
    "gan",
    "terceira",
    "pico",
    "sao miguel",
    "madeira",
    "lanzarote",
    "gran canaria",
    "tenerife",
    "santo antao",
    "boa vista",
    "santiago",
    "kauai",
    "oahu",
    "kahului",
    "hawaii",
    "raiatea",
    "tahiti",
    "guadeloupe",
    "dominica",
    "martinique",
    "st. lucia",
    "st. vincent",
    "grenada",
    "trinidad",
    "puerto rico",
    //"haiti-dominican border",
    "domincan republic",
    "haiti",
    "falklands west",
    "falklands east",
    "iceland",
    "spitsbergen",
    "nordaustlandet",
    "edgeoya",
    "prince george",
    "salisbury",
    "wilczek",
    "bell",
    "novaya zemlya north",
    "novaya zemlya south",
    "komsomolets",
    "october",
    "bolshevik",
    "kotelny",
    "novaya sibir",
    "lyakhovsky",
    "wrangel",
    "sri lanka",
    "cuba",
    "bimini",
    "andros",
    "inagua",
    "eleuthera",
    "grand bahama",
    "jamaica",
    "irian jaya",
    "alaska-westcopy",
    "galapagos",
    "banks",
    "prince patrick",
    "eglinton",
    "mackenzie king",
    "king christian",
    "ellef ringnes",
    "amund ringnes",
    "axel heiberg",
    "victoria",
    "prince of wales",
    "prescott",
    "cornwallis",
    "bathurst",
    "devon",
    "baffin",
    "bylot",
    "ellesmere",
    "southhampton",
    "newfoundland",
    "canada",
    "usa",
    "haida gwaii",
    "vancouver",
    "guatemala",
    "honduras",
    "el salvador",
    "nicaragua",
    "costa rica",
    "panama",
    "colombia",
    "venezuela",
    "guyana",
    "suriname",
    "guyane",
    "ecuador",
    "peru",
    "bolivia",
    "paraguay",
    "uruguay",
    "argentina",
    "tierra del fuego chile",
    "tierra del fuego argentina",
    "chile",
    "chiloe",
    "brazil",
    "belize",
    "russia",
    "china",
    "mongolia",
    "north korea",
    "south korea",
    "kazakhstan",
    "turkmenistan",
    "uzbekistan",
    "tajikistan",
    "kirgizstan",
    "afghanistan",
    "pakistan",
    "india",
    "nepal",
    "bhutan",
    "bangladesh",
    "burma",
    "thailand",
    "malaysia",
    "cambodia",
    "laos",
    "vietnam",
    "georgia",
    "armenia",
    "azerbaijan",
    "iran",
    "turkey",
    "yemen",
    "oman",
    "emirates",
    "qatar",
    "kuwait",
    "saudi",
    "syria",
    "iraq",
    "jordan",
    "lebanon",
    "israel",
    "cyprus",
    "norway",
    "britain",
    //"ulster",
    "ireland",
    "sweden",
    "finland",
    "hiumaa",
    "saaremaa",
    "lithuania",
    "belarus",
    "poland",
    "spain",
    "portugal",
    "majorca",
    "sardinia",
    "corsica",
    "france",
    "netherlands",
    "belgium",
    "germany",
    "denmark",
    "sjælland",
    "gotland",
    "switzerland",
    "czech",
    "slovakia",
    "austria",
    "hungary",
    "slovenia",
    "croatia",
    "bosnia",
    "italy",
    "sicily",
    "malta",
    "ukraine",
    "moldova",
    "romania",
    "montenegro",
    "serbia",
    "bulgaria",
    "albania",
    "macedonia",
    "greece",
    "thrace",
    "crete"
  ];

  countryAll = [
    "belgium",
    "latvia",
    "kalimantan",
    "papua new guinea",
    "mexico",
    "estonia",
    "algeria",
    "morocco",
    "mauretania",
    "senegal",
    "gambia",
    "casamance",
    "bissau",
    "guinee",
    "sierra leone",
    "liberia",
    "ivoire",
    "mali",
    "burkina",
    "niger",
    "ghana",
    "togo",
    "benin",
    "nigeria",
    "tunisia",
    "libya",
    "egypt",
    "chad",
    "south_sudan",
    "sudan",
    "cameroon",
    "eritrea",
    "djibouti",
    "ethiopia",
    "somaliland",
    "soqotra",
    "somalia",
    "centrafrique",
    "sao tome",
    "principe",
    "bioko",
    "gabon",
    "congo",
    "cabinda",
    "drc",
    "rwanda",
    "burundi",
    "uganda",
    "kenya",
    "tanzania",
    "zambia",
    "angola",
    "malawi",
    "mozambique",
    "zimbabwe",
    "namibia",
    "botswana",
    "swaziland",
    "lesotho",
    "south africa",
    "greenland",
    "disko",
    "milne",
    "east antarctica",
    "australia",
    "tasmania",
    "new zealand north island",
    "new zealand south island",
    "new caledonia",
    "sumatra",
    "east malaysia",
    "sulawesi",
    "maluku",
    "seram",
    "java",
    "bali",
    "lombok",
    "sumba",
    "flores",
    "timor",
    "new ireland",
    "new britain",
    "bougainville",
    "choiseul",
    "new georgia",
    "santa isabel",
    "malaita",
    "santa ana",
    "rennell",
    "espiritu santo",
    "malakula",
    "efate",
    "fiji",
    "palawan",
    "negros",
    "cebu",
    "samar",
    "luzon",
    "mindoro",
    "hainan",
    "taiwan",
    "kyushu",
    "shikoku",
    "japan",
    "hokkaido",
    "iturup",
    "urup",
    "paramushir",
    "onekotan",
    "sakhalin",
    "bering island",
    "medny",
    "attu",
    "amchitka",
    "adak",
    "umnak",
    "unalaska",
    "st. lawrence island",
    "st. lawrence island west",
    "alaska",
    "chukotka",
    "wrangel-w",
    "unalaska west",
    "umnak west",
    "another aleutian west",
    "adak west",
    "amchitka west",
    "attu west",
    "kerguelen",
    "mauritius",
    "reunion",
    "madagascar",
    "grande comore",
    "mayotte",
    "aldabra",
    "praslin",
    "mahe",
    "male",
    "maldive",
    "gan",
    "terceira",
    "pico",
    "sao miguel",
    "madeira",
    "lanzarote",
    "gran canaria",
    "tenerife",
    "santo antao",
    "boa vista",
    "santiago",
    "kauai",
    "oahu",
    "kahului",
    "hawaii",
    "raiatea",
    "tahiti",
    "guadeloupe",
    "dominica",
    "martinique",
    "st. lucia",
    "st. vincent",
    "grenada",
    "trinidad",
    "puerto rico",
    "domincan republic",
    "haiti",
    "falklands west",
    "falklands east",
    "iceland",
    "spitsbergen",
    "nordaustlandet",
    "edgeoya",
    "prince george",
    "salisbury",
    "wilczek",
    "bell",
    "novaya zemlya north",
    "novaya zemlya south",
    "komsomolets",
    "october",
    "bolshevik",
    "kotelny",
    "novaya sibir",
    "lyakhovsky",
    "wrangel",
    "sri lanka",
    "cuba",
    "bimini",
    "andros",
    "inagua",
    "eleuthera",
    "grand bahama",
    "jamaica",
    "irian jaya",
    "alaska-westcopy",
    "galapagos",
    "banks",
    "prince patrick",
    "eglinton",
    "mackenzie king",
    "king christian",
    "ellef ringnes",
    "amund ringnes",
    "axel heiberg",
    "victoria",
    "prince of wales",
    "prescott",
    "cornwallis",
    "bathurst",
    "devon",
    "baffin",
    "bylot",
    "ellesmere",
    "southhampton",
    "newfoundland",
    "canada",
    "usa",
    "haida gwaii",
    "vancouver",
    "guatemala",
    "honduras",
    "el salvador",
    "nicaragua",
    "costa rica",
    "panama",
    "colombia",
    "venezuela",
    "guyana",
    "suriname",
    "guyane",
    "ecuador",
    "peru",
    "bolivia",
    "paraguay",
    "uruguay",
    "argentina",
    "tierra del fuego chile",
    "tierra del fuego argentina",
    "chile",
    "chiloe",
    "brazil",
    "belize",
    "russia",
    "china",
    "mongolia",
    "north korea",
    "south korea",
    "kazakhstan",
    "turkmenistan",
    "uzbekistan",
    "tajikistan",
    "kirgizstan",
    "afghanistan",
    "pakistan",
    "india",
    "nepal",
    "bhutan",
    "bangladesh",
    "burma",
    "thailand",
    "malaysia",
    "cambodia",
    "laos",
    "vietnam",
    "georgia",
    "armenia",
    "azerbaijan",
    "iran",
    "turkey",
    "yemen",
    "oman",
    "emirates",
    "qatar",
    "kuwait",
    "saudi",
    "syria",
    "iraq",
    "jordan",
    "lebanon",
    "israel",
    "cyprus",
    "norway",
    "britain",
    "ireland",
    "sweden",
    "finland",
    "hiumaa",
    "saaremaa",
    "lithuania",
    "belarus",
    "poland",
    "spain",
    "portugal",
    "majorca",
    "sardinia",
    "corsica",
    "france",
    "netherlands",
    "germany",
    "denmark",
    "sjælland",
    "gotland",
    "switzerland",
    "czech",
    "slovakia",
    "austria",
    "hungary",
    "slovenia",
    "croatia",
    "bosnia",
    "italy",
    "sicily",
    "malta",
    "ukraine",
    "moldova",
    "romania",
    "montenegro",
    "serbia",
    "bulgaria",
    "albania",
    "macedonia",
    "greece",
    "thrace",
    "crete"
  ];

  countryAllTranslation = [
    "België",
    "Letland",
    "Kalimantan",
    "Papoea-Nieuw-Guinea",
    "Mexico",
    "Estland",
    "Algerije",
    "Marokko",
    "Mauretanië",
    "Senegal",
    "Gambia",
    "Casamance",
    "Bissau",
    "Guinee",
    "Sierra Leone",
    "Liberia",
    "Ivoire",
    "Mali",
    "Burkina",
    "Niger",
    "Ghana",
    "Togo",
    "Benin",
    "Nigeria",
    "Tunesië",
    "Libië",
    "Egypte",
    "Tsjaad",
    "Zuid-Soedan",
    "Soedan",
    "Kameroen",
    "Eritrea",
    "Djibouti",
    "Ethiopië",
    "Somaliland",
    "Socotra",
    "Somalië",
    "Centraal Afrikaanse Republiek",
    "Sao Tomé en Principe",
    "Principe",
    "Bioko",
    "Gabon",
    "Congo-Kinshasa",
    "Cabinda",
    "Congo-Kinshasa",
    "Rwanda",
    "Burundi",
    "Uganda",
    "Kenia",
    "Tanzania",
    "Zambia",
    "Angola",
    "malawi",
    "Mozambique",
    "Zimbabwe",
    "Namibië",
    "Botswana",
    "eSwatini",
    "Lesotho",
    "Zuid-Afrika",
    "Groenland",
    "Disko",
    "Milne",
    "Oost-Antarctica",
    "Australië",
    "Tasmanië",
    "Noordereiland ",
    "Zuidereiland",
    "Nieuw-Caledonië",
    "Sumatra",
    "Oost-Maleisië",
    "Celebes",
    "Molukken",
    "Seram",
    "Java",
    "Bali",
    "Lombok",
    "Soemba",
    "Flores",
    "Timor",
    "Nieuw-Ierland",
    "Nieuw-Brittannië",
    "Bougainville",
    "Choiseul",
    "New Georgia-eilanden",
    "Santa Isabel Island",
    "Malaita",
    "Santa Ana",
    "Rennell Island",
    "Espiritu Santo",
    "Malakula",
    "Efate",
    "Fiji",
    "Palawan",
    "Negros",
    "Cebu City",
    "Samar",
    "Luzon",
    "Mindoro",
    "Hainan",
    "Taiwan",
    "Kyushu",
    "Shikoku",
    "Japan",
    "Hokkaido",
    "Itoeroep",
    "Oeroep",
    "Paramoesjir",
    "Onekotan",
    "Sachalin",
    "Beringeiland",
    "Mednyeiland",
    "Attu Island",
    "Amchitka",
    "Adak",
    "Umnak",
    "Unalaska",
    "st. lawrence island",
    "st. lawrence island west",
    "Alaska",
    "Tsjoekotka",
    "wrangel-w",
    "unalaska west",
    "umnak west",
    "another aleutian west",
    "Adak West",
    "Amchitka",
    "Attu Island",
    "Kerguelen",
    "Mauritius",
    "Réunion",
    "Madagaskar",
    "Grande Comore",
    "Mayotte",
    "Aldabra",
    "Praslin",
    "Mahe",
    "Male",
    "Maldiven",
    "Gan",
    "Terceira",
    "Pico",
    "São Miguel",
    "Madeira",
    "Lanzarote",
    "Gran Canaria",
    "Tenerife",
    "Santo Antão",
    "Boa Vista",
    "Santiago de Compostella",
    "Kauai",
    "O'ahu",
    "Kahului",
    "Hawaï",
    "Raiatea",
    "Tahiti",
    "Guadeloupe",
    "Dominica",
    "Martinique",
    "st. lucia",
    "st. vincent",
    "Grenada",
    "Trinidad en Tobago",
    "Puerto Rico",
    "Dominicaanse Republiek",
    "Haïti",
    "West-Falkland",
    "Oost-Falkland",
    "IJsland",
    "Spitsbergen",
    "Noord-Oostland",
    "Edgeøya",
    "Prince George",
    "Salisbury",
    "Wilczek",
    "Bell",
    "Novaya Zemlya Noord",
    "Novaya Zemlya Zuid",
    "Komsomolets",
    "October",
    "Bolsjewiek",
    "Kotelny",
    "Nieuw-Siberië",
    "Ljachovski-eilanden",
    "Wrangel",
    "Sri Lanka",
    "Cuba",
    "Bimini",
    "Andros",
    "Inagua",
    "Eleuthera",
    "Grand Bahama",
    "Jamaica",
    "Irian Jaya",
    "Alaska-Westcopy",
    "Galapagos",
    "Banks",
    "Prince Patrick",
    "Eglinton",
    "Mackenzie King",
    "King Christian",
    "Ellef Ringnes",
    "Amund Ringnes",
    "Axel Heiberg",
    "Victoria",
    "Prince of Wales",
    "Prescott",
    "Cornwallis",
    "Bathurst",
    "Devon",
    "Baffin",
    "Bylot Island",
    "Ellesmere-eiland",
    "Southampton County",
    "Newfoundland",
    "Canada",
    "Verenigde Staten",
    "Koningin Charlotte-eilanden",
    "Vancouver",
    "Guatemala",
    "Honduras",
    "El Salvador",
    "Nicaragua",
    "Costa Rica",
    "Panama",
    "Colombia",
    "Venezuela",
    "Guyana",
    "Suriname",
    "Frans-Guyana",
    "Ecuador",
    "Peru",
    "Bolivia",
    "Paraguay",
    "Uruguay",
    "Argentinië",
    "Tierra del Fuego",
    "Vuurland",
    "Chili",
    "Chiloé",
    "Brazilië",
    "Belize",
    "Rusland",
    "China",
    "Mongolië",
    "Noord-Korea",
    "Zuid-Korea",
    "Kazachstan",
    "Turkmenistan",
    "Oezbekistan",
    "Tadzjikistan",
    "Kirgizstan",
    "Afghanistan",
    "Pakistan",
    "India",
    "Nepal",
    "Bhutan",
    "Bangladesh",
    "Myanmar ",
    "Thailand",
    "Maleisië",
    "Cambodja",
    "Laos",
    "Vietnam",
    "Georgia",
    "Armenië",
    "Azerbeidzjan",
    "Iran",
    "Turkije",
    "Jemen",
    "Oman",
    "Verenigde Arabische Emiraten",
    "Qatar",
    "Koeweit",
    "Saudi-Arabië",
    "Syrië",
    "Irak",
    "Jordanië",
    "Libanon",
    "Israël",
    "Cyprus",
    "Noorwegen",
    "Verenigd Koninkrijk",
    "Ierland",
    "Zweden",
    "Finland",
    "hiumaa",
    "Saaremaa",
    "Litouwen",
    "Wit-Rusland",
    "Polen",
    "Spanje",
    "Portugal",
    "Majorca",
    "Sardinië",
    "Corsica",
    "Frankrijk",
    "Nederland",
    "Duitsland",
    "Denemarken",
    "Seeland",
    "Gotland",
    "Zwitserland",
    "Tsjechië",
    "Slowakije",
    "Oostenrijk",
    "Hongarije",
    "Slovenië",
    "Kroatië",
    "Bosnië",
    "Italië",
    "Sicilië",
    "Malta",
    "Oekraïne",
    "Moldavië",
    "Roemenië",
    "Montenegro",
    "Servië",
    "Bulgarije",
    "Albanië",
    "Noord-Macedonië",
    "Griekenland",
    "Thracië",
    "Kreta"
  ]

  //getters
  getCountry() {
    return this.country;
  }

  getCountryAll() {
    return this.countryAll;
  }

  getCountryAllTranslation() {
    return this.countryAllTranslation;
  }

  convertTranslateCountryToCountry(countryToSearch: String): String {
    for (let i = 0; i < this.countryAllTranslation.length; i++) {
      if (this.countryAllTranslation[i] == countryToSearch) {
        return this.countryAll[i];

      }
    }
  }

  convertCountryToTranslateCountry(countryToSearch: String): String {
    for (let i = 0; i < this.countryAll.length; i++) {
      if (this.countryAll[i] == countryToSearch) {
        return this.countryAllTranslation[i];
      }
    }
  }



}
