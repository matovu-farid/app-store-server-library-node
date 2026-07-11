// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { GetImageListResponseItemValidator } from "./GetImageListResponseItem";
export class GetImageListResponseValidator {
    static getImageListResponseItemValidator = new GetImageListResponseItemValidator();
    validate(obj) {
        if (typeof obj['imageIdentifiers'] !== 'undefined') {
            if (!Array.isArray(obj['imageIdentifiers'])) {
                return false;
            }
            for (const imageIdentifier of obj['imageIdentifiers']) {
                if (!(GetImageListResponseValidator.getImageListResponseItemValidator.validate(imageIdentifier))) {
                    return false;
                }
            }
        }
        return true;
    }
}
