// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class MassExtendRenewalDateResponseValidator {
    validate(obj) {
        if ((typeof obj['requestIdentifier'] !== 'undefined') && !(typeof obj['requestIdentifier'] === "string" || obj['requestIdentifier'] instanceof String)) {
            return false;
        }
        return true;
    }
}
