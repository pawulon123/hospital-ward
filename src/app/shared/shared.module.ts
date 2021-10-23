import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDirective } from './directives/position.directive';
import { RoomsEvDirective } from './directives/rooms-ev.directive';
import { ModeWardSvgService } from '../core/services/mode-ward-svg.service';



@NgModule({
  declarations: [
    PositionDirective,
    RoomsEvDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PositionDirective,
    RoomsEvDirective
  ],
  providers:[
    ModeWardSvgService
  ]
})
export class SharedModule { }
