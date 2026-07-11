// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The payment mode for a discount offer on an In-App Purchase.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/offerdiscounttype offerDiscountType}
 */
export var OfferDiscountType;
(function (OfferDiscountType) {
    OfferDiscountType["FREE_TRIAL"] = "FREE_TRIAL";
    OfferDiscountType["PAY_AS_YOU_GO"] = "PAY_AS_YOU_GO";
    OfferDiscountType["PAY_UP_FRONT"] = "PAY_UP_FRONT";
    OfferDiscountType["ONE_TIME"] = "ONE_TIME";
})(OfferDiscountType || (OfferDiscountType = {}));
export class OfferDiscountTypeValidator extends StringValidator {
}
