import { InstanceEditRoomService } from '../../core/services/edit-room/services/instance-edit-room-service';
import { BedMarkedService } from '../../core/services/edit-room/services/bed-marked';
import { Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { EditRoomService } from '../../core/services/edit-room/services/edit-room.service';
@Directive({
  selector: '[appBedMarked]'
})
export class BedMarkedDirective implements OnInit {
  @Input("appBedMarked") id: number | undefined;
  private styleDefault: string = "fill:white; opacity:0.3";
  @HostBinding('attr.style') style: string = this.styleDefault;

  constructor(
    @Optional() private editRoomService: EditRoomService | null,
    private instanceEditRoomService: InstanceEditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }
  ngOnInit(): void {
    this.bedMarkedService.markingRoom$.subscribe(this.setStyleByBedId.bind(this));
    this.setEditRoomService();
  }
  setStyleByBedId(idBedMarked: number | null): void {
     this.style = this.id && idBedMarked === this.id && this.editRoomService && this.editRoomService.markedBedExist(idBedMarked) ? this.styleMarked : this.styleDefault;
  }
  get styleMarked(): string {
    return "fill:rgb(154, 194, 45); opacity:0.3"
  }
  private setEditRoomService(): void {
    this.editRoomService = this.instanceEditRoomService.getInstance()
    this.instanceEditRoomService.instance$.subscribe(editRoomService => {
      this.editRoomService = this.editRoomService === editRoomService ? null : editRoomService;
    });
  }
}
