// Copyright (c) 2024 Apple Inc. Licensed under MIT License.
/**
 * A value that indicates your preferred outcome for the refund request.
 *
 * {@link https://developer.apple.com/documentation/appstoreserverapi/refundpreferencev1 RefundPreferenceV1}
 * @deprecated Use {@link RefundPreference} instead.
 */
export var RefundPreferenceV1;
(function (RefundPreferenceV1) {
    RefundPreferenceV1[RefundPreferenceV1["UNDECLARED"] = 0] = "UNDECLARED";
    RefundPreferenceV1[RefundPreferenceV1["PREFER_GRANT"] = 1] = "PREFER_GRANT";
    RefundPreferenceV1[RefundPreferenceV1["PREFER_DECLINE"] = 2] = "PREFER_DECLINE";
    RefundPreferenceV1[RefundPreferenceV1["NO_PREFERENCE"] = 3] = "NO_PREFERENCE";
})(RefundPreferenceV1 || (RefundPreferenceV1 = {}));
