// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { ConsumptionRequestReasonValidator } from "./ConsumptionRequestReason";
import { EnvironmentValidator } from "./Environment";
import { StatusValidator } from "./Status";
export class DataValidator {
    static environmentValidator = new EnvironmentValidator();
    static statusValidator = new StatusValidator();
    static consumptionRequestReasonValidator = new ConsumptionRequestReasonValidator();
    validate(obj) {
        if ((typeof obj['environment'] !== 'undefined') && !(DataValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['bundleVersion'] !== 'undefined') && !(typeof obj['bundleVersion'] === "string" || obj['bundleVersion'] instanceof String)) {
            return false;
        }
        if ((typeof obj['signedTransactionInfo'] !== 'undefined') && !(typeof obj['signedTransactionInfo'] === "string" || obj['signedTransactionInfo'] instanceof String)) {
            return false;
        }
        if ((typeof obj['signedRenewalInfo'] !== 'undefined') && !(typeof obj['signedRenewalInfo'] === "string" || obj['signedRenewalInfo'] instanceof String)) {
            return false;
        }
        if ((typeof obj['status'] !== 'undefined') && !(DataValidator.statusValidator.validate(obj['status']))) {
            return false;
        }
        if ((typeof obj['consumptionRequestReason'] !== 'undefined') && !(DataValidator.consumptionRequestReasonValidator.validate(obj['consumptionRequestReason']))) {
            return false;
        }
        return true;
    }
}
