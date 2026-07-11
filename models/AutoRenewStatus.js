// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The renewal status for an auto-renewable subscription.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/autorenewstatus autoRenewStatus}
 */
export var AutoRenewStatus;
(function (AutoRenewStatus) {
    AutoRenewStatus[AutoRenewStatus["OFF"] = 0] = "OFF";
    AutoRenewStatus[AutoRenewStatus["ON"] = 1] = "ON";
})(AutoRenewStatus || (AutoRenewStatus = {}));
export class AutoRenewStatusValidator extends NumberValidator {
}
