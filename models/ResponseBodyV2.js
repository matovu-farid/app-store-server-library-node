// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class ResponseBodyV2Validator {
    validate(obj) {
        if ((typeof obj['signedPayload'] !== 'undefined') && !(typeof obj['signedPayload'] === "string" || obj['signedPayload'] instanceof String)) {
            return false;
        }
        return true;
    }
}
