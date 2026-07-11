// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The status that indicates whether an auto-renewable subscription is subject to a price increase.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/priceincreasestatus priceIncreaseStatus}
 */
export var PriceIncreaseStatus;
(function (PriceIncreaseStatus) {
    PriceIncreaseStatus[PriceIncreaseStatus["CUSTOMER_HAS_NOT_RESPONDED"] = 0] = "CUSTOMER_HAS_NOT_RESPONDED";
    PriceIncreaseStatus[PriceIncreaseStatus["CUSTOMER_CONSENTED_OR_WAS_NOTIFIED_WITHOUT_NEEDING_CONSENT"] = 1] = "CUSTOMER_CONSENTED_OR_WAS_NOTIFIED_WITHOUT_NEEDING_CONSENT";
})(PriceIncreaseStatus || (PriceIncreaseStatus = {}));
export class PriceIncreaseStatusValidator extends NumberValidator {
}
