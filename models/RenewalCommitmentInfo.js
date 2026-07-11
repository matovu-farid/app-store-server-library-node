// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { AutoRenewStatusValidator } from "./AutoRenewStatus";
import { RenewalBillingPlanTypeValidator } from "./RenewalBillingPlanType";
export class RenewalCommitmentInfoValidator {
    static autoRenewStatusValidator = new AutoRenewStatusValidator();
    static renewalBillingPlanTypeValidator = new RenewalBillingPlanTypeValidator();
    validate(obj) {
        if ((typeof obj['commitmentAutoRenewProductId'] !== 'undefined') && !(typeof obj['commitmentAutoRenewProductId'] === "string" || obj['commitmentAutoRenewProductId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['commitmentAutoRenewStatus'] !== 'undefined') && !(RenewalCommitmentInfoValidator.autoRenewStatusValidator.validate(obj['commitmentAutoRenewStatus']))) {
            return false;
        }
        if ((typeof obj['commitmentRenewalBillingPlanType'] !== 'undefined') && !(RenewalCommitmentInfoValidator.renewalBillingPlanTypeValidator.validate(obj['commitmentRenewalBillingPlanType']))) {
            return false;
        }
        if ((typeof obj['commitmentRenewalDate'] !== 'undefined') && !(typeof obj['commitmentRenewalDate'] === "number")) {
            return false;
        }
        if ((typeof obj['commitmentRenewalPrice'] !== 'undefined') && !(typeof obj['commitmentRenewalPrice'] === "number")) {
            return false;
        }
        return true;
    }
}
