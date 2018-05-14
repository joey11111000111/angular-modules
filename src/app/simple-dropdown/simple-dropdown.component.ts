import {AfterViewInit, Component, ContentChild, forwardRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-simple-dropdown',
  styleUrls: ['./simple-dropdown.component.scss'],
  templateUrl: './simple-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SimpleDropdownComponent),
    }
  ],
  animations: [
    trigger('appear', [
      state('void', style({
        // transform: 'rotateX(90deg)',
        'background-color': 'blue',
        height: 0
      })),
      transition('void <=> *', animate('1000ms ease-in')),
    ])
  ]
})
export class SimpleDropdownComponent implements AfterViewInit, ControlValueAccessor {

  @Input() public options: SelectItem[];
  public disabled: boolean;
  public labelText: string;
  public panelVisible: boolean;

  public selectedOption: SelectItem;
  private onChangeFunction: any;
  private onTouchedFunction: any;

  public labelTemplate: TemplateRef<any>;
  @ContentChild(TemplateRef) public receivedLabelTemplate: TemplateRef<any>;
  @ViewChild('defaultLabelTemplate') public defaultLabelTemplate: TemplateRef<any>;

  constructor() {
    this.options = [];
    this.panelVisible = false;
    this.selectedOption = {label: 'van label', value: {id: 2, name: 'two'}};
  }

  ngAfterViewInit(): void {
    this.labelTemplate = isNullOrUndefined(this.receivedLabelTemplate)
      ? this.defaultLabelTemplate
      : this.receivedLabelTemplate;
  }

  handleFocus($event): void {
    console.log('focus');
  }

  hidePanel(): void {
    console.log('hide panel');
    if (this.panelVisible) {
      this.togglePanel();
    }
  }

  togglePanel(): void {
    this.panelVisible = !this.panelVisible;
  }

  public writeValue(obj: any): void {
    return;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleOptionClicked(event: MouseEvent, optionIndex: number): void {
    return;
  }

}

interface SelectItem {

  label: string;
  value: any;

}
