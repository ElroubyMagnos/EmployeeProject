import { Component } from '@angular/core';
import { SupervisorRequest } from '../../models/supernotify';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ManagerRequest } from '../../models/managerrequest';

@Component({
  selector: 'app-bellnotify',
  templateUrl: './bellnotify.component.html',
  styleUrl: './bellnotify.component.css'
})
export class BellnotifyComponent {
  SupervisorNotifications: SupervisorRequest[] = [];
  ManagerNotifications: ManagerRequest[] = [];
  Counter: number = 0;
  constructor(private http: HttpClient, private router: Router, private toast: ToastrService)
  {
    this.LoadNotifications();
  }

  LoadNotifications()
  {
    
    this.http.get<SupervisorRequest[]>(`/Base/GetSupervisorNotify/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`)
    .subscribe(
      {
        next: (x) => 
        {
          this.Counter += x.length;
          this.SupervisorNotifications = x;

          if (this.SupervisorNotifications.length > 0)
          {
            new Audio('/notify.mp3').play();
          }
        },
        error: (err: Error) =>
        {
          alert(err.message);
        }
      }
    );

    this.http.get<ManagerRequest[]>(`/Base/GetManagerNotify/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}/`)
    .subscribe(
      {
        next: (x) => 
        {
          this.Counter += x.length;
          this.ManagerNotifications = x;
          if (this.ManagerNotifications.length > 0)
          {
            new Audio('/notify.mp3').play();
          }
        },
        error: (err: Error) =>
        {
          alert(err.message);
        }
    }
    );
  }

  async GotoNotify(notify: SupervisorRequest)
  {
    var Waiting = await firstValueFrom(this.http.post<boolean>(`/Base/UnactiveSupervisorNotify`, notify));

    if (Waiting)
    {
      this.router.navigate(['inside', 'evaluation', notify.detailID]);
    }
    else
    {
      this.toast.error("An Error Occured");
    }

    this.LoadNotifications();
  }

  async GotoNotifyManager(notify: ManagerRequest)
  {
    var Waiting = await firstValueFrom(this.http.post<boolean>(`/Base/UnactiveManagerNotify`, notify));

    if (Waiting)
    {
      this.router.navigate(['inside', 'summary', notify.detailsID]);
    }
    else
    {
      this.toast.error("An Error Occured");
    }

    this.LoadNotifications();
  }
}
