import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input()keys?: string;
  title = 'switch-wid-app';

  ngOnInit(): void {
    console.log(this.keys);
  }
}
