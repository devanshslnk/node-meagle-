import { TestBed } from '@angular/core/testing';

import { AuthrefreshService } from './authrefresh.service';

describe('AuthrefreshService', () => {
  let service: AuthrefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthrefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
