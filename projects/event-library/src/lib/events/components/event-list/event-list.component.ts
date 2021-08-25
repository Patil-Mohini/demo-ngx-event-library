import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'sb-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() list: any;
  @Input() paginateLimit: number = 5;
  @Output() eventDetailData = new EventEmitter();
  @Output() redirectToDetail = new EventEmitter();
  @Input() myEvents: any;
  @Input() redirection: any = 'event';
  p:any;
  constructor(
    private router: Router,
    public translate: TranslateService
  ) {
    //translate.setDefaultLang('en');
  }

  ngOnInit() {
    console.log("-----",this.myEvents);
  }

  /*onEventWrapper(identifier) {   
    this.router.navigate([this.redirection], {
      queryParams: {
        identifier: identifier,
        view: 'detail'
      }
    });
  }*/

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  navToEventDetail(res){
      this.eventDetailData.emit(res);
    }
  slickInit(event){

    }
}
