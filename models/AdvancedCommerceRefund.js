// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceRefundReasonValidator } from "./AdvancedCommerceRefundReason";
import { AdvancedCommerceRefundTypeValidator } from "./AdvancedCommerceRefundType";
export class AdvancedCommerceRefundValidator {
    static refundReasonValidator = new AdvancedCommerceRefundReasonValidator();
    static refundTypeValidator = new AdvancedCommerceRefundTypeValidator();
    validate(obj) {
        if ((typeof obj['refundAmount'] !== 'undefined') && !(typeof obj['refundAmount'] === "number")) {
            return false;
        }
        if ((typeof obj['refundDate'] !== 'undefined') && !(typeof obj['refundDate'] === "number")) {
            return false;
        }
        if ((typeof obj['refundReason'] !== 'undefined') && !(AdvancedCommerceRefundValidator.refundReasonValidator.validate(obj['refundReason']))) {
            return false;
        }
        if ((typeof obj['refundType'] !== 'undefined') && !(AdvancedCommerceRefundValidator.refundTypeValidator.validate(obj['refundType']))) {
            return false;
        }
        return true;
    }
}
