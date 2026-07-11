// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StatusValidator } from "./Status";
export class LastTransactionsItemValidator {
    static statusValidator = new StatusValidator();
    validate(obj) {
        if ((typeof obj['status'] !== 'undefined') && !(LastTransactionsItemValidator.statusValidator.validate(obj['status']))) {
            return false;
        }
        if ((typeof obj['originalTransactionId'] !== 'undefined') && !(typeof obj['originalTransactionId'] === "string" || obj['originalTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['signedTransactionInfo'] !== 'undefined') && !(typeof obj['signedTransactionInfo'] === "string" || obj['signedTransactionInfo'] instanceof String)) {
            return false;
        }
        if ((typeof obj['signedRenewalInfo'] !== 'undefined') && !(typeof obj['signedRenewalInfo'] === "string" || obj['signedRenewalInfo'] instanceof String)) {
            return false;
        }
        return true;
    }
}
