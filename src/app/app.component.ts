import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  options: any;
  selectedValue: any;

  constructor() {
    this.options = [
      {label: 'option 1', value: {id: 10, name: 'ten'}}, {label: 'option 3', value: {id: 2, name: 'two'}}, {label: 'option 3', value: {id: 4, name: 'four'}}
      ];
  }

}
