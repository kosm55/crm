export class TransformHelper {
  public static trim({ value }: { value: string }): string {
    return value ? value.trim() : value;
  }
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toLowerCase() : value;
  }
  public static toBoolean({ value }: { value: string }): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  }
}
