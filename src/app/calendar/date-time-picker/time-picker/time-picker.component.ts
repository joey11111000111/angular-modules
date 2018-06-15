import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  private hour: number;
  private minute: number;

  public displayHour: string;
  public displayMinute: string;

  constructor() {
    this.hour = 16;
    this.minute = 42;
    this.displayHour = this.hour.toString();
    this.displayMinute = this.minute.toString();
  }

  ngOnInit() {
  }

  public now(): void {
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.updateDisplayFields();
  }

  public incrementHourBy(amount: number): void {
    this.hour = (this.hour + amount) % 24;
    this.updateDisplayFields();
  }

  public decrementHourBy(amount: number): void {
    this.hour = (this.hour + 24 - amount) % 24;
    this.updateDisplayFields();
  }

  public incrementMinuteBy(amount: number): void {
    this.minute = (this.minute + amount) % 60;
    this.updateDisplayFields();
  }

  public decrementMinuteBy(amount: number): void {
    this.minute = (this.minute + (60 - amount)) % 60;
    this.updateDisplayFields();
  }

  private updateDisplayFields(): void {
    this.displayHour = this.hour < 10 ? '0' + this.hour : this.hour.toString();
    this.displayMinute = this.minute < 10 ? '0' + this.minute : this.minute.toString();
  }

  public handleHourWheel(event): void {
    if (event.deltaY > 0) {
      this.decrementHourBy(1);
    } else {
      this.incrementHourBy(1);
    }
    this.stopEvent(event);
  }

  public handleMinuteWheel(event): void {
    if (event.deltaY > 0) {
      this.decrementMinuteBy(1);
    } else {
      this.incrementMinuteBy(1);
    }
    this.stopEvent(event);
  }

  public stopEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
