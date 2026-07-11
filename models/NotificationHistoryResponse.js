// Copyright (c) 2023 Apple Inc. Licensed under MIT License.
export class NotificationHistoryResponseValidator {
    static notificationHistoryResponseItemValidator = new NotificationHistoryResponseValidator();
    validate(obj) {
        if ((typeof obj['paginationToken'] !== 'undefined') && !(typeof obj['paginationToken'] === "string" || obj['paginationToken'] instanceof String)) {
            return false;
        }
        if ((typeof obj['hasMore'] !== 'undefined') && !(typeof obj['hasMore'] === "boolean" || obj['hasMore'] instanceof Boolean)) {
            return false;
        }
        if (typeof obj['notificationHistory'] !== 'undefined') {
            if (!Array.isArray(obj['notificationHistory'])) {
                return false;
            }
            for (const notificationHistoryResponseItem of obj['notificationHistory']) {
                if (!(NotificationHistoryResponseValidator.notificationHistoryResponseItemValidator.validate(notificationHistoryResponseItem))) {
                    return false;
                }
            }
        }
        return true;
    }
}
