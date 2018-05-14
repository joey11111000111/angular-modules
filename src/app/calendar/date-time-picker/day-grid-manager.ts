import {isNullOrUndefined} from 'util';
import {DateFns} from '../../util/date-fns';
import {DayGrid} from './day-grid';
import {Injectable} from '@angular/core';

@Injectable()
export class DayGridManager {

  private allDaysOfDisplayedMonth: DayGrid[];
  private selectedGrid: DayGrid;
  private displayedMonth: Date;

  constructor() {
    this.allDaysOfDisplayedMonth = [];
    this.displayedMonth = null;
    this.selectedGrid = null;
  }

  public get gridsToDisplay(): DayGrid[] {
    return this.allDaysOfDisplayedMonth;
  }

  public getDisplayedMonth(): Date {
    return isNullOrUndefined(this.displayedMonth) ? null : this.displayedMonth;
  }

  public getSelectedDateTime(): Date {
    if (isNullOrUndefined(this.selectedGrid) || isNullOrUndefined(this.displayedMonth)) {
      return null;
    }

    const selectedDateTime = new Date(this.displayedMonth);
    selectedDateTime.setDate(this.selectedGrid.date);
    return selectedDateTime;
  }

  public isSelectedGrid(grid: DayGrid): boolean {
    return !isNullOrUndefined(this.selectedGrid) && this.selectedGrid.date === grid.date;
  }

  public selectGrid(gridToSelect: DayGrid): void {
    if (!this.isSelectedGrid(gridToSelect)) {
      if (!isNullOrUndefined(this.selectedGrid)) {
        this.selectedGrid.isSelected = false;
      }
      gridToSelect.isSelected = true;
      this.selectedGrid = gridToSelect;
    }
  }

  public showPrevMonth(selectedDate: Date): void {
    const prevMonth = DateFns.subMonths(this.displayedMonth, 1);
    this.displayMonth(prevMonth, selectedDate);
  }

  public showPrevYear(selectedDate: Date): void {
    const prevYear = DateFns.subYears(this.displayedMonth, 1);
    this.displayMonth(prevYear, selectedDate);
  }

  public showNextMonth(selectedDate: Date): void {
    const nextMonth = DateFns.addMonths(this.displayedMonth, 1);
    this.displayMonth(nextMonth, selectedDate);
  }

  public showNextYear(selectedDate: Date): void {
    const nextYear = DateFns.addYears(this.displayedMonth, 1);
    this.displayMonth(nextYear, selectedDate);
  }

  public showThisMonth(selectedDate: Date): void {
    this.displayMonth(new Date(), selectedDate);
  }

  public displayMonth(monthToDisplay: Date, selectedDate?: Date): void {
    if (isNullOrUndefined(this.displayedMonth)) {
      this.lookUpDaysToDisplay(monthToDisplay, selectedDate);
      return;
    }

    const diffFromDisplayedMonth = Math.abs(DateFns.differenceInCalendarMonths(monthToDisplay, this.displayedMonth));
    if (diffFromDisplayedMonth !== 0) {
      this.lookUpDaysToDisplay(monthToDisplay, selectedDate);
    } else {
      this.markSelectedDayIfDisplayed(selectedDate);
    }
  }

  public markSelectedDayIfDisplayed(selectedDay: Date): void {
    if (isNullOrUndefined(selectedDay)) {
      return;
    }

    const monthBetweenSelectedAndDisplayed = DateFns.differenceInCalendarMonths(this.displayedMonth, selectedDay);
    if (monthBetweenSelectedAndDisplayed !== 0) {
      return;
    }

    const selectedDate = selectedDay.getDate();
    const selectedDayGrid = this.allDaysOfDisplayedMonth.find(dayGrid => dayGrid.date === selectedDate);
    selectedDayGrid.isSelected = true;
  }

  private lookUpDaysToDisplay(monthToDisplay: Date, selectedDay?: Date): void {
    this.allDaysOfDisplayedMonth = [];
    this.displayedMonth = monthToDisplay;
    this.pushBeforeDays();
    this.pushDaysOfMonth();
    this.pushAfterDays();

    if (!isNullOrUndefined(selectedDay)) {
      this.markSelectedDayIfDisplayed(selectedDay);
    }
  }

  private pushBeforeDays(): void {
    const firstDayOfMonth = DateFns.startOfMonth(this.displayedMonth);
    const mondayOfWeek = DateFns.mondayOfWeek(firstDayOfMonth);

    const daysAfterLastMonday = Math.abs(DateFns.differenceInCalendarDays(mondayOfWeek, firstDayOfMonth));
    if (daysAfterLastMonday === 0) {
      return;
    }

    const lastDayOfPrevMonth = DateFns.subDays(firstDayOfMonth, 1);
    const lastDateOfPrevMonth = lastDayOfPrevMonth.getDate();

    const fromLabel = lastDateOfPrevMonth - daysAfterLastMonday + 1;
    const toLabel = lastDateOfPrevMonth;
    this.pushDayGrids(fromLabel, toLabel, false);
  }

  private pushDaysOfMonth(): void {
    const lastDayOfMonth = DateFns.lastDayOfMonth(this.displayedMonth);
    const numberOfDaysInMonth = lastDayOfMonth.getDate();
    this.pushDayGrids(1, numberOfDaysInMonth, true);
  }

  private pushAfterDays(): void {
    let toLabel = 42 - this.allDaysOfDisplayedMonth.length;
    if (toLabel >= 7) {
      toLabel -= 7;
    }
    this.pushDayGrids(1, toLabel, false);
  }

  private pushDayGrids(fromDate: number, toDate: number, isFromDisplayedMonth: boolean): void {
    for (let i = fromDate; i <= toDate; i++) {
      const dayGrid = new DayGrid();
      dayGrid.date = i;
      dayGrid.isFromDisplayedMonth = isFromDisplayedMonth;
      dayGrid.isSelected = false;
      const dayOfWeek = (this.allDaysOfDisplayedMonth.length % 7) + 1;
      dayGrid.isWeekEnd = dayOfWeek % 6 === 0 || dayOfWeek % 7 === 0;
      this.allDaysOfDisplayedMonth.push(dayGrid);
    }
  }

}
