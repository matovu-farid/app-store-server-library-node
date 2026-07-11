// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { EnvironmentValidator } from "./Environment";
export class AppDataValidator {
    static environmentValidator = new EnvironmentValidator();
    validate(obj) {
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['environment'] !== 'undefined') && !(AppDataValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['signedAppTransactionInfo'] !== 'undefined') && !(typeof obj['signedAppTransactionInfo'] === "string" || obj['signedAppTransactionInfo'] instanceof String)) {
            return false;
        }
        return true;
    }
}
