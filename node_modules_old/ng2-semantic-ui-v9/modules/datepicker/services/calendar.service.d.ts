import { EventEmitter } from "@angular/core";
import { IDatepickerLocaleValues } from "../../../behaviors/localization/internal";
import { CalendarViewType } from "../views/calendar-view";
import { CalendarConfig } from "../classes/calendar-config";
export declare enum CalendarMode {
    DateOnly = 0,
    TimeOnly = 1,
    Both = 2
}
export declare class CalendarService {
    localeValues: IDatepickerLocaleValues;
    private _config;
    get config(): CalendarConfig;
    set config(config: CalendarConfig);
    currentView: CalendarViewType;
    get inFinalView(): boolean;
    currentDate: Date;
    private _selectedDate?;
    get selectedDate(): Date | undefined;
    set selectedDate(date: Date | undefined);
    private _minDate?;
    private _maxDate?;
    get minDate(): Date | undefined;
    set minDate(min: Date | undefined);
    get maxDate(): Date | undefined;
    set maxDate(max: Date | undefined);
    private _firstDayOfWeek;
    get firstDayOfWeek(): number;
    set firstDayOfWeek(firstDayOfWeek: number);
    onDateChange: EventEmitter<Date>;
    constructor(config: CalendarConfig, localeValues: IDatepickerLocaleValues);
    onManualUpdate: () => void;
    reset(): void;
    changeDate(date: Date, fromView: CalendarViewType): void;
    zoomOut(fromView: CalendarViewType): void;
    private updateView;
}
