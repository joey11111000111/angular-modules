import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {DayGridManager} from './day-grid-manager';
import {DayGrid} from './day-grid';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {TimeVo} from './time-picker/time-vo';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: [
    './styles/date-time-picker.component.scss',
    './styles/date-time-picker-header.scss',
    './styles/date-time-picker-body.scss',
    './styles/date-time-picker-footer.scss'
  ],
  providers: [DayGridManager],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideFromTop', [
      state('void', style({
        'height': '0'
      })),
      state('*', style({
        'height': '100%'
      })),

      transition('* <=> void', animate('150ms ease-in')),
    ]),
    trigger('flipInOut', [
      state('void', style({
        'transform': 'rotateX(90deg)'
      })),
      transition('* <=> void', animate('100ms ease-in')),
    ]),
    trigger('fadeOutIn', [
      transition('monthChange <=> *', animate('250ms ease-out', keyframes([
        style({'transform': 'scale(1)', offset: 0}),
        style({'transform': 'scale(.95)', offset: .5}),
        style({'transform': 'scale(1)', offset: 1})
      ])))
    ]),
    trigger('spinInOut', [
      state('void', style({
        'transform': 'rotateX(90deg)',
        'background-color': 'rgba(200, 200, 200, .5)',
      })),
      transition(':enter', animate('300ms linear')),
      transition(':leave', animate('300ms linear'))
    ]),
  ]
})
export class DateTimePickerComponent {

  private _selectedDateTime: Date;
  @Output() onSelect: EventEmitter<Date>;
  @Input() defaultMonthToDisplay: Date;
  private _timePicker: boolean;
  selectedTime: TimeVo;

  public navigatorOverlayVisible: boolean;
  public dateFooterVisible: boolean;
  public timeFooterVisible: boolean;

  private _visible: boolean;
  public readonly visibleChange: EventEmitter<boolean>;

  private animateMonthChange: boolean;

  public readonly weekDayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  constructor(public dayGridManager: DayGridManager,
              private cd: ChangeDetectorRef) {
    this.onSelect = new EventEmitter<Date>();
    this.visibleChange = new EventEmitter<boolean>();
    this._visible = true;
    this.navigatorOverlayVisible = false;
    this.dayGridManager.displayMonth(new Date());
    this.dayGridManager.onDisplayChange.subscribe(() => this.animateMonthChange = true);

    this.dateFooterVisible = false;
    this.timeFooterVisible = true;
    this._timePicker = true;
  }

  get timePicker(): boolean {
    return this._timePicker;
  }

  @Input()
  set timePicker(displayTimePicker: boolean) {
    this._timePicker = displayTimePicker;
    if (!displayTimePicker && this.timeFooterVisible || displayTimePicker && !this.timeFooterVisible) {
      this.changeFooter();
    }
  }

  get changeState(): string {
    if (this.animateMonthChange) {
      this.animateMonthChange = false;
      setTimeout(() => this.cd.detectChanges());
      return 'monthChange';
    }
    return '*';
  }

  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    this._visible = value;
    if (this._visible) {
      const monthToDisplay = isNullOrUndefined(this._selectedDateTime) ? this.defaultMonthToDisplay : this._selectedDateTime;
      this.dayGridManager.displayMonth(monthToDisplay, this._selectedDateTime);
    }
  }

  @Input()
  set selectedDateTime(newSelectedDateTime: Date) {
    this._selectedDateTime = newSelectedDateTime;
    if (isNullOrUndefined(newSelectedDateTime)) {
      this.clear();
    }
    if (this._visible && !isNullOrUndefined(this._selectedDateTime)) {
      this.dayGridManager.displayMonth(this._selectedDateTime, this._selectedDateTime);
      this.selectedTime = TimeVo.fromDate(this._selectedDateTime);
    }
  }

  public handleTimeChange(selectedTime: TimeVo): void {
    this.selectedTime = selectedTime;
    if (!isNullOrUndefined(this._selectedDateTime)) {
      this._selectedDateTime = new Date(this._selectedDateTime);
      TimeVo.setTimeInto(this._selectedDateTime, this.selectedTime);
      this.onSelect.emit(this._selectedDateTime);
    }
  }

  public toggleNavigationOverlay(): void {
    this.navigatorOverlayVisible = !this.navigatorOverlayVisible;
  }

  public handleDateSelect(selectedGrid: DayGrid): void {
    if (!selectedGrid.isFromDisplayedMonth || this.dayGridManager.isSelectedGrid(selectedGrid)) {
      return;
    }
    this.dayGridManager.selectGrid(selectedGrid);
    this.saveAndEmitSelectedDateTime();
  }

  public handleMouseWheelOnBody(event): void {
    if (event.deltaY > 0) {
      this.dayGridManager.showPrevMonth(this._selectedDateTime);
    } else {
      this.dayGridManager.showNextMonth(this._selectedDateTime);
    }
    event.stopPropagation();
    event.preventDefault();
  }

  public clear(): void {
    if (!isNullOrUndefined(this._selectedDateTime)) {
      this.onSelect.emit(null);
    }
    this._selectedDateTime = null;
    this.dayGridManager.clearSelection();
    this.cd.detectChanges();
  }

  public showSelectedMonth(): void {
    if (this.hasSelected()) {
      this.dayGridManager.displayMonth(this._selectedDateTime, this._selectedDateTime);
    }
  }

  private saveAndEmitSelectedDateTime(): void {
    this._selectedDateTime = this.dayGridManager.getSelectedDateTime();
    if (!isNullOrUndefined(this.selectedTime)) {
      TimeVo.setTimeInto(this._selectedDateTime, this.selectedTime);
    }
    this.onSelect.emit(this._selectedDateTime);
  }

  public hasSelected(): boolean {
    return !isNullOrUndefined(this._selectedDateTime);
  }

  public showPrevMonth(): void {
    this.dayGridManager.showPrevMonth(this._selectedDateTime);
  }

  public showPrevYear(): void {
    this.dayGridManager.showPrevYear(this._selectedDateTime);
  }

  public showNextMonth(): void {
    this.dayGridManager.showNextMonth(this._selectedDateTime);
  }

  public showNextYear(): void {
    this.dayGridManager.showNextYear(this._selectedDateTime);
  }

  public showThisMonth(): void {
    this.dayGridManager.showThisMonth(this._selectedDateTime);
  }

  public changeFooter(): void {
    const regularToggle = fieldName => this[fieldName] = !this[fieldName];
    const timeoutToggle = fieldName => {
      setTimeout(() => {
        this[fieldName] = !this[fieldName];
        this.cd.detectChanges();
      }, 315);
    };

    if (this.dateFooterVisible) {
      regularToggle('dateFooterVisible');
      timeoutToggle('timeFooterVisible');
    } else {
      regularToggle('timeFooterVisible');
      timeoutToggle('dateFooterVisible');
    }
  }

}
