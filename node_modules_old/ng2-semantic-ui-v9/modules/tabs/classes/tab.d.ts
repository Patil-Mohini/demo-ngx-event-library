import { SuiTabHeader } from "../directives/tab-header";
import { SuiTabContent } from "../directives/tab-content";
export declare class Tab {
    id: string;
    header: SuiTabHeader;
    content: SuiTabContent;
    index: number;
    constructor(header: SuiTabHeader, content: SuiTabContent);
    get isActive(): boolean;
    set isActive(active: boolean);
    get isDisabled(): boolean;
}
