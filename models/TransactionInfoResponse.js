// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class TransactionInfoResponseValidator {
    validate(obj) {
        if ((typeof obj['signedTransactionInfo'] !== 'undefined') && !(typeof obj['signedTransactionInfo'] === "string" || obj['signedTransactionInfo'] instanceof String)) {
            return false;
        }
        return true;
    }
}
