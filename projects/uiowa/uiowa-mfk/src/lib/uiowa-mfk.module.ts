import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { MfkInputComponent } from './mfk-input/mfk-input.component';
import { FavoriteMfkComponent } from './favorite-mfk/favorite-mfk.component';
import { MfkStringComponent } from './mfk-string/mfk-string.component';
import { UiowaMfkConfig, ConfigToken } from './models/uiowa-mfk-config';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, DigitOnlyModule],
  declarations: [
    MfkInputComponent,
    FavoriteMfkComponent,
    MfkStringComponent
  ],
  exports: [MfkInputComponent, FavoriteMfkComponent, MfkStringComponent],
  providers: []
})
export class UiowaMfkModule {
  static forRoot(
    config: UiowaMfkConfig = {
      favoriteMfksApiUrl: 'api/myFavoriteMfks'
    }
  ): ModuleWithProviders<UiowaMfkModule> {
    return {
      ngModule: UiowaMfkModule,
      providers: [
        {
          provide: ConfigToken,
          useValue: config
        }
      ]
    };
  }
}
