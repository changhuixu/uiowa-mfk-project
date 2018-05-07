export class MfkValidationResult {
  /**
   * MFK validation result.
   * @param statusCode    1: valid; 0: invalid
   * @param statusMessage 'Valid MFK': valid; other string: invalid.
   */
  constructor(
    public readonly statusCode: number,
    public readonly statusMessage: string
  ) {}

  isValid(): boolean {
    return this.statusCode === 1;
  }
}
