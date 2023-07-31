import { Component, Input } from "@angular/core";
import { Playground } from "../shared/playground";

@Component({
  selector: "app-footer",
  template: `<footer *ngIf="playground">
  <h3>{{playground.name}}</h3><p>{{playground.addressDescription}}</p><p>{{playground.description}}</p>
</footer>`,
})
export class FooterComponent {
  @Input() playground?: Playground;
}
