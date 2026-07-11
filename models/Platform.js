// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The platform on which the customer consumed the in-app purchase.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/platform platform}
 */
export var Platform;
(function (Platform) {
    Platform[Platform["UNDECLARED"] = 0] = "UNDECLARED";
    Platform[Platform["APPLE"] = 1] = "APPLE";
    Platform[Platform["NON_APPLE"] = 2] = "NON_APPLE";
})(Platform || (Platform = {}));
export class PlatformValidator extends NumberValidator {
}
