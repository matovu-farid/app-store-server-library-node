// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceDescriptorsValidator } from './AdvancedCommerceDescriptors';
import { AdvancedCommerceSubscriptionCreateItemValidator } from './AdvancedCommerceSubscriptionCreateItem';
import { AdvancedCommercePeriodValidator } from './AdvancedCommercePeriod';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
export class AdvancedCommerceSubscriptionCreateRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static descriptorsValidator = new AdvancedCommerceDescriptorsValidator();
    static itemValidator = new AdvancedCommerceSubscriptionCreateItemValidator();
    static periodValidator = new AdvancedCommercePeriodValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionCreateRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if (!(typeof obj['operation'] === "string" || obj['operation'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['version'] === "string" || obj['version'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionCreateRequestValidator.descriptorsValidator.validate(obj['descriptors']))) {
            return false;
        }
        if (!HelperValidationUtils.validateItems(obj['items'])) {
            return false;
        }
        for (const item of obj['items']) {
            if (!AdvancedCommerceSubscriptionCreateRequestValidator.itemValidator.validate(item)) {
                return false;
            }
        }
        if (!(AdvancedCommerceSubscriptionCreateRequestValidator.periodValidator.validate(obj['period']))) {
            return false;
        }
        if ((typeof obj['previousTransactionId'] !== 'undefined') && !(typeof obj['previousTransactionId'] === "string" || obj['previousTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['taxCode'] === "string" || obj['taxCode'] instanceof String)) {
            return false;
        }
        return true;
    }
}
