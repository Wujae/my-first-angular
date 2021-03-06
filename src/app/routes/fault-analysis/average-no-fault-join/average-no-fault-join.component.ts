import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AXIS} from "../../../shared/components/rotation-data-switch/rotation-data-switch.component";
import {AverageNoFaultDataService} from "../../../service/impl/fault-analysis/average-no-fault-data.service";

const COLOR_PALETTE = ["#f98446","#f94646","#f946c4","#c046f9","#4689f9","#46f9e2","#4ef946","#def946","#f9d546","#f5a57e" ];
@Component({
  selector: 'app-average-no-fault-join',
  templateUrl: './average-no-fault-join.component.html',
  styleUrls: ['./average-no-fault-join.component.css']
})
export class AverageNoFaultJoinComponent implements OnInit {

  options: any;
  mergeOptions: any;

  @Input() labelTimeText: string = 'title';
  @Input() labelMileText: string = 'title';
  @Input() dataTime: any;
  @Input() dataMile: any;

  mapLoaded = false;

  timePieNumber: number = 0;
  milePieNumber: number = 0;

  axis: any = AXIS;

  currEquip: string = '';

  constructor() {
    this.mapLoaded = true;

    this.options = {
      color: COLOR_PALETTE,
      legend: {
        bottom: '10%',
        left: 'center',
        data: ['CRH5A', 'CRH5G','CRH3A','CRH380B','CR400BF'],
        textStyle: {
          fontSize: 17,
          color: 'white',
        }
      },
      series : [
        {
          id: 'average_time_pie',
          type: 'pie',
          center: ['25%', '35%'],
          radius: ['50%', '63%'],
          selectedMode: 'single',
          data:[
            {value:1548,name: 'CRH5A'},
            {value:535, name: 'CRH5G'},
            {value:510, name: 'CRH3A'},
            {value:634, name: 'CRH380B'},
            {value:735, name: 'CR400BF'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label:{
            show:false,
          },
        },
        {
          id: 'average_mile_pie',
          type: 'pie',
          center: ['75%', '35%'],
          radius: ['50%', '63%'],
          selectedMode: 'single',
          data:[
            {value:1548,name: 'CRH5A'},
            {value:535, name: 'CRH5G'},
            {value:510, name: 'CRH3A'},
            {value:634, name: 'CRH380B'},
            {value:735, name: 'CR400BF'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label:{
            show:false,
          },
        }
      ],
      animationDuration: 1000
    };

  }

  ngOnChanges(){
    this.dataProcess();
  }

  private dataProcess() {

    if(this.dataTime){
      this.mergeOptions = {
        legend:{
          data: this.dataTime.map((item) => { return item.name })
        },
        series: [
          {
            id: 'average_time_pie',
            data: this.dataTime
          },
          {
            id: 'average_mile_pie',
            data: this.dataMile
          }
        ]
      };

      let optionTime = this.dataTime;
      let optionMile = this.dataMile;

      clearInterval(this.pieSwitchInterval);

      let dataLen = optionTime.length;

      this.currentIndex = (this.currentIndex + 1) % dataLen;

      this.timePieNumber = optionTime[this.currentIndex].value;
      this.milePieNumber = optionMile[this.currentIndex].value;
      this.currEquip = optionTime[this.currentIndex].name;

      this.myCharts.dispatchAction(
        {
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: this.currentIndex
        }
      );
      this.myCharts.dispatchAction(
        {
          type: 'pieSelect',
          seriesIndex: 1,
          dataIndex: this.currentIndex
        }
      );

      this.pieSwitchInterval = setInterval( ()=>  {

        this.currentIndex = (this.currentIndex + 1) % dataLen;

        this.timePieNumber = optionTime[this.currentIndex].value;
        this.milePieNumber = optionMile[this.currentIndex].value;

        this.currEquip = optionTime[this.currentIndex].name;

        this.myCharts.dispatchAction(
          {
            type: 'pieSelect',
            seriesIndex: 0,
            dataIndex: this.currentIndex
          }
        );
        this.myCharts.dispatchAction(
          {
            type: 'pieSelect',
            seriesIndex: 1,
            dataIndex: this.currentIndex
          }
        );

      }, 10000);
    }
  }

  ngOnInit() {}

  private currentIndex = -1;
  private pieSwitchInterval:any;
  private myCharts = null;


  chartsInit(myCharts) {

    this.myCharts = myCharts;

  }

}
