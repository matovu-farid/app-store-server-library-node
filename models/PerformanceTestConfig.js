// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class PerformanceTestConfigValidator {
    validate(obj) {
        if (!(typeof obj['maxConcurrentRequests'] === "number")) {
            return false;
        }
        if (!(typeof obj['totalRequests'] === "number")) {
            return false;
        }
        if (!(typeof obj['totalDuration'] === "number")) {
            return false;
        }
        if (!(typeof obj['responseTimeThreshold'] === "number")) {
            return false;
        }
        if (!(typeof obj['successRateThreshold'] === "number")) {
            return false;
        }
        return true;
    }
}
