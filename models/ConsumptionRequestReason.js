// Copyright (c) 2024 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The customer-provided reason for a refund request.
 *
 * {@link https://developer.apple.com/documentation/appstoreservernotifications/consumptionrequestreason consumptionRequestReason}
 */
export var ConsumptionRequestReason;
(function (ConsumptionRequestReason) {
    ConsumptionRequestReason["UNINTENDED_PURCHASE"] = "UNINTENDED_PURCHASE";
    ConsumptionRequestReason["FULFILLMENT_ISSUE"] = "FULFILLMENT_ISSUE";
    ConsumptionRequestReason["UNSATISFIED_WITH_PURCHASE"] = "UNSATISFIED_WITH_PURCHASE";
    ConsumptionRequestReason["LEGAL"] = "LEGAL";
    ConsumptionRequestReason["OTHER"] = "OTHER";
})(ConsumptionRequestReason || (ConsumptionRequestReason = {}));
export class ConsumptionRequestReasonValidator extends StringValidator {
}
