// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
import { AppDataValidator } from "./AppData";
import { DataValidator } from "./Data";
import { ExternalPurchaseTokenValidator } from "./ExternalPurchaseToken";
import { NotificationTypeV2Validator } from "./NotificationTypeV2";
import { SubtypeValidator } from "./Subtype";
import { SummaryValidator } from "./Summary";
export class ResponseBodyV2DecodedPayloadValidator {
    static notificationTypeValidator = new NotificationTypeV2Validator();
    static subtypeValidator = new SubtypeValidator();
    static dataValidator = new DataValidator();
    static summaryValidator = new SummaryValidator();
    static externalPurchaseTokenValidator = new ExternalPurchaseTokenValidator();
    static appDataValidator = new AppDataValidator();
    validate(obj) {
        if ((typeof obj['notificationType'] !== 'undefined') && !(ResponseBodyV2DecodedPayloadValidator.notificationTypeValidator.validate(obj['notificationType']))) {
            return false;
        }
        if ((typeof obj['subtype'] !== 'undefined') && !(ResponseBodyV2DecodedPayloadValidator.subtypeValidator.validate(obj['subtype']))) {
            return false;
        }
        if ((typeof obj['notificationUUID'] !== 'undefined') && !(typeof obj['notificationUUID'] === "string" || obj['notificationUUID'] instanceof String)) {
            return false;
        }
        if ((typeof obj['data'] !== 'undefined') && !(ResponseBodyV2DecodedPayloadValidator.dataValidator.validate(obj['data']))) {
            return false;
        }
        if ((typeof obj['version'] !== 'undefined') && !(typeof obj['version'] === "string" || obj['version'] instanceof String)) {
            return false;
        }
        if ((typeof obj['signedDate'] !== 'undefined') && !(typeof obj['signedDate'] === "number")) {
            return false;
        }
        if ((typeof obj['summary'] !== 'undefined') && !(ResponseBodyV2DecodedPayloadValidator.summaryValidator.validate(obj['summary']))) {
            return false;
        }
        if ((typeof obj['externalPurchaseToken'] !== 'undefined') && !(ResponseBodyV2DecodedPayloadValidator.externalPurchaseTokenValidator.validate(obj['externalPurchaseToken']))) {
            return false;
        }
        if ((typeof obj['appData'] !== 'undefined') && !(ResponseBodyV2DecodedPayloadValidator.appDataValidator.validate(obj['appData']))) {
            return false;
        }
        return true;
    }
}
