// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The type of offer.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/offertype offerType}
 */
export var OfferType;
(function (OfferType) {
    OfferType[OfferType["INTRODUCTORY_OFFER"] = 1] = "INTRODUCTORY_OFFER";
    OfferType[OfferType["PROMOTIONAL_OFFER"] = 2] = "PROMOTIONAL_OFFER";
    OfferType[OfferType["OFFER_CODE"] = 3] = "OFFER_CODE";
    OfferType[OfferType["WIN_BACK_OFFER"] = 4] = "WIN_BACK_OFFER";
})(OfferType || (OfferType = {}));
export class OfferTypeValidator extends NumberValidator {
}
