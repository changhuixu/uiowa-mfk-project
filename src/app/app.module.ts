import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DigitOnlyModule } from '@uiowa/digit-only';

// import { UiowaMfkModule } from '@uiowa/uiowa-mfk';

import { AppComponent } from './app.component';
import { UiowaMfkModule } from 'projects/uiowa/uiowa-mfk/src/public-api';

@NgModule({
declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DigitOnlyModule,
    UiowaMfkModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
