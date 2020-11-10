import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UiowaMfkModule } from 'projects/uiowa/uiowa-mfk/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, FormsModule, UiowaMfkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
