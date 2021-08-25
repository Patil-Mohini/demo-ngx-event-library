import { EventEmitter, AfterContentInit, ElementRef } from "@angular/core";
import { HandledEvent, IFocusEvent } from "../../../misc/util/internal";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
export declare class SuiDropdown implements AfterContentInit {
    private _element;
    service: DropdownService;
    private _menu;
    private _children;
    get children(): SuiDropdown[];
    get isOpenChange(): EventEmitter<boolean>;
    get isActive(): boolean;
    get isOpen(): boolean;
    set isOpen(value: boolean);
    get isDisabled(): boolean;
    set isDisabled(value: boolean);
    private _tabIndex?;
    get tabIndex(): number | undefined;
    get autoClose(): DropdownAutoCloseType;
    set autoClose(value: DropdownAutoCloseType);
    constructor(_element: ElementRef);
    ngAfterContentInit(): void;
    private childrenUpdated;
    onClick(e: HandledEvent): void;
    onFocusOut(e: IFocusEvent): void;
    onKeypress(e: HandledEvent & KeyboardEvent): void;
    private externallyClose;
}
