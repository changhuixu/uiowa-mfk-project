import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { Mfk } from "../models/mfk";

@Component({
  selector: 'uiowa-mfk-string',
  template: `
<span ng-if="mfk">
{{mfk.FUND}}-{{mfk.ORG}}-{{mfk.DEPT}}-{{mfk.SUBDEPT}}-{{mfk.GRANTPGM}}-{{mfk.IACT}}-{{mfk.OACT}}-{{mfk.DACT}}-{{mfk.FN}}-{{mfk.CCTR}}<span *ngIf="mfk.BRF">-{{mfk.BRF}}</span>
</span>
  `,
  styles: []
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

  ngOnChanges(changes: SimpleChanges): void {
    this.mfk = changes.mfk.currentValue;
  }
  ngOnInit() {}

}
