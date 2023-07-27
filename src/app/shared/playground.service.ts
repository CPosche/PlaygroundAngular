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
    this.playgrounds$ = this.http.get<Playground[]>('../assets/copenhagen.json').pipe(
      shareReplay(1)
    )
  }

  getPlaygrounds(): Observable<Playground[]>{
    return this.playgrounds$;
  }

  findPlayground(id: string): Observable<Playground | undefined>{
    return this.playgrounds$.pipe(
      map(res => res.find(p => p.id === id))
      )
  }
}