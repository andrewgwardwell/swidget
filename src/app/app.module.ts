import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WidgetComponent } from './components/widget/widget.component';
import { HttpClientModule } from '@angular/common/http';

import { OwlModule } from 'ngx-owl-carousel';

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
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private injector: Injector){}

  // ngDoBootstrap() {
  //   const el = createCustomElement(WidgetComponent, { injector: this.injector });
  //   customElements.define('swidget', el);
  // }
}
