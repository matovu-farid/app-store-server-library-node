// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The type of the refund or revocation that applies to the transaction.
 *
 * {@link https://developer.apple.com/documentation/appstoreservernotifications/revocationtype revocationType}
 */
export var RevocationType;
(function (RevocationType) {
    RevocationType["REFUND_FULL"] = "REFUND_FULL";
    RevocationType["REFUND_PRORATED"] = "REFUND_PRORATED";
    RevocationType["FAMILY_REVOKE"] = "FAMILY_REVOKE";
})(RevocationType || (RevocationType = {}));
export class RevocationTypeValidator extends StringValidator {
}
