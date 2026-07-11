// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The data your app provides to change an item of an auto-renewable subscription.
 *
 * {@link https://developer.apple.com/documentation/advancedcommerceapi/subscriptionmodifychangeitem SubscriptionModifyChangeItem}
 */
export var AdvancedCommerceReason;
(function (AdvancedCommerceReason) {
    AdvancedCommerceReason["UPGRADE"] = "UPGRADE";
    AdvancedCommerceReason["DOWNGRADE"] = "DOWNGRADE";
    AdvancedCommerceReason["APPLY_OFFER"] = "APPLY_OFFER";
})(AdvancedCommerceReason || (AdvancedCommerceReason = {}));
export class AdvancedCommerceReasonValidator extends StringValidator {
}
