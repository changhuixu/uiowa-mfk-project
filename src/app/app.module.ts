import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UiowaMfkModule } from '@uiowa/uiowa-mfk';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, UiowaMfkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
