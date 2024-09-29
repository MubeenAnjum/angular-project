import { TestBed } from '@angular/core/testing';

import { FooterLinksService } from './footer-links.service';

describe('FooterLinksService', () => {
  let service: FooterLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
