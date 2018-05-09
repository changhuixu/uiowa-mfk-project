import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { Mfk } from '../models/mfk';
import { MfkFieldName } from '../models/mfk-field-name';

@Component({
  selector: 'uiowa-mfk-string',
  template: `
<span *ngIf="mfk">
  <span>{{mfk.FUND}}</span>
  <span>-{{mfk.ORG}}</span>
  <span>-{{mfk.DEPT}}</span>
  <span>-{{mfk.SUBDEPT}}</span>
  <span>-{{mfk.GRANTPGM}}</span>
  <span>-{{mfk.IACT}}</span>
  <span>-{{mfk.OACT}}</span>
  <span>-{{mfk.DACT}}</span>
  <span>-{{mfk.FN}}</span>
  <span>-{{mfk.CCTR}}</span>
  <span *ngIf="mfk.BRF">-{{mfk.BRF}}</span>
</span>
  `
})
export class MfkStringComponent implements OnInit, OnChanges {
  @Input() mfk: Mfk;
  /**
   * Shows MFK fields in a <span></span>. Example usage:
   *
   * ```typescript
   * <uiowa-mfk-string [mfk]="mfk"></uiowa-mfk-string>
   * ```
   */
  constructor() {}
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.mfk = changes.mfk.currentValue;
  }
}
