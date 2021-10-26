import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWindowComponent } from './base-window/base-window.component';
import { WardSvgModule } from '../ward-svg/ward-svg.module';

@NgModule({
  declarations: [BaseWindowComponent],
  imports: [
    CommonModule,
    WardSvgModule
  ],
  exports: [
    BaseWindowComponent
  ],
  providers: []
})
export class CurrentStateModule { }
