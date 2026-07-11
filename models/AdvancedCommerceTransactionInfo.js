// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceDescriptorsValidator } from "./AdvancedCommerceDescriptors";
import { AdvancedCommercePeriodValidator } from "./AdvancedCommercePeriod";
import { AdvancedCommerceTransactionItemValidator } from "./AdvancedCommerceTransactionItem";
export class AdvancedCommerceTransactionInfoValidator {
    static descriptorsValidator = new AdvancedCommerceDescriptorsValidator();
    static itemValidator = new AdvancedCommerceTransactionItemValidator();
    static periodValidator = new AdvancedCommercePeriodValidator();
    validate(obj) {
        if ((typeof obj['descriptors'] !== 'undefined') && !(AdvancedCommerceTransactionInfoValidator.descriptorsValidator.validate(obj['descriptors']))) {
            return false;
        }
        if ((typeof obj['estimatedTax'] !== 'undefined') && !(typeof obj['estimatedTax'] === "number")) {
            return false;
        }
        if (typeof obj['items'] !== 'undefined') {
            if (!Array.isArray(obj['items'])) {
                return false;
            }
            for (const item of obj['items']) {
                if (!(AdvancedCommerceTransactionInfoValidator.itemValidator.validate(item))) {
                    return false;
                }
            }
        }
        if ((typeof obj['period'] !== 'undefined') && !(AdvancedCommerceTransactionInfoValidator.periodValidator.validate(obj['period']))) {
            return false;
        }
        if ((typeof obj['requestReferenceId'] !== 'undefined') && !(typeof obj['requestReferenceId'] === "string" || obj['requestReferenceId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['taxCode'] !== 'undefined') && !(typeof obj['taxCode'] === "string" || obj['taxCode'] instanceof String)) {
            return false;
        }
        if ((typeof obj['taxExclusivePrice'] !== 'undefined') && !(typeof obj['taxExclusivePrice'] === "number")) {
            return false;
        }
        if ((typeof obj['taxRate'] !== 'undefined') && !(typeof obj['taxRate'] === "string" || obj['taxRate'] instanceof String)) {
            return false;
        }
        return true;
    }
}
