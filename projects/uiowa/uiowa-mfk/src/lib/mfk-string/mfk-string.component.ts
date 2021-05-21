import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mfk } from '../models/mfk';

@Component({
  selector: 'uiowa-mfk-string',
  templateUrl: './mfk-string.component.html',
  styleUrls: ['./mfk-string.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfkStringComponent {
  @Input() mfk: Mfk | null | undefined = null;
}
