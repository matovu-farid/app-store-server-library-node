// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The status of the performance test.
 *
 * {@link https://developer.apple.com/documentation/retentionmessaging/performanceteststatus PerformanceTestStatus}
 */
export var PerformanceTestStatus;
(function (PerformanceTestStatus) {
    PerformanceTestStatus["PENDING"] = "PENDING";
    PerformanceTestStatus["PASS"] = "PASS";
    PerformanceTestStatus["FAIL"] = "FAIL";
})(PerformanceTestStatus || (PerformanceTestStatus = {}));
export class PerformanceTestStatusValidator extends StringValidator {
}
