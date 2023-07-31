import { Injectable } from '@angular/core';
import { Playground } from './playground';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {

  private playgrounds$ = new Observable<Playground[]>;

  constructor(private http: HttpClient) {
    // makes a blueprint for an observable we can subscribe to later, with the service injected
    this.playgrounds$ = this.http.get<Playground[]>('../assets/copenhagen.json').pipe(
      shareReplay(1)
    )
  }

  getPlaygrounds(): Observable<Playground[]>{
    return this.playgrounds$;
  }
  // returns an observable, that finds the playground on given id when subscribed
  findPlayground(id: string): Observable<Playground | undefined>{
    return this.playgrounds$.pipe(
      map(res => res.find(p => p.id === id))
      )
  }
}
