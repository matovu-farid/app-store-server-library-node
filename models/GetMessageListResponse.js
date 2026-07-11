// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { GetMessageListResponseItemValidator } from "./GetMessageListResponseItem";
export class GetMessageListResponseValidator {
    static getMessageListResponseItemValidator = new GetMessageListResponseItemValidator();
    validate(obj) {
        if (typeof obj['messageIdentifiers'] !== 'undefined') {
            if (!Array.isArray(obj['messageIdentifiers'])) {
                return false;
            }
            for (const messageIdentifier of obj['messageIdentifiers']) {
                if (!(GetMessageListResponseValidator.getMessageListResponseItemValidator.validate(messageIdentifier))) {
                    return false;
                }
            }
        }
        return true;
    }
}
