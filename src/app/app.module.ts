import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentStateModule } from './current-state/current-state.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { WardSvgModule } from './ward-svg/ward-svg.module';
// import { WardSvgModule } from './ward-svg/ward-svg.module';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrentStateModule,
    WardSvgModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
