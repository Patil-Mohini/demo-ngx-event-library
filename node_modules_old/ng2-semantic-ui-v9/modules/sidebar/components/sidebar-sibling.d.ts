import { ElementRef, Renderer2 } from "@angular/core";
import { SidebarService } from "../services/sidebar.service";
export declare class SuiSidebarSibling {
    private _renderer;
    private _element;
    private _service;
    get service(): SidebarService;
    set service(service: SidebarService);
    isDimmedWhenVisible: boolean;
    get isVisible(): boolean;
    get isDimmed(): boolean;
    readonly hasClasses: boolean;
    constructor(_renderer: Renderer2, _element: ElementRef);
    private updateTransform;
    onClick(event: MouseEvent): void;
}
