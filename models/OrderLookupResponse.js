// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { OrderLookupStatusValidator } from "./OrderLookupStatus";
export class OrderLookupResponseValidator {
    static statusValidator = new OrderLookupStatusValidator();
    validate(obj) {
        if ((typeof obj['status'] !== 'undefined') && !(OrderLookupResponseValidator.statusValidator.validate(obj['status']))) {
            return false;
        }
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
        return true;
    }
}
