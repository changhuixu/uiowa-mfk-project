import { Component } from '@angular/core';
import { Mfk, MfkValidationService } from '@uiowa/uiowa-mfk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mfk = new Mfk('02012101201001000000006219000001111235555');

  constructor(private readonly mfkValidationService: MfkValidationService){
    console.log(this.mfkValidationService.validateFormat(this.mfk));
  }
}
