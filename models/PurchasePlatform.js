// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * Values that represent Apple platforms.
 *
 * {@link https://developer.apple.com/documentation/storekit/appstore/platform AppStore.Platform}
 */
export var PurchasePlatform;
(function (PurchasePlatform) {
    PurchasePlatform["IOS"] = "iOS";
    PurchasePlatform["MAC_OS"] = "macOS";
    PurchasePlatform["TV_OS"] = "tvOS";
    PurchasePlatform["VISION_OS"] = "visionOS";
})(PurchasePlatform || (PurchasePlatform = {}));
export class PurchasePlatformValidator extends StringValidator {
}
