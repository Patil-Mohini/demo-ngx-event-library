import { Renderer2, ElementRef, AfterContentInit, QueryList, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { SuiTransition } from "../../transition/internal";
import { HandledEvent, KeyCode } from "../../../misc/util/internal";
import { DropdownService } from "../services/dropdown.service";
import "element-closest";
export declare class SuiDropdownMenuItem {
    private _renderer;
    element: ElementRef;
    get isDisabled(): boolean;
    private _isSelected;
    get isSelected(): boolean;
    set isSelected(value: boolean);
    selectedClass: string;
    childDropdownMenu: SuiDropdownMenu;
    get hasChildDropdown(): boolean;
    constructor(_renderer: Renderer2, element: ElementRef);
    performClick(): void;
}
export declare class SuiDropdownMenu extends SuiTransition implements AfterContentInit, OnDestroy {
    private _service;
    private _transitionController;
    menuTransition: string;
    menuTransitionDuration: number;
    get service(): DropdownService;
    set service(value: DropdownService);
    set parentElement(value: ElementRef);
    private _itemsQueryInternal;
    private _itemsQueryOverride;
    set items(items: QueryList<SuiDropdownMenuItem>);
    private get _itemsQuery();
    private get _items();
    selectedItems: SuiDropdownMenuItem[];
    menuAutoSelectFirst: boolean;
    menuSelectedItemClass: string;
    private _parentKeyDownListener;
    constructor(renderer: Renderer2, element: ElementRef, changeDetector: ChangeDetectorRef);
    onClick(e: HandledEvent & MouseEvent): void;
    onParentKeyDown(e: KeyboardEvent): void;
    resetSelection(): void;
    updateSelection(selectedItem: SuiDropdownMenuItem, keyCode: KeyCode): SuiDropdownMenuItem;
    scrollToItem(item: SuiDropdownMenuItem): void;
    ngAfterContentInit(): void;
    private onItemsChanged;
    ngOnDestroy(): void;
}
