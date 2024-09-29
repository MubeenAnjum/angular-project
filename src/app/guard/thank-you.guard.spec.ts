import { TestBed } from '@angular/core/testing';

import { ThankYouGuard } from './thank-you.guard';

describe('ThankYouGuard', () => {
  let guard: ThankYouGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ThankYouGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
