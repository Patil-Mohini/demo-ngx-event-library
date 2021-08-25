import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailService } from './../../../projects/event-library/src/lib/events/services/event-detail/event-detail.service';
import { Location } from '@angular/common';
import { EventService } from './../../../projects/event-library/src/lib/events/services/event/event.service';
import { UsersService } from './../../../projects/event-library/src/lib/events/services/users/users.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {
  eventItem: any;
  userId: any = "1001";
  isLoading: boolean =  true;
  queryParams:any;
  firstnameArray:any;
  enrollData: any;

  constructor(
    private route: ActivatedRoute,
    private eventDetailService: EventDetailService,
    private location: Location,
    private eventService: EventService,
    private usersService: UsersService
    ) { }

  ngOnInit() {
    this.getEventDetail();
    this.getEnrolledUsersList();
  }


  getEnrolledUsersList(){
    this.eventService.getEnrollEvents(this.queryParams.identifier, '').subscribe((data) => {
      this.enrollData = data.result.events;
      this.enrollData.forEach(event => {
        console.log('getEnrollEventUsersList ::', event.userId);
        this.usersService.getUser(event.userId).subscribe((data) => {
          console.log('getEnrolledUserInfo=== ::', data.result.response);
          var arry=data.result.response;
          
          
          this.firstnameArray=arry.map(function (el) { return el.firstname +" "+el.lastname});
     console.log("firstname==>",this.firstnameArray);
          
  
        });
      });
      
    });

  }

  /**
   * Get Single event detail
   */
  getEventDetail(): void {
    // Get the url (query) params
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      console.log(this.queryParams);
    });

    // Subsribe to the event detail service and get single event data
    this.eventDetailService.getEvent(this.queryParams.identifier)
        .subscribe((data: any) => {
          this.eventItem = data.result.event;
          this.isLoading = false;
          console.log('Event Detail Player - ', this.eventItem);
        },(err: any) => {
          console.log('err = ', err);
        });
  }

  goBack(): void {
    this.location.back();
  }
}
