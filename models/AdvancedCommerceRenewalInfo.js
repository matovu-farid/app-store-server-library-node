// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceDescriptorsValidator } from "./AdvancedCommerceDescriptors";
import { AdvancedCommercePeriodValidator } from "./AdvancedCommercePeriod";
import { AdvancedCommerceRenewalItemValidator } from "./AdvancedCommerceRenewalItem";
export class AdvancedCommerceRenewalInfoValidator {
    static descriptorsValidator = new AdvancedCommerceDescriptorsValidator();
    static itemValidator = new AdvancedCommerceRenewalItemValidator();
    static periodValidator = new AdvancedCommercePeriodValidator();
    validate(obj) {
        if ((typeof obj['consistencyToken'] !== 'undefined') && !(typeof obj['consistencyToken'] === "string" || obj['consistencyToken'] instanceof String)) {
            return false;
        }
        if ((typeof obj['descriptors'] !== 'undefined') && !(AdvancedCommerceRenewalInfoValidator.descriptorsValidator.validate(obj['descriptors']))) {
            return false;
        }
        if (typeof obj['items'] !== 'undefined') {
            if (!Array.isArray(obj['items'])) {
                return false;
            }
            for (const item of obj['items']) {
                if (!(AdvancedCommerceRenewalInfoValidator.itemValidator.validate(item))) {
                    return false;
                }
            }
        }
        if ((typeof obj['period'] !== 'undefined') && !(AdvancedCommerceRenewalInfoValidator.periodValidator.validate(obj['period']))) {
            return false;
        }
        if ((typeof obj['requestReferenceId'] !== 'undefined') && !(typeof obj['requestReferenceId'] === "string" || obj['requestReferenceId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['taxCode'] !== 'undefined') && !(typeof obj['taxCode'] === "string" || obj['taxCode'] instanceof String)) {
            return false;
        }
        return true;
    }
}
