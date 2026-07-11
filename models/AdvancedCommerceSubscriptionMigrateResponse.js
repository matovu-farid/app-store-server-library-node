// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class AdvancedCommerceSubscriptionMigrateResponseValidator {
    validate(obj) {
        if (!(typeof obj['signedRenewalInfo'] === "string" || obj['signedRenewalInfo'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['signedTransactionInfo'] === "string" || obj['signedTransactionInfo'] instanceof String)) {
            return false;
        }
        return true;
    }
}
