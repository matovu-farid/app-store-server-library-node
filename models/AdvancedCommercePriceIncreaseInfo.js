// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommercePriceIncreaseInfoStatusValidator } from "./AdvancedCommercePriceIncreaseInfoStatus";
export class AdvancedCommercePriceIncreaseInfoValidator {
    static statusValidator = new AdvancedCommercePriceIncreaseInfoStatusValidator();
    validate(obj) {
        if (typeof obj['dependentSKUs'] !== 'undefined') {
            if (!Array.isArray(obj['dependentSKUs'])) {
                return false;
            }
            for (const sku of obj['dependentSKUs']) {
                if (!(typeof sku === "string" || sku instanceof String)) {
                    return false;
                }
            }
        }
        if ((typeof obj['price'] !== 'undefined') && !(typeof obj['price'] === "number")) {
            return false;
        }
        if ((typeof obj['status'] !== 'undefined') && !(AdvancedCommercePriceIncreaseInfoValidator.statusValidator.validate(obj['status']))) {
            return false;
        }
        return true;
    }
}
