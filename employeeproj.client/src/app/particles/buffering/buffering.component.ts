import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buffering',
  templateUrl: './buffering.component.html',
  styleUrl: './buffering.component.css'
})
export class BufferingComponent {
  @Input() Width = 100;
  @Input() Height = 100
}
