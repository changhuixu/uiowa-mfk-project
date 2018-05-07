import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  ViewChildren,
  QueryList
} from '@angular/core';
import { Mfk } from '../models/mfk';
import { MfkFieldOption } from '../models/mfk-field-option';
import { UiowaMfkOptionsService } from '../services/uiowa-mfk-options.service';
import { DigitOnlyDirective } from '../shared/digit-only.directive';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ElementRef } from '@angular/core/src/linker/element_ref';

@Component({
  selector: 'uiowa-mfk-input',
  templateUrl: './mfk-input.component.html',
  styleUrls: ['./mfk-input.component.css']
})
export class MfkInputComponent implements OnInit, OnChanges, AfterViewInit {
  private _mfk: Mfk;
  @Input()
  set mfk(mfk: Mfk) {
    for (let option of this.options.filter(o => o.defaultValue)) {
      if (this.isNullOrWhiteSpace(mfk[option.name]))
        mfk[option.name] = option.defaultValue;
    }
    this._mfk = mfk;
  }
  get mfk(): Mfk {
    for (let option of this.options.filter(o => o.readonly)) {
      this._mfk[option.name] = option.defaultValue;
    }
    return this._mfk;
  }
  @Input() options?: MfkFieldOption[] = [];
  @Output() mfkChange = new EventEmitter<Mfk>();

  @ViewChildren(DigitOnlyDirective)
  mfkInputFields: QueryList<DigitOnlyDirective>;

  constructor(private readonly optionsService: UiowaMfkOptionsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mfk) this.mfk = changes.mfk.currentValue;
    if (changes.options) {
      this.options = changes.options.currentValue;
      this.options = this.optionsService.getOptions(this.options);
    }
  }

  ngOnInit() {
    if (!this.options || this.options.length < 1) {
      Object.assign(this.options, this.optionsService.defaultOptions);
    }
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
      this.mfk.parseString(pastedInput);
    }
    this.mfkChange.emit(this.mfk);
  }

  onKeyup(e: KeyboardEvent) {
    this.mfkChange.emit(this.mfk);
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    )
      return; // only numbers can trigger auto jump feature.
    const currentInputFieldName = e.target['name'];
    if (this.mfk[currentInputFieldName].length === e.target['maxLength']) {
      // auto jump to next input field when current field is full
      const currentInputFieldIndex = this.options.findIndex(
        o => o.name === currentInputFieldName
      );
      for (let i = currentInputFieldIndex + 1; i < this.options.length; i++) {
        if (this.options[i].readonly) continue;
        let nextInputField = this.mfkInputFields.find(
          v => v.el.nativeElement['name'] === this.options[i].name
        );
        nextInputField.el.nativeElement.focus();
        break;
      }
    }
  }

  onKeydown(e: KeyboardEvent) {
    // handle "tab" key --> auto fill '0's if the input field has not completed
    if (e.keyCode !== 9) return;
    if (e.target['readOnly']) return;
    const maxlength = e.target['maxLength'];
    while (this.mfk[e.target['name']].length < maxlength) {
      this.mfk[e.target['name']] = this.mfk[e.target['name']].concat('0');
    }
  }

  private isNullOrWhiteSpace(str: string): boolean {
    return str === null || str.match(/^ *$/) !== null;
  }
}
