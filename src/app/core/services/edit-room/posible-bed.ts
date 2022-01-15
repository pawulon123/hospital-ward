import { Bed } from 'src/app/shared/models/bed';
import { Injectable } from "@angular/core";

@Injectable()
export class PosibleBed {
 private ids: any;

  set beds(beds: Bed[] | undefined) {
    this.ids = beds ? beds.map((bed: Bed) => bed.id?.toString()) : [];
  }
  private getIds() {
    return this.ids;
  }
  set addBed(bed: Bed) {
    this.getIds().push(bed.id?.toString());
  }
  exist(id: string): boolean {
    return this.getIds().includes(id);
  }
}
