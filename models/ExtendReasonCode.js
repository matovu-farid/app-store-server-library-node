// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The code that represents the reason for the subscription-renewal-date extension.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/extendreasoncode extendReasonCode}
 */
export var ExtendReasonCode;
(function (ExtendReasonCode) {
    ExtendReasonCode[ExtendReasonCode["UNDECLARED"] = 0] = "UNDECLARED";
    ExtendReasonCode[ExtendReasonCode["CUSTOMER_SATISFACTION"] = 1] = "CUSTOMER_SATISFACTION";
    ExtendReasonCode[ExtendReasonCode["OTHER"] = 2] = "OTHER";
    ExtendReasonCode[ExtendReasonCode["SERVICE_ISSUE_OR_OUTAGE"] = 3] = "SERVICE_ISSUE_OR_OUTAGE";
})(ExtendReasonCode || (ExtendReasonCode = {}));
export class ExtendReasonCodeValidator extends NumberValidator {
}
