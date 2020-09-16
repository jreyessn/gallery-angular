import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PhotoStoreRequest, Photo } from '../interfaces/Photo'

const { backend } = environment

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  endpoint: string = 'photos/';

  constructor(
  	private http: HttpClient,
  ) { }

  indexPhoto() {
    return this.http.get <Photo[]> (backend + this.endpoint)
  }

  showPhoto(id: string) {
    return this.http.get <Photo> (backend + this.endpoint + id)
  }

  destroyPhoto(id: string){
    return this.http.delete(backend + this.endpoint + id)
  }

  updatePhoto(title: string, description: string, id: string){
    return this.http.put(backend + this.endpoint + id, {
      title,
      description
    })
  }

  storePhoto(title: string, description: string, photo: File){
  	const formData = new FormData();

  	formData.append('title', title)
  	formData.append('description', description)
  	formData.append('image', photo)

    return new Promise((resolve, reject) => {

  	  this.http.post (backend + this.endpoint, formData)
                .subscribe(
                  data => resolve(data),
                  err => reject(err)
                )
    })
  }

}
