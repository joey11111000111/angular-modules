import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TimeVo} from './time-vo';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {

  private hour: number;
  private minute: number;

  @Output() onTimeChange: EventEmitter<TimeVo>;

  public displayHour: string;
  public displayMinute: string;

  constructor() {
    this.onTimeChange = new EventEmitter<TimeVo>();
  }

  @Input()
  set initialTime(timeVo: TimeVo) {
    if (isNullOrUndefined(timeVo)) {
      this.applyInitialTime(TimeVo.fromDate(new Date()));
    } else {
      this.applyInitialTime(timeVo);
    }
  }

  private applyInitialTime(initialTimeVo: TimeVo): void {
    this.hour = initialTimeVo.hour;
    this.minute = initialTimeVo.minute;
    this.updateDisplayFields();
  }

  public now(): void {
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.updateDisplayAndEmitTime();
  }

  public incrementHourBy(amount: number): void {
    this.hour = (this.hour + amount) % 24;
    this.updateDisplayAndEmitTime();
  }

  public decrementHourBy(amount: number): void {
    this.hour = (this.hour + 24 - amount) % 24;
    this.updateDisplayAndEmitTime();
  }

  public incrementMinuteBy(amount: number): void {
    this.minute = (this.minute + amount) % 60;
    this.updateDisplayAndEmitTime();
  }

  public decrementMinuteBy(amount: number): void {
    this.minute = (this.minute + (60 - amount)) % 60;
    this.updateDisplayAndEmitTime();
  }

  private updateDisplayAndEmitTime(): void {
    this.updateDisplayFields();
    this.emitTime();
  }

  private updateDisplayFields(): void {
    this.displayHour = this.hour < 10 ? '0' + this.hour : this.hour.toString();
    this.displayMinute = this.minute < 10 ? '0' + this.minute : this.minute.toString();
  }

  private emitTime(): void {
    const timeVo = TimeVo.of(this.hour, this.minute);
    this.onTimeChange.emit(timeVo);
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
