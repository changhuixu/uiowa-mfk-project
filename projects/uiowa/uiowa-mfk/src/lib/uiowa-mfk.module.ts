import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DigitOnlyDirective } from '@uiowa/digit-only';

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
  imports: [CommonModule, FormsModule, DigitOnlyDirective],
  exports: [
    MfkInputComponent,
    MfkStringComponent,
    MfkStringPipePipe,
    WhoKeyStringPipePipe,
    DigitOnlyDirective,
  ],
})
export class UiowaMfkModule {}
