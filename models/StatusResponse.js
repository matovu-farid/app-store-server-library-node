// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { EnvironmentValidator } from "./Environment";
export class StatusResponseValidator {
    static environmentValidator = new EnvironmentValidator();
    validate(obj) {
        if ((typeof obj['environment'] !== 'undefined') && !(StatusResponseValidator.environmentValidator.validate(obj['environment']))) {
            return false;
        }
        if ((typeof obj['bundleId'] !== 'undefined') && !(typeof obj['bundleId'] === "string" || obj['bundleId'] instanceof String)) {
            return false;
        }
        if ((typeof obj['appAppleId'] !== 'undefined') && !(typeof obj['appAppleId'] === "number")) {
            return false;
        }
        return true;
    }
}
