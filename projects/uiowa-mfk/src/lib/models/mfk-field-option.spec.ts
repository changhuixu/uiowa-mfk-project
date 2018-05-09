import { MfkFieldOption } from './mfk-field-option';
import { MfkFieldName } from './mfk-field-name';

describe('MfkFieldOption', () => {
  it('should be a valid MFK field option', () => {
    const option = new MfkFieldOption(MfkFieldName.IACT, '6128');
    expect(option.length).toBe(4);
    expect(option.width).toBe(48);
    expect(option.label).toBe('Iact');
    expect(option.readonly).toBeFalsy();
  });

  it('should not accept invalid MFK field default value', () => {
    expect(() => new MfkFieldOption(MfkFieldName.IACT, '61281')).toThrowError(
      'The default value [61281] for IACT is not 4 digits long.'
    );

    expect(() => new MfkFieldOption(MfkFieldName.IACT, '612x')).toThrowError(
      'The default value [612x] for IACT is not a number.'
    );
  });

  it('should not accept invalid MFK field value pattern', () => {
    expect(
      () => new MfkFieldOption(MfkFieldName.IACT, '6138', false, '^612[0-9]$')
    ).toThrowError(
      `The default value [6138] for IACT doesn't match RegEx "^612[0-9]$".`
    );
    const option = new MfkFieldOption(
      MfkFieldName.IACT,
      '6128',
      false,
      '^612[0-9]$'
    );
    expect(option.length).toBe(4);
    expect(option.width).toBe(48);
    expect(option.label).toBe('Iact');
    expect(option.defaultValue).toBe('6128');
    expect(option.readonly).toBeFalsy();
  });

  it('should not allow empty readonly MFK field', () => {
    expect(() => new MfkFieldOption(MfkFieldName.IACT, '', true)).toThrowError(
      `Default value for readonly field [IACT] is required.`
    );
    const option = new MfkFieldOption(MfkFieldName.IACT, '6218', true);
    expect(option.length).toBe(4);
    expect(option.width).toBe(48);
    expect(option.label).toBe('Iact');
    expect(option.defaultValue).toBe('6218');
    expect(option.readonly).toBeTruthy();
  });
});
