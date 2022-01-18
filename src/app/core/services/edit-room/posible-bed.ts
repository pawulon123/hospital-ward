import { Bed } from 'src/app/shared/models/bed';
import { Injectable } from "@angular/core";

@Injectable()
export class PosibleBed {
 private ids: any[] = [];

  set beds(beds: Bed[] | undefined) {
    this.ids = beds ? beds.map((bed: Bed) => bed.id) : [];
  }
  private getIds(): number[] {
    return this.ids;
  }
  set addBed(bed: Bed) {
    if(!bed.id)return
    this.getIds().push(bed.id);
  }
  exist(id: number | null): boolean {
    return id && id >= 0 ? this.getIds().includes(id) : false;
  }
}
