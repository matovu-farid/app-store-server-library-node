// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
export class RealtimeRequestBodyValidator {
    validate(obj) {
        if ((typeof obj['signedPayload'] !== 'undefined') && !(typeof obj['signedPayload'] === "string" || obj['signedPayload'] instanceof String)) {
            return false;
        }
        return true;
    }
}
