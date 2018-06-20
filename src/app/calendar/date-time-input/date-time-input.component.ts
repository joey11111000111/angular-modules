import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {InputCorrector} from './services/input-corrector';
import {SyntaxValidator} from './services/syntax-validator';
import {SemanticsValidator} from './services/semantics-validator';
import {DebugLog} from '../../util/debug-log';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss']
})
export class DateTimeInputComponent implements OnInit {

  public static readonly separators = ['/', ' ', ':', '.', '\\'];
  public static readonly digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  public inputString: string;

  private validationErrors: ValidationErrors;
  @Input() selectedDateTime: Date;
  @Input() pattern: string;
  @Output() onDateChange: EventEmitter<Date>;

  @ViewChild('dateTimeInput') dateTimeInput: ElementRef;

  private inputCorrector: InputCorrector;
  private syntaxValidator: SyntaxValidator;
  private semanticsValidator: SemanticsValidator;

  public static isSeparatorChar(char: string): boolean {
    return DateTimeInputComponent.separators.includes(char);
  }

  public static isDigitChar(char: string): boolean {
    return DateTimeInputComponent.digits.includes(char);
  }

  constructor() {
    this.onDateChange = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.inputCorrector = new InputCorrector(this.pattern);
    this.syntaxValidator = new SyntaxValidator(this.pattern);
    this.semanticsValidator = new SemanticsValidator(this.pattern);
  }

  public getValidationErrors(): ValidationErrors {
    return this.validationErrors;
  }

  public handleInputChange(newInputString: string): void {
    const prevValidState = this.isValid();
    this.correctInput(newInputString);
    this.validate();
    const currentValidState = this.isValid();
    if (currentValidState || (!currentValidState && prevValidState)) {
      this.createAndEmitDateTime();
    }

    console.log('valid: ' + currentValidState);
  }

  private correctInput(newInputString: string): void {
    const correctedInput = this.inputCorrector.getCorrectedInput(newInputString);
    const cursorPosition = this.dateTimeInput.nativeElement.selectionStart;
    if (newInputString !== correctedInput) {
      this.inputString = correctedInput;
      this.dateTimeInput.nativeElement.value = correctedInput;
      this.dateTimeInput.nativeElement.selectionStart = cursorPosition + 1;
      this.dateTimeInput.nativeElement.selectionEnd = cursorPosition + 1;
    }
  }

  private validate(): void {
    if (!this.syntaxValidator.isValid(this.inputString)) {
      this.validationErrors = {invalidFormat: {invalid: true}};
      return;
    }

    if (!this.semanticsValidator.isValid(this.inputString)) {
      this.validationErrors = {invalidDate: {invalid: true}};
      return;
    }

    this.validationErrors = null;
  }

  public isValid(): boolean {
    return this.validationErrors === null;
  }

  private createAndEmitDateTime(): void {
    console.log('--- called emit with input string: ' + this.inputString + '---');
  }
}
