import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { FormControl } from '@angular/forms';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Slider Images
  slides = [{
    'image': './assets/img/Demo/OmslagTok1.jpg',
    'tekst': "onze tok de wereld rond",
    'subtekst': ""
  },
  {
    'image': './assets/img/Demo/deelnemers.jpg',
    'tekst': "Steek je tokmuts in je valies en neem de origineelste foto op reis!",
    'subtekst': ""
  },
  {
    'image': './assets/img/Demo/OmslagTok3.jpg',
    'tekst': "Welke landen bezocht onze tok?",
    'subtekst': "Ontdek het hier!"
  }
  ];

  
  
  constructor() { }

  ngOnInit(): void {
    
  }

  
  
}
