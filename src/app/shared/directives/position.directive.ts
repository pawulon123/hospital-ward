import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appPosition]'
})
export class PositionDirective implements OnInit {
  @Input("appPosition") polygonAndType: any;
    coordinates = {
    x: [],
    y: []
  }
  svgCoordinates = this.iteratioCoordinates(() => this.elementRef.nativeElement);

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.polygonAndType.polygon = this.polygonAndType.polygon.split(' ')
    const type: string = this.polygonAndType.type;
    if (type in this && (this as Record<string, any>)[type].constructor instanceof Function) {
      this.iteratioCoordinates(this.coordinatesAssign.bind(this));
      (this as Record<string, any>)[type]();
    } else {
      console.error('bad type');
    }
  }
  private iteratioCoordinates(callbeck: any): any {
    return Object.entries(this.coordinates).reduce((pre: any, first) => {
      const coordinate = first[0];
      pre[coordinate] = callbeck(coordinate);
      return pre;
    }, {});
  }
  private coordinatesAssign(coordinate: string): void {
    (this.coordinates as Record<string, any>)[coordinate] = this.setCoordinates(this.polygonAndType.polygon, coordinate);
  }
  private setCoordinates(polygon: string[], coordinate: string): number[] {
    const i = { x: 0, y: 1 };
    return polygon.map(corner => +corner.split(',')[(i as Record<string, number>)[coordinate]]);
  }
  private centerBetweenFirstLastPoint(): void {
    const computed = {
      x: this.mid(this.coordinates.x[0], this.coordinates.x[this.coordinates.x.length - 1]),
      y: this.coordinates.y[this.coordinates.y.length - 1] - 1
    }
    this.iteratioSvgAttr(computed);
  }
  private iteratioSvgAttr(computed: any): void {
    for (let svgAttr in this.svgCoordinates) {
      this.svgCoordinates[svgAttr].setAttribute(svgAttr, (computed as Record<string, number>)[svgAttr]);
    }
  }
  private mid(a: number, b: number): number {
    return (a + b) / 2
  }
}
