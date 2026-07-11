// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The duration of a single cycle of an auto-renewable subscription.
 *
 * {@link https://developer.apple.com/documentation/advancedcommerceapi/period period}
 */
export var AdvancedCommercePeriod;
(function (AdvancedCommercePeriod) {
    AdvancedCommercePeriod["P1W"] = "P1W";
    AdvancedCommercePeriod["P1M"] = "P1M";
    AdvancedCommercePeriod["P2M"] = "P2M";
    AdvancedCommercePeriod["P3M"] = "P3M";
    AdvancedCommercePeriod["P6M"] = "P6M";
    AdvancedCommercePeriod["P1Y"] = "P1Y";
})(AdvancedCommercePeriod || (AdvancedCommercePeriod = {}));
export class AdvancedCommercePeriodValidator extends StringValidator {
}
