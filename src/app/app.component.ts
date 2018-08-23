import { Component } from '@angular/core';
import { Mfk } from 'projects/uiowa/uiowa-mfk/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mfk = new Mfk('02012101201001000000006219000001111235555');
  favoriteMfks = [this.mfk];
  mfk2 = new Mfk();
}
