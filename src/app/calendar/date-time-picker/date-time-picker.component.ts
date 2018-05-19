import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {DayGridManager} from './day-grid-manager';
import {DayGrid} from './day-grid';
import {animate, animateChild, query, state, style, transition, trigger} from '@angular/animations';

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
  ]
})
export class DateTimePickerComponent {

  @Input() private _selectedDateTime: Date;
  @Output() onSelect: EventEmitter<Date>;
  @Input() defaultMonthToDisplay: Date;
  public navigatorOverlayVisible: boolean;

  private _visible: boolean;
  public readonly visibleChange: EventEmitter<boolean>;

  public readonly weekDayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  constructor(public dayGridManager: DayGridManager, private cd: ChangeDetectorRef) {
    this.onSelect = new EventEmitter<Date>();
    this.visibleChange = new EventEmitter<boolean>();
    this._visible = true;
    this.navigatorOverlayVisible = false;
    this.dayGridManager.displayMonth(new Date());
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
    if (this._visible && !isNullOrUndefined(this._selectedDateTime)) {
      this.dayGridManager.displayMonth(this._selectedDateTime, this._selectedDateTime);
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

  private saveAndEmitSelectedDateTime(): void {
    this._selectedDateTime = this.dayGridManager.getSelectedDateTime();
    this.onSelect.emit(this._selectedDateTime);
  }

}
