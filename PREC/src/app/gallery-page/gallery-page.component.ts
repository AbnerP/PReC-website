import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { imageDTO, sectionsDTO } from '../models/galleryDTO.model';
import { GalleryService } from '../services/gallery.service';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryPageComponent implements OnInit {
  private lightGallery!: LightGallery;
  private needRefresh = false;

  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }

  constructor(private service:GalleryService,
    private router:Router,
    private route:ActivatedRoute,
    private _sanitizer: DomSanitizer) { }

  images: Array<imageDTO> = [];
  videoURL:string = "https://www.youtube.com/embed/u9Hp6-Ynb2Q";
  
  safeURL: SafeUrl;
  gallery: sectionsDTO;

  ngOnInit(): void {
    this.reloadImages();
    this.refreshGalleryLayout();
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

  deleteImage(id:string){
    console.log(id);
    this.service.deleteImage(id).then(() => this.reloadImages() );
  }

  onInit = (detail): void => {
    this.lightGallery = detail.instance;
  };

  reloadImages(){
    this.service.getImages().then(gallery =>{
      this.images = gallery.images;
    });
  }

  refreshGalleryLayout() {
    this.service.getGalleryLayout().then(data => {
      this.gallery = data;
      console.log(this.gallery)
    });
  }

  settings = {
    counter: false,
    plugins: [lgZoom]
  };

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  

}
