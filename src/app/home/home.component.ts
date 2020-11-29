import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { FormControl } from '@angular/forms';

import { VisitorsService } from '../visitors.service';
import { CountriesService } from '../countries.service';
import { TotalDistService } from '../total-dist.service';
import { GeneralService } from '../general.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Slider Images
  slides = [{
    'image': './assets/img/Demo/OmslagTok.jpg',
    'tekst': "onze tok de wereld rond"
  },
  {
    'image': './assets/img/Demo/1.jpg',
    'tekst': ""
  },
  {
    'image': './assets/img/Demo/2.jpg',
    'tekst': ""
  },
  {
    'image': './assets/img/Demo/3.jpg',
    'tekst': ""
  },
  {
    'image': './assets/img/Demo/4.jpg',
    'tekst': ""
  }
  ];

  
  
  constructor(
    private __VisitorsService: VisitorsService,
    private __CountriesService: CountriesService,
    private __TotalDistService: TotalDistService,
    private __GeneralService: GeneralService,

  ) { }

  ngOnInit(): void {
    
  }

  
  
}
