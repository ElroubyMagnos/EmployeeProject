import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EvaluationRequest } from '../../models/evaluation';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  public Evaluations: EvaluationRequest[] = [];

  constructor(private http: HttpClient, private aroute: ActivatedRoute, private router: Router,
    private linker: LinkerService
  )
  {
    this.http.get<EvaluationRequest[]>(`/Base/GetEvaluationsForSummary/${this.aroute.snapshot.paramMap.get('id')}/`)
    .subscribe(
      {
        next: (x) =>
        {
          if (x)
          {
            this.Evaluations = x;
          }
          else this.router.navigate(['/home']);
        }
      }
    );
  }

  GoToDecision()
  {
    this.linker.LinkerPastEvaluations.set(this.Evaluations);
    
    this.router.navigate(['inside', 'decision']);
  }
}
