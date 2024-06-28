import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { DigitOnlyDirective } from '@uiowa/digit-only';
import { Mfk } from '../models/mfk';
import { MfkFieldName } from '../models/mfk-field-name';
import { MfkFieldOption } from '../models/mfk-field-option';
import { MfkString } from '../models/mfk-string';
import { areEqual, emptyMfk, stringify } from '../models/mfk-tools';

@Component({
  selector: 'uiowa-mfk-input',
  templateUrl: './mfk-input.component.html',
  styleUrls: ['./mfk-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfkInputComponent implements OnInit, OnChanges {
  private _mfk: Mfk = emptyMfk();
  @Input()
  set mfk(mfk: Mfk) {
    mfk = Object.assign(emptyMfk(), mfk);
    this.options
      .filter((o) => o.defaultValue)
      .forEach((o) => {
        mfk[o.name] = mfk[o.name] || o.defaultValue;
      });
    this.options
      .filter((o) => o.readonly)
      .forEach((o) => {
        mfk[o.name] = o.defaultValue;
      });
    this._mfk = mfk;
  }
  get mfk(): Mfk {
    return this._mfk;
  }

  @Input() options: MfkFieldOption[] = [];
  @Output() mfkChange = new EventEmitter<Mfk>();
  @ViewChildren(DigitOnlyDirective)
  mfkInputFields!: QueryList<DigitOnlyDirective>;
  elementId = 'mfk-container_';
  elementName = 'mfk-container_';

  constructor(el: ElementRef) {
    const rand = Math.random().toString(36).substring(2);
    this.elementId +=
      el.nativeElement.getAttribute('id') ||
      el.nativeElement.getAttribute('name') ||
      rand;
    this.elementName +=
      el.nativeElement.getAttribute('name') ||
      el.nativeElement.getAttribute('id') ||
      rand;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mfk'] && changes['mfk'].currentValue) {
      if (
        !areEqual(changes['mfk'].previousValue, changes['mfk'].currentValue)
      ) {
        this.mfk = changes['mfk'].currentValue;
        this.mfkChange.emit(this.mfk);
      }
    }
    if (changes['options'] || !this.options.length) {
      this.options = this.mergeOptions(changes['options']?.currentValue);
      this.mfk = this.mfk;
      this.mfkChange.emit(this.mfk);
    }
  }

  ngOnInit() {}

  paste(e: ClipboardEvent) {
    const pastedInput: string =
      e.clipboardData?.getData('text/plain').replace(/\D/g, '') ?? ''; // get a digit-only string
    if (!pastedInput) {
      return;
    }
    if (pastedInput.length >= 40) {
      const mfkString = new MfkString(pastedInput);
      if (mfkString.isValidMfk && !areEqual(this.mfk, mfkString.mfk)) {
        this.mfk = mfkString.mfk;
        this.originalMfk = stringify(this.mfk);
        this.mfkChange.emit(this.mfk);
      }
    }
  }

  onKeyup(e: KeyboardEvent) {
    if (this.originalMfk !== stringify(this.mfk)) {
      this.mfkChange.emit(this.mfk);
    }

    if (isNaN(Number(e.key))) {
      return; // only numbers can trigger auto jump feature.
    }

    const target = e.target as HTMLInputElement;
    const fieldName = target.name as keyof Mfk;
    if (this.mfk[fieldName]?.length === target.maxLength) {
      // auto jump to the next input field when current field is full
      const currentInputFieldIndex = this.options.findIndex(
        (o) => o.name === fieldName
      );
      for (let i = currentInputFieldIndex + 1; i < this.options.length; i++) {
        if (this.options[i].readonly) {
          continue;
        }
        const nextInputField = this.mfkInputFields.find(
          (v) => v.el.nativeElement['name'] === this.options[i].name
        );
        nextInputField?.el.nativeElement.focus();
        break;
      }
    }
  }

  private originalMfk = '';
  onKeydown(e: KeyboardEvent) {
    this.originalMfk = stringify(this.mfk);
    const target = e.target as HTMLInputElement;
    const fieldName = target.name as keyof Mfk;

    // handle "tab" key --> auto fill '0's if the input field has not completed
    if (e.key === 'Tab') {
      if (target.readOnly) {
        return;
      }
      while (this.mfk[fieldName]!.length < target.maxLength) {
        this.mfk[fieldName] = this.mfk[fieldName]!.concat('0');
      }
    }

    // handle "backspace" key
    if (
      (e.key === 'Backspace' || e.code === 'Backspace') &&
      this.mfk[fieldName]?.length === 0
    ) {
      const currentInputFieldIndex = this.options.findIndex(
        (o) => o.name === fieldName
      );
      // auto jump to the previous input field when current field is empty
      for (let i = currentInputFieldIndex - 1; i >= 0; i--) {
        if (this.options[i].readonly) {
          continue;
        }
        const prevInputField = this.mfkInputFields.find(
          (v) => v.el.nativeElement['name'] === this.options[i].name
        );
        prevInputField?.el.nativeElement.focus();
        break;
      }
    }
  }

  private mergeOptions(options: MfkFieldOption[] = []): MfkFieldOption[] {
    const result: MfkFieldOption[] = [
      new MfkFieldOption(MfkFieldName.FUND),
      new MfkFieldOption(MfkFieldName.ORG),
      new MfkFieldOption(MfkFieldName.DEPT),
      new MfkFieldOption(MfkFieldName.SUBDEPT),
      new MfkFieldOption(MfkFieldName.GRANTPGM),
      new MfkFieldOption(MfkFieldName.IACT),
      new MfkFieldOption(MfkFieldName.OACT),
      new MfkFieldOption(MfkFieldName.DACT),
      new MfkFieldOption(MfkFieldName.FN),
      new MfkFieldOption(MfkFieldName.CCTR),
    ];
    if (options && options.length > 0) {
      for (const option of options) {
        const fieldOption = result.find((o) => o.name === option.name);
        if (fieldOption) {
          const index = result.indexOf(fieldOption);
          result[index] = option;
        } else {
          result.push(option);
        }
      }
    }
    return result;
  }
}
