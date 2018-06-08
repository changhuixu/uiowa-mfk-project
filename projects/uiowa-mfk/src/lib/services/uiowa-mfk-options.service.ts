import { Injectable } from '@angular/core';
import { MfkFieldOption } from '../models/mfk-field-option';
import { MfkFieldName } from '../models/mfk-field-name';

@Injectable({
  providedIn: 'root'
})
export class UiowaMfkOptionsService {
  readonly defaultOptions = [
    new MfkFieldOption(MfkFieldName.FUND),
    new MfkFieldOption(MfkFieldName.ORG),
    new MfkFieldOption(MfkFieldName.DEPT),
    new MfkFieldOption(MfkFieldName.SUBDEPT),
    new MfkFieldOption(MfkFieldName.GRANTPGM),
    new MfkFieldOption(MfkFieldName.IACT),
    new MfkFieldOption(MfkFieldName.OACT),
    new MfkFieldOption(MfkFieldName.DACT),
    new MfkFieldOption(MfkFieldName.FN),
    new MfkFieldOption(MfkFieldName.CCTR)
  ];

  getOptions(options: MfkFieldOption[] = []): MfkFieldOption[] {
    const result: MfkFieldOption[] = [...this.defaultOptions];
    if (options && options.length > 0) {
      for (const option of options) {
        const fieldOption = result.find(o => o.name === option.name);
        if (fieldOption) {
          const index = result.indexOf(fieldOption);
          result[index] = option;
        } else {
          result.push(option);
        }
      }
    }
    return result;
  }
}
