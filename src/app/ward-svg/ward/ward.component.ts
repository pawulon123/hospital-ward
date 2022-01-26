
import { Bed } from 'src/app/shared/models/bed';
import { WardService } from '../../core/services/ward.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Ward } from '../../shared/models/ward';
import { logError } from '../../shared/useful/useful';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.html',
  styleUrls: ['./ward.component.css'],
})
export class WardComponent implements OnInit {

  constructor(
    private wardService: WardService,

  ) { }

  @ViewChild('bedInstance') bedInstance: any;
  @ViewChild('roomInstance') roomInstance: any;

  viewBox: string = '0 0 1440 360';
  ward?: Ward;
  beds?: Bed[] = [];
  rooms?: Room[] = [];
  private defaultMode: string = 'currentState';
  ngOnInit() {
    this.create();
    this.wardService.refresh(this.load.bind(this));
  }
  set mode(mode: string) {
    this.defaultMode = mode;
  }
  get mode() {
    return this.defaultMode;
  }
  create(): void {
    this.wardService.getWard().subscribe(
      (ward: Ward) => this.render(ward),
      (e: any) => this.error(e)
    );
  }
  error(e: any): void {
    logError(e);
  }
  render(ward: Ward): void {
    this.ward = ward;
    this.load();
  }
  load(): void {
    this.forBeds();
    this.forRooms();
  }
  forBeds(): void {
    this.bedInstance.setBeds(this.ward);
    this.beds = this.bedInstance.getBeds();
  }
  forRooms(): void {
    this.rooms = this.ward?.rooms;
    this.roomInstance.setRooms(this.rooms);
  }
}
