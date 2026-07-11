// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { ImageSizeValidator } from "./ImageSize";
import { ImageStateValidator } from "./ImageState";
export class GetImageListResponseItemValidator {
    static imageStateValidator = new ImageStateValidator();
    static imageSizeValidator = new ImageSizeValidator();
    validate(obj) {
        if ((typeof obj['imageIdentifier'] !== 'undefined') && !(typeof obj['imageIdentifier'] === "string" || obj['imageIdentifier'] instanceof String)) {
            return false;
        }
        if ((typeof obj['imageState'] !== 'undefined') && !(GetImageListResponseItemValidator.imageStateValidator.validate(obj['imageState']))) {
            return false;
        }
        if ((typeof obj['imageSize'] !== 'undefined') && !(GetImageListResponseItemValidator.imageSizeValidator.validate(obj['imageSize']))) {
            return false;
        }
        return true;
    }
}
