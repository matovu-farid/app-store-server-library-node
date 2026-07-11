// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceOneTimeChargeItemValidator } from './AdvancedCommerceOneTimeChargeItem';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
export class AdvancedCommerceOneTimeChargeCreateRequestValidator {
    static itemValidator = new AdvancedCommerceOneTimeChargeItemValidator();
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    validate(obj) {
        if (!(typeof obj['operation'] === "string" || obj['operation'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['version'] === "string" || obj['version'] instanceof String)) {
            return false;
        }
        if (!(AdvancedCommerceOneTimeChargeCreateRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if (!(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if (!(AdvancedCommerceOneTimeChargeCreateRequestValidator.itemValidator.validate(obj['item']))) {
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
