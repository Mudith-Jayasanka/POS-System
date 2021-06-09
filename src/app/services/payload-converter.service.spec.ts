import { TestBed } from '@angular/core/testing';

import { PayloadConverterService } from './payload-converter.service';

describe('PayloadConverterService', () => {
  let service: PayloadConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayloadConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
