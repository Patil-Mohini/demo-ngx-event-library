import { EventEmitter, ChangeDetectorRef } from "@angular/core";
import { SuiAccordionService } from "../services/accordion.service";
import { TransitionController } from "../../transition/internal";
export declare class SuiAccordionPanel {
    private _changeDetector;
    private _service;
    transitionController: TransitionController;
    set service(service: SuiAccordionService);
    isDisabled: boolean;
    private _isOpen;
    get isOpen(): boolean;
    set isOpen(value: boolean);
    get transition(): string;
    get transitionDuration(): number;
    isOpenChange: EventEmitter<boolean>;
    constructor(_changeDetector: ChangeDetectorRef);
    toggle(): void;
}
