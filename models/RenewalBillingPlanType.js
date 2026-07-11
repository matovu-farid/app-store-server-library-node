// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * {@link https://developer.apple.com/documentation/appstoreserverapi/renewalbillingplantype renewalBillingPlanType}
 */
export var RenewalBillingPlanType;
(function (RenewalBillingPlanType) {
    RenewalBillingPlanType["BILLED_UPFRONT"] = "BILLED_UPFRONT";
    RenewalBillingPlanType["MONTHLY"] = "MONTHLY";
})(RenewalBillingPlanType || (RenewalBillingPlanType = {}));
export class RenewalBillingPlanTypeValidator extends StringValidator {
}
