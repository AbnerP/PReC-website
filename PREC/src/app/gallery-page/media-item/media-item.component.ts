import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss']
})
export class MediaItemComponent implements OnInit {

  constructor(
    private _sanitizer: DomSanitizer,
  ) { }

  @Input()
  rawURL: string;
  safeURL: SafeUrl;
  ngOnInit() {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.rawURL);
  }

}
