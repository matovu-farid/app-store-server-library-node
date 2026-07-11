// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { PerformanceTestConfigValidator } from "./PerformanceTestConfig";
import { PerformanceTestResponseTimesValidator } from "./PerformanceTestResponseTimes";
import { PerformanceTestStatusValidator } from "./PerformanceTestStatus";
export class PerformanceTestResultResponseValidator {
    static performanceTestConfigValidator = new PerformanceTestConfigValidator();
    static performanceTestStatusValidator = new PerformanceTestStatusValidator();
    static performanceTestResponseTimesValidator = new PerformanceTestResponseTimesValidator();
    validate(obj) {
        if (!(PerformanceTestResultResponseValidator.performanceTestConfigValidator.validate(obj['config']))) {
            return false;
        }
        if (!(typeof obj['target'] === "string" || obj['target'] instanceof String)) {
            return false;
        }
        if (!(PerformanceTestResultResponseValidator.performanceTestStatusValidator.validate(obj['result']))) {
            return false;
        }
        if (!(typeof obj['successRate'] === "number")) {
            return false;
        }
        if (!(typeof obj['numPending'] === "number")) {
            return false;
        }
        if (!(PerformanceTestResultResponseValidator.performanceTestResponseTimesValidator.validate(obj['responseTimes']))) {
            return false;
        }
        return true;
    }
}
