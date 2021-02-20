import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild, HostListener, Directive, ChangeDetectorRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';



/*Service */
import { VisitorsService } from '../../visitors.service';
import { CountriesService } from '../../countries.service';
import {NotificationService}from './../../Notification.service'; 


/*interface and class */
import { PrikboardItem, cPrikboardItem } from './PriboardItem';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}


@Component({
  selector: 'app-kaart',
  templateUrl: './kaart.component.html',
  styleUrls: ['./kaart.component.css'],
  animations: [
    trigger('transformAnimation', [state(
      '*',
      style({ transform: '{{transform}}' }),
      { params: { transform: 'scale(1)', duration: '0s' } }),
    transition('* => *', animate('{{duration}} ease'))])]
})

export class KaartComponent implements OnInit {
  @ViewChild('kaartSvg') kaartSvg;
  GvCountryClick;
  objElm;
  visitors;
  ErrorActive: boolean = false;
  browserType: string;
  OpenBrikboard: boolean = true;


  //zoom
  scale = 1;
  translate: [number, number] = [0, 0];
  translateOnPanStart: [number, number] = [0, 0];

  transformAnimationState = {
    value: null,
    params: {
      transform: 'scale(1)',
      duration: '0s'
    }
  };

  aPrikboardList: Array<PrikboardItem> = [
    new cPrikboardItem
  ];


  PbLand: string = "";
  PbNumbersVisit: string = "0";



  options
  constructor(
    private elementRef: ElementRef,
    private __VisitorsService: VisitorsService,
    private __CountriesService: CountriesService,
    private __Router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private __NotificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.visitors = this.__VisitorsService.getData();

    if (!this.visitors) {
      this.__Router.navigate(['/']);
    }
  }

  
  ngAfterViewInit(): void {
    var $this = this;
    var __objElm = (this.kaartSvg.nativeElement as HTMLObjectElement);
    console.log(__objElm)
    __objElm.onload = () => {
      $this.Main(__objElm);

    }
  }

   
  refreshData(){
    this.visitors = this.__VisitorsService.getData();

    this.__NotificationService.showNotification( 'info', 'Herladen!');
  }


  Main(objElm): void {
    //console.log("main")
    let country = this.__CountriesService.getCountry();
    let dataVisitor = this.__VisitorsService.getData().members;
    this.ErrorActive = false;

    if (country == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load: counrtry")
      return;
    }

    if (dataVisitor == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load: dataVisitor")
      return;
    }

    if (objElm == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load: objElm")
      return;
    }

    if (objElm.contentDocument == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load: objElm.contentDocument")
      return;
    }
    //console.log(country)
    //console.log(dataVisitor)

    this.ShowCountry(country, dataVisitor, objElm.contentDocument);

    for (let i = 0; i < country.length; i++) {
      this.AnimationMap(country[i], dataVisitor, objElm.contentDocument);
    }

  }



  AnimationMap(country, DataFromJs, HTLM) {

    //Check input parameters
    if (country == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (AnimationMap): country")
      return;
    }

    if (DataFromJs == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (AnimationMap): DataFromJs")
      return;
    }

    if (HTLM == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (AnimationMap): HTLM")
      return;
    }


    var ms = HTLM.getElementById(country);

    if (ms == null || undefined) {
      this.ErrorActive = true;
      console.log("error: ", country);
      return;
    }

    if (this.GvCountryClick !== null || this.GvCountryClick !== undefined) {
      var msv = HTLM.getElementById(this.GvCountryClick);
    }

    var $this = this;

    ms.onclick = function (e) {
      var color = '#34642d';
      //console.log($this.GvCountryClick)

      var style_valueV = '';
      var style_value = '';

      //Prikboard
      $this.PbNumbersVisit = String($this.getDataFromCountry(DataFromJs, country));
      $this.PbLand = String($this.__CountriesService.convertCountryToTranslateCountry(country));
      $this.OpenBrikboard = true;
      $this.changeDetectorRef.detectChanges()

      //color country 
      if ($this.GvCountryClick !== null || undefined) {
        let LcountryV = $this.GvCountryClick;
        if (LcountryV === undefined) {
          LcountryV = "france";
        }

        //cut
        for (let i = 0; i < DataFromJs.length; i++) {
          if (DataFromJs[i].country === LcountryV) {
            color = '#d7731d';
            break;
          }
        }
        msv = HTLM.getElementById(LcountryV);

        var attrsV = msv.getAttribute('style').split(' ').join('').split(';');

        for (var iV in attrsV) {
          var attrV = attrsV[iV].split(':');
          if (attrV.length > 1) {
            var kV = attrV[0];
            var vV = attrV[1];
          }
          if (kV == 'fill') {
            //toggle green
            vV = color;
          }
          if (kV != "") {
            style_valueV = style_valueV + kV + ':' + vV + ';';
          }
        }
        msv.setAttribute('style', style_valueV);

      }

      //Parsing style attribute values
      var attrs = ms.getAttribute('style').split(' ').join('').split(';');

      for (var i in attrs) {
        var attr = attrs[i].split(':');
        if (attr.length > 1) {
          var k = attr[0];
          var v = attr[1];

        }
        if (k == 'fill') {
          //Toggle blue
          v = '#2e4ae8';
          $this.GvCountryClick = country;
        }
        if (k != "") {
          style_value = style_value + k + ':' + v + ';';

        }
      }
      ms.setAttribute('style', style_value);
    };
    ms.onmouseover = function (e) {
      ms.style.cursor = 'pointer';
    };
    ms.onmouseout = function (e) {
      ms.style.cursor = 'auto';
    };
  }



  ShowCountry(aAllCountry, DataJSON, HTML) {
    if (aAllCountry == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (ShowCountry): aAllCountry")
      return;
    }

    if (DataJSON == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (ShowCountry): DataJSON")
      return;
    }

    if (HTML == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (ShowCountry): HTML")
      return;
    }

    //variabelen
    var t, state, found;


    //tokken zoeken en weergeven op de kaart
    for (let i = 0; i < DataJSON.length; i++) {

      found = false;
      for (let ii = 0; ii < aAllCountry.length; ii++) {
        t = HTML.getElementById(aAllCountry[ii] + '-tok');
        if (t != null || undefined) {
          state = t.getAttribute('display');
        }


        if (aAllCountry[ii] === DataJSON[i].country) {
          // console.log(aAllCountry[ii])
          this.ColorVisitCountry(aAllCountry[ii], HTML)
          state = 'block';
          if (t != null || undefined) {
            t.setAttribute('display', state);
          }

          found = true;
        }
      }
    }
  }

  //Color visit country
  ColorVisitCountry(country, HTML) {

    if (country == null || undefined) {
      console.log("data not load (ColorVisitCountry): country")
      return;
    }

    if (HTML == null || undefined) {
      console.log("data not load (ColorVisitCountry): HTML")
      return;
    }

    var ms = HTML.getElementById(country);

    if (ms == null || undefined) {
      this.ErrorActive = true;
      console.log("Error: " + country)
      return;
    }

    var style_value = '';
    // parsing style attribute values
    var attrs = ms.getAttribute('style').split(' ').join('').split(';');

    for (var i in attrs) {
      var attr = attrs[i].split(':');
      if (attr.length > 1) {
        var k = attr[0];
        var v = attr[1];

      }
      if (k == 'fill') {
        // toggle color red vs green
        v = '#d7731d';

      }
      if (k != "") {
        style_value = style_value + k + ':' + v + ';';

      }
    }
    ms.setAttribute('style', style_value);
  }

  getDataFromCountry(dataInJSON, DataClickCountry) {

    if (dataInJSON == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (CreatDataPrikboardOnClick): dataInJSON")
      return;
    }
    if (DataClickCountry == null || undefined) {
      this.ErrorActive = true;
      console.log("data not load (CreatDataPrikboardOnClick): DataClickCountry")
      return;
    }

    //resultaat wissen
    const LenPrikboardList = this.aPrikboardList.length;
    this.aPrikboardList.splice(0, LenPrikboardList);

    //reset tellers
    var numberOfFound = 0;
    var lastID = 0;


    //Create new prikboard item
    for (let i = 0; i < dataInJSON.length; i++) {
      if (dataInJSON[i].country === DataClickCountry) {
        //Creat new
        numberOfFound++;

        //data copie
        let NewData = new cPrikboardItem();
        NewData.name = String(dataInJSON[i].name);
        NewData.imgScr = String(dataInJSON[i].imgScr);
        NewData.date = dataInJSON[i].date;
        NewData.bond = dataInJSON[i].bond;

        //data toevoegen
        this.aPrikboardList.push(NewData)

        console.log( this.aPrikboardList)

        lastID = i;
      }
    }
    return numberOfFound;
  }

  //zoom
  @HostListener('mousewheel', ['$event'])
  onMouseWheel(e: MouseWheelEvent) {

    const currentScale = this.scale;
    const newScale = clamp(this.scale + Math.sign(e.deltaY) / 10.0, 1, 3.0);
    console.log("hier")
    if (currentScale !== newScale) {

      this.translate = this.calculateTranslationToZoomPoint(currentScale, newScale, this.translate, e);
      this.scale = newScale;

      this.updateTransformAnimationState();
    }

    e.preventDefault();
  }

  private calculateTranslationToZoomPoint(currentScale: number, newScale: number, currentTranslation: [number, number], e: { clientX: number, clientY: number },): [number, number] {
    // kudos to this awesome answer on stackoverflow:
    // https://stackoverflow.com/a/27611642/1814576
    const [eventLayerX, eventLayerY] = this.projectToLayer(e);
    console.log("calculateTranslationToZoomPoint")

    const xAtCurrentScale = (eventLayerX - currentTranslation[0]) / currentScale;
    const yAtCurrentScale = (eventLayerY - currentTranslation[1]) / currentScale;

    const xAtNewScale = xAtCurrentScale * newScale;
    const yAtNewScale = yAtCurrentScale * newScale;

    return [eventLayerX - xAtNewScale, eventLayerY - yAtNewScale];
  }

  private projectToLayer(eventClientXY: { clientX: number, clientY: number }): [number, number] {
    const layerX = Math.round(eventClientXY.clientX - this.clientX);
    const layerY = Math.round(eventClientXY.clientY - this.clientY);
    return [layerX, layerY];
  }

  private get clientX() {
    return (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().left;
  }

  private get clientY() {
    return (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().top;
  }

  private updateTransformAnimationState(duration = '.5s') {
    this.transformAnimationState = {
      value: this.scale + this.translate[0] + this.translate[1],
      params: {
        transform: `translate3d(${this.translate[0]}px, ${this.translate[1]}px, 0px) scale(${this.scale})`,
        duration
      }
    }
  }

  // @HostListener("panstart", ["$event"])
  // onPanStart(e: Event) {
  //   console.log("onPanStart")
  //   this.translateOnPanStart = [...this.translate] as [number, number];
  //   e.preventDefault();
  // }

  // @HostListener("pan", ["$event"])
  // onPan(e: Event & { deltaX: number; deltaY: number }) {
  //   console.log("onPan")
  //   this.translate = [
  //     this.translateOnPanStart[0] + e.deltaX,
  //     this.translateOnPanStart[1] + e.deltaY
  //   ];
  //   this.updateTransformAnimationState("0s");
  //   e.preventDefault();
  // }


  /*Buttons */
  closePBdata() {
    this.OpenBrikboard = false;
  }

  resetZoom() {
    this.scale = 1;
    this.translate = [0, 0];
    this.updateTransformAnimationState();
  }

  zoomIn() {
    //console.log("zoom in")
    this.scale = this.scale + 0.5;
    this.translate = [0, 0];
    this.updateTransformAnimationState();
  }

  zoomOut() {
    //console.log("zoom out")
    this.scale = this.scale - 0.5;
    this.translate = [0, 0];
    this.updateTransformAnimationState();
  }

  moveUp() {
    console.log("move up")
    let y = this.translate[0]
    //console.log(y)
    this.translate = [
      this.translateOnPanStart[0],
      this.translateOnPanStart[1] = this.translateOnPanStart[1] + 20
    ];
    this.updateTransformAnimationState("0s");
  }

  moveDown() {
    console.log("move up")
    let y = this.translate[0]
    //console.log(y)
    this.translate = [
      this.translateOnPanStart[0],
      this.translateOnPanStart[1] = this.translateOnPanStart[1] - 20
    ];
    this.updateTransformAnimationState("0s");
  }

  moveLeft() {
    console.log("move left")

    this.translate = [
      this.translateOnPanStart[0] = this.translateOnPanStart[0] - 20,
      this.translateOnPanStart[1]
    ];
    this.updateTransformAnimationState("0s");
  }


  moveRight() {
    //console.log("move right")
    this.translate = [
      this.translateOnPanStart[0] = this.translateOnPanStart[0] + 10,
      this.translateOnPanStart[1]
    ];
    this.updateTransformAnimationState("0s");
  }













}
