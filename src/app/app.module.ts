import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentStateModule } from './current-state/current-state.module';
import { HttpClientModule } from '@angular/common/http';
import { WardSvgModule } from './ward-svg/ward-svg.module';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrentStateModule,
    HttpClientModule,
    CoreModule





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
