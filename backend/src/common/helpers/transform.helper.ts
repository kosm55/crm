export class TransformHelper {
  public static trim({ value }: { value: any }): string | undefined {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value !== undefined && value !== null ? String(value) : undefined;
  }
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toLowerCase() : value;
  }
  public static toBoolean({ value }: { value: string }): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  }
  public static toString({ value }: { value: any }): string | undefined {
    return value !== undefined && value !== null ? String(value) : undefined;
  }
}
