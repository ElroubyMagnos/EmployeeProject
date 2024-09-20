import { Component } from '@angular/core';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-bellnotify',
  templateUrl: './bellnotify.component.html',
  styleUrl: './bellnotify.component.css'
})
export class BellnotifyComponent {
  
  
  constructor(public linker: LinkerService)
  {
    this.linker.LoadNotifications();
  }

  
}
