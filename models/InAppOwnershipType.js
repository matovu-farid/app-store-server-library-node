// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The relationship of the user with the family-shared purchase to which they have access.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/inappownershiptype inAppOwnershipType}
 */
export var InAppOwnershipType;
(function (InAppOwnershipType) {
    InAppOwnershipType["FAMILY_SHARED"] = "FAMILY_SHARED";
    InAppOwnershipType["PURCHASED"] = "PURCHASED";
})(InAppOwnershipType || (InAppOwnershipType = {}));
export class InAppOwnershipTypeValidator extends StringValidator {
}
