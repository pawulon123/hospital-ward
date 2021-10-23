import { WardService } from '../../core/services/ward.service';
import { AfterViewInit, Component, ViewChild, OnInit, Renderer2, ElementRef } from '@angular/core';
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

  ngOnInit(){
    this.create();
  }
  create() {
    this.wardService.getWard().subscribe((ward: Ward) => {
      this.ward = ward;
    });
  }
  get rooms(): Room[] | undefined {
    return this.ward?.rooms
  }
  get beds(): Bed[] | undefined {
    return this.ward?.rooms.reduce((arr: Bed[], room: Room) => {
      room.beds.forEach((bed: Bed) => arr.push(bed));
      return arr;
    }, [])
  }
}
