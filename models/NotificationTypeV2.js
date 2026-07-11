// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { StringValidator } from "./Validator";
/**
 * The type that describes the in-app purchase or external purchase event for which the App Store sends the version 2 notification.
 *
 * {@link https://developer.apple.com/documentation/appstoreservernotifications/notificationtype notificationType}
 */
export var NotificationTypeV2;
(function (NotificationTypeV2) {
    NotificationTypeV2["SUBSCRIBED"] = "SUBSCRIBED";
    NotificationTypeV2["DID_CHANGE_RENEWAL_PREF"] = "DID_CHANGE_RENEWAL_PREF";
    NotificationTypeV2["DID_CHANGE_RENEWAL_STATUS"] = "DID_CHANGE_RENEWAL_STATUS";
    NotificationTypeV2["OFFER_REDEEMED"] = "OFFER_REDEEMED";
    NotificationTypeV2["DID_RENEW"] = "DID_RENEW";
    NotificationTypeV2["EXPIRED"] = "EXPIRED";
    NotificationTypeV2["DID_FAIL_TO_RENEW"] = "DID_FAIL_TO_RENEW";
    NotificationTypeV2["GRACE_PERIOD_EXPIRED"] = "GRACE_PERIOD_EXPIRED";
    NotificationTypeV2["PRICE_INCREASE"] = "PRICE_INCREASE";
    NotificationTypeV2["REFUND"] = "REFUND";
    NotificationTypeV2["REFUND_DECLINED"] = "REFUND_DECLINED";
    NotificationTypeV2["CONSUMPTION_REQUEST"] = "CONSUMPTION_REQUEST";
    NotificationTypeV2["RENEWAL_EXTENDED"] = "RENEWAL_EXTENDED";
    NotificationTypeV2["REVOKE"] = "REVOKE";
    NotificationTypeV2["TEST"] = "TEST";
    NotificationTypeV2["RENEWAL_EXTENSION"] = "RENEWAL_EXTENSION";
    NotificationTypeV2["REFUND_REVERSED"] = "REFUND_REVERSED";
    NotificationTypeV2["EXTERNAL_PURCHASE_TOKEN"] = "EXTERNAL_PURCHASE_TOKEN";
    NotificationTypeV2["ONE_TIME_CHARGE"] = "ONE_TIME_CHARGE";
    NotificationTypeV2["RESCIND_CONSENT"] = "RESCIND_CONSENT";
    NotificationTypeV2["METADATA_UPDATE"] = "METADATA_UPDATE";
    NotificationTypeV2["MIGRATION"] = "MIGRATION";
    NotificationTypeV2["PRICE_CHANGE"] = "PRICE_CHANGE";
})(NotificationTypeV2 || (NotificationTypeV2 = {}));
export class NotificationTypeV2Validator extends StringValidator {
}
