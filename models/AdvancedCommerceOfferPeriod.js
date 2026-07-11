// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The period of the offer.
 *
 * {@link https://developer.apple.com/documentation/advancedcommerceapi/offer Offer}
 */
export var AdvancedCommerceOfferPeriod;
(function (AdvancedCommerceOfferPeriod) {
    AdvancedCommerceOfferPeriod["P3D"] = "P3D";
    AdvancedCommerceOfferPeriod["P1W"] = "P1W";
    AdvancedCommerceOfferPeriod["P2W"] = "P2W";
    AdvancedCommerceOfferPeriod["P1M"] = "P1M";
    AdvancedCommerceOfferPeriod["P2M"] = "P2M";
    AdvancedCommerceOfferPeriod["P3M"] = "P3M";
    AdvancedCommerceOfferPeriod["P6M"] = "P6M";
    AdvancedCommerceOfferPeriod["P9M"] = "P9M";
    AdvancedCommerceOfferPeriod["P1Y"] = "P1Y";
})(AdvancedCommerceOfferPeriod || (AdvancedCommerceOfferPeriod = {}));
export class AdvancedCommerceOfferPeriodValidator extends StringValidator {
}
