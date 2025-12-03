import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Mfk } from '../models/mfk';

@Component({
  selector: 'uiowa-mfk-string',
  imports: [],
  template: ` @if(mfk(); as mfk){
    <span>
      <span>{{ mfk.fund }}</span>
      <span>-{{ mfk.org }}</span>
      <span>-{{ mfk.dept }}</span>
      <span>-{{ mfk.subdept }}</span>
      <span>-{{ mfk.grantpgm }}</span>
      <span>-{{ mfk.iact }}</span>
      <span>-{{ mfk.oact }}</span>
      <span>-{{ mfk.dact }}</span>
      <span>-{{ mfk.fn }}</span>
      <span>-{{ mfk.cctr }}</span>
      @if(mfk.brf){ <span>-{{ mfk.brf }}</span> }
    </span>
    }`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfkString {
  mfk = input<Mfk>();
}
