import { AfterContentInit } from "@angular/core";
import { Tab } from "../classes/tab";
export declare class SuiTabset implements AfterContentInit {
    private _tabHeaders;
    private _tabContents;
    tabs: Tab[];
    private _activeTab;
    get activeTab(): Tab;
    set activeTab(tab: Tab);
    private _barrierCount;
    constructor();
    ngAfterContentInit(): void;
    private internalComponentsUpdated;
    private loadTabs;
    private onHeaderActiveChanged;
    activateFirstTab(): void;
    activateClosestTab(tab: Tab): void;
}
