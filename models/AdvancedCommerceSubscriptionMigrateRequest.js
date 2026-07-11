// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceSubscriptionMigrateDescriptorsValidator } from './AdvancedCommerceSubscriptionMigrateDescriptors';
import { AdvancedCommerceSubscriptionMigrateItemValidator } from './AdvancedCommerceSubscriptionMigrateItem';
import { AdvancedCommerceSubscriptionMigrateRenewalItemValidator } from './AdvancedCommerceSubscriptionMigrateRenewalItem';
export class AdvancedCommerceSubscriptionMigrateRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static descriptorsValidator = new AdvancedCommerceSubscriptionMigrateDescriptorsValidator();
    static itemValidator = new AdvancedCommerceSubscriptionMigrateItemValidator();
    static renewalItemValidator = new AdvancedCommerceSubscriptionMigrateRenewalItemValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionMigrateRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionMigrateRequestValidator.descriptorsValidator.validate(obj['descriptors']))) {
            return false;
        }
        if (!HelperValidationUtils.validateItems(obj['items'])) {
            return false;
        }
        for (const item of obj['items']) {
            if (!AdvancedCommerceSubscriptionMigrateRequestValidator.itemValidator.validate(item)) {
                return false;
            }
        }
        if (typeof obj['renewalItems'] !== 'undefined') {
            if (!HelperValidationUtils.validateItems(obj['renewalItems'])) {
                return false;
            }
            for (const item of obj['renewalItems']) {
                if (!AdvancedCommerceSubscriptionMigrateRequestValidator.renewalItemValidator.validate(item)) {
                    return false;
                }
            }
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['targetProductId'] === "string" || obj['targetProductId'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['taxCode'] === "string" || obj['taxCode'] instanceof String)) {
            return false;
        }
        return true;
    }
}
