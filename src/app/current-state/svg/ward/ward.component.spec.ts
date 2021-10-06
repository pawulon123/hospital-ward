import { Room } from './../../../interfaces/room';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { WardComponent } from './ward.component';
import { MockRoomComponent } from '../../../../testing/mock-room-component';
import { MockBedComponent } from '../../../../testing/mock-bed-component';
import asyncData from '../../../../testing/async-observable-helpers';
describe('WardComponent', () => {
  let component: WardComponent;
  let fixture: ComponentFixture<WardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WardComponent,
        MockRoomComponent,
        MockBedComponent
      ],
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(WardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy()
  });
  it('ngAfterViewInit should called createRooms', () => {
    const spyCreateRooms = spyOn(component, 'createRooms');
    component.ngAfterViewInit()
    expect(spyCreateRooms).toHaveBeenCalled();
  });
  it('Room  should subscribed  ', () => {
    expect(component.room?.rooms.subscribe.name).toBe('subscribe');
  });
  it('Bed  should subscribed  ', () => {
    expect(component.room?.rooms.subscribe.name).toBe('subscribe');
  });
 });
