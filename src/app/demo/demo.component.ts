import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {EventListService} from '../../../projects/event-library/src/lib/events/services/event-list/event-list.service';
import { EventCreateService } from '../../../projects/event-library/src/lib/events/services/event-create/event-create.service';
import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';
import { EventFilterService } from '../../../projects/event-library/src/lib/events/services/event-filters/event-filters.service';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  yellow: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
};

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  eventList : any;
  eventItem: any;
  enrollUsers: any;
  tab :string= "list";
  userId: any = "1001";
  formFieldProperties: any;
  filterConfig: any;
  isLoading: boolean =  true;
  myEvents: any;
  p: number = 1;
  collection: any[];  
  //event-calender parameter
  eventCalender: any;
  events: CalendarEvent[];

  eventIdentifier = "do_11322166143296307218"
  enrollData: any;

  constructor(
    private eventListService:EventListService,
    private eventCreateService: EventCreateService,
    private eventDetailService: EventDetailService,
    private router: Router,
    private eventFilterService: EventFilterService
  ) { }

  ngOnInit() {
    this.showEventListPage();
    this.showEventCreatePage();
    this.showFilters();
    this.showMyEventListPage();
    this.showCalenderEvent();

  }

  /**
   * For get List of events
   */
  showEventListPage(){
    this.eventListService.getEventList().subscribe((data:any)=>{
       console.log("listdata = ", data.result.events);
      this.eventList = data.result.events;
      this.isLoading = false;

    })
  }

   /**
   * For get List of events
   */
    showMyEventListPage(){
      
      this.eventListService.getMyEventList(this.userId).subscribe((data:any)=>{
         console.log("mylistdata = ", data.result.events);
        this.myEvents = data.result.events;
        this.isLoading = false;
      },err=>{console.log("thissss",err);}
      )
    }

  /**
   * For subscibe click action on event card
   */
   navToEventDetail(event){
    this.router.navigate(['/play/event-detail'], {
      queryParams: {
        identifier: event.identifier
      }
    });

    console.log('Demo Component - ', event.identifier);
  }
  

  // Openview(view)
  // {
  //   this.isLoading = true;

  //   if(view == 'list' )
  //   {
  //     this.tab = 'list';
  //   }
  //   else if(view == 'detail')
  //   {
  //     this.tab = 'detail';
  //   }
  //   else
  //   {
  //     // this.tab = 'form';
  //     this.router.navigate(['/form'], {
  //       queryParams: {
  //         // identifier: event.identifier
  //       }
  //     });
  //   }

  //   this.isLoading = false;
  // }

  Openview(view) {
    this.isLoading = true;
    if (view == 'list') {
      this.tab = 'list';
    } else if (view == 'detail') {
      this.tab = 'detail';
    } else if (view == 'calender') {
      this.tab = 'calender';
      //this.router.navigate(['/calender']);
    }
     else if (view == 'enrollUsersList')
    {
      // this.tab = 'enrollUsersList';
      this.router.navigate(['/enroll-users'], {
        queryParams: {
          identifier: this.eventIdentifier
        }
      });
    }
    else {
      this.tab = 'form';
    }
    this.isLoading = false;
  }
  
  showEventCreatePage() {
    this.eventCreateService.getEventFormConfig().subscribe((data: any) => {
      this.formFieldProperties = data.result['form'].data.fields;
      this.isLoading = false;

      console.log('EventCreate = ',data.result['form'].data.fields);
    })
  }

  showFilters() {
    this.eventFilterService.getFilterFormConfig().subscribe((data: any) => {
      this.filterConfig = data.result['form'].data.fields;
      this.isLoading = false;

      console.log('eventfilters = ',data.result['form'].data.fields);
    },
    (err: any) => {
      console.log('err = ', err);
    });
  }
  
  cancel(){
    //this.router.navigate(['/home']);
  }

  navAfterSave(res){
     //alert(res.result.identifier);
     this.eventDetailService.getEvent(res.result.identifier).subscribe((data: any) => {
      this.eventItem = data.result.event;
      this.tab = 'detail';
      this.isLoading = false;


      console.log(this.eventItem);
    },
      (err: any) => {
        console.log('err = ', err);
      });
   // this.eventItem = res.result.event;
   // alert('hi');
  }

  showCalenderEvent() {
    this.eventListService.getCalenderlist().subscribe((data: any) => {
      //       this.date=new Date();
      //  let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
      console.log("data = ");
      this.eventCalender = data.result.content;

      console.log(this.eventCalender)
      this.events = this.eventCalender.map(obj => ({

        start: new Date(obj.startDate),
        title: obj.name,
        starttime: obj.startTime,
        end: new Date(obj.endDate),
        color: colors.red,
        cssClass: obj.color,
        status: obj.status,
        onlineProvider: obj.onlineProvider,
        audience: obj.audience,
        owner: obj.owner,
        identifier: "do_11322182566085427211",

      }));

      console.log("after =>", this.events);

    })
  }


}
