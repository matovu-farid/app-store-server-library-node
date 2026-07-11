// Copyright (c) 2025 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The approval state of a message.
 *
 * {@link https://developer.apple.com/documentation/retentionmessaging/messagestate messageState}
 */
export var MessageState;
(function (MessageState) {
    MessageState["PENDING_REVIEW"] = "PENDING_REVIEW";
    MessageState["APPROVED"] = "APPROVED";
    MessageState["REJECTED"] = "REJECTED";
})(MessageState || (MessageState = {}));
export class MessageStateValidator extends StringValidator {
}
