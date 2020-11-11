import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { UiowaMfkModule } from 'projects/uiowa/uiowa-mfk/src/public-api';

import { AppComponent } from './app.component';
import { DemosComponent } from './demos/demos.component';
import { ActionsComponent } from './actions/actions.component';
import { FavoriteMfkComponent } from './favorite-mfk/favorite-mfk.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    ActionsComponent,
    FavoriteMfkComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    UiowaMfkModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'demos' },
      { path: 'demos', component: DemosComponent },
      { path: 'actions', component: ActionsComponent },
      { path: 'favorite-mfk', component: FavoriteMfkComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
