// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { PerformanceTestConfigValidator } from "./PerformanceTestConfig";
export class PerformanceTestResponseValidator {
    static performanceTestConfigValidator = new PerformanceTestConfigValidator();
    validate(obj) {
        if (!(PerformanceTestResponseValidator.performanceTestConfigValidator.validate(obj['config']))) {
            return false;
        }
        if (!(typeof obj['requestId'] === "string" || obj['requestId'] instanceof String)) {
            return false;
        }
        return true;
    }
}
