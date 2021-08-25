import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-collection-icon',
  templateUrl: './collection-icon.component.html',
  styleUrls: ['./collection-icon.component.scss']
})
export class CollectionIconComponent implements OnInit {
  //public showImagePicker : boolean;
  showImagePicker = false;
  @Output() iconEmitter = new EventEmitter<any>();
  showImageUploadModal: boolean;

  constructor() { }

  ngOnInit() {
  }

  @Input() appIcon;
  @Input() appIconConfig;
  
  public initializeImagePicker()
  {
    if (this.appIconConfig.isAppIconEditable) {
      this.showImagePicker = true;
    } else {
      this.showImagePicker = false;
    }
  }

  collectionIconHandler(event) {
    this.iconEmitter.emit(event);
    this.appIcon = event.url;
    this.showImagePicker = false;
  }

  // dismissImageUploadModal() {
  //   this.showImagePicker = true;
  //   this.showImageUploadModal = false;
  // }
   
  handleModalDismiss(event) {
    this.showImagePicker = false;
  }
}
