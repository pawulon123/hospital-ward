import { EditRoomService } from './../../core/services/edit-room.service';
import { Bed } from 'src/app/shared/models/bed';
import { WardService } from '../../core/services/ward.service';
import { AfterViewInit, Component, ViewChild, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
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
    private editRoomService: EditRoomService
    ) { }
  @ViewChild('roomInstance') roomInstance: any;
  @ViewChild('bedInstance') bedInstance: any;
  viewBox: string = '0 0 360 90';
  ward?: Ward;
  beds?: any[] = [];
  rooms?: Room[] = [];

  ngOnInit() {
    this.editRoomService.objEditRoom$.subscribe(
      objEdit => console.log('wardComponent',this.beds));
    this.create();
  }
  create() {
    this.wardService.getWard().subscribe((ward: Ward) => {
      this.ward = ward;
      this.forBeds()
      this.forRooms()
    });
  }
  forBeds(): void {
    this.bedInstance.setBeds(this.ward);
    this.beds =  this.bedInstance.getBeds();
  }
  forRooms(){
    this.rooms = this.ward?.rooms;
    this.roomInstance.setRooms(this.rooms);

  }

}
