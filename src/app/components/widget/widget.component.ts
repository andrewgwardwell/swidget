import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input()names?: Array<string>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  libData: Array<{id: string, spaces: string, text: string, commData: any}> = [];
  combos = [];
  timer: any;
  refreshInt: any;
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
      const item: any = {
        id: r[0],
        spaces: r[1],
        text: r[2],
        nickname: r[3],
        commData: []
      }

      if(this.names){
        let nameIncluded = this.names.findIndex((n) => {
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
        this.refreshInt = setInterval(() => this.refreshData(), 60000);
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
          this.combos.push(toFill);
        }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
