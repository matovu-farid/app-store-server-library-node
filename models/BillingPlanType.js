// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * {@link https://developer.apple.com/documentation/appstoreserverapi/billingplantype billingPlanType}
 */
export var BillingPlanType;
(function (BillingPlanType) {
    BillingPlanType["BILLED_UPFRONT"] = "BILLED_UPFRONT";
    BillingPlanType["MONTHLY"] = "MONTHLY";
})(BillingPlanType || (BillingPlanType = {}));
export class BillingPlanTypeValidator extends StringValidator {
}
