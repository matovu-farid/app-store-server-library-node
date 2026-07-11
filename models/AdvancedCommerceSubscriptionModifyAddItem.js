// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceOfferValidator } from './AdvancedCommerceOffer';
export class AdvancedCommerceSubscriptionModifyAddItemValidator {
    static offerValidator = new AdvancedCommerceOfferValidator();
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
        if ((typeof obj['offer'] !== 'undefined') && !(AdvancedCommerceSubscriptionModifyAddItemValidator.offerValidator.validate(obj['offer']))) {
            return false;
        }
        if (!(typeof obj['price'] === "number")) {
            return false;
        }
        if ((typeof obj['proratedPrice'] !== 'undefined') && !(typeof obj['proratedPrice'] === "number")) {
            return false;
        }
        return true;
    }
}
