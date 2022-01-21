import { BedMarkedService } from './../../core/services/edit-room/bed-marked';
import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { EditRoomService } from '../../core/services/edit-room/edit-room.service';
import { EditRoom } from '../models/edit-room';

@Directive({
  selector: '[appBedMarked]'
})
export class BedMarkedDirective implements OnInit {
  @Input("appBedMarked") id: number |undefined| string = '';

  styleDefault: string = "fill:white; opacity:0.3";
  @HostBinding('attr.style') style: string = this.styleDefault;

  constructor(
    private editRoomService: EditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }
  ngOnInit(): void {
    this.bedMarkedService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
  }
  passObjectEdit(objEditRoom: EditRoom): void {
    const id = objEditRoom.marked;
    this.style = this.id && id === this.id && this.editRoomService.posibleBed.exist(id) ? this.marked : this.styleDefault;
  }
  get marked(): string {
    return "fill:rgb(154, 194, 45); opacity:0.3"
  }
}
