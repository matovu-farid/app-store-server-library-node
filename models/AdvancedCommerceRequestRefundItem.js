// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceRefundReasonValidator } from './AdvancedCommerceRefundReason';
import { AdvancedCommerceRefundTypeValidator } from './AdvancedCommerceRefundType';
export class AdvancedCommerceRequestRefundItemValidator {
    static refundReasonValidator = new AdvancedCommerceRefundReasonValidator();
    static refundTypeValidator = new AdvancedCommerceRefundTypeValidator();
    validate(obj) {
        if (!HelperValidationUtils.validateSku(obj['SKU'])) {
            return false;
        }
        if ((typeof obj['refundAmount'] !== 'undefined') && !(typeof obj['refundAmount'] === "number")) {
            return false;
        }
        if (!(AdvancedCommerceRequestRefundItemValidator.refundReasonValidator.validate(obj['refundReason']))) {
            return false;
        }
        if (!(AdvancedCommerceRequestRefundItemValidator.refundTypeValidator.validate(obj['refundType']))) {
            return false;
        }
        if (!(typeof obj['revoke'] === "boolean" || obj['revoke'] instanceof Boolean)) {
            return false;
        }
        return true;
    }
}
