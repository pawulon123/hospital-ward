import { Room } from 'src/app/interfaces/room';
import asyncData from 'src/testing/async-observable-helpers';
import { RoomService } from './room.service';
describe('RoomService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let roomService: RoomService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    roomService = new RoomService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(roomService).toBeTruthy();
  });
  it('rooms should return  array', (done: DoneFn) => {
    const expectedRooms: Room[] = [
      {
        "id": "1",
        "name": "",
        "type": "",
        "equipment": [],
        "keepers": [],
        "polygon": ["10,5", "10,40", "50,40", "50,5"],
        "bedsId": []
      }
    ];
    httpClientSpy.get.and.returnValue(asyncData(expectedRooms));
    roomService.getRooms().subscribe(
      rooms => {
        expect(rooms).toEqual(expectedRooms, 'expected rooms ');
        done();
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
