// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class SendTestNotificationResponseValidator {
    validate(obj) {
        if ((typeof obj['testNotificationToken'] !== 'undefined') && !(typeof obj['testNotificationToken'] === "string" || obj['testNotificationToken'] instanceof String)) {
            return false;
        }
        return true;
    }
}
