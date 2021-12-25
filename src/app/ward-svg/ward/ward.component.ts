import { Bed } from 'src/app/shared/models/bed';
import { WardService } from '../../core/services/ward.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Ward } from '../../shared/models/ward';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.html',
  styleUrls: ['./ward.component.css'],
})
export class WardComponent implements OnInit {

  constructor(
    private wardService: WardService,
  ) { }
  @ViewChild('roomInstance') roomInstance: any;
  @ViewChild('bedInstance') bedInstance: any;
  viewBox: string = '0 0 1440 360';
  ward?: Ward;
  beds?: Bed[] = [];
  rooms?: Room[] = [];

  ngOnInit() {
    this.create();
  }
  create(): void {
    this.wardService.getWard().subscribe((ward: Ward) => {
      this.ward = ward;

      this.forBeds();
      this.forRooms();
      console.log(this.rooms);
    });
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
