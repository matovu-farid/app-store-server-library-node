// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { NumberValidator } from "./Validator";
/**
 * The reason for a refunded transaction.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/revocationreason revocationReason}
 */
export var RevocationReason;
(function (RevocationReason) {
    RevocationReason[RevocationReason["REFUNDED_DUE_TO_ISSUE"] = 1] = "REFUNDED_DUE_TO_ISSUE";
    RevocationReason[RevocationReason["REFUNDED_FOR_OTHER_REASON"] = 0] = "REFUNDED_FOR_OTHER_REASON";
})(RevocationReason || (RevocationReason = {}));
export class RevocationReasonValidator extends NumberValidator {
}
