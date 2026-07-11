// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceEffectiveValidator } from './AdvancedCommerceEffective';
import { AdvancedCommerceOfferValidator } from './AdvancedCommerceOffer';
import { AdvancedCommerceReasonValidator } from './AdvancedCommerceReason';
export class AdvancedCommerceSubscriptionModifyChangeItemValidator {
    static effectiveValidator = new AdvancedCommerceEffectiveValidator();
    static offerValidator = new AdvancedCommerceOfferValidator();
    static reasonValidator = new AdvancedCommerceReasonValidator();
    validate(obj) {
        if (!HelperValidationUtils.validateSku(obj['SKU'])) {
            return false;
        }
        if (!HelperValidationUtils.validateDescription(obj['description'])) {
            return false;
        }
        if (!HelperValidationUtils.validateDisplayName(obj['displayName'])) {
            return false;
        }
        if (!HelperValidationUtils.validateSku(obj['currentSKU'])) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionModifyChangeItemValidator.effectiveValidator.validate(obj['effective']))) {
            return false;
        }
        if ((typeof obj['offer'] !== 'undefined') && !(AdvancedCommerceSubscriptionModifyChangeItemValidator.offerValidator.validate(obj['offer']))) {
            return false;
        }
        if (!(typeof obj['price'] === "number")) {
            return false;
        }
        if ((typeof obj['proratedPrice'] !== 'undefined') && !(typeof obj['proratedPrice'] === "number")) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionModifyChangeItemValidator.reasonValidator.validate(obj['reason']))) {
            return false;
        }
        return true;
    }
}
