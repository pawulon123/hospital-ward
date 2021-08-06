import { WardComponent } from './svg/ward/ward.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgModule } from './svg/svg.module';
import { BaseWindowComponent } from './base-window/base-window.component';

@NgModule({
  declarations: [
    BaseWindowComponent
  ],
  imports: [
    CommonModule,
    SvgModule
  ],
  exports: [SvgModule, BaseWindowComponent]
})
export class CurrentStateModule { }
