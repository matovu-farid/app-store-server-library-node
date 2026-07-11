// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class DefaultConfigurationResponseValidator {
    validate(obj) {
        if (!(typeof obj['messageIdentifier'] === "string" || obj['messageIdentifier'] instanceof String)) {
            return false;
        }
        return true;
    }
}
