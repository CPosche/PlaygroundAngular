import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playground } from '../shared/playground';
import { Subject, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PlaygroundService } from '../shared/playground.service';

@Component({
  selector: 'app-sidebar',
  template: `<aside class="shadow" tabindex="1">
  <nav>
    <ul class="list-group">
      <li>
        <input class="form-control" [formControl]="filterControl"/>
      </li>
      <li *ngFor="let playground of playgrounds" 
      class="list-group-item list-group-item-action" 
      [class.active]="selectedPlayground?.id === playground.id" 
      (click)="selected.emit(playground)" role="button" >
        <h4>{{playground.name}}</h4>
        <p class="m-0">{{playground.description}}</p>
    </li>
    </ul>
  </nav>
</aside>`
})
export class SidebarComponent implements OnInit{

  @Input() playgrounds?: Playground[];
  @Input() selectedPlayground?: Playground
  @Output() selected = new EventEmitter<Playground>()
  @Output() filter = new EventEmitter<string>()
  filterControl = new FormControl('', {nonNullable: true});
  
  ngOnInit(){
    this.filterControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(res => this.filter.emit(res))
  }
}
