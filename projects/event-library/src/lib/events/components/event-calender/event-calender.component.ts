import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input
} from '@angular/core';
//import {EventListService} from '../../../projects/event-library/src/lib/events/services/event-list/event-list.service';
import { DatePipe } from '@angular/common';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { CustomEventTitleFormatter } from '../../services/event-title-formatter/custom-event-title-formatter.provider';
import { Router } from '@angular/router';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
 
};

@Component({
  selector: 'lib-event-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class EventCalenderComponent implements OnInit {

  eventCalender: any;
  eventItem: any;
  eventDetaildata:any;
  isOwner = true;
  @Input() eventDetailItem: any;
  @Input() userData: any;
  @Input() canUnenroll: boolean;
  @ViewChild('modalContent', { static: true,read: TemplateRef  }) modalContent: TemplateRef<any>;
  
  @Input() events;

  view: CalendarView = CalendarView.Month;


  CalendarView = CalendarView;
  closeResult = '';
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
//label: '<i class="fas fa-fw fa-pencil-alt"></i>',
//<i class="fas fa-fw fa-pencil"></i>

// {
//   label: '<i class="fa fa-pencil" aria-hidden="true"></i>',
//   a11yLabel: 'Edit',
//   onClick: ({ event }: { event: CalendarEvent }): void => {
//     console.log("in action edit view", event);
//     this.handleEvent('Edited', event);
//   }


//'<i class="fas fa-pen"></i>',
//label: '<i class="fas fa-fw fa-trash-alt"></i>',
  actions: CalendarEventAction[] = [
    {
      label: '',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log("in action edit view", event);
        this.handleEvent('Edited', event);
      }
    }
    // {
    //    label: 'Delete',
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter((iEvent) => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   },
    // },
  ];

  refresh: Subject<any> = new Subject();

  //events : CalendarEvent[];
  

 


  activeDayIsOpen: boolean = true

  constructor(private modal: NgbModal, private router: Router,public datepipe: DatePipe) { }

  ngOnInit() {
    console.log("event-calender===>", this.events);
    //this.showCalenderEvent();
    
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // to be checked with loggin id
    this.isOwner = (this.modalData.event.owner=='1001') ? true : false;
 
    this.modal.open(this.modalContent);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
        //console.log(events);
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }


  


 
 

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  


  navToEventDetail(res) {
    console.log("navToEventDetail", res);
   
    var obj=res;
    this.eventDetaildata ={ }

    console.log("navdetail",obj.identifier)
  
    
    this.router.navigate(['/event-post'], {
      queryParams: {
        identifier:obj.identifier
      }
    });

    
  }
  

}
