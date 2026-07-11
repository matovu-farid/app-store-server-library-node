// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceEffectiveValidator } from './AdvancedCommerceEffective';
export class AdvancedCommerceSubscriptionChangeMetadataItemValidator {
    static effectiveValidator = new AdvancedCommerceEffectiveValidator();
    validate(obj) {
        if (!HelperValidationUtils.validateSku(obj['currentSKU'])) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionChangeMetadataItemValidator.effectiveValidator.validate(obj['effective']))) {
            return false;
        }
        if (typeof obj['description'] !== 'undefined' && !HelperValidationUtils.validateDescription(obj['description'])) {
            return false;
        }
        if (typeof obj['displayName'] !== 'undefined' && !HelperValidationUtils.validateDisplayName(obj['displayName'])) {
            return false;
        }
        if (typeof obj['SKU'] !== 'undefined' && !HelperValidationUtils.validateSku(obj['SKU'])) {
            return false;
        }
        return true;
    }
}
