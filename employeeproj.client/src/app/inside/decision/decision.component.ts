import { Component } from '@angular/core';
import { LinkerService } from '../../linker.service';
import { Router } from '@angular/router';
import { EvaluationRequest } from '../../models/evaluation';
import { Decision } from '../../models/decision';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrl: './decision.component.css'
})
export class DecisionComponent {

  EvaluationIn: Decision = {
    id: 0,
    item1: 0,
    item2: 0,
    item3: 0,
    item4: 0,
    item5: 0,
    item6: 0,
    item7: 0,
    remarks: '',
    NumberOfAccepted: 0,
    NumberOfEnhancement: 0,
    NumberOfRejected: 0,
    CountOf: 0
  };

  constructor(private linker: LinkerService, private router: Router, private http: HttpClient,
    private toast: ToastrService
  )
  {
    var Content = this.linker.LinkerPastEvaluations();
    if (!Content)
    {
      this.router.navigate(['/home']);
    }
    else
    {
      this.EvaluationIn.CountOf = Content.length;
      
      for (let i = 0; i < Content.length; i++)
      {
        this.EvaluationIn.item1 += Content[i].item1;
        this.EvaluationIn.item2 += Content[i].item2;
        this.EvaluationIn.item3 += Content[i].item3;
        this.EvaluationIn.item4 += Content[i].item4;
        this.EvaluationIn.item5 += Content[i].item5;
        this.EvaluationIn.item6 += Content[i].item6;
        this.EvaluationIn.item7 += Content[i].item7;

        this.EvaluationIn.NumberOfAccepted += Content[i].stateType === 0 ? 1 : 0;
        this.EvaluationIn.NumberOfEnhancement += Content[i].stateType === 1 ? 1 : 0;
        this.EvaluationIn.NumberOfRejected += Content[i].stateType === 2 ? 1 : 0;
      }
      
      this.EvaluationIn.item1 /= Content.length;
      this.EvaluationIn.item2 /= Content.length;
      this.EvaluationIn.item3 /= Content.length;
      this.EvaluationIn.item4 /= Content.length;
      this.EvaluationIn.item5 /= Content.length;
      this.EvaluationIn.item6 /= Content.length;
      this.EvaluationIn.item7 /= Content.length;

    }
  }

  SaveDecision()
  {
    this.http.post<boolean>(`/Base/SubmitDecision/`, this.EvaluationIn)
    .subscribe(
      {
        next: () =>
        {
          this.toast.success('Decision has been taken, Thank YOU');
          this.router.navigate(['/home']);
        }
      }
    );
  }

  FromOneToTen(input: HTMLInputElement)
  { 
    if (input.valueAsNumber < 1)
      input.valueAsNumber = 1;
    else if (input.valueAsNumber > 10)
      input.valueAsNumber = 10;
  }
}
