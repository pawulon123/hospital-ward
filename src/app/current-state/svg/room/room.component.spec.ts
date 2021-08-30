import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import  asyncData  from '../../../../testing/async-observable-helpers';
import { RoomService } from '../../services/room.service';
import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
  let roomServiceStub: Partial<RoomService>;
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  const roomService = jasmine.createSpyObj('RoomService', ['getRooms']);
  let getRoomSpy = roomService.getRooms.and.returnValue(asyncData([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomComponent],
      providers: [{ provide: RoomService, useValue: roomService }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RoomService.getRoom should called ', () => {
    component.rooms;
    expect(roomService.getRooms).toHaveBeenCalled()
  });
  it('rooms should return Object ', () => {
    expect(typeof component.rooms).toBe('object')
  });
  it('getRooms called ', () => {
    component.rooms
    expect(getRoomSpy.calls.any()).toBe(true, 'getRooms called');
  });
  it('getRooms async called ', fakeAsync(
    () => {
      component.rooms
      expect(getRoomSpy.calls.any()).toBe(true, 'getRooms async called');
    })
  );

});

