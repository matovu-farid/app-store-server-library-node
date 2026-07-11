// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceSubscriptionChangeMetadataDescriptorsValidator } from './AdvancedCommerceSubscriptionChangeMetadataDescriptors';
import { AdvancedCommerceSubscriptionChangeMetadataItemValidator } from './AdvancedCommerceSubscriptionChangeMetadataItem';
export class AdvancedCommerceSubscriptionChangeMetadataRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static descriptorsValidator = new AdvancedCommerceSubscriptionChangeMetadataDescriptorsValidator();
    static itemValidator = new AdvancedCommerceSubscriptionChangeMetadataItemValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionChangeMetadataRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if ((typeof obj['descriptors'] !== 'undefined') && !(AdvancedCommerceSubscriptionChangeMetadataRequestValidator.descriptorsValidator.validate(obj['descriptors']))) {
            return false;
        }
        if (typeof obj['items'] !== 'undefined') {
            if (!Array.isArray(obj['items'])) {
                return false;
            }
            for (const item of obj['items']) {
                if (!AdvancedCommerceSubscriptionChangeMetadataRequestValidator.itemValidator.validate(item)) {
                    return false;
                }
            }
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        if ((typeof obj['taxCode'] !== 'undefined') && !(typeof obj['taxCode'] === "string" || obj['taxCode'] instanceof String)) {
            return false;
        }
        return true;
    }
}
