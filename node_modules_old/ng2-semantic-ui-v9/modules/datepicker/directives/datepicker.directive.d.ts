import { ElementRef, Renderer2, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ICustomValueAccessorHost, CustomValueAccessor, ICustomValidatorHost, CustomValidator, PositioningPlacement, SuiComponentFactory } from "../../../misc/util/internal";
import { IDatepickerLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization/internal";
import { SuiPopupComponentController, PopupAfterOpen } from "../../popup/internal";
import { SuiDatepicker, DatepickerMode } from "../components/datepicker";
import { CalendarConfig } from "../classes/calendar-config";
export declare class SuiDatepickerDirective extends SuiPopupComponentController<SuiDatepicker> implements ICustomValueAccessorHost<Date>, ICustomValidatorHost, OnChanges, PopupAfterOpen {
    localizationService: SuiLocalizationService;
    private _selectedDate?;
    get selectedDate(): Date | undefined;
    set selectedDate(date: Date | undefined);
    private _mode;
    config: CalendarConfig;
    get mode(): DatepickerMode;
    set mode(mode: DatepickerMode);
    initialDate?: Date;
    maxDate?: Date;
    minDate?: Date;
    firstDayOfWeek?: number;
    private _localeValues;
    localeOverrides: RecursivePartial<IDatepickerLocaleValues>;
    get localeValues(): IDatepickerLocaleValues;
    set placement(placement: PositioningPlacement);
    set transition(transition: string);
    set transitionDuration(duration: number);
    onSelectedDateChange: EventEmitter<Date>;
    onValidatorChange: EventEmitter<void>;
    constructor(renderer: Renderer2, element: ElementRef, componentFactory: SuiComponentFactory, localizationService: SuiLocalizationService);
    popupOnOpen(): void;
    ngOnChanges({ maxDate, minDate, mode }: SimpleChanges): void;
    private onLocaleUpdate;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: Date | undefined): void;
    onKeyDown(e: KeyboardEvent): void;
}
export declare class SuiDatepickerDirectiveValueAccessor extends CustomValueAccessor<Date, SuiDatepickerDirective> {
    host: SuiDatepickerDirective;
    constructor(host: SuiDatepickerDirective);
}
export declare class SuiDatepickerDirectiveValidator extends CustomValidator<SuiDatepickerDirective> {
    host: SuiDatepickerDirective;
    constructor(host: SuiDatepickerDirective);
}
