import { TestBed } from '@angular/core/testing';

import { SharedAddOrederpageService } from './shared-add-orederpage.service';

describe('SharedAddOrederpageService', () => {
  let service: SharedAddOrederpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAddOrederpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
