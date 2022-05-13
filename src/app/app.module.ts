import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WidgetComponent } from './components/widget/widget.component';
import { HttpClientModule } from '@angular/common/http';

import { OwlModule } from 'ngx-owl-carousel';
import  { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OwlModule
  ],
  providers: [],
  entryComponents: [WidgetComponent]
})
export class AppModule {
  constructor(public injector: Injector){

  }

  ngDoBootstrap() {
    const el = createCustomElement(WidgetComponent, {injector: this.injector });
    customElements.define('switchlit-widget', el);
  }
}
