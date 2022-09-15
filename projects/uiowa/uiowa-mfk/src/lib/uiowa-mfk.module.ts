import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { MfkInputComponent } from './mfk-input/mfk-input.component';
import { MfkStringComponent } from './mfk-string/mfk-string.component';
import { MfkStringPipePipe } from './pipes/mfk-string-pipe.pipe';
import { WhoKeyStringPipePipe } from './pipes/who-key-string-pipe.pipe';

@NgModule({
  declarations: [
    MfkInputComponent,
    MfkStringComponent,
    MfkStringPipePipe,
    WhoKeyStringPipePipe,
  ],
  imports: [CommonModule, FormsModule, DigitOnlyModule],
  exports: [
    MfkInputComponent,
    MfkStringComponent,
    MfkStringPipePipe,
    WhoKeyStringPipePipe,
  ],
})
export class UiowaMfkModule {}
