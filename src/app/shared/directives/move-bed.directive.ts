import { InstanceEditRoomService } from '../../core/services/edit-room/services/instance-edit-room-service';
import { Coordinates } from './../models/coordinate';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { coordinateOfPolygon, move, polygonOfcoordinates } from '../useful/useful';
import { EditRoomService } from '../../core/services/edit-room/services/edit-room.service';
import { Bed } from '../models/bed';
import { BedMarkedService } from '../../core/services/edit-room/services/bed-marked';

@Directive({
  selector: '[appMoveBed]'
})
export class MoveBedDirective implements OnInit {
  @Input("appMoveBed") bed: any;
  set points(points: string) {
    this.bed.polygon = points;
  }
  get points(): string {
    return this.bed.polygon;
  }
  private bedPolygon: Coordinates[] = [];
  private startPolygon: string = '';

  constructor(
    @Optional() private editRoomService: EditRoomService | null,
    private instanceEditRoomService: InstanceEditRoomService,
    private cdkDrag: CdkDrag,
    private bedMarkedService: BedMarkedService,
  ) {
  }
  ngOnInit() {
    this.bedPolygon = coordinateOfPolygon(this.points);
    this.startPolygon = this.points;
    this.cdkDrag.disabled = true;
    this.setEditRoomService();
    this.bedMarkedService.markingRoom$.subscribe(this.initialStateBasedOnBedId.bind(this));
    this.cdkDrag.started.subscribe(this.started.bind(this));
    this.cdkDrag.moved.subscribe(this.moved.bind(this));
    this.cdkDrag.ended.subscribe(this.ended.bind(this));
  }
  private initialStateBasedOnBedId(idBedMarked: number | null): void {
    if (idBedMarked === this.bed.id && this.editRoomService &&this.editRoomService.markedBedExist(idBedMarked)) {
      this.activation();
    } else if (idBedMarked === null) {
      this.restore();
    } else {
      this.deactivation();
    };
  }
  private activation():void {
    this.cdkDrag.disabled = false;
  }
  private restore():void {
    this.cdkDrag.disabled = true;
    this.bedPolygon = coordinateOfPolygon(this.startPolygon);
  }
  private deactivation():void {
    this.cdkDrag.disabled = true;
  }
  private started(): void {
    if (!this.editRoomService) return;
    const bedInOutput: Bed = this.editRoomService.getOutputBed(this.bed.id);
    this.bedPolygon = bedInOutput && 'polygon' in bedInOutput ? coordinateOfPolygon(bedInOutput.polygon) : coordinateOfPolygon(this.points);
  }
  private moved(e: CdkDragMove): void {
    if (!this.editRoomService) return;
    const movedBed: string = polygonOfcoordinates(move(this.bedPolygon, e.distance))
    if (this.editRoomService.polygonInRoom(movedBed)) {
      this.points = movedBed;
      this.bedMarkedService.mark(this.bed.id);
    }
    this.resetTransform();
  }
  private ended(): void {
    if (!this.editRoomService) return;
    this.bedPolygon = coordinateOfPolygon(this.points);
    this.editRoomService. addOrUpdateToOutput({ id: this.bed.id, polygon: this.points });
  }
  private setEditRoomService(): void {
    this.editRoomService = this.instanceEditRoomService.getInstance();
    this.instanceEditRoomService.instance$.subscribe(editRoomService => {
      this.editRoomService = this.editRoomService === editRoomService ? null : editRoomService;
    });
  }
  private resetTransform(): void {
    this.cdkDrag.element.nativeElement.style.transform = "translate3d(0px, 0px, 0px)";
  }
}


