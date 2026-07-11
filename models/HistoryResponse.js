// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { EnvironmentValidator } from "./Environment";
export class HistoryResponseValidator {
    static environmentValidator = new EnvironmentValidator();
    validate(obj) {
        if ((typeof obj['revision'] !== 'undefined') && !(typeof obj['revision'] === "string" || obj['revision'] instanceof String)) {
            return false;
        }
        if ((typeof obj['hasMore'] !== 'undefined') && !(typeof obj['hasMore'] === "boolean" || obj['hasMore'] instanceof Boolean)) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if ((typeof obj['environment'] !== 'undefined') && !(HistoryResponseValidator.environmentValidator.validate(obj['environment']))) {
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
