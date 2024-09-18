import { HttpClient } from '@angular/common/http';
import { computed, Injectable, OnInit, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Details } from './models/details';
import { ProgramEntity } from './models/program';
import { EvaluationRequest } from './models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class LinkerService implements OnInit {

  EvaluationID = signal(0);

  LinkerPastEvaluations = signal<EvaluationRequest[] | null>(null);

  LinkerPastDetails = signal<Details | null>(null);
  LinkerPastPrograms = signal<ProgramEntity[] | null>(null);

  async ngOnInit()
  {
    await this.CheckAccountEmployee();

    await this.CheckEmployee();
  }

  public CheckAccountEmployeeValue = signal(false);

  public CheckEmployeeValue = signal(false);

  constructor(private http: HttpClient) { }

  public async CheckEmployee()
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
        this.CheckEmployeeValue.set(WaitFor == 0);
      }
      else this.CheckEmployeeValue.set(false);
  }

  public async CheckAccountEmployee()
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
          this.CheckAccountEmployeeValue.set(true);
        }
        else
        { 
          localStorage.clear();
          this.CheckAccountEmployeeValue.set(false);
        }
      }
      else
      {
        localStorage.clear();
        
        this.CheckAccountEmployeeValue.set(false);
      }
  }
}
