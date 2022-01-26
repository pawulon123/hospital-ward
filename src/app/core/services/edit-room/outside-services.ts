import { Injectable, OnDestroy } from "@angular/core";
import { BedService } from "../bed.service";
import { ModeWardSvgService } from "../mode-ward-svg.service";
import { WardService } from "../ward.service";
import { BedMarkedService } from "./bed-marked";
import { InstanceEditRoomService } from "./instance-edit-room-service";

@Injectable()
export class OutsideEditRoomService implements OnDestroy {

  constructor(
    private bedService: BedService,
    private bedMarkedService: BedMarkedService,
    private wardService: WardService,
    private modeWardSvgService: ModeWardSvgService,
    private instanceEditRoomService: InstanceEditRoomService,
  ) { }

  addedBed(): void {
    this.ward.refreshSvg();
  }

   deletedBed(): void {
    this.bedMarked.mark(null);
    this.ward.refreshSvg();
  }

  get bed(): BedService {
    return this.bedService
  }

  get bedMarked(): BedMarkedService {
    return this.bedMarkedService
  }

  get ward(): WardService {
    return this.wardService;
  }

  get modeWardSvg(): ModeWardSvgService {
    return this.modeWardSvgService;
  }

  get instanceEditRoom(): InstanceEditRoomService {
    return this.instanceEditRoomService;
  }

  ngOnDestroy(): void {
    this.bedMarked.mark(null);
    this.modeWardSvg.setMode('currentState');
  }
}
