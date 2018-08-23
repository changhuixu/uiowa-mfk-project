import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mfk } from '../models/mfk';
import { MfkFieldOption } from '../models/mfk-field-option';
import { MfkValidationResult } from '../models/mfk-validation-result';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MfkValidationService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Validate MFK format. If MFK format is valid, then return null, else return an error message string.
   *
   * (1) checks the length of MFK and checks MFK fields are all numeric strings.
   *
   * (2) optionally checks MfkFieldOptions. eg, checks readonly field(s) value, checks the field value regex pattern.
   *
   * @param mfk       The mfk object being validated
   * @param options   (Optional) an array of MfkFieldOption(s)
   */
  validateFormat(mfk: Mfk, options: MfkFieldOption[] = []): string {
    const formatError = mfk.validateFormat();
    if (formatError) {
      return formatError;
    }
    if (options && options.length > 0) {
      for (const option of options) {
        if (option.readonly && mfk[option.name] !== option.defaultValue) {
          return `The readonly field [${option.name}] has a value of ${
            mfk[option.name]
          } instead of ${option.defaultValue}.`;
        }
        if (option.valuePattern) {
          const reg = new RegExp(option.valuePattern);
          if (!reg.test(mfk[option.name])) {
            return `The field [${option.name}] has a value of ${
              mfk[option.name]
            } doesn't match "${option.valuePattern}".`;
          }
        }
      }
    }
    return null;
  }

  /**
   * checks against ITS API and returns an MfkValidationResult object Observable.
   *
   * MfkValidationResult class has two members: statusCode: number; statusMessage: string.
   * @param mfk The mfk object being validated
   */
  getValidationResult(mfk: Mfk): Observable<MfkValidationResult> {
    return this.httpClient
      .get(this.getMfkValidationUrl(mfk), { responseType: 'text' })
      .pipe(
        map(response => {
          const parts = response.split(/\n/);
          return new MfkValidationResult(+parts[0], parts[1].trim());
        })
      );
  }

  private getMfkValidationUrl(mfk: Mfk): string {
    return `https://apps.its.uiowa.edu/mfk/api-singleDesc.jsp?mfk=10%20%20%20${mfk.to40String()}`;
  }
}
