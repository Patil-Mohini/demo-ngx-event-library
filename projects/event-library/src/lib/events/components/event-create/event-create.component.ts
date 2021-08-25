import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCreateService } from '../../services/event-create/event-create.service';
import { EventDetailService } from '../../services/event-detail/event-detail.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { SbToastService } from '../../services/iziToast/izitoast.service';
import { TimezoneCal } from '../../services/timezone/timezone.service';
import { TranslateService } from '@ngx-translate/core';
import { UserConfigService } from '../../services/userConfig/user-config.service';
import { ImageSearchService } from '../../services/image-search/image-search.service';
import * as _ from 'lodash-es';

@Component({
  selector: 'sb-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventCreateComponent implements OnInit {
  @Input('formFieldProperties') formFieldProperties: any;
  // @Input() rootFormConfig:any;
  @Input() userId: any;
  initialFormFieldProperties: any;

  @Output() closeSaveForm = new EventEmitter();
  @Output() navAfterSave = new EventEmitter();

  today = new Date();
  todayDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);

  formValues: any;
  startDate: any = this.todayDate;
  endDate: any = this.todayDate;
  startTime: any = (('0' + (this.today.getHours() + 1))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);
  endTime: any = (('0' + (this.today.getHours() + 2))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);
  registrationStartDate: any = this.todayDate;
  registrationEndDate: any = this.todayDate;
  timeDiff: any;
  queryParams: any;
  eventDetailsForm: any;
  isSubmitted = false;
  formFieldData: any;
  FormData: any;
  isNew: boolean = true;
  timezoneshort: any;
  canPublish: boolean = false;
  offset = this.timezoneCal.getTimeOffset();
  constFormFieldProperties: any;
  flag: boolean = true;
 tempEventType = null;
  tempVisibility = null;
  tempRecuring = null;
  tempTypeRecuring = null;


  // Ankita changes
  public showAppIcon = true;
  public appIconConfig = {
      code: "appIcon",
      dataType: "text",
      description: "appIcon of the content",
      editable: true,
      inputType: "appIcon",
      label: "Icon",
      name: "Icon",
      placeholder: "Icon",
      renderingHints: {class: "sb-g-col-lg-1 required"},
      required: true,
      visible: true
}
  public appIcon="";
  editmode : any;
  public showImagePicker = true;

tempEndRecurring = null;
 
  defaultTypeOfRecurring:String;
  weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventCreateService: EventCreateService,
    private eventDetailService: EventDetailService,
    private router: Router,
    private location: Location,
    private sbToastService: SbToastService,
    private formBuilder: FormBuilder,
    private timezoneCal: TimezoneCal,
    private translate: TranslateService,
    private userConfigService: UserConfigService,
    private imageSearchService : ImageSearchService) {

  }

  customFields = this.formBuilder.group({
    startDate: [] = this.todayDate,
    endDate: [] = this.todayDate,
    startTime: [] = this.startTime,
    endTime: [] = this.endTime,
    registrationStartDate: [] = this.todayDate,
    registrationEndDate: [] = this.todayDate,

  });

  // Ankita changes
  ngOnChanges() {
  this.setAppIconData();
}

// Ankita changes
setAppIconData() {
  const isRootNode = true;
  
  //this.appIconConfig = _.find(_.flatten(_.map(this.rootFormConfig, 'fields')), {code: 'appIcon'});
  // if (!_.isUndefined(this.appIconConfig) && isRootNode === true) {
  //   this.showAppIcon = true;
  // } else {
  //   this.showAppIcon = false;
  // }
  // this.appIcon = _.get(this.nodeMetadata, 'data.metadata.appIcon');
  this.appIcon="";
  if (this.isReviewMode()) {
    this.appIconConfig = {...this.appIconConfig , ... {isAppIconEditable: false}};
  } else {
    this.appIconConfig = {...this.appIconConfig , ... {isAppIconEditable: true}};
  }
  // const ifEditable = this.ifFieldIsEditable('appIcon');
}

  isReviewMode()
  {
    this.imageSearchService.getEditMode().subscribe((data: any) => {
    this.editmode = data.d.edit;
    });
    
    return  _.includes(['review', 'read', 'sourcingreview' ], this.editmode);
  }

  ngOnInit() {

    this.timezoneshort = this.timezoneCal.timeZoneAbbreviated();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams.identifier) {
        this.isNew = false;
      }
    });

    if (this.queryParams.identifier) {
      this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
        this.formFieldProperties = data.result['form'].data.fields;
      });

      this.eventDetailService.getEvent(this.queryParams.identifier).subscribe((data: any) => {
        this.queryParams = data.result.event;
      },
        (err: any) => {
          console.log('err = ', err);
        });
    }

    if (this.queryParams.identifier) {
      setTimeout(() =>
        this.initializeFormFields(), 500);
    }

    let group = {}

    // this.initialFormFieldProperties = _.cloneDeep(this.formFieldProperties);
    this.prepareFormConfiguration();
  }

  prepareFormConfiguration() {
    this.formFieldProperties.forEach(formField => {
      switch (formField.code) {
        case 'eventType':
            this.tempEventType = formField.default ? formField.default : null;
            this.setEventTypeDependentFields(formField.default);
        break;
      
        case 'visibility':
            this.tempVisibility = formField.default ? formField.default : null;
          this.setVisibilityDependentFields(formField.default);
          break;
        case 'recurring':
          this.tempRecuring = formField.default ? formField.default : null;
          this.setRecurringDependentFields(formField.default);
          break;

        case 'typeOfRecurring':
          this.tempTypeRecuring = formField.default ? formField.default : null;
          this.setTypeOfRecurringDependentFields(formField.default);
          break;
      }
    });

    this.onValueChangeUpdateFieldBehaviour();
  }



  setEventTypeDependentFields(value) {
    switch (value) {
      case 'Online':
        this.formFieldProperties[3].editable = false;
        this.formFieldProperties[5].editable = true;
        this.formFieldProperties[6].editable = true;

        break;

      case 'Offline':
        this.formFieldProperties[3].editable = true;
        this.formFieldProperties[5].editable = false;
        this.formFieldProperties[6].editable = false;
        break;

      case 'OnlineAndOffline':
        this.formFieldProperties[3].editable = true;
        this.formFieldProperties[5].editable = true;
        this.formFieldProperties[6].editable = true;
        break;

      default:
        this.formFieldProperties[3].editable = false;
        this.formFieldProperties[5].editable = false;
        this.formFieldProperties[6].editable = false;

        break;
    }
  }

  setVisibilityDependentFields(value) {
    switch (value) {
      case 'Parent':
        this.formFieldProperties[9].editable = true;
        this.formFieldProperties[8].editable = false;

        break;

      case 'Private':
        this.formFieldProperties[9].editable = false;
        this.formFieldProperties[8].editable = true;
        break;

      // case 'Default':

      //   break;

      default:
        this.formFieldProperties[9].editable = false;
        this.formFieldProperties[8].editable = false;
        break;
    }
  }

  output(event) {
    console.log('output::', event);
  }

  onStatusChanges(event) {
    console.log('onStatusChanges::', event);
  }

  initializeFormFields() {
    var editValues = {};
    var eventStart = (this.timezoneCal.calcTime(this.queryParams['startDate'], this.queryParams['startTime']));
    var eventEnd = (this.timezoneCal.calcTime(this.queryParams['endDate'], this.queryParams['endTime']));


    this.formFieldProperties.forEach(formField => {
      if (formField.code in this.queryParams) {

        if (formField.code == 'venue') {
          formField.default = this.queryParams[formField.code]['name'];
          editValues[formField.code] = this.queryParams[formField.code]['name'];

        } else if (formField.code == 'onlineProviderData') {
          formField.default = this.queryParams[formField.code]['meetingLink'];
          editValues[formField.code] = this.queryParams[formField.code]['meetingLink'];

        } else {
          formField.default = this.queryParams[formField.code];
          editValues[formField.code] = this.queryParams[formField.code];
        }
      }
    });

    this.formValues = editValues;
    this.formFieldData = this.formFieldProperties;
    console.log(this.formFieldData);
    console.log(this.formValues);

    this.customFields = this.formBuilder.group({
      startDate: [] = eventStart.getFullYear() + '-' + ('0' + (eventStart.getMonth() + 1)).slice(-2) + '-' + ('0' + eventStart.getDate()).slice(-2),
      endDate: [] = eventEnd.getFullYear() + '-' + ('0' + (eventEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + eventEnd.getDate()).slice(-2),
      startTime: [] = (('0' + (eventStart.getHours()))).slice(-2) + ":" + ('0' + eventStart.getMinutes()).slice(-2) + ":" + ('0' + eventStart.getSeconds()).slice(-2),
      endTime: [] = (('0' + (eventEnd.getHours()))).slice(-2) + ":" + ('0' + eventEnd.getMinutes()).slice(-2) + ":" + ('0' + eventEnd.getSeconds()).slice(-2),
      registrationStartDate: [] = this.queryParams['registrationStartDate'],
      registrationEndDate: [] = this.queryParams['registrationEndDate'],

    });

  }

  valueChanges(eventData) {
    if (eventData) {
      this.formValues = eventData;

      if (this.flag) {
        this.constFormFieldProperties = this.formFieldProperties;
        this.flag = false;
      }
      else {
        this.formFieldProperties = this.constFormFieldProperties;
        this.formFieldProperties.forEach(formField => {
          formField.default = eventData[formField.code];
        });
    
      }
    }

    let eventType;

    if (eventData.visibility != this.tempVisibility || eventData.eventType != this.tempEventType
      || eventData.recurring != this.tempRecuring || eventData.typeOfRecurring != this.tempTypeRecuring
      || eventData.endRecurring != this.tempEndRecurring) {
      console.log('let inner Main If eventType A - ', this.tempVisibility);

      //if (eventData.eventType != '' || eventData.eventType != null ) {
      if (eventData.eventType != this.tempEventType ) {
       console.log('let before assign 2nd If eventType B- ', this.tempEventType);
        this.tempEventType = eventData.eventType;
        this.setEventTypeDependentFields(eventData.eventType);
      }

      if (eventData.visibility != this.tempVisibility)
      {
        this.tempVisibility = eventData.visibility;
        this.setVisibilityDependentFields(eventData.visibility);
      }

      if (eventData.typeOfRecurring != this.tempTypeRecuring) {
        console.log('tempTypeRecuring let before assign 2nd If eventType B- ', this.tempTypeRecuring);
        this.tempTypeRecuring = eventData.typeOfRecurring;
        this.setTypeOfRecurringDependentFields(eventData.typeOfRecurring);
      }

      if (eventData.recurring != this.tempRecuring && 'Yes' != this.tempRecuring) {
        console.log('tempRecuring let before assign 2nd If eventType B- ', this.tempRecuring);
        this.tempRecuring = eventData.recurring;
        this.setRecurringDependentFields1(eventData.recurring);
      }

      if (eventData.endRecurring) {
        this.tempEndRecurring = eventData.endRecurring;
        this.setEndRecurring(eventData.endRecurring);
      }
      console.log('tempRecuring let after assign eventType C- ', this.tempRecuring);
      console.log('typeOfRecurring let after assign eventType C- ', this.tempTypeRecuring);
      this.onValueChangeUpdateFieldBehaviour();
    }
    console.log('tempRecuring let outer if eventType - ', this.tempRecuring);
    console.log('tempTypeRecuring let outer if eventType - ', this.tempTypeRecuring);
  }

  onValueChangeUpdateFieldBehaviour() {

    const formFieldPropertiesConst = this.formFieldProperties;
    delete this.formFieldProperties;

    setTimeout(() => {
      console.log("In side Set Time Out ");
      this.formFieldProperties = formFieldPropertiesConst
    }, 50);
  }

  /**
   * For validate data and call post form service
   */
  postData(canPublish) {
    this.isSubmitted = true;
    this.canPublish = canPublish;
    if (this.formValues == undefined) {
      this.sbToastService.showIziToastMsg("Please enter event name", 'warning');
    } else if (this.formValues.name == undefined || this.formValues.name.trim() == "") {
      this.sbToastService.showIziToastMsg("Please enter event name", 'warning');
    } else if (this.formValues.code == undefined) {
      this.sbToastService.showIziToastMsg("Please enter code", 'warning');
    } else if ((this.customFields.value.startDate == undefined || this.customFields.value.startTime == undefined || !this.timeValidation(this.customFields.value.startDate, this.customFields.value.startTime)) && this.isNew) {
      this.sbToastService.showIziToastMsg("Please enter valid event start date and time", 'warning');
    } else if ((this.customFields.value.endDate == undefined || this.customFields.value.endTime == undefined || !this.timeValidation(this.customFields.value.endDate, this.customFields.value.endTime)) && this.isNew) {
      this.sbToastService.showIziToastMsg("Please enter valid event end date and time", 'warning');

    } else if (this.customFields.value.registrationStartDate == undefined) {
      this.sbToastService.showIziToastMsg("Please enter valid event registration start date", 'warning');

    } else if (this.customFields.value.registrationEndDate == undefined) {
      this.sbToastService.showIziToastMsg("Please enter valid registration end date", 'warning');

    } else if (!this.dateValidation(this.customFields.value.startDate + " " + this.customFields.value.startTime, this.customFields.value.endDate + " " + this.customFields.value.endTime)) {
      this.sbToastService.showIziToastMsg("Event end date should be greater than start date", 'warning');

    } else if (!this.dateValidation(this.customFields.value.registrationStartDate, this.customFields.value.registrationEndDate)) {
      this.sbToastService.showIziToastMsg("Registration end date should be greater than registration start date", 'warning');
    } else if (!this.dateValidation(this.customFields.value.registrationStartDate + " 00:00:00", this.customFields.value.endDate)) {
      this.sbToastService.showIziToastMsg("Registration start date should be less than event end date", 'warning');
    } else if (!this.dateValidation(this.customFields.value.registrationEndDate + " 00:00:00", this.customFields.value.endDate)) {
      this.sbToastService.showIziToastMsg("Registration end date should be less than event end date", 'warning');
    }
    else {

      this.formValues = Object.assign(this.formValues, this.customFields.value)

      if (this.queryParams.identifier) {
        this.formValues["identifier"] = this.queryParams.identifier;
      }


      this.formValues["startTime"] = this.formValues["startTime"] + this.offset;
      this.formValues["endTime"] = this.formValues["endTime"] + this.offset;
      this.formValues['onlineProviderData'] = (this.formValues['onlineProviderData'] != null) ? ({ "meetingLink": this.formValues['onlineProviderData'] }) : {};
      this.formValues['venue'] = { "name": this.formValues['venue'] };
      this.formValues['owner'] = this.userId;

      if (this.isNew) {
        this.eventCreateService.createEvent(this.formValues).subscribe((data) => {
          if (data.responseCode == "OK") {
            this.dataSubmitted(data);
          }
        }, (err) => {
          console.log({ err });
          this.sbToastService.showIziToastMsg(err.error.result.messages[0], 'error');
        });

      } else {
        this.formValues['versionKey'] = this.queryParams.versionKey;

        this.eventCreateService.updateEvent(this.formValues).subscribe((data) => {
          if (data.responseCode == "OK") {
            this.dataSubmitted(data);
          }
        }, (err) => {
          console.log({ err });
          this.sbToastService.showIziToastMsg(err.error.result.messages[0], 'error');
        });
      }
    }

  }


  dataSubmitted(data) {
    if (this.canPublish) {
      this.eventCreateService.publishEvent(data.result.identifier).subscribe((res) => {
        this.navAfterSave.emit(data);
        this.sbToastService.showIziToastMsg("Event Created Successfully", 'success');
      });
    } else {
      this.navAfterSave.emit(data);
      this.sbToastService.showIziToastMsg("Event Created Successfully", 'success');
    }
  }

  cancel() {
    this.closeSaveForm.emit();
    //this.location.back()
  }

  /**
   * For time validation
   * 
   * @param sdate Contains data
   * @param time Contains time
   * @returns Return true if event start time is greater current time
   */
  timeValidation(date, time) {
    var startEventTime = new Date(date + " " + time);
    var startDifference = startEventTime.getTime() - this.today.getTime();
    var timeDiff = Math.round(startDifference / 60000);

    return (timeDiff > 0) ? true : false;
  }

  /**
   * For date validation
   * 
   * @param sdate Contains start data
   * @param edate Contains end data
   * @returns 
   */
  dateValidation(sdate, edate) {
    var startEventDate = new Date(sdate);
    var endEventDate = new Date(edate);

    var startDifference = endEventDate.getTime() - startEventDate.getTime();
    var timeDiff = Math.round(startDifference / 60000);

    return (timeDiff >= 0) ? true : false;
  }


  changeDateForRecurrence(currentdate, currentdate1) {
    this.formFieldProperties[22].range[1] = "Weekly on " + this.weekday[new Date(this.customFields.controls.startDate.value).getDay()];
    this.formFieldProperties[22].range[2] = "Monthly on the " + this.prefixes[Math.floor(new Date(this.customFields.controls.startDate.value).getDate() / 7)] + " " + this.weekday[new Date(this.customFields.controls.startDate.value).getDay()];
    console.log("this.formFieldProperties[22].range :: ", this.formFieldProperties[22].range);
    //this.defaultTypeOfRecurring=this.formFieldProperties[22].range[1];
    this.onValueChangeUpdateFieldBehaviour();
  }

  onValueChangeUpdateFieldBehaviour1() {
    const formFieldPropertiesConst = this.formFieldProperties;
    delete this.formFieldProperties;
   
    setTimeout(() => {
      console.log("In side Set Time Out ");
      this.formFieldProperties = formFieldPropertiesConst
      //this.formFieldProperties.controls['typeOfRecurring'].setValue(this.formFieldProperties[22].range[1]);
      //delete this.formFieldProperties[22].range[0];
      this.formFieldProperties.controls['typeOfRecurring'].setValue(this.defaultTypeOfRecurring, {onlySelf: true});
    }, 50);
    
  }

  //Recurring

  setRecurringDependentFields(value) {
    console.log("setRecurringDependentFields :: ", typeof (value));
    switch (value) {
      case true:
      case "Yes":
        this.formFieldProperties[22].editable = true;
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        break;

      default:
        this.formFieldProperties[22].editable = false;
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        this.customFields.controls['endDate'].enable();
        this.customFields.controls['endTime'].enable();
        break;
    }
  }

  setRecurringDependentFields1(value) {
    console.log("setRecurringDependentFields :: ", typeof (value));
    switch (value) {
      case true:
      case "Yes":
        this.formFieldProperties[22].editable = true;
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;

        var a = new Date();
        this.formFieldProperties[22].range[1] = "Weekly on " + this.weekday[a.getDay()];
        this.formFieldProperties[22].range[2] = "Monthly on the " + this.prefixes[Math.floor(this.today.getDate() / 7)] + " " + this.weekday[a.getDay()];
        // this.formFieldProperties.forEach(element => {
        //   if (element.code == "typeOfRecurring") {
        //     element.range.forEach(element => {
        //       if (element == "Weekly on ") {  
        //         console.log("element + this.today :: ", element + this.today.getDay());
        //         element = element + this.today.getDay();
        //         console.log("formFieldProperties :: ", this.formFieldProperties);
        //       }  
        //     });
        //   }  
        // });
        break;

      default:
        this.formFieldProperties[22].editable = false;
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        this.customFields.controls['endDate'].enable();
        this.customFields.controls['endTime'].enable();
        break;
    }
  }

  setTypeOfRecurringDependentFields(value) {
    switch (value) {
      case 'Daily':

        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        break;

      case 'Weekly on Friday':
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        break;

      case 'Monthly on the last Friday':
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        break;

      case 'Every Weekday':
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        break;

      case 'Custom':
        this.formFieldProperties[23].editable = true;
        this.formFieldProperties[24].editable = true;
        this.formFieldProperties[25].editable = true;
        this.customFields.controls['endDate'].disable();
        this.customFields.controls['endTime'].disable();
        break;

      default:
        this.formFieldProperties[23].editable = false;
        this.formFieldProperties[24].editable = false;
        this.formFieldProperties[25].editable = false;
        break;
    }
  }

  setEndRecurring(value) {
    switch (value) {
      case true:
      case "Yes":
        this.customFields.controls['endDate'].enable();
        this.customFields.controls['endTime'].enable();
        break;

      default:
        this.customFields.controls['endDate'].disable();
        this.customFields.controls['endTime'].disable();
    }
  }
  //End Recurring

  // Ankita
  appIconDataHandler(event) {
    console.log(event,"= onclickmethd");
    // this.appIcon = event.url;
    // this.treeService.updateAppIcon(event.url);
  }  
}

