import { Injectable, OnDestroy } from "@angular/core";
import { BedService } from "../bed.service";
import { ModeWardSvgService } from "../mode-ward-svg.service";
import { WardService } from "../ward.service";
import { BedInRoom } from "./services/bed-in-room";
import { BedMarkedService } from "./services/bed-marked";
import { BedRotate } from "./services/bed-rotate";
import { InstanceEditRoomService } from "./services/instance-edit-room-service";
import { OutputBed } from "./services/output-bed";
import { PosibleBed } from "./services/posible-bed";
import { RoomEntry } from "./services/room-entry";
import { RoomMarked } from "./services/room-marked";
import { fnIsInContext } from '../../../shared/useful/useful';

@Injectable()
export class ManageServices {

 private events: any;
  constructor(
    private bed: BedService,
    private bedMarked: BedMarkedService,
    private modeWardSvg: ModeWardSvgService,
    private instanceEditRoom: InstanceEditRoomService,
    private bedInRoom: BedInRoom,
    private posibleBed: PosibleBed,
    private bedRotate: BedRotate,
    private outputBed: OutputBed,
    private roomMarked: RoomMarked,
    private roomEntry: RoomEntry,
    private ward: WardService,
  ) {
    this.createEv();
  }
  private posibleEv(): string[] {
    return ['start', 'addedBed', 'deletedBed', 'confirm'];
  }
  private createEv(): void {
    this.events = this.posibleEv().reduce((obj: any, keyEvent) => {
      obj[keyEvent] = Object.values(this).filter(s => fnIsInContext(s, keyEvent));
     this.propertyOnThis(keyEvent)
      return obj;
    }, {})
  }
  private propertyOnThis(keyEvent: string): void{
    (this as Record<string, any>)[keyEvent] = (arg: any) => this.events[keyEvent].forEach((s: any) => s[keyEvent](arg))
  }

}
