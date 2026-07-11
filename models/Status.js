// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The status of an auto-renewable subscription.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/status status}
 */
export var Status;
(function (Status) {
    Status[Status["ACTIVE"] = 1] = "ACTIVE";
    Status[Status["EXPIRED"] = 2] = "EXPIRED";
    Status[Status["BILLING_RETRY"] = 3] = "BILLING_RETRY";
    Status[Status["BILLING_GRACE_PERIOD"] = 4] = "BILLING_GRACE_PERIOD";
    Status[Status["REVOKED"] = 5] = "REVOKED";
})(Status || (Status = {}));
export class StatusValidator extends NumberValidator {
}
