import { TestBed } from '@angular/core/testing';

import { VisibilityScrollService } from './visibility-scroll.service';

describe('VisibilityScrollService', () => {
  let service: VisibilityScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibilityScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
