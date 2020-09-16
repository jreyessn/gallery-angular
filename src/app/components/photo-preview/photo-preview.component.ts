import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { PhotoService } from '../../services/photo.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { Photo } from '../../interfaces/Photo'

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
   
   photo: Photo;
   id: string;

   photoForm: any;

  constructor(
  	private _photoService: PhotoService,
  	private _toast: ToastrService,
    private _spinner: NgxSpinnerService,

  	private activeRoute: ActivatedRoute,
  	private router: Router,

  	private formBuilder: FormBuilder
  ) { 

    this.photoForm = this.formBuilder.group({
      title: '',
      description: ''
    });

  }

  ngOnInit(): void {
  	this.activeRoute.params.subscribe(({ id }) => {

  		this.id = id;

  		this._photoService.showPhoto(id).subscribe(
  			data => {
  				
  				this.photo = data
  				this.photoForm.controls['title'].setValue(data.title)
  				this.photoForm.controls['description'].setValue(data.description)


  			},
  			err => this._toast.error("Error al obtener el registro")
  		)

  	})
  }

  onPhotoFormSubmit(customerData) {
  	this._spinner.show();

  	this._photoService.updatePhoto(customerData.title, customerData.description, this.photo._id).subscribe(
  		resp => {
  		    this._spinner.hide();
  			this._toast.success("Se ha eliminado correctamente");
  			this.router.navigate(['/']);
  		},
  		err => {
  			this._spinner.hide()
  			this._toast.error("Un error al actualizar la foto")
  		}
  	)
  }

  onDestroy(id: string){
  	this._spinner.show();

  	this._photoService.destroyPhoto(id).subscribe(
  		resp => {
  		    this._spinner.hide();
  			this._toast.success("Se ha eliminado correctamente");
  			this.router.navigate(['/']);
  		},
  		err => {
			this._spinner.hide();
  			this._toast.error("Un error al eliminar la foto")

  		}
  	)
  }

}
