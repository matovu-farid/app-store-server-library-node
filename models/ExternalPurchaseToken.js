// Copyright (c) 2024 Apple Inc. Licensed under MIT License.
export class ExternalPurchaseTokenValidator {
    validate(obj) {
        if ((typeof obj['externalPurchaseId'] !== 'undefined') && !(typeof obj['externalPurchaseId'] === "string" || obj['externalPurchaseId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['tokenCreationDate'] !== 'undefined') && !(typeof obj['tokenCreationDate'] === "number")) {
            return false;
        }
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        return true;
    }
}
