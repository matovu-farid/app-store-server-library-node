// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * A value that indicates the extent to which the customer consumed the in-app purchase.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/consumptionstatus consumptionStatus}
 */
export var ConsumptionStatus;
(function (ConsumptionStatus) {
    ConsumptionStatus[ConsumptionStatus["UNDECLARED"] = 0] = "UNDECLARED";
    ConsumptionStatus[ConsumptionStatus["NOT_CONSUMED"] = 1] = "NOT_CONSUMED";
    ConsumptionStatus[ConsumptionStatus["PARTIALLY_CONSUMED"] = 2] = "PARTIALLY_CONSUMED";
    ConsumptionStatus[ConsumptionStatus["FULLY_CONSUMED"] = 3] = "FULLY_CONSUMED";
})(ConsumptionStatus || (ConsumptionStatus = {}));
export class ConsumptionStatusValidator extends NumberValidator {
}
