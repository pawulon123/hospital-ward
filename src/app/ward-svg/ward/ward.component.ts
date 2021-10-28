import { Bed } from 'src/app/shared/models/bed';
import { WardService } from '../../core/services/ward.service';
import { AfterViewInit, Component, ViewChild, OnInit, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Ward } from '../../shared/models/ward';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.html',
  styleUrls: ['./ward.component.css'],
})
export class WardComponent implements OnInit, AfterViewInit {

  constructor(
     private wardService: WardService,
     private renderer2: Renderer2
     ) { }

  // @ViewChild('editRoomContainer', { read: ViewContainerRef }) editRoomContainer?: ViewContainerRef
  // @ViewChild('roomInstance') roomInstance: any;
  // @ViewChild('bed') bedInstance: any;
  viewBox: string = '0 0 360 90';
  ward?: Ward;
  beds?: any[] = [];
  rooms?: Room[] = [];


  @ViewChild('evDelegation') evDelegation: any;

  ngOnInit() {
    this.create();


  }
  ngAfterViewInit(): void {
    // this.roomInstance.setViewContainerRefEdit(this.editRoomContainer);
    this.renderer2.listen(this.evDelegation.nativeElement, "click", event => {
      console.log(event.target);
    });
  }
  create() {
    this.wardService.getWard().subscribe((ward: Ward) => {
      this.ward = ward;
      // console.log(this.ward);

      // this.getBeds();
      // this.getRooms();
    });
  }
  getRooms(): void {
    // this.rooms = this.ward?.rooms;
    // this.roomInstance.setRooms(this.rooms)
  }
  getBeds(): void {
    // this.beds = this.bedInstance?.extractOfWard(this.ward);
  }
  setRoom(id:any){

  }
  // getRefBed(){}
}
