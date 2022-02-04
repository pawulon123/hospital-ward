import { BedMarkedService } from '../../core/services/edit-room/services/bed-marked';
import { Coordinates } from './../models/coordinate';
import { EditRoomService } from '../../core/services/edit-room/services/edit-room.service';
import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { pivotCoordinatesOfRect, circle, rect, partial, triangle, charX } from '../../shared/useful/useful';
import { Sex } from '../models/sex';

@Directive({
  selector: '[appInnerBed]'
})
export class InnerBedDirective implements OnInit {
  @Input("appInnerBed") bedDraw: any;
  @HostBinding('attr.points') points: string = "";
  constructor(
      private bedMarkedService: BedMarkedService,
  ) { }

  ngOnInit() {
    this.draw();
    this.bedMarkedService.markingRoom$.subscribe(() => this.draw());
  }
  draw(): void {
    (this as Record<string, any>)[this.bedDraw.draw]();
  }
  sex(): void {
    const pivotCoordinates: Coordinates = pivotCoordinatesOfRect(this.bedDraw.bed.polygon).twoSymetricalSquares.one;
    const sex: Sex = {
      women: partial(circle, pivotCoordinates),
      men: partial(triangle, pivotCoordinates),
      other: partial(charX, pivotCoordinates),
    };
    this.points = (sex as Record<string, any>)[this.bedDraw.bed.patient.sex]().polygon;
  }
  walking(): void {
    const pivotCoordinates: Coordinates = pivotCoordinatesOfRect(this.bedDraw.bed.polygon).twoSymetricalSquares.two;
    this.points = this.bedDraw.bed.patient.walking ? rect(pivotCoordinates, 'notWalk').polygon : rect(pivotCoordinates, 'walk').polygon;
  }
}
