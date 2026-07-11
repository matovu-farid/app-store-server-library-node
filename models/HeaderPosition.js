// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The position where the header text appears in a message.
 *
 * {@link https://developer.apple.com/documentation/retentionmessaging/headerposition headerPosition}
 */
export var HeaderPosition;
(function (HeaderPosition) {
    HeaderPosition["ABOVE_BODY"] = "ABOVE_BODY";
    HeaderPosition["ABOVE_IMAGE"] = "ABOVE_IMAGE";
})(HeaderPosition || (HeaderPosition = {}));
export class HeaderPositionValidator extends StringValidator {
}
