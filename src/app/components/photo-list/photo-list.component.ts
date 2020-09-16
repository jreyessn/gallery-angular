import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PhotoService } from '../../services/photo.service';
import { ToastrService } from 'ngx-toastr';

import { Photo } from '../../interfaces/Photo'

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  
  photos: Photo[] = [];

  constructor(
  	private _photoService: PhotoService,
  	private _toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  	
  	this._photoService.indexPhoto().subscribe(
  		data => this.photos = data,
  		err => this._toast.error('Ocurrió un error al listar las fotos')
  	)

  }

  selectedCard(id: string){
    this.router.navigate(['photos/', id]);
  }

}
