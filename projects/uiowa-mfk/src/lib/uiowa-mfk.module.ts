import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MfkInputComponent } from './mfk-input/mfk-input.component';
import { FavoriteMfkComponent } from './favorite-mfk/favorite-mfk.component';
import { DigitOnlyDirective } from './shared/digit-only.directive';
import { MfkStringComponent } from './mfk-string/mfk-string.component';
import { UiowaMfkConfig, ConfigToken } from './models/uiowa-mfk-config';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, NgbModule],
  declarations: [
    MfkInputComponent,
    FavoriteMfkComponent,
    DigitOnlyDirective,
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
  ): ModuleWithProviders {
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
