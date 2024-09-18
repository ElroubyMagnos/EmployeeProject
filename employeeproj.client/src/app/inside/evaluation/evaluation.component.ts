import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from '../../models/details';
import { ProgramEntity } from '../../models/program';
import { firstValueFrom } from 'rxjs';
import { LinkerService } from '../../linker.service';
import { NgForm } from '@angular/forms';
import { EvaluationRequest } from '../../models/evaluation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit {

  PastDetails!: Details;
  PastPrograms: ProgramEntity[] = [];

  constructor(private http: HttpClient, private router: Router, private acroute: ActivatedRoute,
    private linker: LinkerService,
    private toast: ToastrService
  )
  {
    this.http.get<boolean>(`/Base/CheckForEvaUser/${this.acroute.snapshot.paramMap.get('id')}/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}/`)
    .subscribe(
      {
        next: (x) =>
        {
          if (x)
          {
            this.toast.success('This Evaluation has already proceeded By YOU');

            this.router.navigate(['/home']);
          }
        },
        error: () => this.router.navigate(['/home'])
      }
    );

    this.ngOnInit();
  }

  

  async ngOnInit()
  {
    await this.CheckDetails();

    this.linker.LinkerPastDetails.set(this.PastDetails);
    this.linker.LinkerPastPrograms.set(this.PastPrograms);
  }

  async CheckDetails()
  {
    var WaitFor = await firstValueFrom(this.http.get<Details>(`/Base/GetDetailsByID/${this.acroute.snapshot.paramMap.get('id')}/`));

    if (!WaitFor)
    {
      this.router.navigate(['/home']);
    }
    else
    {
      this.PastDetails = WaitFor;

      var WaitForProgram = await firstValueFrom(this.http.get<ProgramEntity[]>(`/Base/GetProgramsByDetails/${this.acroute.snapshot.paramMap.get('id')}/`));

      if (WaitForProgram)
      {
        this.PastPrograms = WaitForProgram;
      } 
      else this.router.navigate(['/home']);
    }
  }

  FromOneToTen(input: HTMLInputElement)
  { 
    if (input.valueAsNumber < 1)
      input.valueAsNumber = 1;
    else if (input.valueAsNumber > 10)
      input.valueAsNumber = 10;
  }

  async Submit(f: NgForm)
  {
    if (f.valid)
    {
      var Eva: EvaluationRequest = 
      {
        id: 0,
        item1: f.value.Item1,
        item2: f.value.Item2,
        item3: f.value.Item3,
        item4: f.value.Item4,
        item5: f.value.Item5,
        item6: f.value.Item6,
        item7: f.value.Item7,
        remarks: f.value.Remarks,
        sourceDetails: this.PastDetails.id,
        stateType: +f.value.IsAccepted,
        writerID: await firstValueFrom(this.http.get<number>(`/Base/GetWriterID/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`))
      };
      this.http.post<boolean>(`/Base/SubmitEvaluation/`, Eva)
      .subscribe(
        {
          next: (x) =>
          {
            if (x)
            {
              this.toast.success('Succeeded');

              this.router.navigate(['/home']);
            }
            else this.toast.error('Failed');
          }
        }
      )
    }
  }
}
