import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.css'
})
export class NavigatorComponent {
  
  public Currentroute: string = '';
  
  constructor(public router: Router, public linker: LinkerService)
  {
    this.Currentroute = this.router.url;
  }
  @Input() Details: boolean = false;
  @Input() Program: boolean = false;
  @Input() Evaluation: boolean = false;
  @Input() Summary: boolean = false;
  @Input() Decision: boolean = false;
}
