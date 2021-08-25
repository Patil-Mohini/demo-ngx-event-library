import { ElementRef, TemplateRef, Renderer2 } from "@angular/core";
import { PositioningPlacement, SuiComponentFactory } from "../../../misc/util/internal";
import { PopupTrigger, PopupSize, PopupWidth } from "../classes/popup-config";
import { SuiPopupConfig } from "../services/popup.service";
import { SuiPopupTemplateController, ITemplatePopupContext, ITemplatePopupConfig } from "../classes/popup-template-controller";
export declare class SuiPopupDirective<T> extends SuiPopupTemplateController<T> {
    set popupHeader(header: string);
    set popupText(text: string);
    set popupInverted(inverted: boolean);
    set popupBasic(basic: boolean);
    set popupInline(inline: boolean);
    set popupFlowing(flowing: boolean);
    set popupTransition(transition: string);
    set popupTransitionDuration(duration: number);
    set popupPlacement(placement: PositioningPlacement);
    set popupWidth(width: PopupWidth);
    set popupSize(size: PopupSize);
    set popupDelay(delay: number);
    get popupTrigger(): PopupTrigger;
    set popupTrigger(trigger: PopupTrigger);
    set popupTemplate(template: TemplateRef<ITemplatePopupContext<T>> | undefined);
    set popupTemplateContext(context: T | undefined);
    set popupConfig(config: ITemplatePopupConfig<T> | undefined);
    constructor(renderer: Renderer2, element: ElementRef, componentFactory: SuiComponentFactory, popupDefaults: SuiPopupConfig);
}
