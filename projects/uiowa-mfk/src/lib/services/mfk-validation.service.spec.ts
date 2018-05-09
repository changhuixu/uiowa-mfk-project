import { MfkValidationService } from './mfk-validation.service';
import { Mfk } from '../models/mfk';
import { asyncData } from '../../test';
import { MfkValidationResult } from '../models/mfk-validation-result';
import { MfkFieldOption } from '../models/mfk-field-option';
import { MfkFieldName } from '../models/mfk-field-name';

let httpClientSpy: { get: jasmine.Spy };
let mfkValidationService: MfkValidationService;

beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  mfkValidationService = new MfkValidationService(<any>httpClientSpy);
});

it('should produce correct ITS MFK Validation URL', () => {
  const result = (<any>mfkValidationService).getMfkValidationUrl(
    new Mfk('010-11-1010-00000-00000000-6218-000-00000-00-1111')
  );
  expect(result).toBe(
    'https://apps.its.uiowa.edu/mfk/api-singleDesc.jsp?mfk=10%20%20%200101110100000000000000621800000000001111'
  );
});

it('should return expected MFK Validation Result (HttpClient called once)', () => {
  const apiResponse = `1
  Valid MFK`;
  const expectedResult = new MfkValidationResult(1, 'Valid MFK');

  httpClientSpy.get.and.returnValue(asyncData(apiResponse));

  mfkValidationService
    .getValidationResult(new Mfk('2604350644010000000000602652020100000000'))
    .subscribe(x => expect(x).toEqual(expectedResult), fail);
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});

it('#validateFormat should return null for valid MFK', () => {
  let result = mfkValidationService.validateFormat(
    new Mfk('2604350644010000000000602652020100000000')
  );
  expect(result).toBeNull();

  result = mfkValidationService.validateFormat(
    new Mfk('2604350644010000000000602652020100000000'),
    [new MfkFieldOption(MfkFieldName.FUND, '260')]
  );
  expect(result).toBeNull();

  result = mfkValidationService.validateFormat(
    new Mfk('2604350644010000000000602652020100000000'),
    [new MfkFieldOption(MfkFieldName.FUND, '200')]
  );
  expect(result).toBeNull();
});

it('#validateFormat should return error message for invalid MFK', () => {
  let result = mfkValidationService.validateFormat(
    new Mfk('2604350644010000000000602652020100000000'),
    [new MfkFieldOption(MfkFieldName.IACT, '6126', false, '^612[0-9]$')]
  );
  expect(result).toBe(
    `The field [IACT] has a value of 6026 doesn't match "^612[0-9]$".`
  );

  result = mfkValidationService.validateFormat(
    new Mfk('2604350644010000000000602652020100000000'),
    [new MfkFieldOption(MfkFieldName.FUND, '200', true)]
  );
  expect(result).toBe(
    'The readonly field [FUND] has a value of 260 instead of 200.'
  );
});
