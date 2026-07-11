// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { EnvironmentValidator } from "./Environment";
export class DecodedRealtimeRequestBodyValidator {
    static environmentValidator = new EnvironmentValidator();
    validate(obj) {
        if (!(typeof obj['originalTransactionId'] === "string" || obj['originalTransactionId'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        if (!(typeof obj['productId'] === "string" || obj['productId'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['userLocale'] === "string" || obj['userLocale'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['requestIdentifier'] === "string" || obj['requestIdentifier'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['signedDate'] === "number")) {
            return false;
        }
        if (!(DecodedRealtimeRequestBodyValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        return true;
    }
}
