// Copyright (c) 2026 Apple Inc. Licensed under MIT License.
export class HelperValidationUtils {
    static MAXIMUM_DESCRIPTION_LENGTH = 45;
    static MAXIMUM_DISPLAY_NAME_LENGTH = 30;
    static MAXIMUM_SKU_LENGTH = 128;
    static MIN_PERIOD = 1;
    static MAX_PERIOD = 12;
    /**
     * Validates description is a string and does not exceed maximum length.
     *
     * @param description The description to validate
     * @return Whether the description is valid
     */
    static validateDescription(description) {
        return (typeof description === 'string' || description instanceof String) && description.length <= HelperValidationUtils.MAXIMUM_DESCRIPTION_LENGTH;
    }
    /**
     * Validates display name is a string and does not exceed maximum length.
     *
     * @param displayName The display name to validate
     * @return Whether the display name is valid
     */
    static validateDisplayName(displayName) {
        return (typeof displayName === 'string' || displayName instanceof String) && displayName.length <= HelperValidationUtils.MAXIMUM_DISPLAY_NAME_LENGTH;
    }
    /**
     * Validates SKU is a string and does not exceed maximum length.
     *
     * @param sku The SKU to validate
     * @return Whether the SKU is valid
     */
    static validateSku(sku) {
        return (typeof sku === 'string' || sku instanceof String) && sku.length <= HelperValidationUtils.MAXIMUM_SKU_LENGTH;
    }
    /**
     * Validates periodCount is a number between MIN_PERIOD and MAX_PERIOD inclusive.
     *
     * @param periodCount The period count to validate
     * @return Whether the period count is valid
     */
    static validatePeriodCount(periodCount) {
        return typeof periodCount === 'number' &&
            periodCount >= HelperValidationUtils.MIN_PERIOD &&
            periodCount <= HelperValidationUtils.MAX_PERIOD;
    }
    /**
     * Validates a list of items is a non-empty array with no null elements.
     *
     * @param list The list of items to validate
     * @return Whether the items list is valid
     */
    static validateItems(list) {
        return Array.isArray(list) && list.length > 0 && list.every((item) => item != null);
    }
}
