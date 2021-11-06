import { coordinateOfPolygon, polygonOfcoordinates, logError, shapeProperties, cos, sin } from '../../shared/useful/useful';
import { Coordinates } from '../../shared/models/coordinate';
export class BedRotate {
  bed: any;
  centerBed: any = null;
  angle: number = 15;
  step: number = 15;
  height: number = 0;
  width: number = 0;

  rotate(bed: any): void {
    this.bed = bed;
    const coordinates: Coordinates[] = coordinateOfPolygon(this.bed.polygon);

    const shape = shapeProperties(coordinates);
    if (!this.centerBed || bed.id !== this.bed.id) {
      if ('quadrangle' in shape) {
        if (!shape.quadrangle.rect) logError('shape is not rectangle, the transformations may be inaccurate');
        this.centerBed = shape.quadrangle.center;
        this.width = shape.quadrangle.width() / 2;
        this.height = shape.quadrangle.height() / 2;
      }
    }
    if (this.centerBed !== shape.quadrangle.center && bed.id === this.bed.id) this.centerBed = shape.quadrangle.center;

    this.assignment(coordinates);
    this.angle += this.step;
    bed.polygon = polygonOfcoordinates(coordinates);
  }
  private assignment(coordinates: Coordinates[]): void {

    coordinates[0].x = (-this.width * cos(this.angle)) - this.height * sin(this.angle) + this.centerBed.x;
    coordinates[0].y = (-this.width * sin(this.angle)) + this.height * cos(this.angle) + this.centerBed.y;

    coordinates[1].x = this.width * cos(this.angle) - this.height * sin(this.angle) + this.centerBed.x;
    coordinates[1].y = this.width * sin(this.angle) + this.height * cos(this.angle) + this.centerBed.y;

    coordinates[2].x = this.width * cos(this.angle) - (-this.height * sin(this.angle)) + this.centerBed.x;
    coordinates[2].y = this.width * sin(this.angle) + (-this.height * cos(this.angle)) + this.centerBed.y;

    coordinates[3].x = (-this.width * cos(this.angle)) - (-this.height * sin(this.angle)) + this.centerBed.x;
    coordinates[3].y = (-this.width * sin(this.angle)) + (-this.height * cos(this.angle)) + this.centerBed.y;
  }
}
