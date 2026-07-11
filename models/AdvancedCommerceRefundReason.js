// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * A reason to request a refund.
 *
 * {@link https://developer.apple.com/documentation/advancedcommerceapi/refundreason refundReason}
 */
export var AdvancedCommerceRefundReason;
(function (AdvancedCommerceRefundReason) {
    AdvancedCommerceRefundReason["UNINTENDED_PURCHASE"] = "UNINTENDED_PURCHASE";
    AdvancedCommerceRefundReason["FULFILLMENT_ISSUE"] = "FULFILLMENT_ISSUE";
    AdvancedCommerceRefundReason["UNSATISFIED_WITH_PURCHASE"] = "UNSATISFIED_WITH_PURCHASE";
    AdvancedCommerceRefundReason["LEGAL"] = "LEGAL";
    AdvancedCommerceRefundReason["OTHER"] = "OTHER";
    AdvancedCommerceRefundReason["MODIFY_ITEMS_REFUND"] = "MODIFY_ITEMS_REFUND";
    AdvancedCommerceRefundReason["SIMULATE_REFUND_DECLINE"] = "SIMULATE_REFUND_DECLINE";
})(AdvancedCommerceRefundReason || (AdvancedCommerceRefundReason = {}));
export class AdvancedCommerceRefundReasonValidator extends StringValidator {
}
