// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { SendAttemptItemValidator } from "./SendAttemptItem";
export class CheckTestNotificationResponseValidator {
    static sendAttemptItemValidator = new SendAttemptItemValidator();
    validate(obj) {
        if ((typeof obj['signedPayload'] !== 'undefined') && !(typeof obj['signedPayload'] === "string" || obj['signedPayload'] instanceof String)) {
            return false;
        }
        if (typeof obj['sendAttempts'] !== 'undefined') {
            if (!Array.isArray(obj['sendAttempts'])) {
                return false;
            }
            for (const sendAttempt of obj['sendAttempts']) {
                if (!(CheckTestNotificationResponseValidator.sendAttemptItemValidator.validate(sendAttempt))) {
                    return false;
                }
            }
        }
        return true;
    }
}
