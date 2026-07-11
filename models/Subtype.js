// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * A string that provides details about select notification types in version 2.
 *
 * {@link https://developer.apple.com/documentation/appstoreservernotifications/subtype subtype}
 */
export var Subtype;
(function (Subtype) {
    Subtype["INITIAL_BUY"] = "INITIAL_BUY";
    Subtype["RESUBSCRIBE"] = "RESUBSCRIBE";
    Subtype["DOWNGRADE"] = "DOWNGRADE";
    Subtype["UPGRADE"] = "UPGRADE";
    Subtype["AUTO_RENEW_ENABLED"] = "AUTO_RENEW_ENABLED";
    Subtype["AUTO_RENEW_DISABLED"] = "AUTO_RENEW_DISABLED";
    Subtype["VOLUNTARY"] = "VOLUNTARY";
    Subtype["BILLING_RETRY"] = "BILLING_RETRY";
    Subtype["PRICE_INCREASE"] = "PRICE_INCREASE";
    Subtype["GRACE_PERIOD"] = "GRACE_PERIOD";
    Subtype["PENDING"] = "PENDING";
    Subtype["ACCEPTED"] = "ACCEPTED";
    Subtype["BILLING_RECOVERY"] = "BILLING_RECOVERY";
    Subtype["PRODUCT_NOT_FOR_SALE"] = "PRODUCT_NOT_FOR_SALE";
    Subtype["SUMMARY"] = "SUMMARY";
    Subtype["FAILURE"] = "FAILURE";
    Subtype["UNREPORTED"] = "UNREPORTED";
})(Subtype || (Subtype = {}));
export class SubtypeValidator extends StringValidator {
}
