import { ElementRef, Renderer2 } from "@angular/core";
import { SuiLocalizationService } from "../../../behaviors/localization/internal";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor } from "./datepicker.directive";
import { DateParser } from "../classes/date-parser";
import "../helpers/is-webview";
export declare class SuiDatepickerInputDirective {
    datepicker: SuiDatepickerDirective;
    valueAccessor: SuiDatepickerDirectiveValueAccessor;
    private _renderer;
    private _element;
    private _useNativeOnMobile;
    get useNativeOnMobile(): boolean;
    set useNativeOnMobile(fallback: boolean);
    private _fallbackActive;
    get fallbackActive(): boolean;
    set fallbackActive(active: boolean);
    get parser(): DateParser;
    private _currentInputValue;
    private _lastUpdateTyped;
    get selectedDateString(): string | undefined;
    get type(): string;
    get max(): string | undefined;
    get min(): string | undefined;
    constructor(datepicker: SuiDatepickerDirective, valueAccessor: SuiDatepickerDirectiveValueAccessor, _renderer: Renderer2, _element: ElementRef, localizationService: SuiLocalizationService);
    private updateValue;
    typeValue(value: string | undefined): void;
    onFocusOut(): void;
}
