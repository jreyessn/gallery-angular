import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../../services/photo.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

// interface para reconocer los input event en el typescript
import { PhotoStoreRequest } from '../../interfaces/Photo'

interface HtmlInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  
  file: File;
  photoSelected: ArrayBuffer | string;

  photoForm;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  	private _photoService: PhotoService,
    private _spinner: NgxSpinnerService,
    private _toast: ToastrService,
  ) { 

    this.photoForm = this.formBuilder.group({
      title: '',
      description: ''
    });

  }

  ngOnInit(): void {
  }

  onPhotoSelected(event: HtmlInputEvent): void {
  	if(event.target.files && event.target.files[0]){
  		
  		this.file = <File> event.target.files[0];

  		// preview

  		const reader = new FileReader()
  		reader.onload = e => this.photoSelected = reader.result;
  		reader.readAsDataURL(this.file)

  	}

  }

  async onPhotoFormSubmit(customerData): Promise <void> {
    this._spinner.show();

  	const data = <PhotoStoreRequest> await this._photoService.storePhoto(customerData.title, customerData.description, this.file)

    this._spinner.hide();
    this._toast.success(data.message)
    this.router.navigate(['/photos']);
  }


}
