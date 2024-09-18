import { Component, computed, signal, Signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LinkerService } from '../../linker.service';
import { Router } from '@angular/router';
import { Details } from '../../models/details';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  EnableEvaluation = false;

  AttachEnabled = false;

  TempDetails: Details = {
    id: 0,
    attachedDoc: '',
    category: '',
    coverImage: '',
    description: '',
    title: '',
    attachedName: '',
    writerID: 0,
    waitingForSupervisor: false
  };

  constructor(public linker: LinkerService, 
    private router: Router, 
    private http: HttpClient,
    private toast: ToastrService
  )
  {
    var Content = linker.LinkerPastDetails()!;
    if (Content)
    {
      this.TempDetails = Content;
      this.EnableEvaluation = true;
      this.linker.EvaluationID.set(Content.id);
      return;
    }
    this.http.get<Details>(`/Base/GetTempDetails/${localStorage.getItem('Username')}/${localStorage.getItem('Password')}`)
    .subscribe(
      {
        next: (x) =>
        {
          if (x)
          {
            this.TempDetails = x;

            this.toast.success('Temp Details Loaded');
          }
        },
        error: (Err: Error) =>
        {
          console.log(Err);
        }
      }
    );
  }

  Convert(str: string) : File
  {
    const byteArray = this.base64ToUint8Array(str);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    return new File([blob], this.TempDetails.attachedName, { type: 'application/octet-stream' });
  }

  base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes;
  }

  ChangePic(img: HTMLImageElement, file: HTMLInputElement)
  {
    img.src = URL.createObjectURL(file.files![0]);
  }

  AttachFile(attachfile: HTMLInputElement)
  {
    this.TempDetails.attachedName = attachfile.files![0].name;
  }

  async SaveToDB(f: NgForm, imgform: HTMLInputElement, attachform: HTMLInputElement, img: HTMLImageElement)
  {
    if (this.EnableEvaluation)
      return;
    var fd = new FormData();
    
    if (imgform.files && imgform.files.length > 0)
    {
      fd.append('Image', imgform.files[0]);
    }
    else if (img.src.length === 0)
    {
      this.toast.error("Please select a image");
      return;
    }

    if (attachform.files && attachform.files.length > 0)
    {
      fd.append('Attach', attachform.files[0]);
      fd.append('Required', 'True');
      fd.append('AttachedName', this.TempDetails.attachedName);
    }

    fd.append('Title', f.value.Title);
    fd.append('Category', f.value.Category);
    fd.append('Description', f.value.Description);
    
    fd.append('Username', localStorage.getItem("Username")!);
    fd.append('Password', localStorage.getItem("Password")!);

    var Bool = await firstValueFrom(this.http.post<boolean>(`/Base/SaveDetailsForQueue/`, fd));
    
    if (Bool)
    {
      this.toast.success('Success');

      this.router.navigate(['/inside/program/']);
    }
    else
    {
      this.toast.error("Error");
    }
  }

  convertImageToBlob(imgElement: HTMLImageElement): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      ctx.drawImage(imgElement, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('Failed to convert image to Blob');
        }
      }, 'image/png');
    });
  }
}
