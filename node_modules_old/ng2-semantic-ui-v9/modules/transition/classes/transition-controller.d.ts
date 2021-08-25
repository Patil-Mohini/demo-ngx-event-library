import { Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Transition } from "./transition";
export declare class TransitionController {
    private _renderer;
    private _element;
    private _changeDetector;
    private get _isReady();
    private _display;
    private _queue;
    private _isAnimating;
    get isAnimating(): boolean;
    private _isVisible;
    get isVisible(): boolean;
    private _isHidden;
    get isHidden(): boolean;
    private get _queueFirst();
    private get _queueLast();
    private _animationTimeout;
    constructor(isInitiallyVisible?: boolean, display?: string);
    registerRenderer(renderer: Renderer2): void;
    registerElement(element: ElementRef): void;
    registerChangeDetector(changeDetector: ChangeDetectorRef): void;
    animate(transition: Transition): void;
    private performTransition;
    private finishTransition;
    stop(transition?: Transition): void;
    stopAll(): void;
    clearQueue(): void;
}
