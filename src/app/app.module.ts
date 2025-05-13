import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { UiowaMfkModule } from '../../projects/uiowa/uiowa-mfk/src/public-api';

import { RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { AppComponent } from './app.component';
import { DemosComponent } from './demos/demos.component';
import { FavoriteMfkComponent } from './favorite-mfk/favorite-mfk.component';
import { MfkValidationsComponent } from './mfk-validations/mfk-validations.component';
import { SplitCostComponent } from './split-cost/split-cost.component';

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
    UiowaMfkModule,
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'demos' },
        { path: 'demos', component: DemosComponent },
        { path: 'actions', component: ActionsComponent },
        { path: 'split-cost', component: SplitCostComponent },
        { path: 'favorite-mfk', component: FavoriteMfkComponent },
        { path: 'mfk-validations', component: MfkValidationsComponent },
        { path: '**', redirectTo: '' },
      ],
      { useHash: true }
    ),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
