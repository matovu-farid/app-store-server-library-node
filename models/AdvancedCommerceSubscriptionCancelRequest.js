// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
export class AdvancedCommerceSubscriptionCancelRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionCancelRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        return true;
    }
}
