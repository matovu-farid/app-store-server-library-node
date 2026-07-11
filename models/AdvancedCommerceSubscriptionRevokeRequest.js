// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceRefundReasonValidator } from './AdvancedCommerceRefundReason';
import { AdvancedCommerceRefundTypeValidator } from './AdvancedCommerceRefundType';
export class AdvancedCommerceSubscriptionRevokeRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static refundReasonValidator = new AdvancedCommerceRefundReasonValidator();
    static refundTypeValidator = new AdvancedCommerceRefundTypeValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionRevokeRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionRevokeRequestValidator.refundReasonValidator.validate(obj['refundReason']))) {
            return false;
        }
        if (!(typeof obj['refundRiskingPreference'] === "boolean")) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionRevokeRequestValidator.refundTypeValidator.validate(obj['refundType']))) {
            return false;
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        return true;
    }
}
