import { Component, signal, Signal } from '@angular/core';
import { LinkerService } from '../../linker.service';
import { EmployeeEntity } from '../../models/employee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SupervisorRequest } from '../../models/supernotify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  Employee!: EmployeeEntity;
  
  constructor(public linker: LinkerService, private http: HttpClient, private router: Router)
  {
    this.http
    .get<EmployeeEntity>(`/Employees/ReturnEmployee/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`)
    .subscribe(x => this.Employee = x); 
  }

  async LogOut()
  {
    localStorage.clear();

    await this.linker.ngOnInit();
    
    this.router.navigate(['/home'])
  }
}
