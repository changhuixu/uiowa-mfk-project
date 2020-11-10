import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { DigitOnlyDirective } from '@uiowa/digit-only';
import { Mfk } from '../models/mfk';
import { MfkFieldOption } from '../models/mfk-field-option';

@Component({
  selector: 'app-mfk-input',
  templateUrl: './mfk-input.component.html',
  styleUrls: ['./mfk-input.component.css'],
})
export class MfkInputComponent implements OnInit {
  private _mfk: Mfk;
  @Input()
  set mfk(mfk: Mfk) {
    this.options
      .filter((o) => o.defaultValue)
      .forEach((o) => {
        if (!mfk[o.name]) {
          mfk[o.name] = o.defaultValue;
        }
      });

    this._mfk = mfk;
  }
  get mfk(): Mfk {
    this.options
      .filter((o) => o.readonly)
      .forEach((o) => {
        this._mfk[o.name] = o.defaultValue;
      });
    return this._mfk;
  }
  @Input() options?: MfkFieldOption[] = [];
  @Output() mfkChange = new EventEmitter<Mfk>();

  @ViewChildren(DigitOnlyDirective)
  mfkInputFields!: QueryList<DigitOnlyDirective>;

  constructor(private readonly optionsService: UiowaMfkOptionsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mfk) {
      this.mfk = changes.mfk.currentValue;
    }
    if (changes.options) {
      this.options = changes.options.currentValue;
      this.options = this.optionsService.getOptions(this.options);
    }
  }

  ngOnInit() {
    this.options = this.optionsService.getOptions(this.options);
  }

  ngAfterViewInit(): void {}

  paste(e: ClipboardEvent) {
    const pastedInput: string = e.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    e.preventDefault();
    if (!pastedInput) {
      return;
    }
    if (pastedInput.length < 40) {
      document.execCommand('insertText', false, pastedInput);
    } else {
      this.parseString(pastedInput);
    }
    this.mfkChange.emit(this.mfk);
  }

  onKeyup(e: KeyboardEvent) {
    this.mfkChange.emit(this.mfk);
    if (isNaN(Number(e.key))) {
      return; // only numbers can trigger auto jump feature.
    }
    const currentInputFieldName = e.target['name'];
    if (this.mfk[currentInputFieldName].length === e.target['maxLength']) {
      // auto jump to next input field when current field is full
      const currentInputFieldIndex = this.options.findIndex(
        (o) => o.name === currentInputFieldName
      );
      for (let i = currentInputFieldIndex + 1; i < this.options.length; i++) {
        if (this.options[i].readonly) {
          continue;
        }
        const nextInputField = this.mfkInputFields.find(
          (v) => v.el.nativeElement['name'] === this.options[i].name
        );
        nextInputField.el.nativeElement.focus();
        break;
      }
    }
  }

  onKeydown(e: KeyboardEvent) {
    // handle "tab" key --> auto fill '0's if the input field has not completed
    if (e.key !== 'tab') {
      return;
    }
    if (e.target['readOnly']) {
      return;
    }
    while (this.mfk[e.target['name']].length < e.target['maxLength']) {
      this.mfk[e.target['name']] = this.mfk[e.target['name']].concat('0');
    }
  }

  private parseString(input: string) {
    const s = input.replace(/\D/g, '');
    if (!s || s.length < 40) {
      return;
    }
    this.mfk.fund = s.substring(0, 3);
    this.mfk.org = s.substring(3, 5);
    this.mfk.dept = s.substring(5, 9);
    this.mfk.subdept = s.substring(9, 14);
    this.mfk.grantpgm = s.substring(14, 22);
    this.mfk.iact = s.substring(22, 26);
    this.mfk.oact = s.substring(26, 29);
    this.mfk.dact = s.substring(29, 34);
    this.mfk.fn = s.substring(34, 36);
    this.mfk.cctr = s.substring(36, 40);
    if (s.length >= 42) {
      this.mfk.brf = s.substring(40, 42);
    }
  }
}
