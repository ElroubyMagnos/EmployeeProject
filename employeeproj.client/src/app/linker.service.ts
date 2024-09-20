import { HttpClient } from '@angular/common/http';
import { computed, Injectable, OnInit, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Details } from './models/details';
import { ProgramEntity } from './models/program';
import { EvaluationRequest } from './models/evaluation';
import { EmployeeEntity } from './models/employee';
import { SupervisorRequest } from './models/supernotify';
import { ManagerRequest } from './models/managerrequest';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LinkerService implements OnInit {

  CurrentDecisionDetails: number = 0;

  SupervisorNotifications: SupervisorRequest[] = [];
  ManagerNotifications: ManagerRequest[] = [];

  Employee = signal<EmployeeEntity | null>(null);

  EvaluationID = signal(0);

  LinkerPastEvaluations = signal<EvaluationRequest[] | null>(null);

  LinkerPastDetails = signal<Details | null>(null);
  LinkerPastPrograms = signal<ProgramEntity[] | null>(null);

  Counter: number = 0;

  async ngOnInit()
  {
    this.Employee.set(await firstValueFrom(this.http
      .get<EmployeeEntity>(`/Employees/ReturnEmployee/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`)));
    
    await this.CheckAccountEmployee();

    await this.CheckEmployee();
  }

  public CheckAccountEmployeeValue = false;

  public CheckEmployeeValue = false;

  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) { }

  async CheckEmployee()
  {
    if (localStorage.getItem('Username') 
      && localStorage.getItem('Password')
      && localStorage.getItem('Type'))
      {
        var WaitFor = await firstValueFrom(this.http.post<number>(`/Employees/SignIn/`, 
        {
          Username: localStorage.getItem('Username'),
          Password: localStorage.getItem('Password')
        }));
        this.CheckEmployeeValue = WaitFor == 0;
      }
      else this.CheckEmployeeValue = false;
  }

  async CheckAccountEmployee()
  {
    if (localStorage.getItem('Username') 
      && localStorage.getItem('Password')
      && localStorage.getItem('Type'))
      {
        var WaitFor = await firstValueFrom(this.http.post<number>(`/Employees/SignIn/`, 
        {
          Username: localStorage.getItem('Username'),
          Password: localStorage.getItem('Password')
        }));

        if (WaitFor.toString() == localStorage.getItem('Type'))
        {
          this.CheckAccountEmployeeValue = true;
        }
        else
        { 
          localStorage.clear();
          this.CheckAccountEmployeeValue = false;
        }
      }
      else
      {
        localStorage.clear();
        
        this.CheckAccountEmployeeValue= false;
      }
  }

  async GotoNotifySupervisor(notify: SupervisorRequest, btn: HTMLButtonElement)
  {
    this.router.navigate(['inside', 'evaluation', notify.detailID]);

    this.LoadNotifications();

    btn.click();
  }

  async GotoNotifyManager(notify: ManagerRequest, btn: HTMLButtonElement)
  {
    this.CurrentDecisionDetails = notify.detailsID;

    this.router.navigate(['inside', 'summary', notify.detailsID]);

    this.LoadNotifications();

    btn.click();
  }

  LoadNotifications()
  {
    this.Counter = 0;
    this.http.get<SupervisorRequest[]>(`/Base/GetSupervisorNotify/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`)
    .subscribe(
      {
        next: (x) => 
        {
          if (!x)
            return;
          this.Counter += x.length;
          this.SupervisorNotifications = x;

          if (this.SupervisorNotifications.length > 0)
          {
            new Audio('/notify.mp3').play();
          }
        },
        error: (err: Error) =>
        {
          alert(err.message);
        }
      }
    );

    this.http.get<ManagerRequest[]>(`/Base/GetManagerNotify/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}/`)
    .subscribe(
      {
        next: (x) => 
        {
          if (!x)
            return;
          this.Counter += x.length;
          this.ManagerNotifications = x;
          if (this.ManagerNotifications.length > 0)
          {
            new Audio('/notify.mp3').play();
          }
        },
        error: (err: Error) =>
        {
          alert(err.message);
        }
    }
    );
  }
}
