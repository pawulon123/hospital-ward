import { WardService } from '../../core/services/ward.service';
import { AfterViewInit, Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Ward } from '../../shared/models/ward';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.svg',
  styleUrls: ['./ward.component.css'],
})
export class WardComponent implements OnInit, AfterViewInit {

  constructor( private wardService: WardService) { }

  @ViewChild('editRoomContainer', { read: ViewContainerRef }) editRoomContainer?: ViewContainerRef
  @ViewChild('roomInstance') roomInstance: any;
  @ViewChild('bed') bedInstance: any;
  viewBox: string = '0 0 360 90';
  ward?: Ward;
  beds?: any[] = [];
  rooms?: Room[] = [];

  ngOnInit() {
    this.create();
  }
  ngAfterViewInit(): void {
    this.roomInstance.setViewContainerRefEdit(this.editRoomContainer);
  }
  create() {
    this.wardService.getWard().subscribe((ward: Ward) => {
      this.ward = ward;
      this.getBeds();
      this.getRooms();
    });
  }
  getRooms(): void {
    this.rooms = this.ward?.rooms;
  }
  getBeds(): void {
    this.beds = this.bedInstance?.extractOfWard(this.ward);
  }
}
