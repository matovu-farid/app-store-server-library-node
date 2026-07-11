// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * A value that indicates your preferred outcome for the refund request.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/refundpreference refundPreference}
 */
export var RefundPreference;
(function (RefundPreference) {
    RefundPreference["DECLINE"] = "DECLINE";
    RefundPreference["GRANT_FULL"] = "GRANT_FULL";
    RefundPreference["GRANT_PRORATED"] = "GRANT_PRORATED";
})(RefundPreference || (RefundPreference = {}));
export class RefundPreferenceValidator extends StringValidator {
}
