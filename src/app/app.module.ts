import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UiowaMfkModule } from 'uiowa-mfk';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiowaMfkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
