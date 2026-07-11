// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * A value that indicates whether the order ID in the request is valid for your app.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/orderlookupstatus OrderLookupStatus}
 */
export var OrderLookupStatus;
(function (OrderLookupStatus) {
    OrderLookupStatus[OrderLookupStatus["VALID"] = 0] = "VALID";
    OrderLookupStatus[OrderLookupStatus["INVALID"] = 1] = "INVALID";
})(OrderLookupStatus || (OrderLookupStatus = {}));
export class OrderLookupStatusValidator extends NumberValidator {
}
