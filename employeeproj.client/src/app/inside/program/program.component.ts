import { Component } from '@angular/core';
import { ProgramEntity } from '../../models/program';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Details } from '../../models/details';
import { Router } from '@angular/router';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrl: './program.component.css'
})
export class ProgramComponent {
  
  EnableEvaluation = false;

  SelectedEntity: ProgramEntity = {
    id: 0,
    description: '',
    startDate: '',
    endDate: '',
    percentage: 0,
    state: '',
    step: '',
    detailsParent: 0
  };

  EditProgram(prog: ProgramEntity)
  {
    this.SelectedEntity = prog;
    this.Programs.splice(this.Programs.indexOf(prog), 1);
  }

  constructor(private toast: ToastrService, private router: Router, private http: HttpClient, private linker: LinkerService)
  {
    var Content = this.linker.LinkerPastPrograms()!;
    if (Content)
    {
      this.Programs = Content;
      this.EnableEvaluation = true;
      this.linker.EvaluationID.set(this.linker.LinkerPastDetails()!.id)
      return;
    }

    this.http.get<Details>(`/Base/GetTempDetails/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`)
    .subscribe(
      {
        next: (x) =>
        {
          if (x)
          {
            this.toast.success('Temp Details Is Ready');
          }
          else 
          {
            this.toast.error('Temp Details is not exist, Please fill all details field');
            this.router.navigate(['/inside/details']);
          }
        },
        error: (Err: Error) =>
        {
          console.log(Err);
        }
      }
    );
  }

  Programs: ProgramEntity[] = [];

  AddProgram(f: NgForm)
  {
    if (f.value.Description.length < 10)
    {
      this.toast.warning("This value of description is less than 10 characters");
      return;
    }
    if (!f.valid)
    {
      this.toast.error("Please fill all fields");
      return;
    }

    if (f.value.StartDate > f.value.EndDate)
    {
      this.toast.error("Start Date can't be more than end date");
      return;
    }

    this.Programs.push(
      {
        id: 0,
        step: f.value.Step,
        description: f.value.Description,
        percentage: f.value.Percentage,
        startDate: f.value.StartDate,
        endDate: f.value.EndDate,
        state: f.value.Status,
        detailsParent: 0
      }
    );

    f.reset();
  }

  Submit()
  {
    if (this.EnableEvaluation)
    {
      return;
    }
    if (this.Programs.length === 0)
    {
      this.toast.error("You didn't add a programs");
      return;
    }

    this.http.post<boolean>(`/Base/AddDetailsWithPrograms/`, 
      {
        username: localStorage.getItem('Username'),
        password: localStorage.getItem('Password'),
        programs: this.Programs
      }
    )
    .subscribe(
      {
        next: (x) =>
        {
          if (x)
          {
            this.toast.success('Added Successfully');

            this.router.navigate(['/home']);
          }
          else
          {
            this.toast.error("You didn't do the right steps");
          }
        }
      }
    );
  }

  
  PercentOnly(percentage: HTMLInputElement)
  {
    if (percentage.valueAsNumber > 100)
    {
      percentage.valueAsNumber = 100;
    }
    else if (percentage.valueAsNumber < 0)
    {
      percentage.valueAsNumber = 0;
    }
  }
}