import { Component, OnInit, signal, Signal } from '@angular/core';
import { LinkerService } from '../../linker.service';
import { EmployeeEntity } from '../../models/employee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SupervisorRequest } from '../../models/supernotify';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  
  constructor(public linker: LinkerService, private http: HttpClient, private router: Router)
  {
  }

  async LogOut()
  {
    localStorage.clear();

    await this.linker.ngOnInit();
    
    this.router.navigate(['/home'])
  }
}
