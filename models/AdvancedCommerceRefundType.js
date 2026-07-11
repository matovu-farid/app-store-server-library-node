// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * Information about the refund request for an item, such as its SKU, the refund amount, reason, and type.
 *
 * {@link https://developer.apple.com/documentation/advancedcommerceapi/requestrefunditem RequestRefundItem}
 */
export var AdvancedCommerceRefundType;
(function (AdvancedCommerceRefundType) {
    AdvancedCommerceRefundType["FULL"] = "FULL";
    AdvancedCommerceRefundType["PRORATED"] = "PRORATED";
    AdvancedCommerceRefundType["CUSTOM"] = "CUSTOM";
})(AdvancedCommerceRefundType || (AdvancedCommerceRefundType = {}));
export class AdvancedCommerceRefundTypeValidator extends StringValidator {
}
