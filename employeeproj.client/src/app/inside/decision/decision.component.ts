import { Component } from '@angular/core';
import { LinkerService } from '../../linker.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { DecisionRequest } from '../../models/decision';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrl: './decision.component.css'
})
export class DecisionComponent {

  EvaluationIn: DecisionRequest = {
    id: 0,
    item1: 0,
    item2: 0,
    item3: 0,
    item4: 0,
    item5: 0,
    item6: 0,
    item7: 0,
    remarks: '',
    numberOfAccepted: 0,
    numberOfEnhancement: 0,
    numberOfRejected: 0,
    countOf: 0,
    writerID: 0
  };

  async LoadWriter()
  {
    this.EvaluationIn.writerID = await firstValueFrom(this.http.get<number>(`/Base/GetWriterID/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`));
  }

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
      this.LoadWriter();
      this.EvaluationIn.countOf = Content.length;
      
      for (let i = 0; i < Content.length; i++)
      {
        this.EvaluationIn.item1 += Content[i].item1;
        this.EvaluationIn.item2 += Content[i].item2;
        this.EvaluationIn.item3 += Content[i].item3;
        this.EvaluationIn.item4 += Content[i].item4;
        this.EvaluationIn.item5 += Content[i].item5;
        this.EvaluationIn.item6 += Content[i].item6;
        this.EvaluationIn.item7 += Content[i].item7;

        this.EvaluationIn.numberOfAccepted += Content[i].stateType === 0 ? 1 : 0;
        this.EvaluationIn.numberOfEnhancement += Content[i].stateType === 1 ? 1 : 0;
        this.EvaluationIn.numberOfRejected += Content[i].stateType === 2 ? 1 : 0;
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
        next: async () =>
        {
          this.toast.success('Decision has been taken, Thank YOU');

          for (let i = 0; i < this.linker.ManagerNotifications.length; i++) 
          {
            var notify = this.linker.ManagerNotifications[i];

            if (notify.detailsID == this.linker.CurrentDecisionDetails)
            {
              await firstValueFrom(this.http.post<boolean>(`/Base/UnactiveManagerNotify`, notify));
              this.linker.ManagerNotifications.splice(this.linker.ManagerNotifications.indexOf(notify), 1);
              break;
            }
          }

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
