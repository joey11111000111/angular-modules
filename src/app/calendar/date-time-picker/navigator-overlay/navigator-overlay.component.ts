import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-navigator-overlay',
  templateUrl: './navigator-overlay.component.html',
  styleUrls: ['../styles/navigator-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigatorOverlayComponent {

  @Input() public visible: boolean;
  @Output() public readonly visibleChange: EventEmitter<boolean>;

  private _selectedMonth: Date;
  @Output() selectedMonthChange: EventEmitter<Date>;

  private _selectedYear: number;
  public selectedMonthGrid: MonthGrid;
  public monthList: MonthGrid[];

  constructor() {
    this.visibleChange = new EventEmitter<boolean>();
    this.selectedMonthChange = new EventEmitter<Date>();
    this.initMonthList();
  }

  private initMonthList(): void {
    this.monthList = [];
    for (let i = 0; i < 12; i++) {
      const monthGrid = new MonthGrid(i);
      this.monthList.push(monthGrid);
    }
  }

  get selectedYear(): number {
    return this._selectedYear;
  }

  set selectedYear(selectedYear: number) {
    if (selectedYear >= 1000 && selectedYear <= 9999) {
      this._selectedYear = selectedYear;
      this.handleSelection();
    }
  }

  @Input()
  set selectedMonth(selectedMonth: Date) {
    this._selectedMonth = isNullOrUndefined(selectedMonth) ? new Date() : selectedMonth;
    this._selectedYear = this._selectedMonth.getFullYear();
    this.selectMonth(this._selectedMonth.getMonth());
  }

  private selectMonth(month: number): void {
    if (!isNullOrUndefined(this.selectedMonthGrid)) {
      this.selectedMonthGrid.isSelected = false;
    }
    this.selectedMonthGrid = this.monthList.find(monthGrid => monthGrid.month === month);
    this.selectedMonthGrid.isSelected = true;
  }

  public handleSelection(selectedMonthGrid?: MonthGrid): void {
    if (!isNullOrUndefined(selectedMonthGrid)) {
      this.selectMonth(selectedMonthGrid.month);
    }

    const selectedMonth = new Date(this._selectedMonth);
    selectedMonth.setFullYear(this._selectedYear);
    selectedMonth.setMonth(this.selectedMonthGrid.month);
    this.selectedMonthChange.emit(selectedMonth);

    if (!isNullOrUndefined(selectedMonthGrid)) {
      this.visibleChange.emit(false);
    }
  }

  public handleMouseWheelOnInput(event: any): void {
    const yearModifier = event.deltaY > 0 ? -1 : 1;
    this.selectedYear += yearModifier;
    event.stopPropagation();
    event.preventDefault();
  }

  public incrementYear(): void {
    this.selectedYear = this._selectedYear + 1;
  }

  public decrementYear(): void {
    this.selectedYear = this._selectedYear - 1;
  }

  public handleInputKeyDown(event): void {
    if (event.code === 'ArrowUp') {
      this.incrementYear();
      event.preventDefault();
    } else if (event.code === 'ArrowDown') {
      this.decrementYear();
      event.preventDefault();
    }
  }

}

class MonthGrid {

  public static monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  public month: number;
  public label: string;
  public isSelected: boolean;

  constructor(monthIndex: number, isSelected?: boolean) {
    this.month = monthIndex;
    this.label = MonthGrid.monthLabels[monthIndex];
    this.isSelected = !isNullOrUndefined(isSelected) && isSelected;
  }

}
