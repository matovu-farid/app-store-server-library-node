// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AdvancedCommerceEffectiveValidator } from './AdvancedCommerceEffective';
import { AdvancedCommercePeriodValidator } from './AdvancedCommercePeriod';
export class AdvancedCommerceSubscriptionModifyPeriodChangeValidator {
    static effectiveValidator = new AdvancedCommerceEffectiveValidator();
    static periodValidator = new AdvancedCommercePeriodValidator();
    validate(obj) {
        if (!(AdvancedCommerceSubscriptionModifyPeriodChangeValidator.effectiveValidator.validate(obj['effective']))) {
            return false;
        }
        if (!(AdvancedCommerceSubscriptionModifyPeriodChangeValidator.periodValidator.validate(obj['period']))) {
            return false;
        }
        return true;
    }
}
