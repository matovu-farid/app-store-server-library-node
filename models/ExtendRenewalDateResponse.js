// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class ExtendRenewalDateResponseValidator {
    validate(obj) {
        if ((typeof obj['originalTransactionId'] !== 'undefined') && !(typeof obj['originalTransactionId'] === "string" || obj['originalTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['webOrderLineItemId'] !== 'undefined') && !(typeof obj['webOrderLineItemId'] === "string" || obj['webOrderLineItemId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['success'] !== 'undefined') && !(typeof obj['success'] === "boolean" || obj['success'] instanceof Boolean)) {
            return false;
        }
        if ((typeof obj['effectiveDate'] !== 'undefined') && !(typeof obj['effectiveDate'] === "number")) {
            return false;
        }
        return true;
    }
}
