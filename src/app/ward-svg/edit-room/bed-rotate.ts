import { Component } from '@angular/core';
import { coordinateOfPolygon, polygonOfcoordinates, logError, shapeProperties, cos, sin } from '../../shared/useful/useful';
import { Coordinates } from '../../shared/models/coordinate';
import { Injectable, OnDestroy } from '@angular/core';
@Injectable()
export class BedRotate {

  bed: any;
  centerBed: any = null;
  step: number = 15;
  rotationAngle: number = 15
  height: number = 0;
  width: number = 0;
  polygon: string = '';
  coor:Coordinates[] =[];
  rotate(bed: any): void {
    this.bed = bed;
    this.coor = coordinateOfPolygon(this.bed.polygon);

    const shape = shapeProperties(this.coor);
    if (!this.centerBed || bed.id !== this.bed.id) {
      if ('quadrangle' in shape) {
        if (!shape.quadrangle.rect) logError('shape is not rectangle, the transformations may be inaccurate');
        this.centerBed = shape.quadrangle.center;
        this.width = shape.quadrangle.width() / 2;
        this.height = shape.quadrangle.height() / 2;
      }
    }
    if (this.centerBed !== shape.quadrangle.center && bed.id === this.bed.id) this.centerBed = shape.quadrangle.center;
    this.assignment(this.coor, this.rotationAngle);
    this.rotationAngle += this.step;

    this.polygon = polygonOfcoordinates(this.coor);
  }
  private assignment(coordinates: Coordinates[], angle: number): void {
    coordinates[0].x = (-this.width * cos(angle)) - this.height * sin(angle) + this.centerBed.x;
    coordinates[0].y = (-this.width * sin(angle)) + this.height * cos(angle) + this.centerBed.y;
    // console.log('0x', coordinates[0].x);
    // console.log('0y', coordinates[0].y);

    coordinates[1].x = this.width * cos(angle) - this.height * sin(angle) + this.centerBed.x;
    coordinates[1].y = this.width * sin(angle) + this.height * cos(angle) + this.centerBed.y;
    // console.log('1x', coordinates[1].x);
    // console.log('1y', coordinates[1].y);
    coordinates[2].x = this.width * cos(angle) - (-this.height * sin(angle)) + this.centerBed.x;
    coordinates[2].y = this.width * sin(angle) + (-this.height * cos(angle)) + this.centerBed.y;
    // console.log('2x', coordinates[2].x);
    // console.log('2y', coordinates[2].y);
    coordinates[3].x = (-this.width * cos(angle)) - (-this.height * sin(angle)) + this.centerBed.x;
    coordinates[3].y = (-this.width * sin(angle)) + (-this.height * cos(angle)) + this.centerBed.y;
    // console.log('3x', coordinates[3].x);
    // console.log('3y', coordinates[3].y);
  }
  get points() {
    return this.polygon;
  }
  get coordinates() {
    return this.coor;
  }
  get coordinatesAsArrays() {
    return this.coordinates.map(c => [c.x, c.y]);
  }

}
