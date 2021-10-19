import { WardService } from '../../core/services/ward.service';
import { RoomComponent } from './../room/room.component';
import { BedComponent } from './../bed/bed.component'
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { Ward } from '../../shared/models/ward';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.svg',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements  OnInit {

  constructor(private wardService: WardService) { }
  viewBox: string = '0 0 360 90';
  ward?: Ward;
  // @ViewChild('room') room: RoomComponent | undefined;
  // @ViewChild('bed') bed: BedComponent | undefined;
  ngOnInit(){
    this.create()
  }
  create() {
    this.wardService.getWard().subscribe((ward: Ward) => {
      this.ward = ward;
    });
  }
  get rooms() {
    return this.ward?.rooms
  }
  get beds() {
    return this.ward?.rooms.reduce((arr: Bed[], room: Room) => {
      room.beds.forEach((bed: Bed) => arr.push(bed));
      return arr;
    }, [])
  }
}
