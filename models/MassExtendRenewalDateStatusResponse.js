// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class MassExtendRenewalDateStatusResponseValidator {
    validate(obj) {
        if ((typeof obj['requestIdentifier'] !== 'undefined') && !(typeof obj['requestIdentifier'] === "string" || obj['requestIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['completeDate'] !== 'undefined') && !(typeof obj['completeDate'] === "number")) {
            return false;
        }
        if ((typeof obj['complete'] !== 'undefined') && !(typeof obj['complete'] === "boolean" || obj['complete'] instanceof Boolean)) {
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
