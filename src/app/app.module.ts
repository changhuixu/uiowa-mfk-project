import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UiowaMfkModule } from 'projects/uiowa/uiowa-mfk/src/public-api';

import { AppComponent } from './app.component';
import { DemosComponent } from './demos/demos.component';
import { ActionsComponent } from './actions/actions.component';
import { FavoriteMfkComponent } from './favorite-mfk/favorite-mfk.component';
import { RouterModule } from '@angular/router';
import { MfkValidationsComponent } from './mfk-validations/mfk-validations.component';
import { SplitCostComponent } from './split-cost/split-cost.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    ActionsComponent,
    FavoriteMfkComponent,
    MfkValidationsComponent,
    SplitCostComponent,
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    FormsModule,
    HttpClientModule,
    DigitOnlyModule,
    UiowaMfkModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'demos' },
      { path: 'demos', component: DemosComponent },
      { path: 'actions', component: ActionsComponent },
      { path: 'split-cost', component: SplitCostComponent },
      { path: 'favorite-mfk', component: FavoriteMfkComponent },
      { path: 'mfk-validations', component: MfkValidationsComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
