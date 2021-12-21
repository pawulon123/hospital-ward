import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDirective } from './directives/position.directive';
import { RoomsEvDirective } from './directives/rooms-ev.directive';
import { ModeWardSvgService } from '../core/services/mode-ward-svg.service';
import { BedsEvDirective } from './directives/beds-ev.directive';
import { InnerBedDirective } from './directives/inner-bed.directive';
import { MoveBedDirective } from './directives/move-bed.directive';
import { BedMarkedDirective } from './directives/bed-marked.directive';
@NgModule({
  declarations: [
    PositionDirective,
    RoomsEvDirective,
    BedsEvDirective,
    InnerBedDirective,
    MoveBedDirective,
    BedMarkedDirective

  ],
  imports: [
    CommonModule
  ],
  exports:[
    PositionDirective,
    RoomsEvDirective,
    BedsEvDirective,
    InnerBedDirective,
    MoveBedDirective,
    BedMarkedDirective
  ],
  providers:[
    ModeWardSvgService
  ]
})
export class SharedModule { }
