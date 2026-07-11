// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { MessageStateValidator } from "./MessageState";
export class GetMessageListResponseItemValidator {
    static messageStateValidator = new MessageStateValidator();
    validate(obj) {
        if ((typeof obj['messageIdentifier'] !== 'undefined') && !(typeof obj['messageIdentifier'] === "string" || obj['messageIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['messageState'] !== 'undefined') && !(GetMessageListResponseItemValidator.messageStateValidator.validate(obj['messageState']))) {
            return false;
        }
        return true;
    }
}
