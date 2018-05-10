import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MfkInputComponent } from './mfk-input/mfk-input.component';
import { FavoriteMfkComponent } from './favorite-mfk/favorite-mfk.component';
import { UiowaMfkOptionsService } from './services/uiowa-mfk-options.service';
import { FavoriteMfkService } from './services/favorite-mfk.service';
import { MfkValidationService } from './services/mfk-validation.service';
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
  providers: [UiowaMfkOptionsService, FavoriteMfkService, MfkValidationService]
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
