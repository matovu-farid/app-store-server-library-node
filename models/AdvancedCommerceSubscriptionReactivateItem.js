// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
export class AdvancedCommerceSubscriptionReactivateItemValidator {
    validate(obj) {
        if (!HelperValidationUtils.validateSku(obj['SKU'])) {
            return false;
        }
        return true;
    }
}
