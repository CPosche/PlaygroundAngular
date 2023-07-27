import { Component, Input } from '@angular/core';
import { Playground } from '../shared/playground';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() playground?: Playground



}
