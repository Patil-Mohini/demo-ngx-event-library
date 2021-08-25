import { ElementRef, EventEmitter } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/internal";
import { SuiLocalizationService } from "../../../behaviors/localization/internal";
import { SuiSelectBase } from "../classes/select-base";
import { SuiSelectOption } from "./select-option";
export declare class SuiMultiSelect<T, U> extends SuiSelectBase<T, U> implements ICustomValueAccessorHost<U[]> {
    selectedOptions: T[];
    private _writtenOptions?;
    selectedOptionsChange: EventEmitter<U[]>;
    get filteredOptions(): T[];
    get availableOptions(): T[];
    private _hasLabels;
    get hasLabels(): boolean;
    set hasLabels(hasLabels: boolean);
    private _placeholder;
    get placeholder(): string;
    set placeholder(placeholder: string);
    maxSelected: number;
    private _zeroSelectionText;
    private _defaultSelectionText;
    get zeroSelectionText(): string;
    set zeroSelectionText(zeroSelectionText: string);
    get defaultSelectionText(): string;
    set defaultSelectionText(defaultSelectionText: string);
    get maxSelectedReached(): boolean;
    get maxSelectedMessage(): string;
    get selectedMessage(): string;
    readonly hasClasses: boolean;
    constructor(element: ElementRef, localizationService: SuiLocalizationService);
    protected optionsUpdateHook(): void;
    protected initialiseRenderedOption(option: SuiSelectOption<T>): void;
    selectOption(option: T): void;
    writeValue(values: U[]): void;
    deselectOption(option: T): void;
    onQueryInputKeydown(event: KeyboardEvent): void;
}
export declare class SuiMultiSelectValueAccessor<T, U> extends CustomValueAccessor<U[], SuiMultiSelect<T, U>> {
    constructor(host: SuiMultiSelect<T, U>);
}
