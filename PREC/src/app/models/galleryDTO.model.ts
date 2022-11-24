

export interface galleryDTO{
  images:Array<imageDTO>;
  count:number;
}

export interface imageDTO{
  _id:string;
  imageURL:string;
}
