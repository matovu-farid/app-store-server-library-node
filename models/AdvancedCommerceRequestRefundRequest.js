// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceRequestRefundItemValidator } from './AdvancedCommerceRequestRefundItem';
export class AdvancedCommerceRequestRefundRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static itemValidator = new AdvancedCommerceRequestRefundItemValidator();
    validate(obj) {
        if (!(AdvancedCommerceRequestRefundRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if ((typeof obj['currency'] !== 'undefined') && !(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if (!HelperValidationUtils.validateItems(obj['items'])) {
            return false;
        }
        for (const item of obj['items']) {
            if (!AdvancedCommerceRequestRefundRequestValidator.itemValidator.validate(item)) {
                return false;
            }
        }
        if (!(typeof obj['refundRiskingPreference'] === "boolean")) {
            return false;
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        return true;
    }
}
