// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class PerformanceTestResponseTimesValidator {
    validate(obj) {
        if (!(typeof obj['average'] === "number")) {
            return false;
        }
        if (!(typeof obj['p50'] === "number")) {
            return false;
        }
        if (!(typeof obj['p90'] === "number")) {
            return false;
        }
        if (!(typeof obj['p95'] === "number")) {
            return false;
        }
        if (!(typeof obj['p99'] === "number")) {
            return false;
        }
        return true;
    }
}
