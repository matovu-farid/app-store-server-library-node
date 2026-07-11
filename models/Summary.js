// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { EnvironmentValidator } from "./Environment";
export class SummaryValidator {
    static environmentValidator = new EnvironmentValidator();
    validate(obj) {
        if ((typeof obj['environment'] !== 'undefined') && !(SummaryValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['productId'] !== 'undefined') && !(typeof obj['productId'] === "string" || obj['productId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['requestIdentifier'] !== 'undefined') && !(typeof obj['requestIdentifier'] === "string" || obj['requestIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['succeededCount'] !== 'undefined') && !(typeof obj['succeededCount'] === "number")) {
            return false;
        }
        if ((typeof obj['failedCount'] !== 'undefined') && !(typeof obj['failedCount'] === "number")) {
            return false;
        }
        return true;
    }
}
