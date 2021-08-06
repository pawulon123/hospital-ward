import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.svg',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {

  constructor() { }
  viewBox: string = '0 0 100 30';

  ngOnInit(): void {
  }
}
