// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The reason for the offer.
 *
 * {@link https://developer.apple.com/documentation/advancedcommerceapi/offer Offer}
 */
export var AdvancedCommerceOfferReason;
(function (AdvancedCommerceOfferReason) {
    AdvancedCommerceOfferReason["ACQUISITION"] = "ACQUISITION";
    AdvancedCommerceOfferReason["WIN_BACK"] = "WIN_BACK";
    AdvancedCommerceOfferReason["RETENTION"] = "RETENTION";
})(AdvancedCommerceOfferReason || (AdvancedCommerceOfferReason = {}));
export class AdvancedCommerceOfferReasonValidator extends StringValidator {
}
