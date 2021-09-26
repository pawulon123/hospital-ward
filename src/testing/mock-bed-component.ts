import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { BedComponent } from "src/app/current-state/svg/bed/bed.component";
import asyncData from "./async-observable-helpers";

@Component({
  selector: 'app-bed',
  template: ''
})
export class MockBedComponent implements Partial<BedComponent>  {
  get beds(): Observable<any[]> {
    return asyncData([])
  };
}
