import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sb-enroll-event-users',
  templateUrl: './enroll-event-users.component.html',
  styleUrls: ['./enroll-event-users.component.css']
})
export class EnrollEventUsersComponent implements OnInit {

  @Input() enrollEventDetails: any;
  showDownloadCodeBtn: boolean = true;
  @Input() enrollUserlist:any;

  constructor(public datepipe: DatePipe, public translate: TranslateService) { }

  ngOnInit(): void {
    // console.log('enrollEventDetails ::', this.enrollEventDetails);
  }

  getEnrollDataCsv(){
    console.log('Click here to download enrollment data!..');
  }

}
