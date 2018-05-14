import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {SimpleDropdownComponent} from './simple-dropdown/simple-dropdown.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { DateTimePickerComponent } from './calendar/date-time-picker/date-time-picker.component';
import {UtilModule} from './util/util.module';
import { NavigatorOverlayComponent } from './calendar/date-time-picker/navigator-overlay/navigator-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    SimpleDropdownComponent,
    CalendarComponent,
    DateTimePickerComponent,
    NavigatorOverlayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
