import { Component, OnInit, Input, OnDestroy,Output,EventEmitter, ViewChild } from '@angular/core';
import { ImageSearchService } from '../../services/image-search/image-search.service';
import { SbToastService } from '../../services/iziToast/izitoast.service';
import {config} from './asset-browser.data';
import * as _ from 'lodash-es';

@Component({
  selector: 'lib-asset-browser',
  templateUrl: './asset-browser.component.html',
  styleUrls: ['./asset-browser.component.css']
})
export class AssetBrowserComponent implements OnInit, OnDestroy {
  @Input() showImagePicker;
  @ViewChild('modal') modal;
  @Output() assetBrowserEmitter = new EventEmitter<any>();
  @Output() modalDismissEmitter = new EventEmitter<any>();
  showImageUploadModal: boolean;

  isClosable = true;
  myImages : any;
  appIcon;
  public assetsCount: any;
  public searchMyInput = '';
  public searchAllInput: any;
  myAssets = [];
  query: string;
  public formData: any;
  public assestData = {};
  public formConfig: any;
  public assetName: any;
  showErrorMsg: boolean;
  assetConfig: any = {};
  errorMsg: string;
  public imageUploadLoader = false;
  acceptImageType: any;
  public initialFormConfig: any;
  public imageFormValid: any;
  public emptySearchMessage: any;
  constructor(
    private imageSearchService : ImageSearchService,
    private sbToastService: SbToastService,
    ) { }



  ngOnInit() {
    this.initialFormConfig =  _.get(config, 'uploadIconFormConfig');
 //   this.formConfig =  _.get(config, 'uploadIconFormConfig');
    //this.getMyImages();
  }
  ngOnDestroy() {
    // if (this.modal && this.modal.deny) {
    //   this.modal.deny();
    // }
  }

  // Function to get new images
  // getmyImages()
  // {
  //  this.imageSearchService.getMyImages().subscribe(data => {
  //   this.myImages = data.result.content;
  //   });
  // }

  getMyImages(offset, query?, search?) {
    this.assetsCount = 0;
    if (!search) {
      this.searchMyInput = '';
    }
    if (offset === 0) {
      this.myAssets.length = 0;
    }
    const req = {
      filters: {
        mediaType: ['image'],
        createdBy: 1001
      },
      offset
    };
    if (query) {
      req['query'] = query;
    }
    // this.questionService.getAssetMedia(req).pipe(catchError(err => {
    //   const errInfo = { errorMsg: _.get(this.configService.labelConfig, 'messages.error.022') };
    //   return throwError(this.editorService.apiErrorHandling(err, errInfo));
    // })).subscribe((res) => {
    //     this.assetsCount = res.result.count;
    //     _.map(res.result.content, (item) => {
    //       if (item.downloadUrl) {
    //         this.myAssets.push(item);
    //       }
    //     });
    //   });

    //console.log("Request=",req)
    this.imageSearchService.getMyImages(req).subscribe((data) => {
      if (data.responseCode == "OK")
      {
        this.myImages = data.result.content;
        this.assetsCount = data.result.count;
      }
    }, (err) => {
      console.log({ err });
      this.sbToastService.showIziToastMsg(err.error.result.messages[0], 'error');
    });
  }

  searchImages(event, type)
  {

    if (event === 'clearInput' && type === 'myImages') {
      this.query = '';
      this.searchMyInput = '';
    } else if (event === 'clearInput' && type === 'allImages') {
      this.query = '';
      this.searchAllInput = '';
    } else {
      this.query = event.target.value;
    }
    if (type === 'myImages' ) {
        this.getMyImages(0, this.query, true);
    } else {
        //this.getAllImages(0, this.query, true);
    }
  }

  addImageInEditor(imageUrl, imageId) {
    //console.log("img=",imageUrl);console.log("id=",imageId)
    this.appIcon = imageUrl;
    this.showImagePicker = false;
    this.assetBrowserEmitter.emit({type: 'image', url: this.appIcon});
    this.dismissImagePicker();
    this.modal.deny();
  }

  dismissImagePicker() {
    this.showImagePicker = false;
    this.modalDismissEmitter.emit({})
  }

  lazyloadMyImages() {
    const offset = this.myImages.length;
    //this.getmyImages();
  }

  dismissImageUploadModal() {
    this.showImagePicker = true;
    this.showImageUploadModal = false;
  }

  uploadImage(event)
  {
    // console.log("EEEEE=",event);
    const file = event.target.files[0];
    const reader = new FileReader();
    this.formData = new FormData();
    this.formData.append('file', file);
    this.assetName = file.name;
    const fileType = file.type;
    const fileName = file.name.split('.').slice(0, -1).join('.');
    const fileSize = file.size / 1024 / 1024;
    if (fileType.split('/')[0] === 'image')
    {
      this.showErrorMsg = false;
      if (fileSize > 1)
      {
        this.showErrorMsg = true;
        this.errorMsg = 'upload image of minimun size 1MB'
        this.errorMsg = "Error";
       //this.assetConfig.image.size + this.assetConfig.image.sizeType;
        this.resetFormData();
      }
      else {
        this.errorMsg = '';
        this.showErrorMsg = false;
        reader.readAsDataURL(file);
      }
    }
    else 
    {
      this.showErrorMsg = true;
      this.errorMsg=''
    //  this.errorMsg = _.get(this.configService.labelConfig, 'messages.error.020');
    }

    if (!this.showErrorMsg)
    {
      this.imageUploadLoader = true;
      this.imageFormValid = true;
      this.assestData = this.generateAssetCreateRequest(fileName, fileType, 'image');
      this.populateFormData(this.assestData);
    }
  }

  populateFormData(formData) {
    const formvalue = _.cloneDeep(this.formConfig);
    this.formConfig = null;
    _.forEach(formvalue, (formFieldCategory) => {
        formFieldCategory.default = formData[formFieldCategory.code];
        formFieldCategory.editable = true;
    });
    this.formConfig = formvalue;
  }
  generateAssetCreateRequest(fileName, fileType, mediaType) {
    return {
        name: fileName,
        mediaType,
        mimeType: fileType,
        createdBy: 1001,
        creator: "Ankita Chavan", // Mock Info
        channel:"01309282781705830427" //this is node ID
    };
  }

  resetFormData() {
    this.imageUploadLoader = false;
    this.imageFormValid = false;
    this.formConfig = this.initialFormConfig;
  }

  openImageUploadModal() {
    this.showImageUploadModal = true;
    this.formData = null;
    this.formConfig = this.initialFormConfig;
    this.imageUploadLoader = false;
    this.imageFormValid = false;
    this.showErrorMsg = false;
  }

  uploadAndUseImage(modal) {
    console.log("here",modal);
  //   this.imageSearchService.createMediaAsset({ content: this.assestData }).pipe(catchError(err => {
  //     // const errInfo = { errorMsg: _.get(this.configService.labelConfig, 'messages.error.019') };
  //     // return throwError(this.editorService.apiErrorHandling(err, errInfo));
  //   })).subscribe((res) => {
  // //    const imgId = res.result.node_id;
  //     const imgId = '01309282781705830427';
  //     const request = {
  //       data: this.formData
  //     };
  //     this.imageSearchService.uploadMedia(request, imgId).pipe(catchError(err => {
  //       const errInfo = { errorMsg: _.get(this.configService.labelConfig, 'messages.error.019') };
  //       return throwError(this.editorService.apiErrorHandling(err, errInfo));
  //     })).subscribe((response) => {
  //       this.addImageInEditor(response.result.content_url, response.result.node_id);
  //       this.showImageUploadModal = false;
  //       this.dismissPops(modal);
  //     });
  //   });
  }

  onStatusChanges(event)
  {
  }

  valueChanges(event)
  {

  }
  dismissPops(modal) {
    this.dismissImagePicker();
    modal.deny();
  }
}
