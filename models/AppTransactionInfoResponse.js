// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
export class AppTransactionInfoResponseValidator {
    validate(obj) {
        if ((typeof obj['signedAppTransactionInfo'] !== 'undefined') && !(typeof obj['signedAppTransactionInfo'] === "string" || obj['signedAppTransactionInfo'] instanceof String)) {
            return false;
        }
        return true;
    }
}
