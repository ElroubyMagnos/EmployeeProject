import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { signinGuard } from './signin.guard';

describe('signinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => signinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
