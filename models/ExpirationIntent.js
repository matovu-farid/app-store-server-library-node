// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The reason an auto-renewable subscription expired.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/expirationintent expirationIntent}
 */
export var ExpirationIntent;
(function (ExpirationIntent) {
    ExpirationIntent[ExpirationIntent["CUSTOMER_CANCELLED"] = 1] = "CUSTOMER_CANCELLED";
    ExpirationIntent[ExpirationIntent["BILLING_ERROR"] = 2] = "BILLING_ERROR";
    ExpirationIntent[ExpirationIntent["CUSTOMER_DID_NOT_CONSENT_TO_PRICE_INCREASE"] = 3] = "CUSTOMER_DID_NOT_CONSENT_TO_PRICE_INCREASE";
    ExpirationIntent[ExpirationIntent["PRODUCT_NOT_AVAILABLE"] = 4] = "PRODUCT_NOT_AVAILABLE";
    ExpirationIntent[ExpirationIntent["OTHER"] = 5] = "OTHER";
})(ExpirationIntent || (ExpirationIntent = {}));
export class ExpirationIntentValidator extends NumberValidator {
}
