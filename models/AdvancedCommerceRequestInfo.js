// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class AdvancedCommerceRequestInfoValidator {
    validate(obj) {
        if ((typeof obj['appAccountToken'] !== 'undefined') && !(typeof obj['appAccountToken'] === "string" || obj['appAccountToken'] instanceof String)) {
            return false;
        }
        if ((typeof obj['consistencyToken'] !== 'undefined') && !(typeof obj['consistencyToken'] === "string" || obj['consistencyToken'] instanceof String)) {
            return false;
        }
        if (!(typeof obj['requestReferenceId'] === "string" || obj['requestReferenceId'] instanceof String)) {
            return false;
        }
        return true;
    }
}
