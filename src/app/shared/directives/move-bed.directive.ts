import { Coordinates } from './../models/coordinate';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive, Input, OnInit, HostBinding } from '@angular/core';
import { EditRoom } from '../models/edit-room';
import { coordinateOfPolygon, move, polygonOfcoordinates } from '../useful/useful';
import { EditRoomService } from '../../core/services/edit-room/edit-room.service';
import { Bed } from '../models/bed';
import { BedMarkedService } from '../../core/services/edit-room/bed-marked';

@Directive({
  selector: '[appMoveBed]'
})
export class MoveBedDirective implements OnInit {
  @Input("appMoveBed") bed: any;
  @HostBinding('attr.points') set points(p: string) {
    this.bed.polygon = p;
  }
  private bedPolygon: Coordinates[] = [];
  private startPolygon: string = '';
  private objectEdit: EditRoom | { marked: number} = { marked: null };

  constructor(
    private editRoomService: EditRoomService,
    private cdkDrag: CdkDrag,
    private bedMarkedService: BedMarkedService,
  ) { }
  ngOnInit() {
    this.bedPolygon = coordinateOfPolygon(this.bed.polygon);
    this.startPolygon = this.bed.polygon;
    this.cdkDrag.disabled = true;
    this.bedMarkedService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
    this.cdkDrag.started.subscribe(this.started.bind(this));
    this.cdkDrag.moved.subscribe(this.moved.bind(this));
    this.cdkDrag.ended.subscribe(this.ended.bind(this));
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    const id = objEditRoom.marked;
    if (id === this.bed.id && this.editRoomService.posibleBed.exist(id)) {
      if (this.cdkDrag.disabled) this.cdkDrag.disabled = false;
      this.objectEdit = objEditRoom;
    } else if (id === null) {
      if (!this.cdkDrag.disabled) this.cdkDrag.disabled = true;
      this.bedPolygon = coordinateOfPolygon(this.startPolygon);
    }
    else {
      if (!this.cdkDrag.disabled) this.cdkDrag.disabled = true;
    };
  }
  private started(): void {
    const bed: Bed = this.editRoomService.outputBed.getOutputBed(this.bed.id);
    this.bedPolygon = bed && 'polygon' in bed ? coordinateOfPolygon(bed.polygon) : this.bedPolygon;
  }
  private moved(e: any): void {
    const movedBed: string = polygonOfcoordinates(move(this.bedPolygon, e.distance))
    if (this.editRoomService.bedInRoom.check(movedBed)) {
      this.points = movedBed;
      this.bedMarkedService.modify(this.objectEdit);
    }
    this.resetTransform();
  }
  private ended(): void {
    this.bedPolygon = coordinateOfPolygon(this.bed.polygon);
    this.editRoomService.outputBed.addOrUpdate({ id: this.bed.id, polygon: this.bed.polygon });
  }
  private resetTransform(): void {
    this.cdkDrag.element.nativeElement.style.transform = "translate3d(0px, 0px, 0px)";
  }

}
