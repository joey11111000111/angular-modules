import {Component} from '@angular/core';
import {DateFns} from './util/date-fns';
import {InputCorrector} from './calendar/date-time-input/services/input-corrector';
import {DebugLog} from './util/debug-log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  options: any;
  selectedValue: any;
  timePicker: boolean;

  public selectedDateTime: Date;

  constructor() {
    this.timePicker = true;

    this.selectedDateTime = DateFns.addYears(new Date(), 13);
    this.selectedDateTime.setHours(8);
    this.selectedDateTime.setMinutes(12);

    this.options = [
      {label: 'option 1', value: {id: 10, name: 'ten'}}, {label: 'option 3', value: {id: 2, name: 'two'}}, {
        label: 'option 3',
        value: {id: 4, name: 'four'}
      }
    ];
  }

}
