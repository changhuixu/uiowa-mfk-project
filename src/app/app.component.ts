import { Component } from '@angular/core';
import {
  MfkFieldOption,
  MfkFieldName,
  Mfk,
  MfkString,
  EmptyMfk,
} from 'projects/uiowa/uiowa-mfk/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
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
    MfkFieldName.CCTR,
  ];

  mfk1: Mfk;

  options1 = [new MfkFieldOption(MfkFieldName.IACT, 'xxxx', true)];
  mfk2: Mfk;

  mfk3: Mfk = EmptyMfk.create();
  options: MfkFieldOption[] = [];
  withBrf: boolean;
  field = '';
  defaultValue = '';
  isReadonly = false;

  mfkString1 = new MfkString('02012101201001000000006219000001111235555');
  mfk4: Mfk;

  mfk5: Mfk = { iact: '6128' } as Mfk;
  options5 = [new MfkFieldOption(MfkFieldName.IACT, '6128')];

  options6 = [new MfkFieldOption(MfkFieldName.IACT, 'xxxx', true)];
  mfk6: Mfk;

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
      this.options = this.options.filter((x) => x.name !== 'BRF');
    }
  }
  reset() {
    this.options = [];
  }

  update() {
    const s = new MfkString('02012101201001000000006219000001111235555');
    this.mfk6 = s.mfk;
  }
}
