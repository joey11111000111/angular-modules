export class TimeVo {

  hour: number;
  minute: number;

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
}
