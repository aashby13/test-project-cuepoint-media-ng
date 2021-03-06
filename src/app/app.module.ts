import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CuepointMediaModule } from 'cuepoint-media-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CuepointMediaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
