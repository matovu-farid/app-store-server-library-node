// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class RefundHistoryResponseValidator {
    validate(obj) {
        if (typeof obj['signedTransactions'] !== 'undefined') {
            if (!Array.isArray(obj['signedTransactions'])) {
                return false;
            }
            for (const signedTransaction of obj['signedTransactions']) {
                if (!(typeof signedTransaction === "string" || signedTransaction instanceof String)) {
                    return false;
                }
            }
        }
        if ((typeof obj['revision'] !== 'undefined') && !(typeof obj['revision'] === "string" || obj['revision'] instanceof String)) {
            return false;
        }
        if ((typeof obj['hasMore'] !== 'undefined') && !(typeof obj['hasMore'] === "boolean" || obj['hasMore'] instanceof Boolean)) {
            return false;
        }
        return true;
    }
}
