import { Component, OnInit } from '@angular/core';
import {
  emptyMfk,
  Mfk,
  MfkFieldName,
  MfkFieldOption,
  MfkString,
} from 'projects/uiowa/uiowa-mfk/src/public-api';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent implements OnInit {
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
  withBrf: boolean = false;
  field = MfkFieldName.IACT;
  defaultValue = '6218';
  isReadonly = false;
  mfk1: Mfk = emptyMfk();
  options1 = [new MfkFieldOption(MfkFieldName.IACT, 'xxxx', true)];
  mfk2: Mfk = emptyMfk();
  options2: MfkFieldOption[] = [];

  constructor() {}

  ngOnInit(): void {}

  updateMfk1() {
    const s = new MfkString('0201210120100100000000621900000111123555');
    this.mfk1 = s.mfk;
  }

  setOptions2() {
    if (!this.field) {
      return;
    }
    try {
      this.options2 = [];
      const opt = new MfkFieldOption(
        this.field,
        this.defaultValue,
        this.isReadonly
      );
      if (opt.defaultValue) {
        this.mfk2[this.field] = this.defaultValue;
      }
      this.options2 = [...this.options2, opt];
      if (this.withBrf) {
        this.options2 = [
          ...this.options2,
          new MfkFieldOption(MfkFieldName.BRF),
        ];
      } else {
        this.options2 = this.options2.filter(
          (x) => x.name !== MfkFieldName.BRF
        );
      }
    } catch (e) {
      alert(e);
    }
  }
  resetOptions2() {
    this.options2 = [];
  }
}
