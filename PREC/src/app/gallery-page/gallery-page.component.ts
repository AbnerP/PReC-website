import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { imageDTO, section, sectionsDTO } from '../models/galleryDTO.model';
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
    // this.service.getGalleryLayout().then(data => {
    //   this.gallery = data;
    //   console.log(this.gallery)
    // });
    this.gallery = this.service.getGalleryLayoutMock();
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

  deleteSection(sectionIndex:number){
    this.gallery.sections.splice(sectionIndex,1);

    this.setSectionPositions();
  }

  addSection(){
    let emptySection:section = {
      name: "New Section",
      date:"string",
      position:this.gallery.sections.length+1,
      media:[]
    }
    this.gallery.sections.push(emptySection);

    this.setSectionPositions();
  }

  sortSections(){
    this.gallery.sections.sort((a,b)=>{return a.position - b.position});
  }

  updateSectionName(event:any,sectionIndex:number){
   this.gallery.sections[sectionIndex].name = event.target.value;
   this.setSectionPositions()
  }

  setSectionPositions(){
    for(let i = 0; i < this.gallery.sections.length;i++){
      this.gallery.sections[i].position = i+1;
    }
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

  deleteMedia(sectionIndex:number,mediaIndex:number){
    let section = this.gallery.sections[sectionIndex];
    section.media.splice(mediaIndex,1);

    for(let i = 0; i < section.media.length;i++){
      section.media[i].position = i+1;
    }
  }

  sortMediaForSection(sectionIndex:number){
    let section = this.gallery.sections[sectionIndex];
    section.media.sort((a,b)=>{return a.position - b.position});
  }
}
