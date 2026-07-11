// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
import { AdvancedCommerceOfferPeriodValidator } from './AdvancedCommerceOfferPeriod';
import { AdvancedCommerceOfferReasonValidator } from './AdvancedCommerceOfferReason';
export class AdvancedCommerceOfferValidator {
    static periodValidator = new AdvancedCommerceOfferPeriodValidator();
    static reasonValidator = new AdvancedCommerceOfferReasonValidator();
    validate(obj) {
        if (!(AdvancedCommerceOfferValidator.periodValidator.validate(obj['period']))) {
            return false;
        }
        if (!HelperValidationUtils.validatePeriodCount(obj['periodCount'])) {
            return false;
        }
        if (!(typeof obj['price'] === "number")) {
            return false;
        }
        if (!(AdvancedCommerceOfferValidator.reasonValidator.validate(obj['reason']))) {
            return false;
        }
        return true;
    }
}
