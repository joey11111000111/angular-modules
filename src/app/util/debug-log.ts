export class DebugLog {

  public static labeledObjectLog(label: string, object: any): void {
    console.log('--- ' + label + ' ---');
    console.log(object);
    console.log('--- /' + label + '----------');
  }

  public static inlineLog(label: string, object: any): void {
    console.log(label + ': ' + object);
  }

}
