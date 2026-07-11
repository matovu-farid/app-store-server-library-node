// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceSubscriptionPriceChangeItemValidator } from './AdvancedCommerceSubscriptionPriceChangeItem';
export class AdvancedCommerceSubscriptionPriceChangeRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static itemValidator = new AdvancedCommerceSubscriptionPriceChangeItemValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionPriceChangeRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if ((typeof obj['currency'] !== 'undefined') && !(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if (!HelperValidationUtils.validateItems(obj['items'])) {
            return false;
        }
        for (const item of obj['items']) {
            if (!AdvancedCommerceSubscriptionPriceChangeRequestValidator.itemValidator.validate(item)) {
                return false;
            }
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        return true;
    }
}
