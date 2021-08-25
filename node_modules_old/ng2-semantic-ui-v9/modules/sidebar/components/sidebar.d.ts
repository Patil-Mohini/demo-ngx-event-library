import { Renderer2, ElementRef, EventEmitter } from "@angular/core";
import { SidebarService, SidebarTransition, SidebarDirection } from "../services/sidebar.service";
export declare class SuiSidebar {
    private _renderer;
    private _element;
    service: SidebarService;
    readonly hasClasses: boolean;
    get transition(): SidebarTransition;
    set transition(transition: SidebarTransition);
    get direction(): SidebarDirection;
    set direction(direction: SidebarDirection);
    get isVisible(): boolean;
    set isVisible(isVisible: boolean);
    get isVisibleChange(): EventEmitter<boolean>;
    get isAnimating(): boolean;
    constructor(_renderer: Renderer2, _element: ElementRef);
    private updateDimensions;
    private setClass;
    open(): void;
    close(): void;
    toggle(): void;
}
