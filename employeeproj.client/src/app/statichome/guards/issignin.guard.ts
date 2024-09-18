import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LinkerService } from '../../linker.service';

export const issigninGuard: CanActivateFn = async (route, state) => {
  var linker = inject(LinkerService);
  var router = inject(Router);
  
  await linker.ngOnInit();
  
  var Check = linker.CheckAccountEmployeeValue();
  
  if (Check)
  {
    return true;
  }
    
  router.navigate(['/home'])
  return false;
};
