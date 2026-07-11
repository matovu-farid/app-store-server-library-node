// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { HelperValidationUtils } from '../helper_validation_utils';
export class AdvancedCommerceSubscriptionMigrateDescriptorsValidator {
    validate(obj) {
        if (!HelperValidationUtils.validateDescription(obj['description'])) {
            return false;
        }
        if (!HelperValidationUtils.validateDisplayName(obj['displayName'])) {
            return false;
        }
        return true;
    }
}
