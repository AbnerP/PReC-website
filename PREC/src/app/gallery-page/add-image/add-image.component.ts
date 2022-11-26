import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
// import { LightgalleryModule } from 'lightgallery/angular/13';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddGalleryImage implements OnInit {

 
  constructor(private fb:FormBuilder,
    private service:GalleryService,
    private router:Router){
  }

  IMAGE:File = null;
  imageSrc:string;

  id:string;

  form:FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
    });
    
  }

  saveChanges(){
    this.service.addImage(this.IMAGE).then(res =>{
      console.log(res.data);
      this.router.navigate(['/gallery'])
    });
  }

  onImageUploaded(event){
    this.IMAGE = <File> event.target.files[0];
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result
        });
      };
    }
  }
}
