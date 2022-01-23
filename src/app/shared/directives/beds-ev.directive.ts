import { ModeWardSvgService } from './../../core/services/mode-ward-svg.service';
import { Directive,  HostListener, Input, OnInit } from '@angular/core';
import { events } from '../../ward-svg/events';

@Directive({
  selector: '[appBedsEv]'
})
export class BedsEvDirective implements OnInit {
  @Input("appBedsEv") instanceIsNewMode: any;

  mode: string = '';
  returned = {};
  events = events().bed;

  constructor(
    private modeWardSvgService: ModeWardSvgService
    ) {
    }
  ngOnInit() {console.log(this.instanceIsNewMode);

    this.mode = this.instanceIsNewMode.mode;
    this.modeWardSvgService.mode$.subscribe(mode => this.mode = mode);
    if (this.instanceIsNewMode.isNew) this.mode = 'editRoom';
  }

  @HostListener('click', ['$event.target'])
  private onClick(element: any) {
    const method: string = this.extractProperty(this.events.click);
    const id: number = Number.parseInt(element.id);
    this.caller(method, id);
  };
  private caller(method: string,  id: string | number): void {
    const returned: any = !method ? null : this.extractProperty(this.instanceIsNewMode.bed, method).call(this.instanceIsNewMode.bed, id);
    if (returned) (this.returned as Record<string, any>)[method] = returned;
  }
  private extractProperty(obj: any, key: string = this.mode): any {
    return obj[key];
  }
}
