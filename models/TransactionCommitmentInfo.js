// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from "../helper_validation_utils";
export class TransactionCommitmentInfoValidator {
    validate(obj) {
        if ((typeof obj['billingPeriodNumber'] !== 'undefined') && !HelperValidationUtils.validatePeriodCount(obj['billingPeriodNumber'])) {
            return false;
        }
        if ((typeof obj['commitmentExpiresDate'] !== 'undefined') && !(typeof obj['commitmentExpiresDate'] === "number")) {
            return false;
        }
        if ((typeof obj['commitmentPrice'] !== 'undefined') && !(typeof obj['commitmentPrice'] === "number")) {
            return false;
        }
        if ((typeof obj['totalBillingPeriods'] !== 'undefined') && !(typeof obj['totalBillingPeriods'] === "number")) {
            return false;
        }
        return true;
    }
}
