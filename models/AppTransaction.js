// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { EnvironmentValidator } from "./Environment";
import { PurchasePlatformValidator } from "./PurchasePlatform";
export class AppTransactionValidator {
    static environmentValidator = new EnvironmentValidator();
    static originalPlatformValidator = new PurchasePlatformValidator();
    validate(obj) {
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['applicationVersion'] !== 'undefined') && !(typeof obj['applicationVersion'] === "string" || obj['applicationVersion'] instanceof String)) {
            return false;
        }
        if ((typeof obj['versionExternalIdentifier'] !== 'undefined') && !(typeof obj['versionExternalIdentifier'] === "number")) {
            return false;
        }
        if ((typeof obj['receiptCreationDate'] !== 'undefined') && !(typeof obj['receiptCreationDate'] === "number")) {
            return false;
        }
        if ((typeof obj['originalPurchaseDate'] !== 'undefined') && !(typeof obj['originalPurchaseDate'] === "number")) {
            return false;
        }
        if ((typeof obj['originalApplicationVersion'] !== 'undefined') && !(typeof obj['originalApplicationVersion'] === "string" || obj['originalApplicationVersion'] instanceof String)) {
            return false;
        }
        if ((typeof obj['deviceVerification'] !== 'undefined') && !(typeof obj['deviceVerification'] === "string" || obj['deviceVerification'] instanceof String)) {
            return false;
        }
        if ((typeof obj['deviceVerificationNonce'] !== 'undefined') && !(typeof obj['deviceVerificationNonce'] === "string" || obj['deviceVerificationNonce'] instanceof String)) {
            return false;
        }
        if ((typeof obj['preorderDate'] !== 'undefined') && !(typeof obj['preorderDate'] === "number")) {
            return false;
        }
        if ((typeof obj['environment'] !== 'undefined') && !(AppTransactionValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['appTransactionId'] !== 'undefined') && !(typeof obj['appTransactionId'] === "string" || obj['appTransactionId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['originalPlatform'] !== 'undefined') && !(AppTransactionValidator.originalPlatformValidator.validate(obj['originalPlatform']))) {
            return false;
        }
        return true;
    }
}
