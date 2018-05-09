import { Component } from '@angular/core';
import { Mfk } from 'uiowa-mfk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  mfk = new Mfk('02012101201001000000006219000001111235555');
}
