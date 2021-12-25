import { ModeWardSvgService } from './../../core/services/mode-ward-svg.service';
import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { events } from '../../ward-svg/events';
@Directive({
  selector: '[appRoomsEv]'
})
export class RoomsEvDirective implements OnInit {
  @Input("appRoomsEv") room: any;
  mode: string = 'currentState';
  returned = {};
  events = events().room;
  constructor(private modeWardSvgService: ModeWardSvgService) { }

  ngOnInit() {
    this.modeWardSvgService.mode$.subscribe(mode => this.mode = mode)
  }

  @HostListener('click', ['$event.target'])
  private onClick(element: any) {
    const mode = element.dataset.mode;
    if(this.mode !== mode) this.modeWardSvgService.setMode(mode);
    const method: string = this.extractProperty(this.events.click);
    let id = (this.returned as Record<string, any>)[method];
    if (id === element.id) return;
    this.caller(method, element);
  };
  @HostListener('mouseenter', ['$event.target'])
  private onMouseEnter(element: any) {
    const method: string = this.extractProperty(this.events.mouseEnter);
    this.caller(method, element);
  };

  @HostListener('mouseleave', ['$event.target'])
  private onMouseLeave(roomPolygon: any) {
    const method: string = this.extractProperty(this.events.mouseLeave);
    this.caller(method, roomPolygon);
  };
  private caller(method: string, element: any): void {
    const returned: any = !method ? null : this.extractProperty(this.room, method).call(this.room, element);
    if (returned) (this.returned as Record<string, any>)[method] = returned;
  }
  private extractProperty(obj: any, key: string = this.mode): any {
    return obj[key];
  }
}
