// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class SubscriptionGroupIdentifierItemValidator {
    validate(obj) {
        if ((typeof obj['subscriptionGroupIdentifier'] !== 'undefined') && !(typeof obj['subscriptionGroupIdentifier'] === "string" || obj['subscriptionGroupIdentifier'] instanceof String)) {
            return false;
        }
        return true;
    }
}
