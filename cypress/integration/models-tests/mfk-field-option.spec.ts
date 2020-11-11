import {
  Mfk,
  MfkFieldName,
  MfkFieldOption,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';

describe('Unit Test MfkFieldOption class', () => {
  before(() => {
    expect(MfkFieldName, 'MfkFieldName').to.be.a('function');
    expect(MfkFieldOption, 'MfkFieldOption').to.be.a('function');
  });

  it('should be a valid MFK field option', () => {
    const option = new MfkFieldOption(MfkFieldName.IACT, '6128');
    expect(option.length).to.be.equal(4);
    expect(option.width).to.be.equal(3.35);
    expect(option.label).to.be.equal('Iact');
    expect(option.readonly).to.be.false;
  });

  it('should not accept invalid MFK field default value', () => {
    expect(() => new MfkFieldOption(MfkFieldName.IACT, '61281')).to.throw(
      'The default value [61281] for IACT is not 4 digits long.'
    );

    expect(() => new MfkFieldOption(MfkFieldName.IACT, '612x')).to.throw(
      'The default value [612x] for IACT is not a number.'
    );
  });

  it('should not accept invalid MFK field value pattern', () => {
    expect(
      () => new MfkFieldOption(MfkFieldName.IACT, '6138', false, '^612[0-9]$')
    ).to.throw(
      `The default value [6138] for IACT doesn't match RegEx "^612[0-9]$".`
    );
    const option = new MfkFieldOption(
      MfkFieldName.IACT,
      '6128',
      false,
      '^612[0-9]$'
    );
    expect(option.length).to.be.equal(4);
    expect(option.width).to.be.equal(3.35);
    expect(option.label).to.be.equal('Iact');
    expect(option.defaultValue).to.be.equal('6128');
    expect(option.readonly).to.be.false;
  });

  it('should not allow empty readonly MFK field', () => {
    expect(() => new MfkFieldOption(MfkFieldName.IACT, '', true)).to.throw(
      `Default value for readonly field [IACT] is required.`
    );
    const option = new MfkFieldOption(MfkFieldName.IACT, '6218', true);
    expect(option.length).to.be.equal(4);
    expect(option.width).to.be.equal(3.35);
    expect(option.label).to.be.equal('Iact');
    expect(option.defaultValue).to.be.equal('6218');
    expect(option.readonly).to.be.true;
  });

  it('should allow any non-empty readonly MFK field', () => {
    const option = new MfkFieldOption(MfkFieldName.IACT, 'xxxx', true);
    expect(option.length).to.be.equal(4);
    expect(option.width).to.be.equal(3.35);
    expect(option.label).to.be.equal('Iact');
    expect(option.defaultValue).to.be.equal('xxxx');
    expect(option.readonly).to.be.true;
  });
});
