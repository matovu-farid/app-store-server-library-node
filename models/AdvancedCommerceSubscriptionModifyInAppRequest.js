// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceRequestInfoValidator } from './AdvancedCommerceRequestInfo';
import { AdvancedCommerceSubscriptionModifyAddItemValidator } from './AdvancedCommerceSubscriptionModifyAddItem';
import { AdvancedCommerceSubscriptionModifyChangeItemValidator } from './AdvancedCommerceSubscriptionModifyChangeItem';
import { AdvancedCommerceSubscriptionModifyDescriptorsValidator } from './AdvancedCommerceSubscriptionModifyDescriptors';
import { AdvancedCommerceSubscriptionModifyPeriodChangeValidator } from './AdvancedCommerceSubscriptionModifyPeriodChange';
import { AdvancedCommerceSubscriptionModifyRemoveItemValidator } from './AdvancedCommerceSubscriptionModifyRemoveItem';
export class AdvancedCommerceSubscriptionModifyInAppRequestValidator {
    static requestInfoValidator = new AdvancedCommerceRequestInfoValidator();
    static addItemValidator = new AdvancedCommerceSubscriptionModifyAddItemValidator();
    static changeItemValidator = new AdvancedCommerceSubscriptionModifyChangeItemValidator();
    static descriptorsValidator = new AdvancedCommerceSubscriptionModifyDescriptorsValidator();
    static periodChangeValidator = new AdvancedCommerceSubscriptionModifyPeriodChangeValidator();
    static removeItemValidator = new AdvancedCommerceSubscriptionModifyRemoveItemValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionModifyInAppRequestValidator.requestInfoValidator.validate(obj['requestInfo']))) {
            return false;
        }
        if (!(typeof obj['operation'] === "string" || obj['operation'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['version'] === "string" || obj['version'] instanceof String)) {
            return false;
        }
        if (typeof obj['addItems'] !== 'undefined') {
            if (!HelperValidationUtils.validateItems(obj['addItems'])) {
                return false;
            }
            for (const item of obj['addItems']) {
                if (!AdvancedCommerceSubscriptionModifyInAppRequestValidator.addItemValidator.validate(item)) {
                    return false;
                }
            }
        }
        if (typeof obj['changeItems'] !== 'undefined') {
            if (!HelperValidationUtils.validateItems(obj['changeItems'])) {
                return false;
            }
            for (const item of obj['changeItems']) {
                if (!AdvancedCommerceSubscriptionModifyInAppRequestValidator.changeItemValidator.validate(item)) {
                    return false;
                }
            }
        }
        if ((typeof obj['currency'] !== 'undefined') && !(typeof obj['currency'] === "string" || obj['currency'] instanceof String)) {
            return false;
        }
        if ((typeof obj['descriptors'] !== 'undefined') && !(AdvancedCommerceSubscriptionModifyInAppRequestValidator.descriptorsValidator.validate(obj['descriptors']))) {
            return false;
        }
        if ((typeof obj['periodChange'] !== 'undefined') && !(AdvancedCommerceSubscriptionModifyInAppRequestValidator.periodChangeValidator.validate(obj['periodChange']))) {
            return false;
        }
        if (typeof obj['removeItems'] !== 'undefined') {
            if (!HelperValidationUtils.validateItems(obj['removeItems'])) {
                return false;
            }
            for (const item of obj['removeItems']) {
                if (!AdvancedCommerceSubscriptionModifyInAppRequestValidator.removeItemValidator.validate(item)) {
                    return false;
                }
            }
        }
        if (!(typeof obj['retainBillingCycle'] === "boolean")) {
            return false;
        }
        if ((typeof obj['storefront'] !== 'undefined') && !(typeof obj['storefront'] === "string" || obj['storefront'] instanceof String)) {
            return false;
        }
        if ((typeof obj['taxCode'] !== 'undefined') && !(typeof obj['taxCode'] === "string" || obj['taxCode'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['transactionId'] === "string" || obj['transactionId'] instanceof String)) {
            return false;
        }
        return true;
    }
}
