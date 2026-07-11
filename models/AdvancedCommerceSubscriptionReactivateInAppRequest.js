// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceSubscriptionReactivateItemValidator } from './AdvancedCommerceSubscriptionReactivateItem';
export class AdvancedCommerceSubscriptionReactivateInAppRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static itemValidator = new AdvancedCommerceSubscriptionReactivateItemValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionReactivateInAppRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if (!(typeof obj['operation'] === "string" || obj['operation'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['version'] === "string" || obj['version'] instanceof String)) {
            return false;
        }
        if (typeof obj['items'] !== 'undefined') {
            if (!HelperValidationUtils.validateItems(obj['items'])) {
                return false;
            }
            for (const item of obj['items']) {
                if (!AdvancedCommerceSubscriptionReactivateInAppRequestValidator.itemValidator.validate(item)) {
                    return false;
                }
            }
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['transactionId'] === "string" || obj['transactionId'] instanceof String)) {
            return false;
        }
        return true;
    }
}
