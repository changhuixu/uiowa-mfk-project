import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UiowaHeaderModule } from '@uiowa/uiowa-header';

import { UiowaMfkModule } from '@uiowa/uiowa-mfk';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    UiowaHeaderModule,
    UiowaMfkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
