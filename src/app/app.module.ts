import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WidgetComponent } from './components/widget/widget.component';
import { HttpClientModule } from '@angular/common/http';

import { OwlModule } from 'ngx-owl-carousel';
import  { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WidgetComponent]
})
export class AppModule {
  constructor(public injector: Injector){
    const el = createCustomElement(WidgetComponent, { injector });
    customElements.define('swidget', el);
  }

  ngDoBootstrap() {

  }
}
