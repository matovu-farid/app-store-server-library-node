// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The size of an image.
 *
 * {@link https://developer.apple.com/documentation/retentionmessaging/imagesize imageSize}
 */
export var ImageSize;
(function (ImageSize) {
    ImageSize["FULL_SIZE"] = "FULL_SIZE";
    ImageSize["BULLET_POINT"] = "BULLET_POINT";
})(ImageSize || (ImageSize = {}));
export class ImageSizeValidator extends StringValidator {
}
