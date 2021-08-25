import { EventEmitter } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/internal";
export declare class SuiCheckbox implements ICustomValueAccessorHost<boolean> {
    readonly hasClasses: boolean;
    name: string;
    isChecked: boolean;
    onCheckChange: EventEmitter<boolean>;
    onTouched: EventEmitter<void>;
    isDisabled: boolean;
    isReadonly: boolean;
    get checkedAttribute(): string | undefined;
    get isDisabledAttribute(): string | undefined;
    private _checkboxElement;
    constructor();
    onMouseDown(event: any): void;
    onClick(e: any): void;
    onFocusOut(e: any): void;
    toggle(): void;
    writeValue(value: boolean): void;
    private focusCheckbox;
}
export declare class SuiCheckboxValueAccessor extends CustomValueAccessor<boolean, SuiCheckbox> {
    constructor(host: SuiCheckbox);
}
