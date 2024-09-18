import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LinkerService } from '../../linker.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  buffering: boolean = false;

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router,
    private linker: LinkerService)
  {

  }

  Submit(f: NgForm)
  {
    if (f.valid)
    {
      this.buffering = true;

      this.http.post<number>(`/Employees/SignIn/`, 
        {
          Username: f.value.Username,
          Password: f.value.Password
        }
      )
      .subscribe(
        {
          next: async (x) =>
          {
            if (x != 99)
            {
              this.toast.success('Signed In Successfully');

              localStorage.setItem('Username', f.value.Username);
              localStorage.setItem('Password', f.value.Password);
              localStorage.setItem('Type', x.toString());

              await this.linker.ngOnInit();

              this.router.navigate(['/signedinhome']);
            }
            else this.toast.error('Wrong Entry')
          },
          error: (x: Error) =>
          {
            this.toast.error("Can't sign in now! => " + x.message);
            this.buffering = false;
          },
          complete: () =>
          {
            f.reset();
            this.buffering = false;
          }
        }
      )
    }
  }
}
