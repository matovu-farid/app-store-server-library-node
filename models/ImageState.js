// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The approval state of an image.
 *
 * {@link https://developer.apple.com/documentation/retentionmessaging/imagestate imageState}
 */
export var ImageState;
(function (ImageState) {
    ImageState["PENDING_REVIEW"] = "PENDING_REVIEW";
    ImageState["APPROVED"] = "APPROVED";
    ImageState["REJECTED"] = "REJECTED";
})(ImageState || (ImageState = {}));
export class ImageStateValidator extends StringValidator {
}
