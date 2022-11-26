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
  gallery: sectionsDTO;

  constructor(private service:GalleryService,
    private router:Router,
    private route:ActivatedRoute,
    private _sanitizer: DomSanitizer) { }
  

  ngOnInit(): void {
    this.refreshGallery();
  }

  refreshGallery() {
    this.service.getGalleryLayout().then(data => {
      this.gallery = data;
      console.log(this.gallery)
    });
  }

// SECTION FUNCTIONS
  moveSectionUp(sectionIndex:number){
    if(sectionIndex == 0) return;

    let currentItem = this.gallery.sections[sectionIndex];
    let previousItem = this.gallery.sections[sectionIndex-1];

    currentItem.position--;
    previousItem.position++;

    this.sortSections();
  }

  moveSectionDown(sectionIndex:number){
    if(sectionIndex == this.gallery.sections.length-1) return;
    let currentItem = this.gallery.sections[sectionIndex];
    let afterItem = this.gallery.sections[sectionIndex+1];

    currentItem.position++;
    afterItem.position--;
    
    this.sortSections();
  }

  deleteSection(id:string){
    console.log(id);
    // this.service.deleteImage(id).then(() => this.reloadImages() );
  }
  
  sortSections(){
    this.gallery.sections.sort((a,b)=>{return a.position - b.position});
  }

// MEDIA FUNCTIONS
  moveMediaUp(sectionIndex:number,mediaIndex:number){
    if(mediaIndex == 0) return;

    let section = this.gallery.sections[sectionIndex];
    let currentItem = section.media[mediaIndex];
    let previousItem = section.media[mediaIndex-1];
    currentItem.position--;
    previousItem.position++;

    this.sortMediaForSection(sectionIndex);
  }

  moveMediaDown(sectionIndex:number,mediaIndex:number){
    let section = this.gallery.sections[sectionIndex];

    if(mediaIndex == section.media.length-1) return;

    let currentItem = section.media[mediaIndex];
    let afterItem = section.media[mediaIndex+1];
    currentItem.position++;
    afterItem.position--;
    
    this.sortMediaForSection(sectionIndex);
  }

  deleteMedia(id:string){
    console.log(id);
    // this.service.deleteImage(id).then(() => this.reloadImages() );
  }

  sortMediaForSection(sectionIndex:number){
    let section = this.gallery.sections[sectionIndex];
    section.media.sort((a,b)=>{return a.position - b.position});
  }
}
