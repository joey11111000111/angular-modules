const isAfter: ((date: Date, dateToCompare: Date) => Date) = require('date-fns/is_after');
const isBefore: ((date: Date, dateToCompare: Date) => Date) = require('date-fns/is_after');
const isEqual: ((date: Date, dateToCompare: Date) => Date) = require('date-fns/is_equal');
const isFuture: ((date: Date) => boolean) = require('date-fns/is_future');

const subYears: ((date: Date, amount: number) => Date) = require('date-fns/sub_years');
const addYears: ((date: Date, amount: number) => Date) = require('date-fns/add_years');

const startOfMonth: ((date: Date) => Date) = require('date-fns/start_of_month');
const lastDayOfMonth: ((date: Date) => Date) = require('date-fns/last_day_of_month');
const addMonths: ((date: Date, amount: number) => Date) = require('date-fns/add_months');
const subMonths: ((date: Date, amount: number) => Date) = require('date-fns/sub_months');
const differenceInCalendarMonths: ((date: Date, otherDate: Date) => number) = require('date-fns/difference_in_calendar_months');

const startOfWeek: ((date: Date) => Date) = require('date-fns/start_of_week');
const endOfWeek: ((date: Date) => Date) = require('date-fns/end_of_week');

const differenceInCalendarDays: ((date: Date, otherDate: Date) => number) = require('date-fns/difference_in_calendar_days');
const isSaturday: ((date: Date) => boolean) = require('date-fns/is_saturday');
const addDays: ((date: Date, amount: number) => Date) = require('date-fns/add_days');
const subDays: ((date: Date, amount: number) => Date) = require('date-fns/sub_days');

export class DateFns {

  // Compare methods --------------------------
  public static isAfter(date: Date, dateToCompare: Date): Date {
    return isAfter(date, dateToCompare);
  }

  public static isBefore(date: Date, dateToCompare: Date): Date {
    return isBefore(date, dateToCompare);
  }

  public static isEqual(date: Date, dateToCompare: Date): Date {
    return isEqual(date, dateToCompare);
  }

  public static isFuture(date: Date): boolean {
    return isFuture(date);
  }

  // Year methods ----------------------------
  public static addYears(date: Date, amount: number): Date {
    return addYears(date, amount);
  }

  public static subYears(date: Date, amount: number): Date {
    return subYears(date, amount);
  }

  // Month methods ---------------------------
  public static differenceInCalendarMonths(date: Date, otherDate: Date): number {
    return differenceInCalendarMonths(date, otherDate);
  }

  public static lastDayOfMonth(date: Date): Date {
    return lastDayOfMonth(date);
  }

  public static addMonths(date: Date, amount: number): Date {
    return addMonths(date, amount);
  }

  public static subMonths(date: Date, amount: number): Date {
    return subMonths(date, amount);
  }

  public static startOfMonth(date: Date): Date {
    return startOfMonth(date);
  }

  // Week methods ----------------------------
  public static mondayOfWeek(date: Date): Date {
    return addDays(startOfWeek(subDays(date, 1)), 1);
    // return DateFns.subDays(startOfWeek(date), 6);
  }

  public static sundayOfWeek(date: Date): Date {
    return DateFns.addDays(endOfWeek(date), 1);
  }

  public static startOfWeek(date: Date): Date {
    return startOfWeek(date);
  }

  public static endOfWeek(date: Date): Date {
    return endOfWeek(date);
  }

  // Day methods ----------------------------
  public static differenceInCalendarDays(date: Date, otherDate: Date): number {
    return differenceInCalendarDays(date, otherDate);
  }

  public static isSaturday(date: Date): boolean {
    return isSaturday(date);
  }

  public static addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  public static subDays(date: Date, amount: number): Date {
    return subDays(date, amount);
  }

}
