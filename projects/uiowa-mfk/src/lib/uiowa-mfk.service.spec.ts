import { TestBed, inject } from '@angular/core/testing';

import { UiowaMfkService } from './uiowa-mfk.service';

describe('UiowaMfkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiowaMfkService]
    });
  });

  it('should be created', inject([UiowaMfkService], (service: UiowaMfkService) => {
    expect(service).toBeTruthy();
  }));
});
