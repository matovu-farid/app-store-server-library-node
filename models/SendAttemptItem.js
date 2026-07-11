// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { SendAttemptResultValidator } from "./SendAttemptResult";
export class SendAttemptItemValidator {
    static sendAttemptResultValidator = new SendAttemptResultValidator();
    validate(obj) {
        if ((typeof obj['attemptDate'] !== 'undefined') && !(typeof obj['attemptDate'] === "number")) {
            return false;
        }
        if ((typeof obj['sendAttemptResult'] !== 'undefined') && !SendAttemptItemValidator.sendAttemptResultValidator.validate(obj['sendAttemptResult'])) {
            return false;
        }
        return true;
    }
}
