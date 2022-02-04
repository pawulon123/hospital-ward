
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { BedMarkedService, RoomEntry, BedRotate, PosibleBed, OutputBed, BedInRoom, RoomMarked, EditRoomService, InstanceEditRoomService } from '.'
import { BedService } from "../bed.service";
import { ManageServices } from "./manage-services";
import { WardService } from '../ward.service';
import { ModeWardSvgService } from '../mode-ward-svg.service';
@Injectable()
export abstract class ConfigDIEditRoom {
  static token = new InjectionToken('EditRoom DI Token');

  public static get forProviders() {
    return [
      EditRoomService,
      BedInRoom,
      PosibleBed,
      BedRotate,
      OutputBed,
      RoomMarked,
      RoomEntry,
      {
        provide: ConfigDIEditRoom.token, useFactory: (injector: Injector) => {
          return new ManageServices(
            injector.get(BedService),
            injector.get(BedMarkedService),
            injector.get(ModeWardSvgService),
            injector.get(InstanceEditRoomService),
            injector.get(BedInRoom),
            injector.get(PosibleBed),
            injector.get(BedRotate),
            injector.get(OutputBed),
            injector.get(RoomMarked),
            injector.get(RoomEntry),
            injector.get(WardService),
         )
        }, deps: [Injector]
      },
    ]
  }
}
