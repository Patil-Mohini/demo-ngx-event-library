import { CalendarService } from "./../services/calendar.service";
import { SuiLocalizationService } from "../../../behaviors/localization/internal";
export declare type DatepickerMode = "year" | "month" | "date" | "datetime" | "time";
export declare const DatepickerMode: {
    Year: "time" | "month" | "year" | "date" | "datetime";
    Month: "time" | "month" | "year" | "date" | "datetime";
    Date: "time" | "month" | "year" | "date" | "datetime";
    Datetime: "time" | "month" | "year" | "date" | "datetime";
    Time: "time" | "month" | "year" | "date" | "datetime";
};
export declare class SuiDatepicker {
    readonly hasClasses: boolean;
    service: CalendarService;
    constructor(localizationService: SuiLocalizationService);
    onMouseDown(e: MouseEvent): void;
}
