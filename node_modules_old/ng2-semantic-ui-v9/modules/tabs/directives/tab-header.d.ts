import { EventEmitter } from "@angular/core";
export declare class SuiTabHeader {
    readonly hasClasses: boolean;
    id: string;
    private _isActive;
    isActiveChange: EventEmitter<boolean>;
    isActiveExternalChange: EventEmitter<boolean>;
    onActivate: EventEmitter<void>;
    onDeactivate: EventEmitter<void>;
    get isActive(): boolean;
    set isActive(active: boolean);
    private _isDisabled;
    get isDisabled(): boolean;
    set isDisabled(disabled: boolean);
    constructor();
    setActiveState(active: boolean): void;
    onClick(): void;
}
