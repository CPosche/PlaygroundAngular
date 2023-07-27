import { Component, OnInit } from '@angular/core';
import { Marker } from '../leaflet';
import { Center } from '../leaflet';
import { LocationService } from '../shared';
import { Playground } from '../shared/playground';
import { PlaygroundService } from '../shared/playground.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest, filter, map, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  appPlaygrounds?: Playground[];
  playground?: Playground;
  center?: Center;
  markers?: Marker[];
  filter$ = new Subject<string>()


  constructor(private playgroundService: PlaygroundService, private locationService: LocationService, private routerService: Router, private activatedRoute: ActivatedRoute){
    this.center = {lat: 56.360029, lng: 10.746635}
  }

  ngOnInit(): void {
    combineLatest([
      this.playgroundService.getPlaygrounds(),
      this.locationService.current,
      this.activatedRoute.queryParams.pipe(
        map(params => new RegExp(params['filter'] ?? "", "i"))
      )
    ]).pipe(
      map(([playgrounds, location, filter]) => {
        console.log(filter)
        const d = this.locationService.getDistance;
        return playgrounds.filter(playground => filter.test(playground.name)).sort((a, b) => d(a.position, location) - d(b.position, location))
      })
    ).subscribe(res => this.appPlaygrounds = res)
    this.locationService.current.subscribe(res => this.markers = [res])
    const playground$ = this.activatedRoute.params.pipe(
      switchMap(params => this.playgroundService.findPlayground(params['id'])),
      shareReplay(1)
    )
    playground$.pipe(
      filter(playground => !!playground)
    ).subscribe(res => {this.playground = res;
      this.center = {...this.playground!.position, zoom: 14};
    })
    combineLatest([
      this.locationService.current, 
      playground$.pipe(
        map(playground => playground?.position)
      )
    ]).subscribe(res => this.markers = res)
    this.filter$.subscribe((filter) => this.routerService.navigate([], {queryParams: {filter}, replaceUrl: true, relativeTo: this.activatedRoute}))
  }

  playgroundSelected(playground: Playground){
    this.playground = playground
    console.log(playground)
    this.routerService.navigate(['', this.playground?.id], {queryParamsHandling: 'preserve'})
  }

}

