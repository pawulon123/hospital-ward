import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { Component, Inject, OnDestroy, OnInit, Self } from '@angular/core';
import { findById, logError } from '../../shared/useful/useful';
import { BedMarkedService, EditRoomService } from '../../core/services/edit-room'
import { ConfigDIEditRoom } from '../../core/services/edit-room/dependency-injection-config';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: ConfigDIEditRoom.forProviders
  })
export class EditRoomComponent implements OnInit, OnDestroy {

  private idBedMarked: number | null = null;
  private markedRoom: Room | undefined;
  private endEditingRoom: Function = () => { };
  private subscribeEditRoomService: any;
  constructor(
    @Self() private editRoomService: EditRoomService,
     private bedMarked: BedMarkedService,
  ) { }

  ngOnInit() {
    this.editRoomService.init(this.markedRoom);
    this.subscribeEditRoomService = this.bedMarked.markingRoom$.subscribe((idBedMarked: any) => this.idBedMarked = idBedMarked);
  }

  get markedBed(): Bed {
    return this.idBedMarked && this.markedRoom ? findById(this.markedRoom.beds, this.idBedMarked) : null;
  }

  rotateBed(): void {
    if (!this.idBedMarked || !this.editRoomService.markedBedExist(this.idBedMarked)) return;
    this.editRoomService.rotateBed(this.markedBed);
  }

  cancel(): void {
    if (this.outputIsNotEmpty()) this.editRoomService.restoreBeds(this.markedRoom?.beds);
    this.endEditingRoom();
  }

  addBed(): void {
    if (!this.markedRoom) return;
    this.editRoomService.addBed(this.markedRoom);
  }

  deleteBed(): void {
    if (!this.idBedMarked || !this.editRoomService.markedBedExist(this.idBedMarked)) return;
    if (this.editRoomService.bedHasPatient(this.idBedMarked)) {
      logError('the bed has patient cannot be removed');
      return;
    } else {
      this.editRoomService.deleteBed(this.idBedMarked);
    }
  }

  confirm(): void {
    if (this.outputIsNotEmpty()) this.editRoomService.confirm();
    this.endEditingRoom();
  }

  outputIsNotEmpty(): boolean{
    return this.editRoomService.outputIsNotEmpty();
  }

  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }
}
