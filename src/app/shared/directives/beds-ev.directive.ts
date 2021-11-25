import { ModeWardSvgService } from './../../core/services/mode-ward-svg.service';
import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { events } from '../../ward-svg/events';

@Directive({
  selector: '[appBedsEv]'
})
export class BedsEvDirective implements OnInit {
  @Input("appBedsEv") bed: any;

  mode: string = 'currentState';
  returned = {};
  events = events().bed;

  constructor(
    private modeWardSvgService: ModeWardSvgService,
    private renderer: Renderer2
    ) {}
  ngOnInit() {
    this.modeWardSvgService.mode$.subscribe(mode => this.mode = mode)
  }

  @HostListener('click', ['$event.target'])
  private onClick(element: any) {
    const method: string = this.extractProperty(this.events.click);
    this.caller(method, element);
  };
  private caller(method: string, element: any): void {
    const returned: any = !method ? null : this.extractProperty(this.bed, method).call(this.bed, element);
    if (returned) (this.returned as Record<string, any>)[method] = returned;
  }
  private extractProperty(obj: any, key: string = this.mode): any {
    return obj[key];
  }
}
