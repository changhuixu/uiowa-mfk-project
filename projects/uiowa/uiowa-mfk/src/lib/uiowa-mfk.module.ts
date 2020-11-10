import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { MfkInputComponent } from './mfk-input/mfk-input.component';
import { MfkStringComponent } from './mfk-string/mfk-string.component';

@NgModule({
  declarations: [MfkInputComponent, MfkStringComponent],
  imports: [CommonModule, FormsModule, DigitOnlyModule],
  exports: [MfkInputComponent, MfkStringComponent],
})
export class UiowaMfkModule {}
