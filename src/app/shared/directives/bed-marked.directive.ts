import { InstanceEditRoomService } from '../../core/services/edit-room/instance-edit-room-service';
import { BedMarkedService } from './../../core/services/edit-room/bed-marked';
import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { EditRoomService } from '../../core/services/edit-room/edit-room.service';
@Directive({
  selector: '[appBedMarked]'
})
export class BedMarkedDirective implements OnInit {
  @Input("appBedMarked") id: number | undefined | string = '';
  private styleDefault: string = "fill:white; opacity:0.3";
  @HostBinding('attr.style') style: string = this.styleDefault;

  private editRoomService: EditRoomService | null = null;
  constructor(
    private instanceEditRoomService: InstanceEditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }
  ngOnInit(): void {
    this.bedMarkedService.markingRoom$.subscribe(this.setStyleByBedId.bind(this));
    this.setEditRoomService();
  }
  setStyleByBedId(idBedMarked: number | null): void {
    if (!this.editRoomService) return;
    this.style = this.id && idBedMarked === this.id && this.editRoomService.posibleBed.exist(idBedMarked) ? this.marked : this.styleDefault;
  }
  get marked(): string {
    return "fill:rgb(154, 194, 45); opacity:0.3"
  }
  private setEditRoomService(): void {
    this.editRoomService = this.instanceEditRoomService.getInstance()
    this.instanceEditRoomService.instance$.subscribe(editRoomService => {
      this.editRoomService = this.editRoomService === editRoomService ? null : editRoomService;
    });
  }
}
