import {DateTimeInputComponent} from '../date-time-input.component';

export class InputCorrector {

  private prevInput = '';

  constructor(private readonly pattern: string) {
    this.pattern = pattern;
  }

  public getCorrectedInput(newInput: string): string {
    this.prevInput = newInput.length < this.prevInput.length
      ? newInput
      : this.correctInputString(newInput);
    return this.prevInput;
  }

  private correctInputString(inputString: string): string {
    const correctedCharacters: string[] = [];
    let maskIndex = 0;
    for (let i = 0; i < inputString.length; i++) {
      const inputChar = inputString.charAt(i);
      const maskChar = this.pattern.charAt(maskIndex);

      if (DateTimeInputComponent.isSeparatorChar(inputChar) && !DateTimeInputComponent.isSeparatorChar(maskChar)) {
        maskIndex = this.findNextSeparator(this.pattern, maskIndex) + 1;
        correctedCharacters.push(inputChar);
        continue;
      }

      if (DateTimeInputComponent.isSeparatorChar(maskChar) && !DateTimeInputComponent.isSeparatorChar(inputChar)) {
        correctedCharacters.push(maskChar);
        maskIndex++;
      }

      correctedCharacters.push(inputChar);
      maskIndex++;
    }

    const currentInput = correctedCharacters.join('');
    if (this.lastPartChanged(currentInput)) {
      const nextMaskChar = this.pattern.charAt(inputString.length);
      if (DateTimeInputComponent.isSeparatorChar(nextMaskChar)) {
        correctedCharacters.push(nextMaskChar);
      }
    }

    return correctedCharacters.join('');
  }

  private findNextSeparator(str: string, fromIndex: number): number {
    for (let i = fromIndex + 1; i < str.length; i++) {
      const char = str.charAt(i);
      if (DateTimeInputComponent.isSeparatorChar(char)) {
        return i;
      }
    }
  }

  private lastPartChanged(currentInput: string): boolean {
    const minLength = currentInput.length >= this.prevInput.length ? this.prevInput.length : currentInput.length;
    for (let i = 1; i <= minLength; i++) {
      const prevInputChar = this.prevInput.charAt(this.prevInput.length - i);
      const currentInputChar = currentInput.charAt(currentInput.length - i);
      if (DateTimeInputComponent.isSeparatorChar(prevInputChar) && DateTimeInputComponent.isSeparatorChar(currentInputChar)) {
        return false;
      }
      if (prevInputChar !== currentInputChar) {
        return true;
      }
    }

    return false;
  }

}
