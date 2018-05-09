import { IMfk } from './mfk.interface';
import { MfkFieldName } from './mfk-field-name';

/**
 * Options for MFK field.
 *
 * allows to set field default value, set readonly attribute, set validation regex pattern.  Example usage:
 *
 * ```typescript
 * new MfkFieldOption(MfkFieldName.IACT, '6218')
 * new MfkFieldOption(MfkFieldName.IACT, '6218', true)
 * new MfkFieldOption(MfkFieldName.BRF)
 * ```
 */
export class MfkFieldOption {
  public label: string;
  public width: number;
  public length: number;
  private numericRegex = '^[0-9]+$';
  /**
   * Options for MFK field.
   *
   * allows to set field default value, set readonly attribute, set validation regex pattern.  Example usage:
   *
   * ```typescript
   * new MfkFieldOption(MfkFieldName.IACT, '6218')
   * new MfkFieldOption(MfkFieldName.IACT, '6218', true)
   * new MfkFieldOption(MfkFieldName.BRF)
   * ```
   *
   * @param name         (Required) the input field name. Use MfkFieldName type to get a proper value.
   * @param defaultValue (Optional) set a default value for this field. Default: ''.
   * @param readonly     (Optional) set to true if the input field is readonly. Default: false.
   * @param valuePattern (Optional) set a regex for this field. Default: '^[0-9]+$'.
   */
  constructor(
    public name: keyof IMfk,
    public defaultValue: string = '',
    public readonly: boolean = false,
    public valuePattern: string = '^[0-9]+$'
  ) {
    this.getFieldLabelAndLength();

    this.width = this.length * 9 + 12;
    if (!valuePattern) valuePattern = this.numericRegex;
    if (defaultValue) {
      if (defaultValue.length !== this.length)
        throw new Error(
          `The default value [${defaultValue}] for ${this.name} is not ${
            this.length
          } digits long.`
        );
      let reg = new RegExp(this.numericRegex);
      if (!reg.test(defaultValue))
        throw new Error(
          `The default value [${defaultValue}] for ${this.name} is not a number`
        );
      if (valuePattern !== this.numericRegex) {
        let reg = new RegExp(valuePattern);
        if (!reg.test(defaultValue))
          throw new Error(
            `The default value [${defaultValue}] for ${
              this.name
            } doesn't match RegEx "${valuePattern}"`
          );
      }
    }
  }

  private getFieldLabelAndLength() {
    switch (this.name) {
      case MfkFieldName.FUND:
        this.label = 'Fund';
        this.length = 3;
        break;
      case MfkFieldName.ORG:
        this.label = 'Org';
        this.length = 2;
        break;
      case MfkFieldName.DEPT:
        this.label = 'Dept';
        this.length = 4;
        break;
      case MfkFieldName.SUBDEPT:
        this.label = 'Subdept';
        this.length = 5;
        break;
      case MfkFieldName.GRANTPGM:
        this.label = `Grant/Pgm`;
        this.length = 8;
        break;
      case MfkFieldName.IACT:
        this.label = 'Iact';
        this.length = 4;
        break;
      case MfkFieldName.OACT:
        this.label = 'Oact';
        this.length = 3;
        break;
      case MfkFieldName.DACT:
        this.label = 'Dact';
        this.length = 5;
        break;
      case MfkFieldName.FN:
        this.label = 'Fn';
        this.length = 2;
        break;
      case MfkFieldName.CCTR:
        this.label = 'Cctr';
        this.length = 4;
        break;
      case MfkFieldName.BRF:
        this.label = 'Brf';
        this.length = 2;
        break;
      default:
        this.label = '';
        this.length = 0;
    }
  }
}
