import { EventEmitter } from "@angular/core";
export declare type SidebarTransition = "overlay" | "push" | "scale down" | "uncover" | "slide along" | "slide out";
export declare const SidebarTransition: {
    Overlay: SidebarTransition;
    Push: SidebarTransition;
    ScaleDown: SidebarTransition;
    Uncover: SidebarTransition;
    SlideAlong: SidebarTransition;
    SlideOut: SidebarTransition;
};
export declare type SidebarDirection = "left" | "right" | "top" | "bottom";
export declare const SidebarDirection: {
    Left: import("popper.js").default.Position;
    Right: import("popper.js").default.Position;
    Top: import("popper.js").default.Position;
    Bottom: import("popper.js").default.Position;
};
export declare class SidebarService {
    isVisible: boolean;
    isAnimating: boolean;
    wasJustOpened: boolean;
    direction: SidebarDirection;
    private _width;
    private _height;
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    isVisibleChange: EventEmitter<boolean>;
    widthChange: EventEmitter<void>;
    heightChange: EventEmitter<void>;
    private _isAnimatingTimeout;
    transition: SidebarTransition;
    constructor(isVisible?: boolean);
    setVisibleState(isVisible: boolean): void;
    toggleVisibleState(): void;
}
