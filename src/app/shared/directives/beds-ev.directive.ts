import { ModeWardSvgService } from './../../core/services/mode-ward-svg.service';
import { Directive,  HostListener, Input, OnInit } from '@angular/core';
import { events } from '../../ward-svg/events';

@Directive({
  selector: '[appBedsEv]'
})
export class BedsEvDirective implements OnInit {
  @Input("appBedsEv") InstanceEndCreator: any;

  mode: string = 'currentState';
  returned = {};
  events = events().bed;

  constructor(
    private modeWardSvgService: ModeWardSvgService
    ) {
    }
  ngOnInit() {
    this.modeWardSvgService.mode$.subscribe(mode => this.mode = mode);
    if (this.InstanceEndCreator.creator === 'editRoom') this.mode = 'editRoom';
  }

  @HostListener('click', ['$event.target'])
  private onClick(element: any) {
    const method: string = this.extractProperty(this.events.click);
    const id: string = Number.parseInt(element.id).toString();
    this.caller(method, id);
  };
  private caller(method: string, id: string): void {
    const returned: any = !method ? null : this.extractProperty(this.InstanceEndCreator.bed, method).call(this.InstanceEndCreator.bed, id);
    if (returned) (this.returned as Record<string, any>)[method] = returned;
  }
  private extractProperty(obj: any, key: string = this.mode): any {
    return obj[key];
  }
}
