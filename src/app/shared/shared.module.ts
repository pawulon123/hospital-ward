import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDirective } from './directives/position.directive';
import { RoomsEvDirective } from './directives/rooms-ev.directive';
import { ModeWardSvgService } from '../core/services/mode-ward-svg.service';
import { BedsEvDirective } from './directives/beds-ev.directive';
import { InnerBedDirective } from './directives/inner-bed.directive';
@NgModule({
  declarations: [
    PositionDirective,
    RoomsEvDirective,
    BedsEvDirective,
    InnerBedDirective

  ],
  imports: [
    CommonModule
  ],
  exports:[
    PositionDirective,
    RoomsEvDirective,
    BedsEvDirective,
    InnerBedDirective
  ],
  providers:[
    ModeWardSvgService
  ]
})
export class SharedModule { }
