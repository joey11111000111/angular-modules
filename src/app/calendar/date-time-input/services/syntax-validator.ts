import {isNullOrUndefined} from 'util';
import {DateTimeInputComponent} from '../date-time-input.component';

export class SyntaxValidator {


  constructor(private readonly pattern: string) {
  }

  public isValid(inputString: string): boolean {
    if (isNullOrUndefined(this.pattern)) {
      return true;
    }

    if (isNullOrUndefined(inputString)) {
      return false;
    }

    if (inputString.length !== this.pattern.length) {
      return false;
    }

    return this.isValidByPattern(inputString);
  }

  private isValidByPattern(inputString: string): boolean {
    for (let i = 0; i < this.pattern.length; i++) {
      const inputChar = inputString.charAt(i);
      const patternChar = this.pattern.charAt(i);

      if (!this.doesInputCharMatchPatternChar(inputChar, patternChar)) {
        return false;
      }
    }

    return true;
  }

  private doesInputCharMatchPatternChar(inputChar: string, patternChar: string): boolean {
    if (DateTimeInputComponent.isSeparatorChar(patternChar)) {
      return inputChar === patternChar;
    }
    return DateTimeInputComponent.isDigitChar(inputChar);
  }

}
