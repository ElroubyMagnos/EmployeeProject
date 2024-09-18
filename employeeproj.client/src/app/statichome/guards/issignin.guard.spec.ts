import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { issigninGuard } from './issignin.guard';

describe('issigninGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => issigninGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
