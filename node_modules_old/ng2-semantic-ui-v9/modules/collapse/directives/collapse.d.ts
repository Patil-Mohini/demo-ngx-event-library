import { ElementRef, Renderer2 } from "@angular/core";
export declare class SuiCollapse {
    private _element;
    private _renderer;
    get isExpanded(): boolean;
    private _isExpanded;
    get isCollapsed(): boolean;
    get isCollapsing(): boolean;
    private _isCollapsing;
    private _pristine;
    get suiCollapse(): boolean;
    set suiCollapse(value: boolean);
    collapseDuration: number;
    private get _animationDuration();
    constructor(_element: ElementRef, _renderer: Renderer2);
    hide(): void;
    show(): void;
    private animate;
}
