// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
export class AdvancedCommerceSubscriptionPriceChangeItemValidator {
    validate(obj) {
        if (!(typeof obj['SKU'] === "string" || obj['SKU'] instanceof String)) {
            return false;
        }
        if (!HelperValidationUtils.validateSku(obj['SKU'])) {
            return false;
        }
        if (!(typeof obj['price'] === "number")) {
            return false;
        }
        if (typeof obj['dependentSKUs'] !== 'undefined') {
            if (!HelperValidationUtils.validateItems(obj['dependentSKUs'])) {
                return false;
            }
            for (const sku of obj['dependentSKUs']) {
                if (!(typeof sku === "string" || sku instanceof String)) {
                    return false;
                }
                if (!HelperValidationUtils.validateSku(sku)) {
                    return false;
                }
            }
        }
        return true;
    }
}
