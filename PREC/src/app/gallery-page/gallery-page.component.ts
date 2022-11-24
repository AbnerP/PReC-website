import { Component, OnInit } from '@angular/core';
import { imageDTO } from '../models/galleryDTO.model';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {

  constructor(private service:GalleryService) { }

  images: Array<imageDTO> = [];

  ngOnInit(): void {
    this.reloadImages();
  }

  deleteImage(id:string){
    console.log(id);
    this.service.deleteImage(id).then(() => this.reloadImages() );
  }

  reloadImages(){
    this.service.getImages().then(gallery =>{
      this.images = gallery.images;
    });
  }

}
