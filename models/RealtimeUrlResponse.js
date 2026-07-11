// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class RealtimeUrlResponseValidator {
    validate(obj) {
        if (!(typeof obj['realtimeURL'] === "string" || obj['realtimeURL'] instanceof String)) {
            return false;
        }
        return true;
    }
}
