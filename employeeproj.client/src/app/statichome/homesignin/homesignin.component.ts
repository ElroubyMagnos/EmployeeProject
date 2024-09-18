import { Component } from '@angular/core';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-homesignin',
  templateUrl: './homesignin.component.html',
  styleUrl: './homesignin.component.css'
})
export class HomesigninComponent {
  constructor(linker: LinkerService)
  {
    linker.EvaluationID.set(0);
  }
}
