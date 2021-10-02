import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PositionDirective } from './position.directive';

@Component({
  template: `
  <svg>
  <text [appPosition] ="polygonAndType" font-size="0.2em" fill="white">1</text>
  </svg>
`
})
class TestComponent {
  polygonAndType = {
    polygon: ["2,1", "2,2", "3,3", "2,1"],
    type: 'centerBetweenFirstLastPoint'
  }
}
describe('FooterComponent', () => {

  let fixture: any;
  let des: any;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [PositionDirective, TestComponent],
    }).createComponent(TestComponent);
    des = fixture.debugElement.queryAll(By.directive(PositionDirective));
  });
  it('first element should be text', () => {
    expect(des[0].nativeNode.nodeName).toBe('text');
  });
  it('attribute x && y shuld to be assign', () => {
    const dir = des[0].injector.get(PositionDirective) as PositionDirective;
    dir.polygonAndType = fixture.componentInstance.polygonAndType;
    dir.ngOnInit();
    expect(dir.svgCoordinates.x.getAttribute('x')).toBe('2');
    expect(dir.svgCoordinates.x.getAttribute('y')).toBe('1');
  });
  it('position type have be string ', () => {
    const dir = des[0].injector.get(PositionDirective) as PositionDirective;
    dir.polygonAndType = fixture.componentInstance.polygonAndType;
    expect(typeof dir.polygonAndType.type).toBe('string');
  });
  it('property "position type" exist', () => {
    const methodString: any = fixture.componentInstance.polygonAndType.type;
    expect((PositionDirective.prototype as Record<string, any>)[methodString]).toBeTruthy()
  });
  it('mid method shuld return number', () => {
    expect(typeof PositionDirective.prototype['mid'](Date.now(), Date.now())).toBe('number')
  });
  it('iteratioSvgAttr method is void', () => {
    const computed = {
      x: 2,
      y: 1
    }
    expect(PositionDirective.prototype['iteratioSvgAttr'](computed)).toBeUndefined();
  });
})

