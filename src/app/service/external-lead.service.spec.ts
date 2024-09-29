import { TestBed } from '@angular/core/testing';

import { ExternalLeadService } from './external-lead.service';

describe('ExternalLeadService', () => {
  let service: ExternalLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
