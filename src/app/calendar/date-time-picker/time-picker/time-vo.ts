import {isNullOrUndefined} from 'util';

export class TimeVo {

  hour: number;
  minute: number;

  public static setTimeInto(targetDate: Date, sourceTime: TimeVo): void {
    if (isNullOrUndefined(targetDate) || isNullOrUndefined(sourceTime)) {
      throw new Error('Cannot set time of date when either the date or time is undefined!');
    }

    targetDate.setHours(sourceTime.hour);
    targetDate.setMinutes(sourceTime.minute);
  }

  public static equals(timeVo: TimeVo, otherTimeVo: TimeVo): boolean {
    if (isNullOrUndefined(timeVo) || isNullOrUndefined(otherTimeVo)) {
      return false;
    }

    return timeVo.hour === otherTimeVo.hour && timeVo.minute === otherTimeVo.minute;
  }

  public static of(hour: number, minute: number): TimeVo {
    return new TimeVo(hour, minute);
  }

  public static fromDate(date: Date): TimeVo {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return new TimeVo(hour, minute);
  }

  private constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  public equals(otherTime: TimeVo): boolean {
    if (isNullOrUndefined(otherTime)) {
      return false;
    }

    return this.hour === otherTime.hour && this.minute === otherTime.minute;
  }

  public toString(): string {
    return `h: ${this.hour}  m: ${this.minute}`;
  }

}
