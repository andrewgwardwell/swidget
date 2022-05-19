import { AfterViewChecked, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OwlCarousel } from 'ngx-owl-carousel';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() names?: string;
  @Input() dots?: boolean;
  @Input() nav?: boolean;
  @Input() autoplay?: boolean;
  @Input() loop?: boolean;
  @Input() fetch?: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  libData: Array<{id: string, spaces: string, text: string, commData: any}> = [];
  combos = [];
  timer: any;
  refreshInt: any;
  options: {};
  doFetch: boolean;

  constructor(public widgetService: WidgetService) { }
  @ViewChild('owlCar') carouselEl: OwlCarousel;

  ngOnInit(): void {
    this.doFetch = this.fetch ? this.fetch : false;
    this.options = {
      items: 1,
      dots: this.dots ? this.dots : false,
      nav: this.nav ? this.nav : false,
      rewind: true,
      loop: this.loop ? this.loop : false,
      autoplay: this.autoplay ? this.autoplay : false,
      autoplaySpeed: 600,
      center: true,
      animateOut: 'animate__fadeOut',
      animateIn: 'animate__fadeIn',
      navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"],
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 1,
          nav: false
        },
        1000: {
          items: 1
        }
      }
    };
    this.widgetService.getMaster().subscribe();
    this.widgetService.masterSource.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.processMaster(response);
      this.fetchLiveData();
    });

  }

  processMaster(resp: any){
    resp.forEach(r => {
      const item: any = {
        id: r[0],
        spaces: r[1],
        text: r[2],
        nickname: r[3],
        commData: []
      }

      if(this.names){
        let namesArray = this.names.split(',');
        let nameIncluded = namesArray.findIndex((n) => {
          return n == item.nickname;
        });
        if(nameIncluded > -1){
          this.libData.push(item);
        }
      } else if(!this.names) {
        this.libData.push(item);
      }
    });
  }

  fetchLiveData(){
    const requests = [];
    const reqOrder = [];
    this.libData.forEach((item) => {
      reqOrder.push(item.id);
      requests.push(this.widgetService.getClauseValues(item.id));
    });
    forkJoin(requests).subscribe(
      (response) => {
        response.forEach((val:any, ind: number) => {
          const id = reqOrder[ind];
          const libDataInd = this.libData.findIndex(i => i.id == id);
          this.libData[libDataInd].commData = val.values;
        });
        this.generateRandomCombinations(20);
        if(this.doFetch){
          this.refreshInt = setInterval(() => this.refreshData(), 300000);
        }
      }
    );    
  }

  refreshData(){
    clearInterval(this.refreshInt);
    this.fetchLiveData();
  }
    
  generateRandomCombinations(number){
    // this.combos = [];
    if(this.libData && this.libData.length > 0){
        for(let b = 0; b <= number; b++){
          const randomLib = (Math.random() * (this.libData.length - 1 + 1) ) << 0;
          const data = this.libData[randomLib];
          const numberOfBlanks = parseInt(data.spaces);
          let toFill = new String(data.text);
          const values = [];
          const userData = data.commData;
          // '(?<={).*?(?=})'          look behind doesn't work in safari
          // "{([^}]*)"
          const between = new RegExp("{(.*?)}", 'g');
          const matches = toFill.match(between);
          // pick randomly from commddata
          for(let i = 0; i <= numberOfBlanks; i++){
            const randomRow = (Math.random() * (userData.length - 1 + 1) ) << 0;
            const val = userData[randomRow][i];
            const nameSpot = numberOfBlanks;
            const ageSpot = numberOfBlanks + 1;
            const userName = userData[randomRow][nameSpot];
            const userAge = userData[randomRow][ageSpot];
            const userInfo = userName ? `<div class="super">${(userName && userAge ? userName+', '+userAge : userName)}</div>` : '';
            const valHtml = `<span class="blank">${userInfo}${val}</span>`;
            toFill = toFill.replace(`${matches[i]}`, valHtml);
          }
          this.combos.push(toFill);
        }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
