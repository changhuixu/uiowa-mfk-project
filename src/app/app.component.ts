import { Component, ChangeDetectorRef } from '@angular/core';
import {
  Mfk,
  MfkFieldOption,
  MfkFieldName,
  FavoriteMfk
} from 'projects/uiowa/uiowa-mfk/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mfkFields = [
    MfkFieldName.FUND,
    MfkFieldName.ORG,
    MfkFieldName.DEPT,
    MfkFieldName.SUBDEPT,
    MfkFieldName.GRANTPGM,
    MfkFieldName.IACT,
    MfkFieldName.OACT,
    MfkFieldName.DACT,
    MfkFieldName.FN,
    MfkFieldName.CCTR
  ];
  mfk1 = new Mfk();

  options1 = [new MfkFieldOption(MfkFieldName.IACT, 'xxxx', true)];
  mfk2 = new Mfk();

  mfk3 = new Mfk();
  options: MfkFieldOption[] = [];
  withBrf: boolean;
  field = '';
  defaultValue = '';
  isReadonly = false;

  mfk = new Mfk('02012101201001000000006219000001111235555');
  favoriteMfks = [new FavoriteMfk(1, 'Test', this.mfk)];
  mfk4 = new Mfk();

  constructor() {}

  set() {
    if (!this.field) {
      return;
    }
    const opt = new MfkFieldOption(
      this.field,
      this.defaultValue,
      this.isReadonly
    );
    if (this.defaultValue) {
      if (this.defaultValue.length !== opt.length) {
        alert(
          `Field ${this.field} should have default value length = ${opt.length}`
        );
        return;
      }
      if (!isNaN(+this.defaultValue)) {
        this.mfk3[this.field] = this.defaultValue;
      }
    }
    this.options = [...this.options, opt];
    if (this.withBrf) {
      this.options = [...this.options, new MfkFieldOption(MfkFieldName.BRF)];
    } else {
      this.options = this.options.filter(x => x.name !== 'BRF');
    }
  }
  reset() {
    this.options = [];
  }
}
