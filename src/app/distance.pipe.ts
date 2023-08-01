import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinate, LocationService } from './shared';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {

  constructor(private service: LocationService){

  }

  transform(position: Coordinate, location: Coordinate | null): null | number {
    return location && this.service.getDistance(position, location)
  }

}
