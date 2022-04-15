import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  libData: Array<{id: string, spaces: string, text: string, commData: any}> = [];
  combos = [];
  timer: any;
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  constructor(public widgetService: WidgetService) { }

  ngOnInit(): void {
    this.widgetService.getMaster().subscribe();
    this.widgetService.masterSource.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.processMaster(response);
      this.fetchLiveData();
    });
  }

  processMaster(resp: any){
    resp.forEach(r => {
      const item = {
        id: r[0],
        spaces: r[1],
        text: r[2],
        commData: []
      }
      this.libData.push(item);
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
        console.log(this.libData);
        this.timer = setInterval(() => this.generateRandomCombinations(), 900)
      }
    );    
  }

  addSlide() {
    // this.slides.push(488)
  }

  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {}
    

  generateRandomCombinations(){
    let combos = this.combos;
    if(this.combos.length > 20){
      clearInterval(this.timer);
    }
    if(this.libData && this.libData.length > 0){
      this.libData.forEach((data) => {
        const numberOfBlanks = parseInt(data.spaces);
        let toFill = new String(data.text);
        const values = [];
        const userData = data.commData;
        const between = new RegExp('(?<={).*?(?=})', 'g');
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
          toFill = toFill.replace(`{${matches[i]}}`, valHtml);
        }
        combos.push(toFill);
      });
    }
    this.combos = combos;
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
