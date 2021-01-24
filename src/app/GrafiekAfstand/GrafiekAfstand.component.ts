import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { VisitorsService } from '../visitors.service';



@Component({
  selector: 'app-GrafiekAfstand',
  templateUrl: './GrafiekAfstand.component.html',
  styleUrls: ['./GrafiekAfstand.component.scss']
})
export class GrafiekAfstandComponent implements OnInit {

  dataVisitors;

  constructor(
    private __VisitorsService: VisitorsService,
  ) { }



  /*Settings chart */
  public lineChartData: ChartDataSets[] = [{
    data: [12],
    label: 'Bezoekers per jaar',

  }];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & {
    annotation: any
  }) = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Jaartal'
          }
        }],
        yAxes: [
          {
            id: 'y-axis',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Afstand [km]'
            },

            gridLines: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              fontColor: 'red',

            }
          }
        ]
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },],
      },

    };
  public lineChartColors: Color[] = [{ // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // red
    backgroundColor: 'rgba(255,0,0,0.3)',
    borderColor: 'red',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {
    static: true
  }) chart: BaseChartDirective;

  ngOnInit() {

    this.__VisitorsService.getDataFromHttp().then(
      response => {
        //console.log(response)

        this.dataVisitors = response;

        //update chart 
        this.updateChart()
      },
      error => {
        console.log("error: ", error)
      }
    )


  }

  updateChart() {

    //clear old data
    let EmteyData: number[] = [0];
    let EmteyDataString: string[] = ["0"];
    var aTotaalPerJaar: Number[] = [0];
    var lijstMetJaartallen: String[] = [""];
    var lijstMetJaartallenUniq;

    let uniq = a => { return [...new Set(a)] }

    for (let i = 0; i < this.dataVisitors.members.length; i++) {
      lijstMetJaartallen[i] = this.dataVisitors.members[i].year;
    }

    //delet duplicaten in de array
    lijstMetJaartallenUniq = uniq(lijstMetJaartallen);

    for (let i = 0; i < lijstMetJaartallenUniq.length; i++) {
      aTotaalPerJaar[i] = 0; //array element init value 0
      for (let ii = 0; ii < this.dataVisitors.members.length; ii++) {
        if (lijstMetJaartallenUniq[i] == this.dataVisitors.members[ii].year) {
          aTotaalPerJaar[i] = Number(Number(aTotaalPerJaar[i]) + Number(this.dataVisitors.members[ii].distance));
        }
      }
    }


    //reset old data
    this.lineChartData[0].data = EmteyData;
    this.lineChartLabels = EmteyDataString;

    //data for chart
    for (let i = 0; i < lijstMetJaartallenUniq.length; i++) {
      this.lineChartData[0].data[i] = Number(aTotaalPerJaar[i]);
      this.lineChartLabels[i] = String(lijstMetJaartallenUniq[i]);
    }

    this.chart.update();

  }


  // events
  public chartClicked({ event, active }: {
    event: MouseEvent,
    active: {}[]
  }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: {
    event: MouseEvent,
    active: {}[]
  }): void {
    //console.log(event, active);
  }

}
