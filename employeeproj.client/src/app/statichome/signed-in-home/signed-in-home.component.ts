import { Component } from '@angular/core';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-signed-in-home',
  templateUrl: './signed-in-home.component.html',
  styleUrl: './signed-in-home.component.css'
})
export class SignedInHomeComponent {
  constructor(public linker: LinkerService)
  {
    linker.EvaluationID.set(0);
  }
}
