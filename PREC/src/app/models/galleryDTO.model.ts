
export interface media {
  type:string,
  sourceURL:any,
  caption:string
  position:number,
}

export interface section{
  name:string,
  date:string,
  position:string,
  media:Array<media>
}

export interface sectionsDTO{
  _id:string,
  sections:Array<section>
}

export interface galleryDTO{
  images:Array<imageDTO>;
  count:number;
}

export interface imageDTO{
  _id:string;
  imageURL:string;
  __v:string;
}

