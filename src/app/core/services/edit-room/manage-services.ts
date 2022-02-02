import { Injectable } from "@angular/core";

import { RoomEntry, BedRotate, PosibleBed, OutputBed, BedInRoom, RoomMarked, EditRoomService } from '.'
import { OutsideEditRoomService } from "./outside-services";
@Injectable()
export abstract class Services {
  private static get bedInRoom(): BedInRoom{
    return new BedInRoom();
  };
  private static get posibleBed(): PosibleBed {
    return new PosibleBed();
  };
  private static get bedRotate(): BedRotate {
    return new BedRotate();
  };
  private static get outputBed(): OutputBed {
    return new OutputBed();
  };
  private static get roomMarked(): RoomMarked {
    return new RoomMarked();
  };
  private static get roomEntry(): RoomEntry {
    return new RoomEntry();
  }
  private static services() {
    return {
      roomEntry: Services.roomEntry,
      bedInRoom: Services.bedInRoom,
      posibleBed: Services.posibleBed,
      bedRotate: Services.bedRotate,
      outputBed: Services.outputBed,
      roomMarked: Services.roomMarked,
    }
  }
  public static get forProviders() {
    return [
      { provide: 'Services', useValue: Services.services() },
      { provide: OutsideEditRoomService, useClass: OutsideEditRoomService },
      { provide: EditRoomService, useClass: EditRoomService },
    ]
  }
}
