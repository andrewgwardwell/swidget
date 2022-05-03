import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input()names?: Array<string>;
  title = 'switch-wid-app';

  ngOnInit(): void {
      if(!this.names){
        this.names = null;
      }
  }
}
