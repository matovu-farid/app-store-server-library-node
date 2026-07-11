// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
export class AdvancedCommerceOneTimeChargeItemValidator {
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
        if (!(typeof obj['price'] === "number")) {
            return false;
        }
        return true;
    }
}
