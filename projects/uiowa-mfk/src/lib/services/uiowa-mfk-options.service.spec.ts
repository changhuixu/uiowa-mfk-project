import { TestBed, inject } from '@angular/core/testing';
import { UiowaMfkOptionsService } from './uiowa-mfk-options.service';
import { MfkFieldOption, MfkFieldName } from '../../public_api';

describe('UiowaMfkOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiowaMfkOptionsService]
    });
  });

  it(
    'should be created',
    inject([UiowaMfkOptionsService], (service: UiowaMfkOptionsService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should return default options when nothing pass in',
    inject([UiowaMfkOptionsService], (service: UiowaMfkOptionsService) => {
      expect(service.getOptions()).toEqual(service.defaultOptions);
    })
  );

  it(
    'should merge option',
    inject([UiowaMfkOptionsService], (service: UiowaMfkOptionsService) => {
      const option = [new MfkFieldOption(MfkFieldName.FUND, '123')];
      const newOptions = service.getOptions(option);
      expect(newOptions[0]).toEqual(option[0]);
      expect(newOptions[1]).toEqual(service.defaultOptions[1]);
      expect(newOptions[2]).toEqual(service.defaultOptions[2]);
      expect(newOptions.length).toBe(10);
    })
  );
  it(
    'should merge two options',
    inject([UiowaMfkOptionsService], (service: UiowaMfkOptionsService) => {
      const option = [
        new MfkFieldOption(MfkFieldName.FUND, '123'),
        new MfkFieldOption(MfkFieldName.IACT, '6128')
      ];
      const newOptions = service.getOptions(option);
      expect(newOptions[0]).toEqual(option[0]);
      expect(newOptions[1]).toEqual(service.defaultOptions[1]);
      expect(newOptions[2]).toEqual(service.defaultOptions[2]);
      expect(newOptions[4]).toEqual(service.defaultOptions[4]);
      expect(newOptions[5]).toEqual(option[1]);
      expect(newOptions[6]).toEqual(service.defaultOptions[6]);
      expect(newOptions.length).toBe(10);
    })
  );
  it(
    'should add option',
    inject([UiowaMfkOptionsService], (service: UiowaMfkOptionsService) => {
      const option = [new MfkFieldOption(MfkFieldName.BRF, '11')];
      const newOptions = service.getOptions(option);
      expect(newOptions[0]).toEqual(service.defaultOptions[0]);
      expect(newOptions[1]).toEqual(service.defaultOptions[1]);
      expect(newOptions[2]).toEqual(service.defaultOptions[2]);
      expect(newOptions[9]).toEqual(service.defaultOptions[9]);
      expect(newOptions[10]).toEqual(option[0]);
      expect(newOptions.length).toBe(11);
    })
  );
});
