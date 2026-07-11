// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * {@link https://developer.apple.com/documentation/appstoreservernotifications/advancedcommercepriceincreaseinfostatus advancedCommercePriceIncreaseInfoStatus}
 */
export var AdvancedCommercePriceIncreaseInfoStatus;
(function (AdvancedCommercePriceIncreaseInfoStatus) {
    AdvancedCommercePriceIncreaseInfoStatus["SCHEDULED"] = "SCHEDULED";
    AdvancedCommercePriceIncreaseInfoStatus["PENDING"] = "PENDING";
    AdvancedCommercePriceIncreaseInfoStatus["ACCEPTED"] = "ACCEPTED";
})(AdvancedCommercePriceIncreaseInfoStatus || (AdvancedCommercePriceIncreaseInfoStatus = {}));
export class AdvancedCommercePriceIncreaseInfoStatusValidator extends StringValidator {
}
