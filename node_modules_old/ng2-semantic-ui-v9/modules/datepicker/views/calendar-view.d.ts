import { AfterViewInit, Renderer2, OnDestroy } from "@angular/core";
import { CalendarItem } from "../directives/calendar-item";
import { CalendarService } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";
export declare enum CalendarViewType {
    Year = 0,
    Month = 1,
    Date = 2,
    Hour = 3,
    Minute = 4
}
export declare type CalendarViewResult = [Date, CalendarViewType];
export declare abstract class CalendarView implements AfterViewInit, OnDestroy {
    private _type;
    private _service;
    private _renderedItems;
    private _highlightedItem?;
    set service(service: CalendarService);
    get service(): CalendarService;
    ranges: CalendarRangeService;
    get currentDate(): Date;
    get selectedDate(): Date | undefined;
    private _documentKeyDownListener;
    constructor(renderer: Renderer2, viewType: CalendarViewType, ranges: CalendarRangeService);
    setDate(item: CalendarItem): void;
    zoomOut(): void;
    ngAfterViewInit(): void;
    private onRenderedItemsChanged;
    private autoHighlight;
    private highlightItem;
    private onDocumentKeyDown;
    ngOnDestroy(): void;
}
